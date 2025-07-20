const API_BASE_URL = 'http://localhost:5000';

// Test data
const testUser = {
  username: 'testuser',
  password: 'password123',
  nama: 'Test User',
  email: 'test@example.com',
  no_hp: '081234567890'
};

async function testProfileUpdate() {
  console.log('🧪 Testing Profile Update Fix...\n');

  try {
    // 1. Login user
    console.log('1. Logging in user...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: testUser.username,
        password: testUser.password
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('✅ Login successful');

    // 2. Test update profile with valid phone number
    console.log('\n2. Testing update profile with valid phone number...');
    const updateData1 = {
      nama: 'Test User Updated',
      email: 'test.updated@example.com',
      no_hp: '081234567890',
      profile_image: 'https://example.com/profile.jpg'
    };

    const updateResponse1 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData1)
    });

    if (updateResponse1.ok) {
      const updateResult1 = await updateResponse1.json();
      console.log('✅ Profile update successful with valid phone number');
      console.log('   Updated user:', updateResult1.user);
    } else {
      const error1 = await updateResponse1.json();
      console.log('❌ Profile update failed:', error1);
    }

    // 3. Test update profile with different phone formats
    console.log('\n3. Testing different phone number formats...');
    const phoneFormats = [
      '081234567890',
      '6281234567890',
      '+6281234567890',
      '81234567890'
    ];

    for (const phone of phoneFormats) {
      const updateData = {
        nama: 'Test User',
        email: 'test@example.com',
        no_hp: phone,
        profile_image: null
      };

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        console.log(`✅ Phone format "${phone}" accepted`);
      } else {
        const error = await response.json();
        console.log(`❌ Phone format "${phone}" rejected:`, error.error);
      }
    }

    // 4. Test update profile with invalid phone number
    console.log('\n4. Testing invalid phone number...');
    const updateData2 = {
      nama: 'Test User',
      email: 'test@example.com',
      no_hp: '12345', // Invalid format
      profile_image: null
    };

    const updateResponse2 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData2)
    });

    if (!updateResponse2.ok) {
      const error2 = await updateResponse2.json();
      console.log('✅ Invalid phone number correctly rejected:', error2.error);
    } else {
      console.log('❌ Invalid phone number was accepted (should be rejected)');
    }

    // 5. Test update profile with empty phone number
    console.log('\n5. Testing empty phone number...');
    const updateData3 = {
      nama: 'Test User',
      email: 'test@example.com',
      no_hp: '', // Empty
      profile_image: null
    };

    const updateResponse3 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData3)
    });

    if (updateResponse3.ok) {
      console.log('✅ Empty phone number accepted (should be null in database)');
    } else {
      const error3 = await updateResponse3.json();
      console.log('❌ Empty phone number rejected:', error3.error);
    }

    // 6. Test update profile with profile image
    console.log('\n6. Testing profile image update...');
    const updateData4 = {
      nama: 'Test User',
      email: 'test@example.com',
      no_hp: '081234567890',
      profile_image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    };

    const updateResponse4 = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData4)
    });

    if (updateResponse4.ok) {
      console.log('✅ Profile image update successful');
    } else {
      const error4 = await updateResponse4.json();
      console.log('❌ Profile image update failed:', error4.error);
    }

    console.log('\n🎉 Profile update tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testProfileUpdate(); 