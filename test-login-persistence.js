const axios = require('axios');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';

async function testLoginPersistence() {
  try {
    console.log('🔍 Testing Login Persistence...\n');

    // 1. Login sebagai admin
    console.log('1. Login sebagai admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'password'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');
    console.log('Token received:', token ? '***' : 'missing');

    // 2. Test /auth/me endpoint
    console.log('\n2. Testing /auth/me endpoint...');
    const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const user = meResponse.data.user;
    console.log('✅ /auth/me successful');
    console.log('User data:', {
      id: user.id,
      username: user.username,
      nama: user.nama,
      email: user.email,
      role: user.role
    });

    // 3. Test multiple /auth/me calls to simulate page navigation
    console.log('\n3. Testing multiple /auth/me calls (simulating page navigation)...');
    
    for (let i = 1; i <= 5; i++) {
      try {
        const testResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`✅ Call ${i}: Success - User: ${testResponse.data.user.username}`);
      } catch (error) {
        console.log(`❌ Call ${i}: Failed - ${error.response?.status} ${error.response?.data?.error}`);
      }
    }

    // 4. Test with different headers
    console.log('\n4. Testing with different header combinations...');
    
    const headerTests = [
      { 'Authorization': `Bearer ${token}` },
      { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' }
    ];

    for (let i = 0; i < headerTests.length; i++) {
      try {
        const testResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: headerTests[i]
        });
        console.log(`✅ Header test ${i + 1}: Success`);
      } catch (error) {
        console.log(`❌ Header test ${i + 1}: Failed - ${error.response?.status} ${error.response?.data?.error}`);
      }
    }

    // 5. Test CORS preflight
    console.log('\n5. Testing CORS preflight...');
    try {
      const optionsResponse = await axios.options(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Origin': 'https://web-sidomulyo-a9tz.vercel.app',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Authorization,Content-Type'
        }
      });
      console.log('✅ CORS preflight successful');
      console.log('CORS headers:', optionsResponse.headers);
    } catch (error) {
      console.log('❌ CORS preflight failed:', error.response?.status);
    }

    console.log('\n🎉 Login Persistence Test Completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
  }
}

testLoginPersistence(); 