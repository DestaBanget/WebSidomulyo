async function testUploadFoto() {
  // Dynamic import untuk node-fetch
  const fetch = (await import('node-fetch')).default;
  const fs = require('fs');
  const path = require('path');
  
  const API_BASE = 'http://localhost:5000/api';

  console.log('🧪 Testing Upload Foto Struktur Organisasi...\n');

  try {
    // Test 1: Login admin untuk mendapatkan token
    console.log('1. Testing Admin Login');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    let token = null;
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      token = loginData.token;
      console.log('   Login berhasil, token diperoleh');
    } else {
      console.log('   Login gagal, menggunakan token kosong');
      const errorData = await loginResponse.text();
      console.log(`   Error: ${errorData}`);
    }
    console.log('');

    if (!token) {
      console.log('❌ Tidak dapat melanjutkan tanpa token admin');
      return;
    }

    // Test 2: Update struktur dengan foto
    console.log('2. Testing Update Struktur dengan Foto');
    
    // Buat file gambar dummy untuk testing
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    const dummyImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
    fs.writeFileSync(testImagePath, dummyImageData);
    
    const formData = new FormData();
    formData.append('nama', 'Test User dengan Foto');
    formData.append('jabatan', 'Test Jabatan dengan Foto');
    formData.append('tipe', 'kasi');
    formData.append('foto', fs.createReadStream(testImagePath));

    const updateResponse = await fetch(`${API_BASE}/struktur/5`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    console.log(`   Status: ${updateResponse.status}`);
    if (updateResponse.ok) {
      const updateData = await updateResponse.json();
      console.log(`   Response: ${JSON.stringify(updateData, null, 2)}`);
      console.log(`   Foto path: ${updateData.struktur.foto}`);
    } else {
      const errorData = await updateResponse.text();
      console.log(`   Error: ${errorData}`);
    }
    console.log('');

    // Test 3: Verifikasi foto tersimpan
    console.log('3. Testing Verifikasi Foto Tersimpan');
    const verifyResponse = await fetch(`${API_BASE}/struktur/5`);
    console.log(`   Status: ${verifyResponse.status}`);
    
    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json();
      console.log(`   Foto path: ${verifyData.struktur.foto}`);
      
      // Test akses foto
      if (verifyData.struktur.foto) {
        const fotoResponse = await fetch(`http://localhost:5000${verifyData.struktur.foto}`);
        console.log(`   Foto accessible: ${fotoResponse.ok}`);
        console.log(`   Foto size: ${fotoResponse.headers.get('content-length')} bytes`);
      }
    } else {
      const errorData = await verifyResponse.text();
      console.log(`   Error: ${errorData}`);
    }

    // Bersihkan file test
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }

  } catch (error) {
    console.error('❌ Error testing upload foto:', error.message);
  }
}

// Jalankan test
testUploadFoto(); 