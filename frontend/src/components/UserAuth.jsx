import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function UserAuth({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register } = useAuth();

  // Mencegah scroll pada body saat modal terbuka
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation for demo purposes
    if (!formData.username || !formData.password) {
      setError('Username dan password harus diisi!');
      return;
    }

    // Demo login logic - in real app, this would be API call
    if (formData.username === 'admin' && formData.password === 'admin123') {
      login('admin', { username: formData.username });
      onClose();
    } else if (formData.password === 'warga123') {
      login('user', { username: formData.username });
      onClose();
    } else {
      setError('Username atau password salah!');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
      setError('Semua field wajib diisi!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    // Demo register logic - in real app, this would be API call
    const userData = {
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address
    };

    register(userData);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal fixed inset-0 min-h-screen flex items-center justify-center bg-black/50 z-[9999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-4 animate-fadeIn relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none z-10"
          aria-label="Tutup"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-center text-primary">
          {isLogin ? 'Masuk' : 'Daftar'}
        </h2>
        
        <p className="text-sm text-gray-500 mb-4 text-center">
          {isLogin 
            ? 'Silakan masukkan username dan password Anda.'
            : 'Lengkapi data diri Anda untuk mendaftar.'
          }
        </p>

        {/* Toggle between Login and Register */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Daftar
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {isLogin ? (
            // Login Form
            <>
              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Masukkan username"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-12"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Register Form
            <>
              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="fullName">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Masukkan email"
                    required
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="phone">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Masukkan nomor telepon"
                  />
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-12"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="confirmPassword">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pr-12"
                    placeholder="Konfirmasi password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow"
          >
            {isLogin ? 'Masuk' : 'Daftar'}
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

export default UserAuth; 