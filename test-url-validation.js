const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testURLValidation() {
  try {
    console.log('🔍 Testing URL Validation for Profile Image...\n');

    // 1. Login sebagai user test
    console.log('1. Login sebagai user test...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'password'
    });

    const token = loginResponse.data.token;
    console.log('✅ Login berhasil');

    // 2. Test berbagai jenis URL foto profil
    const testCases = [
      {
        name: 'Valid HTTP URL',
        profile_image: 'https://example.com/profile.jpg',
        shouldPass: true
      },
      {
        name: 'Valid HTTPS URL',
        profile_image: 'https://images.unsplash.com/photo-1234567890',
        shouldPass: true
      },
      {
        name: 'Data URL (Base64)',
        profile_image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        shouldPass: true
      },
      {
        name: 'Blob URL',
        profile_image: 'blob:http://localhost:3000/12345678-1234-1234-1234-123456789012',
        shouldPass: true
      },
      {
        name: 'Empty string',
        profile_image: '',
        shouldPass: true
      },
      {
        name: 'Null value',
        profile_image: null,
        shouldPass: true
      },
      {
        name: 'Invalid URL',
        profile_image: 'not-a-valid-url',
        shouldPass: false
      }
    ];

    for (const testCase of testCases) {
      console.log(`\n2. Testing: ${testCase.name}`);
      console.log(`URL: ${testCase.profile_image}`);
      
      try {
        const updateData = {
          nama: 'Test User',
          email: `test.${Date.now()}@example.com`,
          no_hp: '08123456789',
          profile_image: testCase.profile_image
        };

        const response = await axios.put(
          `${API_BASE_URL}/auth/profile`,
          updateData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (testCase.shouldPass) {
          console.log('✅ PASS: URL diterima');
        } else {
          console.log('❌ FAIL: URL seharusnya ditolak tapi diterima');
        }
      } catch (error) {
        if (testCase.shouldPass) {
          console.log('❌ FAIL: URL seharusnya diterima tapi ditolak');
          console.log('Error:', error.response?.data?.error || error.message);
        } else {
          console.log('✅ PASS: URL ditolak sesuai ekspektasi');
        }
      }
    }

    console.log('\n✅ URL validation test completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testURLValidation(); 