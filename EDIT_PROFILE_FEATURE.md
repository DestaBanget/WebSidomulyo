# Fitur Edit Profil - WebSidomulyo

## Overview
Fitur edit profil memungkinkan user untuk mengupdate data pribadi mereka seperti nama, email, dan nomor HP, serta mengubah password.

## Backend Endpoints

### 1. Update Profile
**Endpoint:** `PUT /api/auth/profile`  
**Authentication:** Required (Bearer Token)  
**Body:**
```json
{
  "nama": "string (required)",
  "email": "string (required, valid email)",
  "no_hp": "string (optional, valid Indonesian phone number)"
}
```

**Response Success:**
```json
{
  "message": "Profil berhasil diupdate",
  "user": {
    "id": 1,
    "username": "admin",
    "nama": "Administrator Updated",
    "email": "admin.updated@example.com",
    "no_hp": "08123456789",
    "role": "admin"
  }
}
```

**Response Error:**
```json
{
  "error": "Email sudah digunakan oleh user lain"
}
```

### 2. Change Password
**Endpoint:** `PUT /api/auth/change-password`  
**Authentication:** Required (Bearer Token)  
**Body:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 6 characters)"
}
```

**Response Success:**
```json
{
  "message": "Password berhasil diubah"
}
```

**Response Error:**
```json
{
  "error": "Password saat ini salah"
}
```

## Frontend Components

### 1. EditProfile Component
**File:** `frontend/src/components/EditProfile.jsx`

**Features:**
- Form untuk mengupdate nama, email, dan nomor HP
- Validasi form real-time
- Error handling dan success messages
- Auto-update user data di AuthContext

**Usage:**
```jsx
import EditProfile from '../components/EditProfile';

function ProfilePage() {
  return (
    <div>
      <EditProfile />
    </div>
  );
}
```

### 2. ChangePassword Component
**File:** `frontend/src/components/ChangePassword.jsx`

**Features:**
- Form untuk mengubah password
- Validasi password (min 6 karakter)
- Konfirmasi password
- Error handling dan success messages

**Usage:**
```jsx
import ChangePassword from '../components/ChangePassword';

function ProfilePage() {
  return (
    <div>
      <ChangePassword />
    </div>
  );
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  no_hp VARCHAR(20),
  role ENUM('admin', 'warga') DEFAULT 'warga',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Validation Rules

### Profile Update
- **nama**: Required, tidak boleh kosong
- **email**: Required, format email valid, unique (kecuali user sendiri)
- **no_hp**: Optional, format nomor HP Indonesia valid

### Password Change
- **currentPassword**: Required, harus cocok dengan password saat ini
- **newPassword**: Required, minimal 6 karakter

## Security Features

1. **Authentication Required**: Semua endpoint memerlukan token JWT
2. **Password Hashing**: Password baru di-hash menggunakan bcrypt
3. **Email Uniqueness**: Validasi email tidak boleh duplikat
4. **Input Validation**: Validasi input menggunakan express-validator
5. **Error Handling**: Error handling yang komprehensif

## Testing

### Manual Testing
1. Login sebagai user
2. Akses halaman profil
3. Update data profil (nama, email, no_hp)
4. Ubah password
5. Verifikasi perubahan berhasil

### Automated Testing
Jalankan script test:
```bash
# Windows
test-edit-profile.bat

# Linux/Mac
node test-edit-profile.js
```

## Integration with Existing System

### AuthContext Integration
Komponen EditProfile menggunakan `updateUser` function dari AuthContext untuk memperbarui data user secara real-time.

### API Integration
Semua request menggunakan `API_BASE_URL` dari config untuk konsistensi.

## Error Handling

### Common Errors
1. **400 Bad Request**: Data tidak valid atau email sudah digunakan
2. **401 Unauthorized**: Token tidak valid atau expired
3. **404 Not Found**: User tidak ditemukan
4. **500 Internal Server Error**: Kesalahan server

### User Feedback
- Error messages ditampilkan dalam alert merah
- Success messages ditampilkan dalam alert hijau
- Loading states untuk feedback visual

## Future Enhancements

1. **Profile Picture Upload**: Tambah fitur upload foto profil
2. **Email Verification**: Verifikasi email saat update
3. **Two-Factor Authentication**: Tambah 2FA untuk keamanan
4. **Activity Log**: Log perubahan profil untuk audit
5. **Social Login**: Integrasi dengan Google/Facebook login 