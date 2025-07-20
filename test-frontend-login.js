// Test script untuk mensimulasikan masalah login persistence di frontend
console.log('🔍 Testing Frontend Login Persistence...\n');

// Simulasi localStorage
const mockLocalStorage = {
  data: {},
  getItem(key) {
    console.log(`localStorage.getItem('${key}')`);
    return this.data[key] || null;
  },
  setItem(key, value) {
    console.log(`localStorage.setItem('${key}', '${value}')`);
    this.data[key] = value;
  },
  removeItem(key) {
    console.log(`localStorage.removeItem('${key}')`);
    delete this.data[key];
  },
  clear() {
    console.log('localStorage.clear()');
    this.data = {};
  }
};

// Simulasi AuthContext state
let authState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  loading: true
};

// Simulasi token verification
async function verifyToken(token) {
  console.log('🔐 Verifying token...');
  
  if (!token) {
    console.log('❌ No token provided');
    return false;
  }

  try {
    // Simulasi API call
    const response = await fetch('https://backendsidomulyo-production.up.railway.app/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token valid, user:', data.user.username);
      return data.user;
    } else {
      console.log('❌ Token invalid');
      return false;
    }
  } catch (error) {
    console.log('❌ Token verification failed:', error.message);
    return false;
  }
}

// Simulasi login process
async function simulateLogin(username, password) {
  console.log(`\n🔑 Simulating login for ${username}...`);
  
  try {
    const response = await fetch('https://backendsidomulyo-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login successful');
      
      // Simulasi menyimpan ke localStorage
      mockLocalStorage.setItem('token', data.token);
      mockLocalStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      authState = {
        isLoggedIn: true,
        isAdmin: data.user.role === 'admin',
        user: data.user,
        loading: false
      };
      
      console.log('✅ Auth state updated:', {
        isLoggedIn: authState.isLoggedIn,
        isAdmin: authState.isAdmin,
        username: authState.user.username
      });
      
      return data;
    } else {
      const errorData = await response.json();
      console.log('❌ Login failed:', errorData.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return null;
  }
}

// Simulasi page navigation
async function simulatePageNavigation(pageName) {
  console.log(`\n📄 Simulating navigation to ${pageName}...`);
  
  const token = mockLocalStorage.getItem('token');
  console.log('Token in localStorage:', token ? '***' : 'null');
  
  if (token) {
    const user = await verifyToken(token);
    if (user) {
      console.log(`✅ User authenticated for ${pageName}:`, user.username);
      return true;
    } else {
      console.log(`❌ User not authenticated for ${pageName}`);
      // Clear invalid token
      mockLocalStorage.removeItem('token');
      mockLocalStorage.removeItem('user');
      authState = {
        isLoggedIn: false,
        isAdmin: false,
        user: null,
        loading: false
      };
      return false;
    }
  } else {
    console.log(`❌ No token found for ${pageName}`);
    return false;
  }
}

// Test sequence
async function runTest() {
  try {
    // 1. Login
    const loginResult = await simulateLogin('admin', 'password');
    if (!loginResult) {
      console.log('❌ Test failed at login step');
      return;
    }

    // 2. Navigate to multiple pages
    const pages = ['Home', 'Berita', 'Pengumuman', 'Agenda', 'Profile'];
    
    for (const page of pages) {
      const isAuthenticated = await simulatePageNavigation(page);
      if (!isAuthenticated) {
        console.log(`❌ Authentication lost at page: ${page}`);
        return;
      }
      
      // Simulasi delay antar navigasi
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n🎉 All page navigations successful!');
    console.log('✅ Login persistence working correctly');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Jalankan test
runTest(); 