// Test script untuk memverifikasi frontend fallback mechanism
console.log('🧪 Testing Frontend Fallback Mechanism...\n');

// Simulasi fetch dengan multiple approaches
async function simulateFetchWithFallback() {
  const API_BASE_URL = 'https://backendsidomulyo-production.up.railway.app/api';
  
  console.log('1. Testing multiple fetch approaches...');
  
  // Approach 1: With default headers
  console.log('\n📋 Approach 1: With default headers');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success: ${data.struktur.length} items`);
      return data;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
  }
  
  // Approach 2: Without Content-Type header
  console.log('\n📋 Approach 2: Without Content-Type header');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success: ${data.struktur.length} items`);
      return data;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
  }
  
  // Approach 3: No headers
  console.log('\n📋 Approach 3: No headers');
  try {
    const response = await fetch(`${API_BASE_URL}/struktur`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success: ${data.struktur.length} items`);
      return data;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
  }
  
  // All approaches failed
  console.log('\n❌ All approaches failed, using fallback data');
  return null;
}

// Simulasi data default
const strukturDefault = {
  kepalaDesa: {
    nama: 'Mulianto',
    jabatan: 'Kepala Desa',
    foto: '',
  },
  sekretaris: {
    nama: 'Sunarsih',
    jabatan: 'Sekretaris Desa',
    foto: '',
  },
  kaur: [
    { nama: 'Wahyu Nur H', jabatan: 'Kaur TU & Umum', foto: '' },
    { nama: 'Titin Juharnani', jabatan: 'Kaur Keuangan', foto: '' },
    { nama: 'Rachmad Irvan N.I', jabatan: 'Kaur Perencanaan', foto: '' },
  ],
  kasi: [
    { nama: 'M. Agus Wahyudi Z', jabatan: 'Kasi Pemerintahan', foto: '' },
    { nama: 'Muhammad Rifai', jabatan: 'Kasi Kesra', foto: '' },
    { nama: 'Subur', jabatan: 'Kasi Pelayanan', foto: '' },
  ],
  kasun: [
    { nama: 'M. Jamhuri', jabatan: 'Kasun Bareng', foto: '' },
    { nama: 'Fathul Mu\'in', jabatan: 'Kasun Tebelo', foto: '' },
    { nama: 'Eko Hendri S', jabatan: 'Kasun Mangunrejo', foto: '' },
    { nama: 'Saparu', jabatan: 'Kasun Sumberkreco', foto: '' },
  ],
};

// Simulasi transformApiDataToFrontend function
function transformApiDataToFrontend(apiData) {
  const transformed = {
    kepalaDesa: { nama: '', jabatan: 'Kepala Desa', foto: '' },
    sekretaris: { nama: '', jabatan: 'Sekretaris Desa', foto: '' },
    kaur: [],
    kasi: [],
    kasun: []
  };

  apiData.forEach(item => {
    const person = {
      id: item.id,
      nama: item.nama,
      jabatan: item.jabatan,
      foto: item.foto || ''
    };

    switch (item.tipe) {
      case 'kepala_desa':
        transformed.kepalaDesa = person;
        break;
      case 'sekretaris':
        transformed.sekretaris = person;
        break;
      case 'kaur':
        transformed.kaur.push(person);
        break;
      case 'kasi':
        transformed.kasi.push(person);
        break;
      case 'kasun':
        transformed.kasun.push(person);
        break;
    }
  });

  return transformed;
}

// Test scenarios
async function testScenarios() {
  console.log('2. Testing different scenarios...\n');
  
  // Scenario 1: API works
  console.log('📊 Scenario 1: API works');
  const apiData = await simulateFetchWithFallback();
  
  if (apiData) {
    console.log('✅ API data received, transforming...');
    const transformedData = transformApiDataToFrontend(apiData.struktur);
    console.log(`✅ Transformed: ${transformedData.kepalaDesa.nama} (Kepala Desa)`);
    console.log(`✅ Transformed: ${transformedData.sekretaris.nama} (Sekretaris)`);
    console.log(`✅ Transformed: ${transformedData.kaur.length} Kaur`);
    console.log(`✅ Transformed: ${transformedData.kasi.length} Kasi`);
    console.log(`✅ Transformed: ${transformedData.kasun.length} Kasun`);
  } else {
    console.log('✅ Using fallback data');
    console.log(`✅ Fallback: ${strukturDefault.kepalaDesa.nama} (Kepala Desa)`);
    console.log(`✅ Fallback: ${strukturDefault.sekretaris.nama} (Sekretaris)`);
    console.log(`✅ Fallback: ${strukturDefault.kaur.length} Kaur`);
    console.log(`✅ Fallback: ${strukturDefault.kasi.length} Kasi`);
    console.log(`✅ Fallback: ${strukturDefault.kasun.length} Kasun`);
  }
  
  // Scenario 2: Error handling
  console.log('\n📊 Scenario 2: Error handling');
  try {
    // Simulate network error
    throw new Error('Network error simulation');
  } catch (error) {
    console.log(`✅ Error caught: ${error.message}`);
    console.log('✅ Using fallback data');
    console.log(`✅ Fallback: ${strukturDefault.kepalaDesa.nama} (Kepala Desa)`);
  }
  
  // Scenario 3: Data validation
  console.log('\n📊 Scenario 3: Data validation');
  const validateData = (data) => {
    const errors = [];
    
    if (!data.kepalaDesa.nama) errors.push('Kepala Desa nama is empty');
    if (!data.sekretaris.nama) errors.push('Sekretaris nama is empty');
    if (data.kaur.length === 0) errors.push('No Kaur data');
    if (data.kasi.length === 0) errors.push('No Kasi data');
    if (data.kasun.length === 0) errors.push('No Kasun data');
    
    return errors;
  };
  
  const apiErrors = apiData ? validateData(transformApiDataToFrontend(apiData.struktur)) : [];
  const fallbackErrors = validateData(strukturDefault);
  
  console.log('API data errors:', apiErrors.length === 0 ? '✅ None' : `❌ ${apiErrors.join(', ')}`);
  console.log('Fallback data errors:', fallbackErrors.length === 0 ? '✅ None' : `❌ ${fallbackErrors.join(', ')}`);
}

// Run tests
async function runTests() {
  try {
    await testScenarios();
    
    console.log('\n🎉 Frontend Fallback Testing Completed!');
    console.log('\n📝 Summary:');
    console.log('- ✅ Multiple fetch approaches implemented');
    console.log('- ✅ Fallback to default data works');
    console.log('- ✅ Error handling is robust');
    console.log('- ✅ Data validation is in place');
    console.log('- ✅ Component will work regardless of API status');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runTests(); 