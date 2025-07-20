const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function debugServerError() {
  try {
    console.log('🔍 Debugging Server Error on Profile Update...\n');

    // 1. Login sebagai user test
    console.log('1. Login sebagai user test...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'password'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');

    // 2. Test dengan data yang sama seperti di screenshot
    console.log('\n2. Testing dengan data dari screenshot...');
    const updateData = {
      nama: 'sed',
      email: 'ridzkyabidzar12@gmail.com',
      no_hp: '081335484930',
      profile_image: null // Kosong seperti di screenshot
    };

    console.log('📤 Data yang akan dikirim:', updateData);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Update berhasil:', response.data);
    } catch (error) {
      console.log('❌ Update gagal:');
      console.log('Status:', error.response?.status);
      console.log('Error:', error.response?.data);
      
      if (error.response?.status === 400) {
        console.log('🔍 Analisis Error 400:');
        if (error.response.data.errors) {
          error.response.data.errors.forEach(err => {
            console.log(`- ${err.param}: ${err.msg}`);
          });
        } else if (error.response.data.error) {
          console.log(`- ${error.response.data.error}`);
        }
      } else if (error.response?.status === 500) {
        console.log('🔍 Analisis Error 500:');
        console.log('Server error details:', error.response.data);
      }
    }

    // 3. Test dengan data minimal
    console.log('\n3. Testing dengan data minimal...');
    const minimalData = {
      nama: 'Test User',
      email: 'test@example.com',
      no_hp: null,
      profile_image: null
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        minimalData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Update minimal berhasil:', response.data);
    } catch (error) {
      console.log('❌ Update minimal gagal:');
      console.log('Status:', error.response?.status);
      console.log('Error:', error.response?.data);
    }

    // 4. Test koneksi database
    console.log('\n4. Testing koneksi database...');
    try {
      const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Koneksi database OK');
      console.log('User data:', meResponse.data.user);
    } catch (error) {
      console.log('❌ Koneksi database gagal:', error.response?.data);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the debug
debugServerError(); 