const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

// Data berita dummy untuk testing
const beritaDummy = [
  {
    title: 'Desa Sidomulyo Raih Penghargaan Desa Terbersih 2024',
    content: 'Desa Sidomulyo berhasil meraih penghargaan sebagai Desa Terbersih tingkat kabupaten tahun 2024. Penghargaan ini diberikan atas partisipasi aktif warga dalam menjaga kebersihan lingkungan dan pengelolaan sampah yang inovatif.\n\nKepala Desa mengucapkan terima kasih kepada seluruh warga dan berharap prestasi ini dapat dipertahankan di tahun-tahun berikutnya.',
    kategori: 'Prestasi',
    tanggal: '2024-06-11'
  },
  {
    title: 'Festival Kuliner Desa Sidomulyo Sukses Digelar',
    content: 'Festival Kuliner Desa Sidomulyo menghadirkan aneka makanan tradisional dan modern hasil kreasi warga. Acara ini ramai dikunjungi dan menjadi ajang promosi UMKM lokal.\n\nBerbagai lomba masak dan bazar makanan turut memeriahkan festival yang digelar di lapangan desa.',
    kategori: 'Kuliner',
    tanggal: '2024-06-10'
  },
  {
    title: 'Launching Wisata Sawah Indah: Destinasi Baru di Sidomulyo',
    content: 'Desa Sidomulyo resmi meluncurkan destinasi wisata baru, Wisata Sawah Indah, pada hari ini. Destinasi ini menawarkan pemandangan sawah hijau yang menenangkan, spot foto instagramable, dan area piknik keluarga.',
    kategori: 'Pariwisata',
    tanggal: '2024-06-09'
  },
  {
    title: 'Pelatihan Kewirausahaan untuk Remaja Desa',
    content: 'Pemerintah Desa Sidomulyo mengadakan pelatihan kewirausahaan bagi remaja desa. Kegiatan ini bertujuan membekali generasi muda dengan keterampilan berwirausaha dan membangun usaha mandiri.',
    kategori: 'Pendidikan',
    tanggal: '2024-06-09'
  },
  {
    title: 'Pembangunan Jalan Baru di Dusun Krajan Selesai Lebih Cepat',
    content: 'Proyek pembangunan jalan baru di Dusun Krajan telah selesai lebih cepat dari jadwal yang direncanakan. Jalan sepanjang 2 kilometer ini akan memudahkan akses warga ke pusat desa.',
    kategori: 'Pembangunan',
    tanggal: '2024-06-01'
  },
  {
    title: 'Penyaluran Bantuan Sosial Tahap II untuk Warga Kurang Mampu',
    content: 'Pemerintah Desa Sidomulyo menyalurkan bantuan sosial tahap II kepada 150 warga kurang mampu. Bantuan berupa sembako dan uang tunai ini bertujuan meringankan beban ekonomi warga.',
    kategori: 'Sosial',
    tanggal: '2024-05-28'
  }
];

async function loginAsAdmin() {
  try {
    console.log('🔐 Logging in as admin...');
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Login successful');
    return data.token;
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return null;
  }
}

async function addBerita(token, beritaData) {
  try {
    console.log(`📝 Adding berita: ${beritaData.title}`);
    
    const response = await fetch(`${API_BASE_URL}/berita`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(beritaData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to add berita: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Berita added successfully: ${data.berita.title}`);
    return data.berita;
  } catch (error) {
    console.error(`❌ Error adding berita: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting berita addition script...');
  
  // Login as admin
  const token = await loginAsAdmin();
  if (!token) {
    console.error('❌ Cannot proceed without admin token');
    return;
  }

  // Add berita dummy
  console.log('\n📰 Adding dummy berita...');
  let successCount = 0;
  
  for (const berita of beritaDummy) {
    const result = await addBerita(token, berita);
    if (result) {
      successCount++;
    }
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Script completed! Successfully added ${successCount}/${beritaDummy.length} berita.`);
  
  // Test fetching berita
  console.log('\n🔍 Testing berita fetch...');
  try {
    const response = await fetch(`${API_BASE_URL}/berita`);
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.berita.length} berita in database`);
    } else {
      console.error('❌ Failed to fetch berita');
    }
  } catch (error) {
    console.error('❌ Error fetching berita:', error.message);
  }
}

main().catch(console.error); 