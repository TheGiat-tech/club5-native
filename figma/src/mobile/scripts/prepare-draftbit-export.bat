@echo off
REM Draftbit Export Preparation Script for Club5 AI (Windows)
REM This script prepares the project for Draftbit export

echo.
echo ========================================
echo   Club5 AI - Draftbit Export (Windows)
echo ========================================
echo.

REM Step 1: Clean up
echo [1/8] Cleaning up...
if exist node_modules rmdir /s /q node_modules
if exist .expo rmdir /s /q .expo
if exist .expo-shared rmdir /s /q .expo-shared
if exist ios rmdir /s /q ios
if exist android rmdir /s /q android
if exist club5-ai-export rmdir /s /q club5-ai-export
if exist club5-ai-draftbit.zip del /q club5-ai-draftbit.zip
echo    Done!
echo.

REM Step 2: Create export directory
echo [2/8] Creating export directory...
mkdir club5-ai-export
echo    Done!
echo.

REM Step 3: Copy essential files
echo [3/8] Copying files...
copy App.tsx club5-ai-export\ >nul
copy babel.config.js club5-ai-export\ >nul
copy tsconfig.json club5-ai-export\ >nul
copy package.draftbit.json club5-ai-export\package.json >nul
copy app.draftbit.json club5-ai-export\app.json >nul
copy draftbit.config.js club5-ai-export\ >nul
xcopy /E /I /Q src club5-ai-export\src >nul
xcopy /E /I /Q assets club5-ai-export\assets >nul
echo    Done!
echo.

REM Step 4: Create README
echo [4/8] Creating README...
(
echo # Club5 AI - Draftbit Ready Export
echo.
echo ## Welcome to Club5 AI!
echo.
echo This is a **Draftbit-ready** export.
echo.
echo ### Import to Draftbit:
echo 1. Go to Draftbit.com
echo 2. New Project -^> Import from Code
echo 3. Upload this folder
echo 4. Start building!
echo.
echo ### First Install:
echo ```
echo npm install
echo npm start
echo ```
echo.
echo **Happy Building!**
) > club5-ai-export\README.md
echo    Done!
echo.

REM Step 5: Create .draftbitrc
echo [5/8] Creating .draftbitrc...
(
echo {
echo   "version": "1.0.0",
echo   "projectName": "Club5 AI",
echo   "expoSdkVersion": "51.0.0",
echo   "compatibility": "2024.1"
echo }
) > club5-ai-export\.draftbitrc
echo    Done!
echo.

REM Step 6: Create import instructions
echo [6/8] Creating import instructions...
(
echo # Import to Draftbit - Quick Guide
echo.
echo ## Upload to Draftbit:
echo 1. Zip this folder
echo 2. Go to Draftbit.com
echo 3. New Project -^> Import from Code
echo 4. Upload zip
echo 5. Done!
) > club5-ai-export\IMPORT_TO_DRAFTBIT.md
echo    Done!
echo.

REM Step 7: Validate
echo [7/8] Validating structure...
if exist club5-ai-export\App.tsx (echo    [OK] App.tsx) else (echo    [X] App.tsx MISSING!)
if exist club5-ai-export\package.json (echo    [OK] package.json) else (echo    [X] package.json MISSING!)
if exist club5-ai-export\app.json (echo    [OK] app.json) else (echo    [X] app.json MISSING!)
if exist club5-ai-export\src (echo    [OK] src/) else (echo    [X] src/ MISSING!)
if exist club5-ai-export\assets (echo    [OK] assets/) else (echo    [X] assets/ MISSING!)
echo    Done!
echo.

REM Step 8: Info about zip
echo [8/8] Almost done!
echo    Please manually zip the 'club5-ai-export' folder
echo    Or use: 7-Zip / WinRAR to create club5-ai-draftbit.zip
echo.

REM Summary
echo ========================================
echo   Export Ready!
echo ========================================
echo.
echo Export Folder: club5-ai-export\
echo.
echo Next Steps:
echo   1. Zip the club5-ai-export folder
echo   2. Go to Draftbit.com
echo   3. Import from Code
echo   4. Upload the zip
echo.
echo Happy Building!
echo.
pause
