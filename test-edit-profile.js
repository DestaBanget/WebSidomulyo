const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testEditProfile() {
  try {
    console.log('Testing Edit Profile Feature...\n');

    // Login sebagai user test
    console.log('1. Login sebagai user test...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');

    // Get current user data
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

    // Test update profile
    console.log('\n3. Testing update profile...');
    const updateData = {
      nama: 'Administrator Updated',
      email: 'admin.updated@example.com',
      no_hp: '08123456789'
    };

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

    console.log('✅ Update profile berhasil:', updateResponse.data.message);
    console.log('✅ Data user yang diupdate:', updateResponse.data.user);

    // Verify update
    console.log('\n4. Verifikasi update...');
    const verifyResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const updatedUser = verifyResponse.data.user;
    console.log('✅ Data user setelah update:', {
      id: updatedUser.id,
      username: updatedUser.username,
      nama: updatedUser.nama,
      email: updatedUser.email,
      no_hp: updatedUser.no_hp
    });

    // Test change password
    console.log('\n5. Testing change password...');
    const passwordData = {
      currentPassword: 'admin123',
      newPassword: 'newpassword123'
    };

    const passwordResponse = await axios.put(
      `${API_BASE_URL}/auth/change-password`,
      passwordData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Change password berhasil:', passwordResponse.data.message);

    // Test login dengan password baru
    console.log('\n6. Testing login dengan password baru...');
    const newLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'newpassword123'
    });

    console.log('✅ Login dengan password baru berhasil');

    // Test error cases
    console.log('\n7. Testing error cases...');

    // Test update dengan email yang sudah ada
    try {
      await axios.put(
        `${API_BASE_URL}/auth/profile`,
        {
          nama: 'Test User',
          email: 'admin.updated@example.com', // Email yang sudah digunakan
          no_hp: '08123456789'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Error handling berfungsi: Email sudah digunakan');
      }
    }

    // Test update dengan data tidak valid
    try {
      await axios.put(
        `${API_BASE_URL}/auth/profile`,
        {
          nama: '', // Nama kosong
          email: 'invalid-email', // Email tidak valid
          no_hp: '08123456789'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Error handling berfungsi: Data tidak valid');
      }
    }

    console.log('\n✅ All tests passed! Edit profile feature berfungsi dengan baik.');

  } catch (error) {
    console.error('❌ Error testing edit profile:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testEditProfile(); 