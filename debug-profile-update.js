const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function debugProfileUpdate() {
  try {
    console.log('🔍 Debugging Profile Update...\n');

    // 1. Login sebagai user test
    console.log('1. Login sebagai user test...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'password'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');

    // 2. Get current user data
    console.log('\n2. Mengambil data user saat ini...');
    const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const currentUser = meResponse.data.user;
    console.log('✅ Data user saat ini:', {
      id: currentUser.id,
      username: currentUser.username,
      nama: currentUser.nama,
      email: currentUser.email,
      no_hp: currentUser.no_hp
    });

    // 3. Test update profile dengan data yang sama seperti di screenshot
    console.log('\n3. Testing update profile...');
    const updateData = {
      nama: 'S', // Sesuai dengan yang ditampilkan di UI
      email: 'admin.updated@sidomulyo.com', // Email yang berbeda
      no_hp: '' // Kosong seperti di UI
    };

    console.log('📤 Data yang akan dikirim:', updateData);

    try {
      const updateResponse = await axios.put(
        `${API_BASE_URL}/auth/profile`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Update profile berhasil:', updateResponse.data);
    } catch (error) {
      console.log('❌ Update profile gagal:');
      console.log('Status:', error.response?.status);
      console.log('Error:', error.response?.data);
      console.log('Headers:', error.response?.headers);
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
debugProfileUpdate(); 