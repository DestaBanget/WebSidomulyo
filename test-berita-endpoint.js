const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testBeritaEndpoints() {
  console.log('=== Testing Berita Endpoints ===\n');

  try {
    // Test 1: GET berita (public endpoint)
    console.log('1. Testing GET /berita (public)...');
    const getResponse = await fetch(`${API_BASE_URL}/berita`);
    console.log('Status:', getResponse.status);
    if (getResponse.ok) {
      const data = await getResponse.json();
      console.log('✅ Success - Found', data.berita?.length || 0, 'berita items');
    } else {
      console.log('❌ Failed -', getResponse.statusText);
    }
    console.log('');

    // Test 2: POST berita without token (should fail)
    console.log('2. Testing POST /berita without token...');
    const formData = new FormData();
    formData.append('title', 'Test Berita');
    formData.append('content', 'Test content');
    formData.append('kategori', 'Pembangunan');
    formData.append('tanggal', '2025-01-20');
    
    const postResponseWithoutToken = await fetch(`${API_BASE_URL}/berita`, {
      method: 'POST',
      body: formData
    });
    console.log('Status:', postResponseWithoutToken.status);
    if (postResponseWithoutToken.status === 401) {
      console.log('✅ Expected - Access denied (no token)');
    } else {
      const data = await postResponseWithoutToken.json();
      console.log('❌ Unexpected response:', data);
    }
    console.log('');

    // Test 3: Login to get token
    console.log('3. Testing login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful');
      console.log('User:', loginData.user.nama);
      console.log('Role:', loginData.user.role);
      
      const token = loginData.token;
      
      // Test 4: POST berita with token
      console.log('\n4. Testing POST /berita with token...');
      const formDataWithToken = new FormData();
      formDataWithToken.append('title', 'Test Berita from Script');
      formDataWithToken.append('content', 'Test content from script');
      formDataWithToken.append('kategori', 'Pembangunan');
      formDataWithToken.append('tanggal', '2025-01-20');
      
      const postResponseWithToken = await fetch(`${API_BASE_URL}/berita`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataWithToken
      });
      
      console.log('Status:', postResponseWithToken.status);
      if (postResponseWithToken.ok) {
        const data = await postResponseWithToken.json();
        console.log('✅ Success - Berita created');
        console.log('Message:', data.message);
      } else {
        const errorData = await postResponseWithToken.json();
        console.log('❌ Failed -', errorData.error);
      }
      
    } else {
      console.log('❌ Login failed');
      const errorData = await loginResponse.json();
      console.log('Error:', errorData.error);
    }

  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('\nMake sure:');
    console.log('1. Backend is running on http://localhost:5000');
    console.log('2. Database is connected');
    console.log('3. User admin exists in database');
  }
}

testBeritaEndpoints(); 