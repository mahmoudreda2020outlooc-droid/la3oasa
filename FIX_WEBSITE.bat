@echo off
echo Stopping all running servers...
taskkill /F /IM node.exe
echo.
echo Clearing temp files and cache (this fixes the "No change" issue)...
rd /s /q ".next"
echo.
echo Starting La3osa Website fresh...
echo This might take a minute to rebuild. Please wait.
cd /d "%~dp0"
start "" "http://localhost:3000"
npm run dev
pause
