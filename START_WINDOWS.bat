@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo MONOLITH / INSTALL DEPENDENCIES
call npm.cmd install
if errorlevel 1 (echo Install failed. Check Node.js and internet connection.&pause&exit /b 1)
echo MONOLITH / START DEVELOPMENT SERVER
call npm.cmd run dev
pause
