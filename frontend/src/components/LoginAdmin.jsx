import React, { useState } from 'react';

function LoginAdmin({ onLogin, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setError('');
      onLogin();
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen min-w-full flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-full max-w-sm animate-fadeIn relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Tutup"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center text-primary">Login Admin</h2>
        <p className="text-sm text-gray-500 mb-4 text-center">Form ini hanya untuk <span className="font-semibold text-primary">admin</span> website. Silakan masukkan username dan password admin Anda.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="username">Username Admin</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan username admin"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700" htmlFor="password">Password Admin</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan password admin"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-blue-700 transition shadow"
          >
            Login
          </button>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default LoginAdmin; 