const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'http://localhost:5000/api';

async function testStrukturEndpoints() {
  console.log('🧪 Testing Struktur Organisasi Endpoints...\n');

  // Test 1: Get all struktur (public)
  console.log('1. Testing GET /api/struktur (public)');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur`);
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success: Found ${data.struktur.length} struktur organisasi`);
      console.log('   Sample data:', data.struktur.slice(0, 2));
    } else {
      console.log(`❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  // Test 2: Get struktur by tipe
  console.log('\n2. Testing GET /api/struktur/tipe/kepala_desa (public)');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur/tipe/kepala_desa`);
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success: Found ${data.struktur.length} kepala desa`);
      console.log('   Data:', data.struktur);
    } else {
      console.log(`❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  // Test 3: Login as admin
  console.log('\n3. Testing Login as Admin');
  let token = null;
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    if (response.ok) {
      const data = await response.json();
      token = data.token;
      console.log('✅ Login successful');
    } else {
      console.log(`❌ Login failed: ${response.status} ${response.statusText}`);
      return;
    }
  } catch (error) {
    console.log(`❌ Login error: ${error.message}`);
    return;
  }

  // Test 4: Create new struktur (admin only)
  console.log('\n4. Testing POST /api/struktur (admin only)');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur`, {
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

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success: Created new struktur');
      console.log('   Created:', data.struktur);
      
      // Test 5: Update struktur
      console.log('\n5. Testing PUT /api/struktur/:id (admin only)');
      const updateResponse = await fetch(`${API_BASE_URL}/struktur/${data.struktur.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nama: 'Test User Updated',
          jabatan: 'Test Jabatan Updated',
          tipe: 'kasi'
        })
      });

      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        console.log('✅ Success: Updated struktur');
        console.log('   Updated:', updateData.struktur);
        
        // Test 6: Delete struktur
        console.log('\n6. Testing DELETE /api/struktur/:id (admin only)');
        const deleteResponse = await fetch(`${API_BASE_URL}/struktur/${data.struktur.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (deleteResponse.ok) {
          console.log('✅ Success: Deleted struktur');
        } else {
          console.log(`❌ Delete failed: ${deleteResponse.status} ${deleteResponse.statusText}`);
        }
      } else {
        console.log(`❌ Update failed: ${updateResponse.status} ${updateResponse.statusText}`);
      }
    } else {
      const errorData = await response.json();
      console.log(`❌ Create failed: ${response.status} ${response.statusText}`);
      console.log('   Error:', errorData.error);
    }
  } catch (error) {
    console.log(`❌ Create error: ${error.message}`);
  }

  // Test 7: Get struktur overview (admin only)
  console.log('\n7. Testing GET /api/struktur/overview (admin only)');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur/overview`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success: Got struktur overview');
      console.log('   Overview:', data);
    } else {
      console.log(`❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }

  console.log('\n🎉 Struktur Organisasi endpoints testing completed!');
}

testStrukturEndpoints().catch(console.error); 