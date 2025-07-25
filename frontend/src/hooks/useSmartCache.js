import { useState, useEffect, useCallback } from 'react';
import { useNetworkStatus } from './useNetworkStatus';

export function useSmartCache() {
  const [cache, setCache] = useState(new Map());
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0
  });
  const { isOnline, isSlowConnection } = useNetworkStatus();

  // Cache configuration
  const CACHE_CONFIG = {
    maxSize: 50, // Maximum number of cached items
    defaultTTL: 5 * 60 * 1000, // 5 minutes default TTL
    authTTL: 10 * 60 * 1000, // 10 minutes for auth data
    offlineTTL: 24 * 60 * 60 * 1000, // 24 hours when offline
  };

  // Get cache key
  const getCacheKey = useCallback((url, options = {}) => {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }, []);

  // Check if cache entry is valid
  const isCacheValid = useCallback((entry) => {
    if (!entry) return false;
    
    const now = Date.now();
    const ttl = entry.ttl || CACHE_CONFIG.defaultTTL;
    
    // Extend TTL when offline
    const effectiveTTL = !isOnline ? CACHE_CONFIG.offlineTTL : ttl;
    
    return (now - entry.timestamp) < effectiveTTL;
  }, [isOnline]);

  // Get from cache
  const getFromCache = useCallback((key) => {
    const entry = cache.get(key);
    
    if (isCacheValid(entry)) {
      setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
      return entry.data;
    }
    
    if (entry) {
      // Remove expired entry
      cache.delete(key);
      setCache(prev => new Map(prev));
    }
    
    setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
    return null;
  }, [cache, isCacheValid]);

  // Set cache entry
  const setCacheEntry = useCallback((key, data, ttl = CACHE_CONFIG.defaultTTL) => {
    const entry = {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0
    };

    // Check cache size limit
    if (cache.size >= CACHE_CONFIG.maxSize) {
      // Remove least recently used entry
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    cache.set(key, entry);
    setCache(new Map(cache));
    setCacheStats(prev => ({ ...prev, size: cache.size }));
  }, [cache]);

  // Smart fetch with caching
  const smartFetch = useCallback(async (url, options = {}) => {
    const key = getCacheKey(url, options);
    
    // Try cache first for GET requests when offline or slow connection
    if ((options.method === 'GET' || !options.method) && (!isOnline || isSlowConnection)) {
      const cachedData = getFromCache(key);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      // Network request
      const response = await fetch(url, options);
      const data = await response.json();

      // Cache successful responses
      if (response.ok) {
        const ttl = url.includes('/auth/') ? CACHE_CONFIG.authTTL : CACHE_CONFIG.defaultTTL;
        setCacheEntry(key, data, ttl);
      }

      return data;
    } catch (error) {
      // Try cache as fallback
      const cachedData = getFromCache(key);
      if (cachedData) {
        return cachedData;
      }
      throw error;
    }
  }, [getCacheKey, getFromCache, setCacheEntry, isOnline, isSlowConnection]);

  // Clear cache
  const clearCache = useCallback(() => {
    cache.clear();
    setCache(new Map());
    setCacheStats({ hits: 0, misses: 0, size: 0 });
  }, [cache]);

  // Clear expired entries
  const clearExpired = useCallback(() => {
    let cleared = 0;
    for (const [key, entry] of cache.entries()) {
      if (!isCacheValid(entry)) {
        cache.delete(key);
        cleared++;
      }
    }
    
    if (cleared > 0) {
      setCache(new Map(cache));
      setCacheStats(prev => ({ ...prev, size: cache.size }));
    }
  }, [cache, isCacheValid]);

  // Periodic cache cleanup
  useEffect(() => {
    const interval = setInterval(clearExpired, 60 * 1000); // Clean every minute
    return () => clearInterval(interval);
  }, [clearExpired]);

  return {
    smartFetch,
    getFromCache,
    setCacheEntry,
    clearCache,
    clearExpired,
    cacheStats,
    isOnline,
    isSlowConnection
  };
} 