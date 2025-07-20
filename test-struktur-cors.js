// Test script untuk memeriksa masalah CORS dan network
console.log('🔍 Testing CORS and Network Issues for Struktur Organisasi...\n');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';

async function testCorsAndNetwork() {
  try {
    console.log('1. Testing basic fetch request...');
    
    // Test 1: Basic fetch
    try {
      const response = await fetch(`${API_BASE_URL}/struktur`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Headers:`, Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Data received: ${data.struktur.length} items`);
      } else {
        console.log(`❌ Response not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ Fetch error: ${error.message}`);
      console.log(`   Type: ${error.name}`);
    }

    console.log('\n2. Testing with different headers...');
    
    // Test 2: With Accept header
    try {
      const response = await fetch(`${API_BASE_URL}/struktur`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Status with headers: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Data with headers: ${data.struktur.length} items`);
      }
    } catch (error) {
      console.log(`❌ Fetch with headers error: ${error.message}`);
    }

    console.log('\n3. Testing CORS preflight...');
    
    // Test 3: CORS preflight (OPTIONS request)
    try {
      const response = await fetch(`${API_BASE_URL}/struktur`, {
        method: 'OPTIONS',
        headers: {
          'Origin': 'https://web-sidomulyo.vercel.app',
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      console.log(`✅ OPTIONS status: ${response.status}`);
      console.log(`✅ CORS headers:`, {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
      });
    } catch (error) {
      console.log(`❌ OPTIONS request error: ${error.message}`);
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
        const response = await fetch(`${API_BASE_URL}/struktur`, {
          headers: {
            'Origin': origin,
            'Accept': 'application/json'
          }
        });
        console.log(`✅ Origin ${origin}: ${response.status}`);
      } catch (error) {
        console.log(`❌ Origin ${origin}: ${error.message}`);
      }
    }

    console.log('\n5. Testing network connectivity...');
    
    // Test 5: Network connectivity
    try {
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}/struktur`);
      const endTime = Date.now();
      console.log(`✅ Network response time: ${endTime - startTime}ms`);
      console.log(`✅ Network status: ${response.status}`);
    } catch (error) {
      console.log(`❌ Network error: ${error.message}`);
    }

    console.log('\n6. Testing browser compatibility...');
    
    // Test 6: Browser compatibility
    const userAgent = navigator.userAgent;
    console.log(`✅ User Agent: ${userAgent}`);
    console.log(`✅ Fetch available: ${typeof fetch !== 'undefined'}`);
    console.log(`✅ JSON available: ${typeof JSON !== 'undefined'}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCorsAndNetwork(); 