@echo off
echo ====================================================
echo    Test Upload Gambar WebSidomulyo
echo ====================================================
echo.

echo [1/4] Checking upload directory...
if not exist "backend\uploads" (
    echo Creating uploads directory...
    mkdir "backend\uploads"
    echo ✓ Uploads directory created
) else (
    echo ✓ Uploads directory exists
)

echo.
echo [2/4] Checking files in uploads directory...
dir "backend\uploads\*.*" /b 2>nul
if %errorlevel% neq 0 (
    echo No files found in uploads directory
) else (
    echo Files found in uploads directory
)

echo.
echo [3/4] Testing image URL access...
echo Testing: http://localhost:5000/uploads/
echo.
echo If you have uploaded images, you can test them at:
echo http://localhost:5000/uploads/[filename]
echo.

echo [4/4] Database check...
echo Checking berita with images in database...
mysql -u root -p -e "USE websidomulyo; SELECT id, title, img FROM berita WHERE img IS NOT NULL;" 2>nul
if %errorlevel% neq 0 (
    echo Could not connect to database or no images found
) else (
    echo Database check completed
)

echo.
echo ====================================================
echo    TROUBLESHOOTING TIPS:
echo ====================================================
echo.
echo 1. Make sure backend is running: npm run dev:backend
echo 2. Check uploads directory: backend\uploads\
echo 3. Test image URL: http://localhost:5000/uploads/[filename]
echo 4. Check browser console for image loading errors
echo 5. Verify image URLs in database are absolute URLs
echo.
echo ====================================================
pause 