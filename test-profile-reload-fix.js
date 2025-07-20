const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000';

async function testProfileReloadFix() {
  try {
    console.log('🧪 Testing Profile Reload Fix...\n');

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
    console.log('Initial user data:', loginData.user);

    // 2. Update profile dengan nomor HP baru
    console.log('\n2. Updating profile with new phone number...');
    
    const newPhoneNumber = '6281234567890';
    const updateData = {
      nama: 'Test User Updated',
      email: 'test@example.com',
      no_hp: newPhoneNumber
    };

    const updateResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    const updateResult = await updateResponse.json();

    if (updateResponse.ok) {
      console.log('✅ Profile update successful');
      console.log('Updated user data:', updateResult.user);
      
      // 3. Simulate reload - fetch user data again using /auth/me
      console.log('\n3. Simulating page reload...');
      const reloadResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const reloadData = await reloadResponse.json();
      console.log('User data after reload:', reloadData.user);

      // 4. Check if no_hp is preserved
      if (reloadData.user.no_hp === newPhoneNumber) {
        console.log('✅ SUCCESS: Phone number preserved after reload!');
        console.log('Phone number in database:', reloadData.user.no_hp);
      } else {
        console.log('❌ FAILED: Phone number lost after reload!');
        console.log('Expected:', newPhoneNumber);
        console.log('Actual:', reloadData.user.no_hp);
      }

      // 5. Test multiple reloads
      console.log('\n4. Testing multiple reloads...');
      for (let i = 1; i <= 3; i++) {
        const reloadResponse2 = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const reloadData2 = await reloadResponse2.json();
        console.log(`Reload ${i}: no_hp = ${reloadData2.user.no_hp}`);
        
        if (reloadData2.user.no_hp !== newPhoneNumber) {
          console.log(`❌ FAILED: Phone number lost on reload ${i}!`);
        }
      }

    } else {
      console.log('❌ Profile update failed:', updateResult.error);
    }

    // 6. Test with empty phone number
    console.log('\n5. Testing with empty phone number...');
    
    const emptyPhoneData = {
      nama: 'Test User Empty Phone',
      email: 'test@example.com',
      no_hp: ''
    };

    const emptyPhoneResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emptyPhoneData)
    });

    const emptyPhoneResult = await emptyPhoneResponse.json();

    if (emptyPhoneResponse.ok) {
      console.log('✅ Empty phone update successful');
      
      // Check reload with empty phone
      const emptyReloadResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const emptyReloadData = await emptyReloadResponse.json();
      console.log('User data after empty phone reload:', emptyReloadData.user);
      
      if (emptyReloadData.user.no_hp === null || emptyReloadData.user.no_hp === '') {
        console.log('✅ SUCCESS: Empty phone number handled correctly!');
      } else {
        console.log('❌ FAILED: Empty phone number not handled correctly!');
        console.log('Actual:', emptyReloadData.user.no_hp);
      }
    } else {
      console.log('❌ Empty phone update failed:', emptyPhoneResult.error);
    }

    console.log('\n🎉 Profile reload test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testProfileReloadFix(); 