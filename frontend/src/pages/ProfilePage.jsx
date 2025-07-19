import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [riwayatSurat, setRiwayatSurat] = useState([]);
  const [loadingSurat, setLoadingSurat] = useState(true);
  const [errorSurat, setErrorSurat] = useState('');
  const [riwayatPengaduan, setRiwayatPengaduan] = useState([]);
  const [loadingPengaduan, setLoadingPengaduan] = useState(true);
  const [errorPengaduan, setErrorPengaduan] = useState('');

  React.useEffect(() => {
    const fetchRiwayatSurat = async () => {
      try {
        setLoadingSurat(true);
        setErrorSurat('');
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/surat/my-surat`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil riwayat surat');
        }
        const data = await response.json();
        setRiwayatSurat(data.surat || []);
      } catch (err) {
        setErrorSurat(err.message);
      } finally {
        setLoadingSurat(false);
      }
    };
    fetchRiwayatSurat();
  }, []);

  React.useEffect(() => {
    const fetchRiwayatPengaduan = async () => {
      try {
        setLoadingPengaduan(true);
        setErrorPengaduan('');
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pengaduan/my-pengaduan`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil riwayat pengaduan');
        }
        const data = await response.json();
        setRiwayatPengaduan(data.pengaduan || []);
      } catch (err) {
        console.error('Error fetch pengaduan:', err);
        setErrorPengaduan(err.message);
      } finally {
        setLoadingPengaduan(false);
      }
    };
    fetchRiwayatPengaduan();
  }, []);

  if (!user) {
    return <div className="p-8 text-center">Anda belum login.</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = () => {
    localStorage.removeItem('user');
    setShowDelete(false);
    handleLogout();
  };

  const validatePassword = () => {
    if (!passwordForm.currentPassword) {
      setError('Password saat ini wajib diisi!');
      return false;
    }
    if (!passwordForm.newPassword) {
      setError('Password baru wajib diisi!');
      return false;
    }
    if (passwordForm.newPassword.length < 6) {
      setError('Password baru minimal 6 karakter!');
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Konfirmasi password tidak cocok!');
      return false;
    }
    return true;
  };

  const validateEditForm = () => {
    if (!editForm.fullName.trim()) {
      setError('Nama lengkap wajib diisi!');
      return false;
    }
    if (!editForm.email.trim()) {
      setError('Email wajib diisi!');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      setError('Format email tidak valid!');
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar!');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB!');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    setError('');
  };

  const handleChangePassword = () => {
    if (!validatePassword()) return;

    if (passwordForm.currentPassword !== user.password) {
      setError('Password saat ini tidak benar!');
      return;
    }

    const updatedUser = { ...user, password: passwordForm.newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess('Password berhasil diubah!');
    setError('');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordChange(false);
  };

  const handleUpdateProfile = () => {
    if (!validateEditForm()) return;

    const updatedUser = {
      ...user,
      fullName: editForm.fullName.trim(),
      email: editForm.email.trim(),
      phone: editForm.phone.trim(),
      profileImage: profileImage,
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    if (updateUser) {
      updateUser(updatedUser);
    }
    
    setSuccess('Profil berhasil diperbarui!');
    setError('');
    setShowEditProfile(false);
  };

  const handleEditProfileClick = () => {
    setEditForm({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
    });
    setImagePreview(user.profileImage || null);
    setProfileImage(user.profileImage || null);
    setShowEditProfile(true);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full flex items-center justify-center text-white px-4 text-center min-h-[350px] md:min-h-[450px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(96,165,250,0.9)), url('/surat2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '3rem',
          borderBottomRightRadius: '3rem',
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-3000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-12 md:py-20">
          <div className="mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl font-bold text-white border-8 border-white/30 shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.fullName ? user.fullName[0].toUpperCase() : 'U'
              )}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Profil Saya
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Kelola informasi akun Anda dengan aman
          </p>
          <div className="mt-6 flex items-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Status: {user.role === 'admin' ? 'Administrator' : 'Pengguna'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {user.fullName || 'Pengguna'}
            </h2>
            <p className="text-gray-600">@{user.username || 'username'}</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {user.role === 'admin' ? 'Administrator' : 'Pengguna'}
            </div>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center font-medium animate-pulse">
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-medium animate-pulse">
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="w-full">
            <div className="mb-8">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Informasi Akun
                  </h3>
                  <button
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    title="Edit Profil"
                    onClick={handleEditProfileClick}
                  >
                    <span>Edit</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Nama Lengkap
                    </div>
                    <div className="font-semibold text-gray-900">
                      {user.fullName || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Username
                    </div>
                    <div className="font-semibold text-gray-900">
                      {user.username || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Email
                    </div>
                    <div className="font-semibold text-gray-900">
                      {user.email || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-1">
                      Nomor Telepon
                    </div>
                    <div className="font-semibold text-gray-900">
                      {user.phone || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box Riwayat Pengajuan Surat */}
            {user.role !== 'admin' && (
              <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Riwayat Pengajuan Surat</h3>
                {loadingSurat ? (
                  <div className="text-gray-500">Memuat riwayat surat...</div>
                ) : errorSurat ? (
                  <div className="text-red-500">{errorSurat}</div>
                ) : riwayatSurat.length === 0 ? (
                  <div className="text-gray-400">Belum ada pengajuan surat.</div>
                ) : (
                  <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full border text-sm md:text-base">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-4 py-2">ID</th>
                          <th className="px-4 py-2">Jenis Surat</th>
                          <th className="px-4 py-2">Tanggal Pengajuan</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {riwayatSurat.map((s) => (
                          <tr key={s.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-center">{s.id}</td>
                            <td className="px-4 py-2">{s.jenis_surat}</td>
                            <td className="px-4 py-2 text-center">{new Date(s.tanggal_pengajuan).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-2 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                s.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                                s.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-200 text-gray-700'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                className="px-3 py-1 rounded bg-primary text-white text-xs font-bold hover:bg-blue-800 transition"
                                onClick={() => navigate(user.role === 'admin' ? `/admin/surat-masuk/${s.id}` : `/surat/${s.id}`)}
                              >
                                Lihat Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Box Riwayat Pengaduan */}
            {user.role !== 'admin' && (
              <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Riwayat Pengaduan</h3>
                {loadingPengaduan ? (
                  <div className="text-gray-500">Memuat riwayat pengaduan...</div>
                ) : errorPengaduan ? (
                  <div className="text-red-500">{errorPengaduan}</div>
                ) : riwayatPengaduan.length === 0 ? (
                  <div className="text-gray-400">Belum ada pengaduan.</div>
                ) : (
                  <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full border text-sm md:text-base">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-4 py-2">ID</th>
                          <th className="px-4 py-2">Judul</th>
                          <th className="px-4 py-2">Tanggal Pengaduan</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {riwayatPengaduan.map((p) => (
                          <tr key={p.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-center">{p.id}</td>
                            <td className="px-4 py-2">{p.judul}</td>
                            <td className="px-4 py-2 text-center">{new Date(p.tanggal_pengaduan).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-2 text-center">{p.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowPasswordChange(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex flex-col items-center">
                  <svg
                    className="w-6 h-6 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <span className="text-sm">Ganti Password</span>
                </div>
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-2xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex flex-col items-center">
                  <svg
                    className="w-6 h-6 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="text-sm">Hapus Akun</span>
                </div>
              </button>

              <button
                onClick={() => setShowLogout(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-2xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex flex-col items-center">
                  <svg
                    className="w-6 h-6 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-sm">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDelete && (
        <Modal
          title="Konfirmasi Hapus Akun"
          message="Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
          confirmLabel="Ya, Hapus"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {showLogout && (
        <Modal
          title="Konfirmasi Logout"
          message="Apakah Anda yakin ingin logout?"
          confirmLabel="Ya, Logout"
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}

      {showPasswordChange && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ganti Password
              </h3>
              <p className="text-gray-600 text-sm">
                Masukkan password lama dan password baru Anda
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-medium">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password Saat Ini
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({
                      ...f,
                      currentPassword: e.target.value,
                    }))
                  }
                  required
                  placeholder="Masukkan password saat ini"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password Baru
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({
                      ...f,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                  placeholder="Minimal 6 karakter"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((f) => ({
                      ...f,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                  placeholder="Ulangi password baru"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Edit Profil
              </h3>
              <p className="text-gray-600 text-sm">
                Ubah informasi akun Anda
              </p>
            </div>

            {/* Profile Image Upload Section */}
            <div className="mb-6">
              <label className="block mb-3 text-sm font-medium text-gray-700 text-center">
                Foto Profil
              </label>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white border-4 border-white shadow-lg overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.fullName ? user.fullName[0].toUpperCase() : 'U'
                    )}
                  </div>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profile-image-input"
                  />
                  <label
                    htmlFor="profile-image-input"
                    className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium text-center transition-colors border border-blue-200"
                  >
                    {imagePreview ? 'Ganti Foto' : 'Pilih Foto'}
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-red-200"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Format: JPG, PNG, GIF. Maksimal 5MB
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-medium">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                  value={editForm.fullName}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      fullName: e.target.value,
                    }))
                  }
                  required
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      email: e.target.value,
                    }))
                  }
                  required
                  placeholder="Masukkan email"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Masukkan nomor telepon"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
