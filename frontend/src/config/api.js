// Konfigurasi API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
console.log('API_BASE_URL:', API_BASE_URL);

// Helper functions untuk API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Daftar endpoint yang tidak memerlukan autentikasi (public endpoints)
  const publicEndpoints = [
    '/agenda', // GET agenda (public)
    '/berita', // GET berita (public)
    '/pengumuman', // GET pengumuman (public)
    '/pariwisata', // GET pariwisata (public)
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
  
  // Debug logging
  console.log('API Call Debug:', {
    endpoint,
    method: options.method || 'GET',
    isPublicEndpoint,
    hasToken: !!token,
    willSendToken: shouldSendToken
  });
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Kirim token jika diperlukan
      ...(shouldSendToken && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  console.log('Request config:', {
    url: `${API_BASE_URL}${endpoint}`,
    headers: config.headers
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  console.log('Response status:', response.status);
  console.log('Response data:', data);

  if (!response.ok) {
    throw new Error(data.error || 'Request gagal');
  }

  return data;
};

// Function khusus untuk endpoint public (tidak pernah mengirim token)
export const publicApiCall = async (endpoint, options = {}) => {
  console.log('Public API Call:', endpoint);
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  console.log('Public request config:', {
    url: `${API_BASE_URL}${endpoint}`,
    headers: config.headers
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  console.log('Public response status:', response.status);
  console.log('Public response data:', data);

  if (!response.ok) {
    throw new Error(data.error || 'Request gagal');
  }

  return data;
};

// Helper untuk file upload
export const uploadFile = async (endpoint, formData) => {
  const token = localStorage.getItem('token');
  
  // Daftar endpoint yang tidak memerlukan autentikasi (public endpoints)
  const publicEndpoints = [
    '/agenda', // GET agenda (public)
    '/berita', // GET berita (public)
    '/pengumuman', // GET pengumuman (public)
    '/pariwisata', // GET pariwisata (public)
    '/lembaga', // GET lembaga (public)
    '/statistik', // GET statistik (public)
    '/struktur', // GET struktur (public)
  ];
  
  // Cek apakah endpoint ini public
  const isPublicEndpoint = publicEndpoints.some(publicEndpoint => 
    endpoint === publicEndpoint || endpoint.startsWith(publicEndpoint + '/')
  );
  
  // Untuk upload (POST), selalu kirim token jika ada
  const shouldSendToken = token && !isPublicEndpoint;
  
  // Debug logging
  console.log('Upload File Debug:', {
    endpoint,
    isPublicEndpoint,
    hasToken: !!token,
    willSendToken: shouldSendToken
  });
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      // Kirim token jika diperlukan
      ...(shouldSendToken && { 'Authorization': `Bearer ${token}` })
    },
    body: formData
  });

  const data = await response.json();

  console.log('Upload response status:', response.status);
  console.log('Upload response data:', data);

  if (!response.ok) {
    throw new Error(data.error || 'Upload gagal');
  }

  return data;
}; 