const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:5000/api';

async function testUploadFotoStruktur() {
  try {
    console.log('Testing Upload Foto Struktur Organisasi...\n');

    // Login sebagai admin
    console.log('1. Login sebagai admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');

    // Get struktur organisasi
    console.log('\n2. Mengambil data struktur organisasi...');
    const strukturResponse = await axios.get(`${API_BASE_URL}/struktur`);
    const struktur = strukturResponse.data.struktur;
    console.log(`✅ Ditemukan ${struktur.length} data struktur`);

    if (struktur.length === 0) {
      console.log('❌ Tidak ada data struktur untuk diupdate');
      return;
    }

    // Test upload foto untuk item pertama
    const firstItem = struktur[0];
    console.log(`\n3. Testing upload foto untuk: ${firstItem.nama} (${firstItem.jabatan})`);

    // Buat file dummy untuk testing
    const testImagePath = path.join(__dirname, 'test-image.png');
    if (!fs.existsSync(testImagePath)) {
      console.log('⚠️ File test-image.png tidak ditemukan, membuat file dummy...');
      // Buat file PNG dummy sederhana
      const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
      fs.writeFileSync(testImagePath, pngHeader);
    }

    // Buat FormData
    const formData = new FormData();
    formData.append('nama', firstItem.nama);
    formData.append('jabatan', firstItem.jabatan);
    formData.append('tipe', firstItem.tipe);
    formData.append('foto', fs.createReadStream(testImagePath));

    // Update dengan foto
    const updateResponse = await axios.put(
      `${API_BASE_URL}/struktur/${firstItem.id}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          ...formData.getHeaders()
        }
      }
    );

    console.log('✅ Upload foto berhasil!');
    console.log('Response:', updateResponse.data);

    // Verifikasi update
    console.log('\n4. Verifikasi update...');
    const verifyResponse = await axios.get(`${API_BASE_URL}/struktur/${firstItem.id}`);
    const updatedItem = verifyResponse.data.struktur;
    
    if (updatedItem.foto) {
      console.log('✅ Foto berhasil disimpan:', updatedItem.foto);
    } else {
      console.log('⚠️ Foto tidak ditemukan dalam response');
    }

    console.log('\n✅ Test upload foto struktur organisasi berhasil!');

  } catch (error) {
    console.error('❌ Error testing upload foto:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testUploadFotoStruktur(); 