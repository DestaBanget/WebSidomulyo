@echo off
echo Updating struktur organisasi database...
echo.

REM Check if MySQL is available
mysql --version >nul 2>&1
if errorlevel 1 (
    echo Error: MySQL command line client not found in PATH
    echo Please make sure MySQL is installed and mysql.exe is in your PATH
    pause
    exit /b 1
)

REM Update the database
echo Executing SQL script...
mysql -u root -p websidomulyo < update_struktur_organisasi.sql

if errorlevel 1 (
    echo Error: Failed to update database
    pause
    exit /b 1
)

echo.
echo Struktur organisasi berhasil diupdate!
echo Data telah disesuaikan dengan struktur organisasi Sidomulyo yang benar.
echo.
pause 