const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  username: 'testuser_delete',
  password: 'password123',
  nama: 'Test User Delete',
  email: 'testdelete@example.com',
  no_hp: '081234567890'
};

let authToken = null;
let userId = null;

async function testDeleteAccount() {
  console.log('🧪 Testing Delete Account Feature\n');

  try {
    // 1. Register test user
    console.log('1. Registering test user...');
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json();
      console.log('⚠️  User might already exist, trying to login...');
      
      // Try to login instead
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
        throw new Error('Failed to register or login test user');
      }

      const loginData = await loginResponse.json();
      authToken = loginData.token;
      userId = loginData.user.id;
      console.log('✅ Login successful');
    } else {
      const registerData = await registerResponse.json();
      authToken = registerData.token;
      userId = registerData.user.id;
      console.log('✅ Registration successful');
    }

    // 2. Test profile update with photo
    console.log('\n2. Testing profile update with photo...');
    const formData = new FormData();
    formData.append('nama', 'Updated Test User');
    formData.append('email', 'updatedtest@example.com');
    formData.append('no_hp', '081234567891');

    const updateResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
    });

    if (updateResponse.ok) {
      const updateData = await updateResponse.json();
      console.log('✅ Profile update successful');
      console.log('   Updated user:', updateData.user);
    } else {
      const errorData = await updateResponse.json();
      console.log('❌ Profile update failed:', errorData);
    }

    // 3. Test delete account
    console.log('\n3. Testing delete account...');
    const deleteResponse = await fetch(`${API_BASE_URL}/auth/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (deleteResponse.ok) {
      const deleteData = await deleteResponse.json();
      console.log('✅ Account deletion successful');
      console.log('   Deleted user:', deleteData.deletedUser);
    } else {
      const errorData = await deleteResponse.json();
      console.log('❌ Account deletion failed:', errorData);
    }

    // 4. Verify user is deleted by trying to access profile
    console.log('\n4. Verifying user is deleted...');
    const verifyResponse = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!verifyResponse.ok) {
      console.log('✅ User successfully deleted (token invalidated)');
    } else {
      console.log('❌ User still exists after deletion');
    }

    console.log('\n🎉 Delete Account Test Completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testDeleteAccount(); 