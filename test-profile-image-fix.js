const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000';

async function testProfileImageFix() {
  try {
    console.log('🧪 Testing Profile Image Update Fix...\n');

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

    // 2. Test update profile tanpa foto
    console.log('\n2. Testing profile update without image...');
    
    const updateData1 = {
      nama: 'Test User No Image',
      email: 'test@example.com',
      no_hp: '081234567890'
    };

    const updateResponse1 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData1)
    });

    const updateResult1 = await updateResponse1.json();

    if (updateResponse1.ok) {
      console.log('✅ Profile update without image successful');
      console.log('Updated user data:', updateResult1.user);
    } else {
      console.log('❌ Profile update without image failed:', updateResult1);
    }

    // 3. Test update profile dengan URL foto
    console.log('\n3. Testing profile update with image URL...');
    
    const updateData2 = {
      nama: 'Test User With Image URL',
      email: 'test@example.com',
      no_hp: '081234567890',
      profile_image: 'https://example.com/profile.jpg'
    };

    const updateResponse2 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData2)
    });

    const updateResult2 = await updateResponse2.json();

    if (updateResponse2.ok) {
      console.log('✅ Profile update with image URL successful');
      console.log('Updated user data:', updateResult2.user);
    } else {
      console.log('❌ Profile update with image URL failed:', updateResult2);
    }

    // 4. Test update profile dengan data URL (base64)
    console.log('\n4. Testing profile update with data URL...');
    
    // Sample base64 image (1x1 pixel transparent PNG)
    const sampleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const updateData3 = {
      nama: 'Test User With Base64 Image',
      email: 'test@example.com',
      no_hp: '081234567890',
      profile_image: sampleBase64
    };

    const updateResponse3 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData3)
    });

    const updateResult3 = await updateResponse3.json();

    if (updateResponse3.ok) {
      console.log('✅ Profile update with base64 image successful');
      console.log('Updated user data:', updateResult3.user);
    } else {
      console.log('❌ Profile update with base64 image failed:', updateResult3);
    }

    // 5. Test update profile dengan empty image
    console.log('\n5. Testing profile update with empty image...');
    
    const updateData4 = {
      nama: 'Test User Empty Image',
      email: 'test@example.com',
      no_hp: '081234567890',
      profile_image: ''
    };

    const updateResponse4 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData4)
    });

    const updateResult4 = await updateResponse4.json();

    if (updateResponse4.ok) {
      console.log('✅ Profile update with empty image successful');
      console.log('Updated user data:', updateResult4.user);
    } else {
      console.log('❌ Profile update with empty image failed:', updateResult4);
    }

    // 6. Test update profile dengan null image
    console.log('\n6. Testing profile update with null image...');
    
    const updateData5 = {
      nama: 'Test User Null Image',
      email: 'test@example.com',
      no_hp: '081234567890',
      profile_image: null
    };

    const updateResponse5 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData5)
    });

    const updateResult5 = await updateResponse5.json();

    if (updateResponse5.ok) {
      console.log('✅ Profile update with null image successful');
      console.log('Updated user data:', updateResult5.user);
    } else {
      console.log('❌ Profile update with null image failed:', updateResult5);
    }

    // 7. Verify final state
    console.log('\n7. Verifying final state...');
    const verifyResponse = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const verifyData = await verifyResponse.json();
    console.log('Final user data:', verifyData.user);

    console.log('\n🎉 Profile image update test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testProfileImageFix(); 