const fs = require('fs');
const path = require('path');

// Test upload script untuk diagnose masalah
async function testUpload() {
  console.log('🧪 Testing upload functionality...\n');
  
  // Test 1: Health check
  console.log('1️⃣ Testing health check...');
  try {
    const healthResponse = await fetch('https://backend.desasidomulyo.org/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  // Test 2: Test upload endpoint
  console.log('\n2️⃣ Testing upload endpoint...');
  try {
    const testResponse = await fetch('https://backend.desasidomulyo.org/api/test-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: 'data' })
    });
    const testData = await testResponse.json();
    console.log('✅ Upload endpoint accessible:', testData);
  } catch (error) {
    console.log('❌ Upload endpoint failed:', error.message);
  }
  
  // Test 3: Create small test file
  console.log('\n3️⃣ Creating test file...');
  const testFilePath = path.join(__dirname, 'test-file.txt');
  const testContent = 'This is a test file for upload testing. '.repeat(1000); // ~30KB
  fs.writeFileSync(testFilePath, testContent);
  console.log('✅ Test file created:', testFilePath, `(${(testContent.length / 1024).toFixed(2)}KB)`);
  
  // Test 4: Upload small file
  console.log('\n4️⃣ Testing small file upload...');
  try {
    const formData = new FormData();
    formData.append('files', fs.createReadStream(testFilePath));
    formData.append('nama', 'Test User');
    formData.append('nik', '1234567890123456');
    formData.append('jenis_kelamin', 'Laki-laki');
    formData.append('tempat_lahir', 'Test City');
    formData.append('tanggal_lahir', '1990-01-01');
    formData.append('pekerjaan', 'Tester');
    formData.append('kewarganegaraan', 'Indonesia');
    formData.append('agama', 'Islam');
    formData.append('no_hp', '081234567890');
    formData.append('alamat_ktp', 'Test Address');
    formData.append('alamat_sekarang', 'Test Address');
    formData.append('jenis_surat', 'Surat Keterangan');
    
    const uploadResponse = await fetch('https://backend.desasidomulyo.org/api/surat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Ganti dengan token yang valid
      },
      body: formData
    });
    
    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      console.log('✅ Small file upload successful:', uploadData);
    } else {
      const errorData = await uploadResponse.json();
      console.log('❌ Small file upload failed:', errorData);
    }
  } catch (error) {
    console.log('❌ Small file upload error:', error.message);
  }
  
  // Cleanup
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
    console.log('\n🧹 Test file cleaned up');
  }
  
  console.log('\n🏁 Upload test completed!');
}

// Run test
testUpload().catch(console.error); 