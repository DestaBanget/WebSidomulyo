// Konfigurasi API
// Ganti default ke domain produksi, jangan localhost
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend.desasidomulyo.org/api';
// Jika ingin development, buat file .env dan isi VITE_API_BASE_URL

// Helper functions untuk API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Daftar endpoint yang tidak memerlukan autentikasi (public endpoints)
  const publicEndpoints = [
    '/agenda', // GET agenda (public)
    '/berita', // GET berita (public)
    '/pengumuman', // GET pengumuman (public)
    '/lembaga', // GET lembaga (public)
    '/statistik', // GET statistik (public)
    '/struktur', // GET struktur (public)
  ];
  
  // Cek apakah endpoint ini public (hanya untuk GET request)
  const isPublicEndpoint = options.method === 'GET' && publicEndpoints.some(publicEndpoint => 
    endpoint === publicEndpoint || endpoint.startsWith(publicEndpoint + '/')
  );
  
  // Untuk POST, PUT, DELETE requests, selalu kirim token jika ada
  const shouldSendToken = token && (options.method !== 'GET' || !isPublicEndpoint);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Kirim token jika diperlukan
      ...(shouldSendToken && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request gagal');
  }

  return data;
};

// Function khusus untuk endpoint public (tidak pernah mengirim token)
export const publicApiCall = async (endpoint, options = {}) => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request gagal');
  }

  return data;
};

// Helper untuk file upload
export const uploadFile = async (endpoint, formData, method = 'POST') => {
  const token = localStorage.getItem('token');
  
  // Daftar endpoint yang tidak memerlukan autentikasi (public endpoints)
  const publicEndpoints = [
    '/agenda', // GET agenda (public)
    '/berita', // GET berita (public)
    '/pengumuman', // GET pengumuman (public)
    '/lembaga', // GET lembaga (public)
    '/statistik', // GET statistik (public)
    '/struktur', // GET struktur (public)
  ];
  
  // Cek endpoint pengurus/unit-kegiatan (selalu butuh token)
  const isPengurusOrUnitEndpoint =
    endpoint.startsWith('/lembaga/pengurus') ||
    endpoint.includes('/pengurus') ||
    endpoint.startsWith('/lembaga/unit-kegiatan') ||
    endpoint.includes('/unit-kegiatan');

  // Cek apakah endpoint ini public (tapi pengurus/unit-kegiatan tidak pernah public)
  const isPublicEndpoint = !isPengurusOrUnitEndpoint && publicEndpoints.some(publicEndpoint => 
    endpoint === publicEndpoint || endpoint.startsWith(publicEndpoint + '/')
  );
  
  // Untuk upload (POST/PUT/DELETE), selalu kirim token jika ada dan endpoint bukan public
  const shouldSendToken = token && !isPublicEndpoint;
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      // Kirim token jika diperlukan
      ...(shouldSendToken && { 'Authorization': `Bearer ${token}` })
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Upload gagal');
  }

  return data;
}; 