const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';

// Test data
const testData = {
  selayangPandang: {
    judul: "Selayang Pandang Desa Sidomulyo",
    konten: "Desa Sidomulyo adalah desa yang terletak di Kecamatan X, Kabupaten Y, Provinsi Z. Desa ini memiliki luas wilayah sekitar 500 hektar dengan jumlah penduduk sekitar 2500 jiwa. Desa Sidomulyo dikenal dengan potensi pertaniannya yang subur dan masyarakatnya yang ramah serta gotong royong.",
    gambar: "https://example.com/selayang-pandang.jpg"
  },
  visiMisi: {
    judul: "Visi & Misi Desa Sidomulyo",
    visi: "Terwujudnya Desa Sidomulyo yang maju, mandiri, dan sejahtera pada tahun 2030",
    misi: [
      "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
      "Mengembangkan perekonomian desa berbasis potensi lokal",
      "Membangun infrastruktur desa yang berkelanjutan",
      "Menguatkan kelembagaan desa dan partisipasi masyarakat",
      "Meningkatkan pelayanan publik yang transparan dan akuntabel"
    ]
  },
  sejarah: {
    judul: "Sejarah Desa Sidomulyo",
    konten: "Sejarah Desa Sidomulyo dimulai pada tahun 1950 ketika sekelompok masyarakat pertama kali menetap di wilayah ini. Nama 'Sidomulyo' diambil dari kata 'Sido' yang berarti menjadi dan 'Mulyo' yang berarti makmur. Harapan para pendiri desa adalah agar desa ini menjadi tempat yang makmur dan sejahtera.",
    gambar: "https://example.com/sejarah.jpg"
  },
  geografis: {
    judul: "Kondisi Geografis Desa Sidomulyo",
    konten: "Desa Sidomulyo memiliki topografi yang bervariasi dari dataran rendah hingga perbukitan. Wilayah ini dialiri oleh beberapa sungai dan memiliki tanah yang subur untuk pertanian.",
    batasUtara: "Desa Utara",
    batasSelatan: "Desa Selatan",
    batasBarat: "Desa Barat",
    batasTimur: "Desa Timur",
    luasWilayah: "500 hektar",
    jumlahPenduduk: "2500 jiwa",
    gambar: "https://example.com/geografis.jpg"
  },
  demografis: {
    judul: "Kondisi Demografis Desa Sidomulyo",
    konten: "Masyarakat Desa Sidomulyo terdiri dari berbagai suku dan agama yang hidup rukun berdampingan. Mayoritas penduduk bekerja sebagai petani dan pedagang.",
    jumlahKK: "650 KK",
    jumlahLakiLaki: "1200 jiwa",
    jumlahPerempuan: "1300 jiwa",
    agama: {
      "Islam": "85%",
      "Kristen": "10%",
      "Katolik": "3%",
      "Hindu": "1%",
      "Buddha": "1%"
    },
    pendidikan: {
      "Tidak Sekolah": "5%",
      "SD": "30%",
      "SMP": "25%",
      "SMA": "25%",
      "D3/S1": "13%",
      "S2/S3": "2%"
    }
  }
};

// Login function
async function login() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@sidomulyo.com',
      password: 'admin123'
    });
    authToken = response.data.token;
    console.log('✅ Login berhasil');
    return authToken;
  } catch (error) {
    console.error('❌ Login gagal:', error.response?.data || error.message);
    throw error;
  }
}

// Test functions
async function testGetAllTentang() {
  try {
    const response = await axios.get(`${BASE_URL}/tentang`);
    console.log('✅ Get semua data tentang berhasil');
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Get semua data tentang gagal:', error.response?.data || error.message);
  }
}

async function testGetTentangBySection(section) {
  try {
    const response = await axios.get(`${BASE_URL}/tentang/${section}`);
    console.log(`✅ Get data ${section} berhasil`);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`❌ Get data ${section} gagal:`, error.response?.data || error.message);
  }
}

async function testUpdateSelayangPandang() {
  try {
    const response = await axios.put(`${BASE_URL}/tentang/selayang-pandang`, testData.selayangPandang, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update selayang pandang berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Update selayang pandang gagal:', error.response?.data || error.message);
  }
}

async function testUpdateVisiMisi() {
  try {
    const response = await axios.put(`${BASE_URL}/tentang/visi-misi`, testData.visiMisi, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update visi misi berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Update visi misi gagal:', error.response?.data || error.message);
  }
}

async function testUpdateSejarah() {
  try {
    const response = await axios.put(`${BASE_URL}/tentang/sejarah`, testData.sejarah, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update sejarah berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Update sejarah gagal:', error.response?.data || error.message);
  }
}

async function testUpdateGeografis() {
  try {
    const response = await axios.put(`${BASE_URL}/tentang/geografis`, testData.geografis, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update geografis berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Update geografis gagal:', error.response?.data || error.message);
  }
}

async function testUpdateDemografis() {
  try {
    const response = await axios.put(`${BASE_URL}/tentang/demografis`, testData.demografis, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update demografis berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Update demografis gagal:', error.response?.data || error.message);
  }
}

async function testGetOverview() {
  try {
    const response = await axios.get(`${BASE_URL}/tentang/admin/overview`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Get overview berhasil');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Get overview gagal:', error.response?.data || error.message);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Memulai test endpoint Tentang...\n');
  
  try {
    // Login first
    await login();
    console.log('');
    
    // Test get all data
    console.log('📋 Testing GET /api/tentang');
    await testGetAllTentang();
    console.log('');
    
    // Test get by section
    console.log('📋 Testing GET /api/tentang/selayangPandang');
    await testGetTentangBySection('selayangPandang');
    console.log('');
    
    // Test updates
    console.log('📋 Testing PUT /api/tentang/selayang-pandang');
    await testUpdateSelayangPandang();
    console.log('');
    
    console.log('📋 Testing PUT /api/tentang/visi-misi');
    await testUpdateVisiMisi();
    console.log('');
    
    console.log('📋 Testing PUT /api/tentang/sejarah');
    await testUpdateSejarah();
    console.log('');
    
    console.log('📋 Testing PUT /api/tentang/geografis');
    await testUpdateGeografis();
    console.log('');
    
    console.log('📋 Testing PUT /api/tentang/demografis');
    await testUpdateDemografis();
    console.log('');
    
    // Test get overview
    console.log('📋 Testing GET /api/tentang/admin/overview');
    await testGetOverview();
    console.log('');
    
    // Test get updated data
    console.log('📋 Testing GET /api/tentang (after updates)');
    await testGetAllTentang();
    console.log('');
    
    console.log('✅ Semua test selesai!');
    
  } catch (error) {
    console.error('❌ Test gagal:', error.message);
  }
}

// Run tests
runTests(); 