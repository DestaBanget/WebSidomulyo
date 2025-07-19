const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testVisiMisiEndpoint() {
  try {
    console.log('Testing GET /tentang/visi-misi...');
    
    // Test GET endpoint
    const getResponse = await fetch(`${API_BASE_URL}/tentang/visi-misi`);
    console.log('GET Response status:', getResponse.status);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('GET Response data:', JSON.stringify(getData, null, 2));
    } else {
      const errorData = await getResponse.json();
      console.log('GET Error:', errorData);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test PUT endpoint (without auth for now)
    console.log('Testing PUT /tentang/visi-misi...');
    
    const putData = {
      judul: 'Visi & Misi',
      visi: 'Menjadi desa yang maju, mandiri, dan sejahtera',
      misi: [
        'Meningkatkan kualitas pendidikan masyarakat',
        'Mengembangkan ekonomi desa berbasis potensi lokal',
        'Membangun infrastruktur yang berkelanjutan',
        'Meningkatkan pelayanan publik yang transparan'
      ]
    };
    
    const putResponse = await fetch(`${API_BASE_URL}/tentang/visi-misi`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putData)
    });
    
    console.log('PUT Response status:', putResponse.status);
    
    if (putResponse.ok) {
      const putResponseData = await putResponse.json();
      console.log('PUT Response data:', JSON.stringify(putResponseData, null, 2));
    } else {
      const errorData = await putResponse.json();
      console.log('PUT Error:', errorData);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testVisiMisiEndpoint(); 