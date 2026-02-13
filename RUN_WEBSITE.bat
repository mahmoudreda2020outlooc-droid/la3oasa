@echo off
echo Starting La3osa Website...
echo Please wait for the server to start...
cd /d "%~dp0"
start "" "http://localhost:3000"
npm run dev
pause
