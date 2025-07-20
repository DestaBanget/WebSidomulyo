const axios = require('axios');

const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';

async function setupStrukturViaAPI() {
  try {
    console.log('🔧 Setting up Struktur Organisasi via API...\n');

    // Step 1: Login as admin
    console.log('1. Logging in as admin...');
    let token = null;
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: 'admin',
        password: 'password'
      });
      
      token = loginResponse.data.token;
      console.log('✅ Login berhasil');
    } catch (error) {
      console.log(`❌ Login gagal: ${error.response?.status} ${error.response?.statusText}`);
      console.log(`   Message: ${error.response?.data?.error || error.message}`);
      return;
    }

    // Step 2: Check existing data
    console.log('\n2. Checking existing struktur data...');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`);
      console.log(`✅ Found ${response.data.struktur.length} existing records`);
      
      if (response.data.struktur.length > 0) {
        console.log('📋 Existing data:');
        response.data.struktur.forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.nama} - ${item.jabatan} (${item.tipe})`);
        });
        console.log('\n✅ Database already has data, setup not needed');
        return;
      }
    } catch (error) {
      console.log(`❌ Error checking existing data: ${error.response?.status} ${error.response?.statusText}`);
      console.log(`   Message: ${error.response?.data?.error || error.message}`);
      return;
    }

    // Step 3: Insert sample data
    console.log('\n3. Inserting sample data...');
    const sampleData = [
      { nama: 'Aghis Pratama, S.Pd', jabatan: 'Kepala Desa', tipe: 'kepala_desa' },
      { nama: 'Siti Nurhaliza', jabatan: 'Sekretaris Desa', tipe: 'sekretaris' },
      { nama: 'Wahyu Nur H', jabatan: 'Kaur TU & Umum', tipe: 'kaur' },
      { nama: 'Titin Juharnani', jabatan: 'Kaur Keuangan', tipe: 'kaur' },
      { nama: 'Rachmad Irvan N.I', jabatan: 'Kaur Perencanaan', tipe: 'kaur' },
      { nama: 'M. Agus Wahyudi Z', jabatan: 'Kasi Pemerintahan', tipe: 'kasi' },
      { nama: 'Muhammad Rifai', jabatan: 'Kasi Kesra', tipe: 'kasi' },
      { nama: 'Subur', jabatan: 'Kasi Pelayanan', tipe: 'kasi' },
      { nama: 'M. Jamhuri', jabatan: 'Kasun Bareng', tipe: 'kasun' },
      { nama: 'Fathul Mu\'in', jabatan: 'Kasun Tebelo', tipe: 'kasun' },
      { nama: 'Eko Hendri S', jabatan: 'Kasun Mangunrejo', tipe: 'kasun' },
      { nama: 'Saparu', jabatan: 'Kasun Sumberkreco', tipe: 'kasun' }
    ];

    let successCount = 0;
    let errorCount = 0;

    for (const item of sampleData) {
      try {
        const response = await axios.post(`${API_BASE_URL}/struktur`, item, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`✅ Created: ${item.nama} - ${item.jabatan}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Failed to create ${item.nama}: ${error.response?.status} ${error.response?.statusText}`);
        console.log(`   Message: ${error.response?.data?.error || error.message}`);
        errorCount++;
      }
    }

    // Step 4: Verify final data
    console.log('\n4. Verifying final data...');
    try {
      const response = await axios.get(`${API_BASE_URL}/struktur`);
      console.log(`✅ Total records: ${response.data.struktur.length}`);
      
      console.log('\n📋 Final data:');
      response.data.struktur.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.nama} - ${item.jabatan} (${item.tipe})`);
      });

      // Summary by type
      const summary = {
        kepala_desa: 0,
        sekretaris: 0,
        kaur: 0,
        kasi: 0,
        kasun: 0
      };

      response.data.struktur.forEach(item => {
        summary[item.tipe]++;
      });

      console.log('\n📊 Summary by type:');
      Object.entries(summary).forEach(([type, count]) => {
        console.log(`   ${type}: ${count}`);
      });

    } catch (error) {
      console.log(`❌ Error verifying data: ${error.response?.status} ${error.response?.statusText}`);
    }

    console.log('\n🎉 Setup completed!');
    console.log(`📊 Results: ${successCount} created, ${errorCount} failed`);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Run the setup
setupStrukturViaAPI(); 