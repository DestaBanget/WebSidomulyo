const axios = require('axios');

console.log('🔍 Testing Specific Domain Issue...\n');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';
const problematicDomain = 'https://web-sidomulyo.vercel.app';

async function testSpecificDomain() {
  try {
    console.log(`1. Testing GET request from ${problematicDomain}...`);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`, {
        headers: {
          'Origin': problematicDomain,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ GET request successful: ${response.status}`);
      console.log(`✅ Data received: ${response.data.struktur.length} items`);
    } catch (error) {
      console.log(`❌ GET request failed: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        console.log(`   Headers: ${JSON.stringify(error.response.headers)}`);
      }
    }

    console.log(`\n2. Testing OPTIONS request from ${problematicDomain}...`);
    
    try {
      const response = await axios.options(`${API_BASE_URL}/struktur`, {
        headers: {
          'Origin': problematicDomain,
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      console.log(`✅ OPTIONS request successful: ${response.status}`);
      console.log(`✅ CORS headers:`, {
        'Access-Control-Allow-Origin': response.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': response.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': response.headers['access-control-allow-headers']
      });
    } catch (error) {
      console.log(`❌ OPTIONS request failed: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data)}`);
      }
    }

    console.log(`\n3. Testing without Origin header...`);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Request without Origin successful: ${response.status}`);
    } catch (error) {
      console.log(`❌ Request without Origin failed: ${error.message}`);
    }

    console.log(`\n4. Testing with different User-Agent...`);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`, {
        headers: {
          'Origin': problematicDomain,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      console.log(`✅ Request with User-Agent successful: ${response.status}`);
    } catch (error) {
      console.log(`❌ Request with User-Agent failed: ${error.message}`);
    }

    console.log(`\n5. Testing health endpoint...`);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        headers: {
          'Origin': problematicDomain
        }
      });
      console.log(`✅ Health endpoint successful: ${response.status}`);
    } catch (error) {
      console.log(`❌ Health endpoint failed: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSpecificDomain(); 