const fs = require('fs');
const path = require('path');

// Test script untuk compare mobile vs desktop upload
async function testMobileVsDesktop() {
  console.log('🧪 Testing Mobile vs Desktop Upload Differences...\n');
  
  // Create test file
  const testFilePath = path.join(__dirname, 'test-image.jpg');
  const testContent = Buffer.alloc(100 * 1024); // 100KB file
  fs.writeFileSync(testFilePath, testContent);
  console.log('✅ Test file created:', testFilePath, '(100KB)');
  
  // Test 1: Desktop User Agent
  console.log('\n1️⃣ Testing with Desktop User Agent...');
  try {
    const desktopFormData = new FormData();
    desktopFormData.append('files', fs.createReadStream(testFilePath));
    desktopFormData.append('nama', 'Test User');
    desktopFormData.append('nik', '1234567890123456');
    desktopFormData.append('jenis_kelamin', 'Laki-laki');
    desktopFormData.append('tempat_lahir', 'Test City');
    desktopFormData.append('tanggal_lahir', '1990-01-01');
    desktopFormData.append('pekerjaan', 'Tester');
    desktopFormData.append('kewarganegaraan', 'Indonesia');
    desktopFormData.append('agama', 'Islam');
    desktopFormData.append('no_hp', '081234567890');
    desktopFormData.append('alamat_ktp', 'Test Address');
    desktopFormData.append('alamat_sekarang', 'Test Address');
    desktopFormData.append('jenis_surat', 'Surat Keterangan');
    
    const desktopResponse = await fetch('https://backend.desasidomulyo.org/api/surat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: desktopFormData
    });
    
    console.log('Desktop Response Status:', desktopResponse.status);
    if (desktopResponse.ok) {
      const data = await desktopResponse.json();
      console.log('✅ Desktop upload successful');
    } else {
      const error = await desktopResponse.json();
      console.log('❌ Desktop upload failed:', error);
    }
  } catch (error) {
    console.log('❌ Desktop test error:', error.message);
  }
  
  // Test 2: Mobile User Agent
  console.log('\n2️⃣ Testing with Mobile User Agent...');
  try {
    const mobileFormData = new FormData();
    mobileFormData.append('files', fs.createReadStream(testFilePath));
    mobileFormData.append('nama', 'Test User');
    mobileFormData.append('nik', '1234567890123456');
    mobileFormData.append('jenis_kelamin', 'Laki-laki');
    mobileFormData.append('tempat_lahir', 'Test City');
    mobileFormData.append('tanggal_lahir', '1990-01-01');
    mobileFormData.append('pekerjaan', 'Tester');
    mobileFormData.append('kewarganegaraan', 'Indonesia');
    mobileFormData.append('agama', 'Islam');
    mobileFormData.append('no_hp', '081234567890');
    mobileFormData.append('alamat_ktp', 'Test Address');
    mobileFormData.append('alamat_sekarang', 'Test Address');
    mobileFormData.append('jenis_surat', 'Surat Keterangan');
    
    const mobileResponse = await fetch('https://backend.desasidomulyo.org/api/surat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      },
      body: mobileFormData
    });
    
    console.log('Mobile Response Status:', mobileResponse.status);
    if (mobileResponse.ok) {
      const data = await mobileResponse.json();
      console.log('✅ Mobile upload successful');
    } else {
      const error = await mobileResponse.json();
      console.log('❌ Mobile upload failed:', error);
    }
  } catch (error) {
    console.log('❌ Mobile test error:', error.message);
  }
  
  // Cleanup
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
    console.log('\n🧹 Test file cleaned up');
  }
  
  console.log('\n🏁 Mobile vs Desktop test completed!');
}

// Run test
testMobileVsDesktop().catch(console.error); 