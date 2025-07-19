async function testStrukturAPI() {
  // Dynamic import untuk node-fetch
  const fetch = (await import('node-fetch')).default;
  
  const API_BASE = 'http://localhost:5000/api';

  console.log('🧪 Testing Struktur Organisasi API...\n');

  try {
    // Test 1: GET /api/struktur
    console.log('1. Testing GET /api/struktur');
    const response1 = await fetch(`${API_BASE}/struktur`);
    console.log(`   Status: ${response1.status}`);
    
    if (response1.ok) {
      const data1 = await response1.json();
      console.log(`   Response: ${JSON.stringify(data1, null, 2)}`);
      console.log(`   Jumlah data: ${data1.struktur ? data1.struktur.length : 0}`);
    } else {
      console.log(`   Error: ${response1.statusText}`);
    }
    console.log('');

    // Test 2: Login admin untuk mendapatkan token
    console.log('2. Testing Admin Login');
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
    }
    console.log('');

    if (token) {
      // Test 3: POST /api/struktur (Create)
      console.log('3. Testing POST /api/struktur (Create)');
      const createResponse = await fetch(`${API_BASE}/struktur`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nama: 'Test User',
          jabatan: 'Test Jabatan',
          tipe: 'kasi'
        })
      });

      console.log(`   Status: ${createResponse.status}`);
      if (createResponse.ok) {
        const createData = await createResponse.json();
        console.log(`   Response: ${JSON.stringify(createData, null, 2)}`);
      } else {
        const errorData = await createResponse.text();
        console.log(`   Error: ${errorData}`);
      }
      console.log('');

      // Test 4: PUT /api/struktur/:id (Update)
      console.log('4. Testing PUT /api/struktur/:id (Update)');
      const updateResponse = await fetch(`${API_BASE}/struktur/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nama: 'Aghis Pratama Updated',
          jabatan: 'Kepala Desa Updated',
          tipe: 'kepala_desa'
        })
      });

      console.log(`   Status: ${updateResponse.status}`);
      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        console.log(`   Response: ${JSON.stringify(updateData, null, 2)}`);
      } else {
        const errorData = await updateResponse.text();
        console.log(`   Error: ${errorData}`);
      }
      console.log('');

      // Test 5: DELETE /api/struktur/:id (Delete)
      console.log('5. Testing DELETE /api/struktur/:id (Delete)');
      const deleteResponse = await fetch(`${API_BASE}/struktur/12`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log(`   Status: ${deleteResponse.status}`);
      if (deleteResponse.ok) {
        const deleteData = await deleteResponse.json();
        console.log(`   Response: ${JSON.stringify(deleteData, null, 2)}`);
      } else {
        const errorData = await deleteResponse.text();
        console.log(`   Error: ${errorData}`);
      }
      console.log('');
    }

    // Test 6: GET /api/struktur setelah perubahan
    console.log('6. Testing GET /api/struktur (After changes)');
    const response2 = await fetch(`${API_BASE}/struktur`);
    console.log(`   Status: ${response2.status}`);
    
    if (response2.ok) {
      const data2 = await response2.json();
      console.log(`   Jumlah data: ${data2.struktur ? data2.struktur.length : 0}`);
      console.log(`   Sample data: ${JSON.stringify(data2.struktur ? data2.struktur[0] : null, null, 2)}`);
    } else {
      console.log(`   Error: ${response2.statusText}`);
    }

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Jalankan test
testStrukturAPI(); 