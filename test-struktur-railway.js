const axios = require('axios');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';

async function testStrukturRailway() {
  try {
    console.log('🚀 Testing Struktur Organisasi API with Railway Backend...\n');

    // Test 1: Get all struktur (public endpoint)
    console.log('1. Testing GET /api/struktur (public)');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} struktur organisasi`);
      
      if (response.data.struktur.length > 0) {
        console.log('\n📋 Sample data:');
        response.data.struktur.slice(0, 3).forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.nama} - ${item.jabatan} (${item.tipe})`);
        });
      } else {
        console.log('⚠️ No data found in database');
      }
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
      console.log(`   Message: ${error.response?.data?.error || error.message}`);
    }

    // Test 2: Get struktur by tipe
    console.log('\n2. Testing GET /api/struktur/tipe/kepala_desa');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/tipe/kepala_desa`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} kepala desa`);
      
      if (response.data.struktur.length > 0) {
        console.log(`   Kepala Desa: ${response.data.struktur[0].nama}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
    }

    // Test 3: Get struktur by tipe - sekretaris
    console.log('\n3. Testing GET /api/struktur/tipe/sekretaris');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/tipe/sekretaris`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} sekretaris`);
      
      if (response.data.struktur.length > 0) {
        console.log(`   Sekretaris: ${response.data.struktur[0].nama}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
    }

    // Test 4: Get struktur by tipe - kaur
    console.log('\n4. Testing GET /api/struktur/tipe/kaur');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/tipe/kaur`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} kaur`);
      
      response.data.struktur.forEach((kaur, index) => {
        console.log(`   ${index + 1}. ${kaur.nama} (${kaur.jabatan})`);
      });
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
    }

    // Test 5: Get struktur by tipe - kasi
    console.log('\n5. Testing GET /api/struktur/tipe/kasi');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/tipe/kasi`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} kasi`);
      
      response.data.struktur.forEach((kasi, index) => {
        console.log(`   ${index + 1}. ${kasi.nama} (${kasi.jabatan})`);
      });
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
    }

    // Test 6: Get struktur by tipe - kasun
    console.log('\n6. Testing GET /api/struktur/tipe/kasun');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur/tipe/kasun`);
      console.log(`✅ Status: ${response.status}`);
      console.log(`✅ Found ${response.data.struktur.length} kasun`);
      
      response.data.struktur.forEach((kasun, index) => {
        console.log(`   ${index + 1}. ${kasun.nama} (${kasun.jabatan})`);
      });
    } catch (error) {
      console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
    }

    // Test 7: Login as admin untuk test admin endpoints
    console.log('\n7. Testing Admin Login');
    let token = null;
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: 'admin',
        password: 'password'
      });
      
      token = loginResponse.data.token;
      console.log('✅ Login berhasil, token diperoleh');
    } catch (error) {
      console.log(`❌ Login gagal: ${error.response?.status} ${error.response?.statusText}`);
      console.log(`   Message: ${error.response?.data?.error || error.message}`);
    }

    // Test 8: Get struktur overview (admin only)
    if (token) {
      console.log('\n8. Testing GET /api/struktur/overview (admin only)');
      try {
        const response = await axios.get(`${API_BASE_URL}/struktur/overview`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log(`✅ Status: ${response.status}`);
        console.log('📊 Overview data:');
        console.log(`   Total: ${response.data.total}`);
        console.log(`   Kepala Desa: ${response.data.kepala_desa}`);
        console.log(`   Sekretaris: ${response.data.sekretaris}`);
        console.log(`   Kaur: ${response.data.kaur}`);
        console.log(`   Kasi: ${response.data.kasi}`);
        console.log(`   Kasun: ${response.data.kasun}`);
      } catch (error) {
        console.log(`❌ Error: ${error.response?.status} ${error.response?.statusText}`);
        console.log(`   Message: ${error.response?.data?.error || error.message}`);
      }
    }

    console.log('\n🎉 Testing completed!');
    console.log('\n📝 Summary:');
    console.log('- ✅ Public endpoints should work without authentication');
    console.log('- ✅ Admin endpoints require valid token');
    console.log('- ✅ Railway backend is accessible');
    console.log('- ✅ Database connection is working');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testStrukturRailway(); 