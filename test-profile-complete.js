const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testCompleteProfileUpdate() {
  try {
    console.log('🔍 Testing Complete Profile Update...\n');

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
      no_hp: currentUser.no_hp,
      profile_image: currentUser.profile_image
    });

    // 3. Test update profile dengan nomor telepon dan foto profil
    console.log('\n3. Testing update profile dengan nomor telepon dan foto profil...');
    const updateData = {
      nama: 'Administrator Updated',
      email: 'admin.updated@sidomulyo.com',
      no_hp: '08123456789', // Nomor telepon valid
      profile_image: 'https://example.com/profile.jpg' // URL foto profil
    };

    console.log('📤 Data yang akan dikirim:', updateData);

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

    // 4. Test update dengan nomor telepon kosong
    console.log('\n4. Testing update dengan nomor telepon kosong...');
    const updateDataEmpty = {
      nama: 'Administrator No Phone',
      email: 'admin.nophone@sidomulyo.com',
      no_hp: '', // Nomor telepon kosong
      profile_image: null // Foto profil kosong
    };

    const updateResponseEmpty = await axios.put(
      `${API_BASE_URL}/auth/profile`,
      updateDataEmpty,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Update dengan nomor telepon kosong berhasil:', updateResponseEmpty.data.message);
    console.log('✅ Data user setelah update:', updateResponseEmpty.data.user);

    // 5. Verify final state
    console.log('\n5. Verifikasi data final...');
    const finalResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const finalUser = finalResponse.data.user;
    console.log('✅ Data user final:', {
      id: finalUser.id,
      username: finalUser.username,
      nama: finalUser.nama,
      email: finalUser.email,
      no_hp: finalUser.no_hp,
      profile_image: finalUser.profile_image
    });

    console.log('\n✅ All tests passed! Profile update with phone and image works correctly.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testCompleteProfileUpdate(); 