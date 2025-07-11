import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultBerita } from '../components/BeritaDesa';

const BeritaContext = createContext();

export function useBerita() {
  return useContext(BeritaContext);
}

export function BeritaProvider({ children }) {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/berita')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setBerita)
      .catch(() => setBerita(defaultBerita))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BeritaContext.Provider value={{ berita, loading }}>
      {children}
    </BeritaContext.Provider>
  );
} 