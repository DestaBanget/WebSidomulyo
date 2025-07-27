const fs = require('fs');
const path = require('path');

// Test script untuk upload Kartu KK dengan banyak persyaratan
async function testKartuKKUpload() {
  console.log('🧪 Testing Kartu KK Upload with Multiple Requirements...\n');
  
  // Create multiple test files (simulasi persyaratan Kartu KK)
  const testFiles = [
    { name: 'ktp-suami.jpg', size: 200 * 1024 }, // 200KB
    { name: 'ktp-istri.jpg', size: 180 * 1024 }, // 180KB
    { name: 'kartu-keluarga.jpg', size: 250 * 1024 }, // 250KB
    { name: 'surat-nikah.jpg', size: 300 * 1024 }, // 300KB
    { name: 'surat-pindah.jpg', size: 220 * 1024 }, // 220KB
    { name: 'dokumen-pendukung.pdf', size: 500 * 1024 } // 500KB
  ];
  
  const createdFiles = [];
  
  // Create test files
  console.log('📁 Creating test files...');
  for (const file of testFiles) {
    const filePath = path.join(__dirname, file.name);
    const content = Buffer.alloc(file.size);
    fs.writeFileSync(filePath, content);
    createdFiles.push(filePath);
    console.log(`✅ Created: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);
  }
  
  const totalSize = testFiles.reduce((sum, file) => sum + file.size, 0);
  console.log(`📊 Total upload size: ${(totalSize / 1024 / 1024).toFixed(2)}MB\n`);
  
  // Test upload dengan multiple files
  console.log('🚀 Testing multiple file upload...');
  try {
    const formData = new FormData();
    
    // Add files
    createdFiles.forEach((filePath, index) => {
      const fileName = testFiles[index].name;
      formData.append('files', fs.createReadStream(filePath));
      
      // Add jenis persyaratan untuk setiap file
      const jenisPersyaratan = fileName.includes('ktp') ? 'KTP' :
                               fileName.includes('kartu-keluarga') ? 'Kartu Keluarga' :
                               fileName.includes('surat-nikah') ? 'Surat Nikah' :
                               fileName.includes('surat-pindah') ? 'Surat Pindah' :
                               'Dokumen Pendukung';
      
      formData.append(`jenis_persyaratan_${index}`, jenisPersyaratan);
    });
    
    // Add form data
    formData.append('nama', 'Test User Kartu KK');
    formData.append('nik', '1234567890123456');
    formData.append('jenis_kelamin', 'Laki-laki');
    formData.append('tempat_lahir', 'Test City');
    formData.append('tanggal_lahir', '1990-01-01');
    formData.append('pekerjaan', 'Tester');
    formData.append('kewarganegaraan', 'Indonesia');
    formData.append('agama', 'Islam');
    formData.append('no_hp', '081234567890');
    formData.append('alamat_ktp', 'Test Address KTP');
    formData.append('alamat_sekarang', 'Test Address Sekarang');
    formData.append('jenis_surat', 'Kartu Keluarga (KK) Baru / Perubahan / Penambahan Anggota');
    
    const startTime = Date.now();
    
    const response = await fetch('https://backend.desasidomulyo.org/api/surat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Ganti dengan token yang valid
      },
      body: formData
    });
    
    const endTime = Date.now();
    const uploadTime = endTime - startTime;
    
    console.log(`⏱️ Upload completed in ${uploadTime}ms`);
    console.log('Response Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Multiple file upload successful!');
      console.log('Processing time:', data.processingTime);
      console.log('File count:', data.fileCount);
      console.log('Surat ID:', data.surat.id);
    } else {
      const error = await response.json();
      console.log('❌ Multiple file upload failed:', error);
    }
  } catch (error) {
    console.log('❌ Upload error:', error.message);
  }
  
  // Cleanup
  console.log('\n🧹 Cleaning up test files...');
  createdFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted: ${path.basename(filePath)}`);
    }
  });
  
  console.log('\n🏁 Kartu KK upload test completed!');
}

// Run test
testKartuKKUpload().catch(console.error); 