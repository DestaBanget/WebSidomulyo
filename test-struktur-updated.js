const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testStrukturOrganisasi() {
  try {
    console.log('Testing Struktur Organisasi API...\n');

    // Test get all struktur
    console.log('1. Testing GET /struktur');
    const response = await axios.get(`${API_BASE_URL}/struktur`);
    console.log('Status:', response.status);
    console.log('Data count:', response.data.struktur.length);
    
    console.log('\nStruktur Organisasi:');
    response.data.struktur.forEach((item, index) => {
      console.log(`${index + 1}. ${item.nama} - ${item.jabatan} (${item.tipe})`);
    });

    // Test get by tipe
    console.log('\n2. Testing GET /struktur/tipe/kepala_desa');
    const kepalaDesaResponse = await axios.get(`${API_BASE_URL}/struktur/tipe/kepala_desa`);
    console.log('Kepala Desa:', kepalaDesaResponse.data.struktur[0]?.nama);

    console.log('\n3. Testing GET /struktur/tipe/sekretaris');
    const sekretarisResponse = await axios.get(`${API_BASE_URL}/struktur/tipe/sekretaris`);
    console.log('Sekretaris:', sekretarisResponse.data.struktur[0]?.nama);

    console.log('\n4. Testing GET /struktur/tipe/kasi');
    const kasiResponse = await axios.get(`${API_BASE_URL}/struktur/tipe/kasi`);
    console.log('Kasi count:', kasiResponse.data.struktur.length);
    kasiResponse.data.struktur.forEach(kasi => {
      console.log(`   - ${kasi.nama} (${kasi.jabatan})`);
    });

    console.log('\n5. Testing GET /struktur/tipe/kaur');
    const kaurResponse = await axios.get(`${API_BASE_URL}/struktur/tipe/kaur`);
    console.log('Kaur count:', kaurResponse.data.struktur.length);
    kaurResponse.data.struktur.forEach(kaur => {
      console.log(`   - ${kaur.nama} (${kaur.jabatan})`);
    });

    console.log('\n6. Testing GET /struktur/tipe/kasun');
    const kasunResponse = await axios.get(`${API_BASE_URL}/struktur/tipe/kasun`);
    console.log('Kasun count:', kasunResponse.data.struktur.length);
    kasunResponse.data.struktur.forEach(kasun => {
      console.log(`   - ${kasun.nama} (${kasun.jabatan})`);
    });

    console.log('\n✅ All tests passed! Struktur organisasi berhasil diupdate.');

  } catch (error) {
    console.error('❌ Error testing struktur organisasi:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testStrukturOrganisasi(); 