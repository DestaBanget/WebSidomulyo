@echo off
echo Running database migration for profile_image column...
echo.

REM Ganti dengan kredensial database Anda
mysql -u root -p websidomulyo < add_profile_image.sql

echo.
echo Migration completed!
pause 