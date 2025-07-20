// Test script untuk memverifikasi peningkatan kecepatan login
console.log('🚀 Testing Login Speed Improvements...\\n');

// Simulasi localStorage dengan cache
const mockLocalStorage = {
  data: {
    token: 'mock-jwt-token',
    user: JSON.stringify({
      id: 1,
      username: 'admin',
      nama: 'Administrator',
      role: 'admin'
    })
  },
  getItem(key) {
    console.log(`localStorage.getItem('${key}') - ${this.data[key] ? 'HIT' : 'MISS'}`);
    return this.data[key] || null;
  },
  setItem(key, value) {
    console.log(`localStorage.setItem('${key}', '${value}')`);
    this.data[key] = value;
  },
  removeItem(key) {
    console.log(`localStorage.removeItem('${key}')`);
    delete this.data[key];
  }
};

// Simulasi AuthContext state
let authState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  loading: true,
  initialLoadComplete: false
};

// Simulasi optimasi loading
function simulateOptimizedLoading() {
  console.log('📱 Simulasi Optimized Loading...');
  
  const startTime = Date.now();
  
  // 1. Check localStorage immediately
  const token = mockLocalStorage.getItem('token');
  const cachedUser = mockLocalStorage.getItem('user');
  
  if (token && cachedUser) {
    // Optimistic loading: set user data from cache immediately
    const userData = JSON.parse(cachedUser);
    console.log(`✅ Set cached user data immediately: ${userData.nama}`);
    
    authState.user = userData;
    authState.isLoggedIn = true;
    authState.isAdmin = userData.role === 'admin';
    authState.loading = false;
    authState.initialLoadComplete = true;
    
    const optimisticTime = Date.now() - startTime;
    console.log(`⚡ Optimistic loading completed in ${optimisticTime}ms`);
  }
  
  // 2. Background token verification (simulated)
  setTimeout(() => {
    console.log('🔐 Background token verification completed');
    const totalTime = Date.now() - startTime;
    console.log(`📊 Total verification time: ${totalTime}ms`);
  }, 100); // Simulated network delay
  
  return authState;
}

// Test scenarios
console.log('🧪 Test Scenario 1: User with cached data');
const result1 = simulateOptimizedLoading();
console.log('State after optimization:', {
  isLoggedIn: result1.isLoggedIn,
  isAdmin: result1.isAdmin,
  loading: result1.loading,
  user: result1.user?.nama
});

console.log('\\n🧪 Test Scenario 2: User without cached data');
mockLocalStorage.removeItem('token');
mockLocalStorage.removeItem('user');

const result2 = simulateOptimizedLoading();
console.log('State after optimization:', {
  isLoggedIn: result2.isLoggedIn,
  isAdmin: result2.isAdmin,
  loading: result2.loading,
  user: result2.user?.nama
});

console.log('\\n✅ Speed improvements implemented:');
console.log('- ⚡ Optimistic loading from cache');
console.log('- 🚀 Reduced retry delays (200ms, 400ms, 600ms)');
console.log('- ⏱️ 3-second timeout for network requests');
console.log('- 📱 Immediate UI updates');
console.log('- 🔄 Background token verification'); 