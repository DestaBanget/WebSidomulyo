import { useState, useEffect } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');
  const [effectiveType, setEffectiveType] = useState('unknown');

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
      
      // Get connection info if available
      if ('connection' in navigator) {
        setConnectionType(navigator.connection.effectiveType || 'unknown');
        setEffectiveType(navigator.connection.effectiveType || 'unknown');
      }
    };

    const handleOnline = () => {
      console.log('Network: Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('Network: Gone offline');
      setIsOnline(false);
    };

    const handleConnectionChange = () => {
      console.log('Network: Connection type changed');
      updateNetworkStatus();
    };

    // Initial check
    updateNetworkStatus();

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return {
    isOnline,
    connectionType,
    effectiveType,
    isSlowConnection: effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g'
  };
} 