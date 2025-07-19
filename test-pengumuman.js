const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testPengumumanAPI() {
  console.log('🧪 Testing Pengumuman API...\n');

  try {
    // Test 1: Get all pengumuman
    console.log('1. Testing GET /pengumuman');
    const response1 = await fetch(`${API_BASE_URL}/pengumuman`);
    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Data:', data1);
    console.log('✅ GET /pengumuman berhasil\n');

    // Test 2: Get pengumuman by ID
    if (data1.pengumuman && data1.pengumuman.length > 0) {
      console.log('2. Testing GET /pengumuman/:id');
      const response2 = await fetch(`${API_BASE_URL}/pengumuman/${data1.pengumuman[0].id}`);
      const data2 = await response2.json();
      console.log('Status:', response2.status);
      console.log('Data:', data2);
      console.log('✅ GET /pengumuman/:id berhasil\n');
    }

    // Test 3: Login admin untuk test POST
    console.log('3. Testing Login Admin');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password'
      })
    });
    const loginData = await loginResponse.json();
    console.log('Login Status:', loginResponse.status);
    console.log('Login Data:', loginData);

    if (loginData.token) {
      console.log('✅ Login admin berhasil\n');

      // Test 4: Create pengumuman (dengan token)
      console.log('4. Testing POST /pengumuman (Create)');
      const formData = new FormData();
      formData.append('title', 'Test Pengumuman API');
      formData.append('content', 'Ini adalah test pengumuman dari API');
      formData.append('kategori', 'Umum');
      formData.append('tanggal', '2025-01-15');
      formData.append('deskripsi', 'Test deskripsi pengumuman');

      const createResponse = await fetch(`${API_BASE_URL}/pengumuman`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        },
        body: formData
      });
      const createData = await createResponse.json();
      console.log('Create Status:', createResponse.status);
      console.log('Create Data:', createData);
      console.log('✅ POST /pengumuman berhasil\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPengumumanAPI(); 