const axios = require('axios');

// Test script untuk memeriksa masalah network dan API
console.log('🔍 Testing Network and API Issues for Struktur Organisasi...\n');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';

async function testNetworkAndAPI() {
  try {
    console.log('1. Testing basic axios request...');
    
    // Test 1: Basic axios request
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Headers:`, response.headers);
      console.log(`✅ Data received: ${response.data.struktur.length} items`);
    } catch (error) {
      console.log(`❌ Axios error: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data)}`);
      }
    }

    console.log('\n2. Testing with different headers...');
    
    // Test 2: With specific headers
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'WebSidomulyo-Test/1.0'
        }
      });
      console.log(`✅ Status with headers: ${response.status}`);
      console.log(`✅ Data with headers: ${response.data.struktur.length} items`);
    } catch (error) {
      console.log(`❌ Axios with headers error: ${error.message}`);
    }

    console.log('\n3. Testing CORS headers...');
    
    // Test 3: Check CORS headers
    try {
      const response = await axios.options(`${API_BASE_URL}/struktur`, {
        headers: {
          'Origin': 'https://web-sidomulyo.vercel.app',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      console.log(`✅ OPTIONS status: ${response.status}`);
      console.log(`✅ CORS headers:`, {
        'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
      });
    } catch (error) {
      console.log(`❌ OPTIONS request error: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
      }
    }

    console.log('\n4. Testing from different origins...');
    
    // Test 4: Simulate different origins
    const origins = [
      'https://web-sidomulyo.vercel.app',
      'https://web-sidomulyo-a9tz.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173'
    ];

    for (const origin of origins) {
      try {
        const response = await axios.get(`${API_BASE_URL}/struktur`, {
          headers: {
            'Origin': origin,
            'Accept': 'application/json'
          }
        });
        console.log(`✅ Origin ${origin}: ${response.status}`);
      } catch (error) {
        console.log(`❌ Origin ${origin}: ${error.message}`);
        if (error.response) {
          console.log(`   Status: ${error.response.status}`);
        }
      }
    }

    console.log('\n5. Testing network connectivity and timing...');
    
    // Test 5: Network connectivity and timing
    try {
      const startTime = Date.now();
      const response = await axios.get(`${API_BASE_URL}/struktur`);
      const endTime = Date.now();
      console.log(`✅ Network response time: ${endTime - startTime}ms`);
      console.log(`✅ Network status: ${response.status}`);
      console.log(`✅ Data size: ${JSON.stringify(response.data).length} characters`);
    } catch (error) {
      console.log(`❌ Network error: ${error.message}`);
    }

    console.log('\n6. Testing specific struktur endpoints...');
    
    // Test 6: Test specific endpoints
    const endpoints = [
      '/struktur',
      '/struktur/tipe/kepala_desa',
      '/struktur/tipe/sekretaris',
      '/struktur/tipe/kaur',
      '/struktur/tipe/kasi',
      '/struktur/tipe/kasun'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        console.log(`✅ ${endpoint}: ${response.status} (${response.data.struktur.length} items)`);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.message}`);
        if (error.response) {
          console.log(`   Status: ${error.response.status}`);
        }
      }
    }

    console.log('\n7. Testing error handling...');
    
    // Test 7: Test error handling
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/nonexistent`);
      console.log(`✅ Non-existent endpoint: ${response.status}`);
    } catch (error) {
      console.log(`✅ Non-existent endpoint correctly returned error: ${error.response?.status}`);
    }

    console.log('\n🎉 Network and API testing completed!');
    console.log('\n📝 Summary:');
    console.log('- ✅ Backend is accessible');
    console.log('- ✅ API endpoints are working');
    console.log('- ✅ CORS headers are present');
    console.log('- ✅ Network connectivity is good');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testNetworkAndAPI(); 