const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000';

async function debugProfileUpdate() {
  try {
    console.log('🔍 Debugging Profile Update...\n');

    // 1. Login untuk mendapatkan token
    console.log('1. Logging in...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Login failed. Creating test user first...');
      
      // Create test user
      const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'testuser',
          password: 'password123',
          nama: 'Test User',
          email: 'test@example.com',
          no_hp: '081234567890'
        })
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        console.log('❌ Register failed:', error);
        return;
      }

      console.log('✅ Test user created successfully');
    }

    // Login again
    const loginResponse2 = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'password123'
      })
    });

    const loginData = await loginResponse2.json();
    const token = loginData.token;

    console.log('✅ Login successful');
    console.log('Current user data:', loginData.user);

    // 2. Test update profile dengan debug detail
    console.log('\n2. Testing profile update with debug...');
    
    const testData = {
      nama: 'Test User Updated',
      email: 'test@example.com',
      no_hp: '081234567890'
    };

    console.log('📤 Sending data to backend:');
    console.log(JSON.stringify(testData, null, 2));

    const updateResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData)
    });

    console.log('\n📥 Response status:', updateResponse.status);
    console.log('📥 Response headers:', updateResponse.headers);

    const updateData = await updateResponse.json();
    console.log('📥 Response body:', JSON.stringify(updateData, null, 2));

    if (updateResponse.ok) {
      console.log('\n✅ Update successful');
      console.log('Updated user data:', updateData.user);
      
      // 3. Verify data in database by fetching user again
      console.log('\n3. Verifying data in database...');
      const verifyResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const verifyData = await verifyResponse.json();
      console.log('Database user data:', verifyData.user);
      
      // Check if no_hp was saved
      if (verifyData.user.no_hp === testData.no_hp) {
        console.log('✅ no_hp successfully saved to database');
      } else {
        console.log('❌ no_hp not saved correctly');
        console.log('Expected:', testData.no_hp);
        console.log('Actual:', verifyData.user.no_hp);
      }
    } else {
      console.log('\n❌ Update failed:', updateData.error);
    }

    // 4. Test with different field names
    console.log('\n4. Testing with different field names...');
    
    const testData2 = {
      nama: 'Test User Updated 2',
      email: 'test@example.com',
      noHp: '6281234567890' // Using noHp instead of no_hp
    };

    console.log('📤 Sending data with noHp field:');
    console.log(JSON.stringify(testData2, null, 2));

    const updateResponse2 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData2)
    });

    const updateData2 = await updateResponse2.json();
    console.log('📥 Response:', JSON.stringify(updateData2, null, 2));

    if (updateResponse2.ok) {
      console.log('✅ Update with noHp field successful');
      console.log('Updated user data:', updateData2.user);
    } else {
      console.log('❌ Update with noHp field failed:', updateData2.error);
    }

    console.log('\n🎉 Debug completed!');

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

// Run the debug
debugProfileUpdate(); 