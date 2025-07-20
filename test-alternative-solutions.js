// Test script untuk mendemonstrasikan solusi alternatif selain retry mechanism
console.log('🚀 Testing Alternative Solutions to Retry Mechanism...\\n');

// 1. Smart Caching dengan TTL
console.log('1️⃣ Smart Caching dengan TTL');
const smartCache = {
  data: new Map(),
  config: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    authTTL: 10 * 60 * 1000,   // 10 minutes
    offlineTTL: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  set(key, value, ttl = this.config.defaultTTL) {
    this.data.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
    console.log(`✅ Cached: ${key} (TTL: ${ttl/1000}s)`);
  },
  
  get(key) {
    const entry = this.data.get(key);
    if (!entry) {
      console.log(`❌ Cache miss: ${key}`);
      return null;
    }
    
    const now = Date.now();
    const isValid = (now - entry.timestamp) < entry.ttl;
    
    if (isValid) {
      console.log(`✅ Cache hit: ${key}`);
      return entry.value;
    } else {
      console.log(`⏰ Cache expired: ${key}`);
      this.data.delete(key);
      return null;
    }
  }
};

// Test smart caching
smartCache.set('auth/user', { id: 1, name: 'Admin' }, smartCache.config.authTTL);
smartCache.get('auth/user'); // Should hit
smartCache.get('auth/nonexistent'); // Should miss

// 2. Network Status Monitoring
console.log('\\n2️⃣ Network Status Monitoring');
const networkMonitor = {
  isOnline: navigator.onLine,
  connectionType: 'unknown',
  
  updateStatus() {
    this.isOnline = navigator.onLine;
    if ('connection' in navigator) {
      this.connectionType = navigator.connection.effectiveType || 'unknown';
    }
    console.log(`🌐 Network: ${this.isOnline ? 'Online' : 'Offline'} (${this.connectionType})`);
  },
  
  shouldUseCache() {
    return !this.isOnline || this.connectionType === 'slow-2g' || this.connectionType === '2g';
  }
};

networkMonitor.updateStatus();
console.log(`📱 Should use cache: ${networkMonitor.shouldUseCache()}`);

// 3. Promise.race dengan Timeout
console.log('\\n3️⃣ Promise.race dengan Timeout');
async function fetchWithTimeout(url, timeout = 2000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout')), timeout)
  );
  
  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    console.log(`✅ Request successful: ${url}`);
    return response;
  } catch (error) {
    console.log(`⏰ Request failed: ${error.message}`);
    throw error;
  }
}

// 4. Offline-First Strategy
console.log('\\n4️⃣ Offline-First Strategy');
const offlineFirst = {
  async fetch(url, options = {}) {
    const key = `${options.method || 'GET'}:${url}`;
    
    // Check cache first if offline or slow connection
    if (networkMonitor.shouldUseCache()) {
      const cached = smartCache.get(key);
      if (cached) {
        console.log(`📱 Using cached data (offline/slow connection): ${url}`);
        return cached;
      }
    }
    
    try {
      // Try network request
      const response = await fetchWithTimeout(url, 2000);
      const data = await response.json();
      
      // Cache successful responses
      if (response.ok) {
        const ttl = url.includes('/auth/') ? smartCache.config.authTTL : smartCache.config.defaultTTL;
        smartCache.set(key, data, ttl);
      }
      
      return data;
    } catch (error) {
      // Fallback to cache
      const cached = smartCache.get(key);
      if (cached) {
        console.log(`🔄 Using cached data as fallback: ${url}`);
        return cached;
      }
      throw error;
    }
  }
};

// 5. Service Worker Simulation
console.log('\\n5️⃣ Service Worker Simulation');
const serviceWorkerSim = {
  cache: new Map(),
  
  async handleRequest(request) {
    const url = request.url;
    
    // Try network first
    try {
      const response = await fetch(url);
      if (response.ok) {
        this.cache.set(url, response.clone());
        console.log(`✅ Network response cached: ${url}`);
      }
      return response;
    } catch (error) {
      // Fallback to cache
      const cached = this.cache.get(url);
      if (cached) {
        console.log(`📱 Using cached response: ${url}`);
        return cached;
      }
      
      // Return offline response for auth
      if (url.includes('/auth/me')) {
        console.log(`🔄 Returning offline response for auth`);
        return new Response(JSON.stringify({ 
          error: 'Offline mode - using cached data' 
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      throw error;
    }
  }
};

// Test scenarios
console.log('\\n🧪 Test Scenarios:');

// Scenario 1: Fast network
console.log('\\n📊 Scenario 1: Fast Network');
networkMonitor.isOnline = true;
networkMonitor.connectionType = '4g';
const result1 = await offlineFirst.fetch('https://api.example.com/data')
  .catch(() => ({ error: 'Network error (expected in test)' }));
console.log('Result:', result1);

// Scenario 2: Slow network
console.log('\\n📊 Scenario 2: Slow Network');
networkMonitor.isOnline = true;
networkMonitor.connectionType = '2g';
const result2 = await offlineFirst.fetch('https://api.example.com/data')
  .catch(() => ({ error: 'Network error (expected in test)' }));
console.log('Result:', result2);

// Scenario 3: Offline
console.log('\\n📊 Scenario 3: Offline');
networkMonitor.isOnline = false;
const result3 = await offlineFirst.fetch('https://api.example.com/data')
  .catch(() => ({ error: 'Network error (expected in test)' }));
console.log('Result:', result3);

console.log('\\n✅ Alternative Solutions Summary:');
console.log('- 🧠 Smart Caching: TTL-based cache invalidation');
console.log('- 🌐 Network Monitoring: Connection-aware strategies');
console.log('- ⏱️ Promise.race: Timeout without retries');
console.log('- 📱 Offline-First: Cache-first when offline/slow');
console.log('- 🔄 Service Worker: Background caching');
console.log('- 🚫 No Retry Mechanism: Faster, more reliable'); 