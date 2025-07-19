const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testFotoDisplay() {
  try {
    console.log('Testing Foto Display Struktur Organisasi...\n');

    // Get struktur organisasi
    console.log('1. Mengambil data struktur organisasi...');
    const response = await axios.get(`${API_BASE_URL}/struktur`);
    const struktur = response.data.struktur;
    console.log(`✅ Ditemukan ${struktur.length} data struktur`);

    if (struktur.length === 0) {
      console.log('❌ Tidak ada data struktur untuk ditest');
      return;
    }

    // Test setiap item yang memiliki foto
    console.log('\n2. Testing foto display...');
    let fotoCount = 0;
    
    struktur.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.nama} (${item.jabatan})`);
      
      if (item.foto) {
        fotoCount++;
        const fotoUrl = `http://localhost:5000${item.foto}`;
        console.log(`   ✅ Memiliki foto: ${item.foto}`);
        console.log(`   🔗 URL lengkap: ${fotoUrl}`);
        
        // Test apakah URL bisa diakses
        axios.get(fotoUrl)
          .then(() => {
            console.log(`   ✅ Foto bisa diakses`);
          })
          .catch((error) => {
            console.log(`   ❌ Foto tidak bisa diakses: ${error.message}`);
          });
      } else {
        console.log(`   ⚠️ Tidak memiliki foto`);
      }
    });

    console.log(`\n📊 Ringkasan:`);
    console.log(`   Total struktur: ${struktur.length}`);
    console.log(`   Yang memiliki foto: ${fotoCount}`);
    console.log(`   Yang tidak memiliki foto: ${struktur.length - fotoCount}`);

    // Test URL construction
    console.log('\n3. Testing URL construction...');
    const testPaths = [
      '/uploads/test.jpg',
      'test.jpg',
      'http://example.com/test.jpg',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD',
      null,
      ''
    ];

    testPaths.forEach((path, index) => {
      console.log(`\nTest ${index + 1}: "${path}"`);
      
      if (!path) {
        console.log('   Result: null (no path)');
        return;
      }
      
      let result;
      if (path.startsWith('http://') || path.startsWith('https://')) {
        result = path;
      } else if (path.startsWith('data:')) {
        result = path;
      } else if (path.startsWith('/')) {
        result = `http://localhost:5000${path}`;
      } else {
        result = `http://localhost:5000/uploads/${path}`;
      }
      
      console.log(`   Result: ${result}`);
    });

    console.log('\n✅ Test foto display selesai!');

  } catch (error) {
    console.error('❌ Error testing foto display:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testFotoDisplay(); 