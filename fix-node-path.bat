@echo off
TITLE RarePolitics - Node.js Path Fixer
COLOR 0E

echo ===============================================
echo    RarePolitics Node.js Environment Fixer
echo ===============================================
echo.

echo [1] Checking for Node.js installations...
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [✓] Node.js found in PATH
    node --version
    goto :check_npm
)

echo [X] Node.js NOT found in current PATH
echo.
echo [2] Searching common installation paths...

set NODE_PATHS=
if exist "C:\Program Files\nodejs\node.exe" set NODE_PATHS=%NODE_PATHS%;C:\Program Files\nodejs
if exist "C:\Program Files (x86)\nodejs\node.exe" set NODE_PATHS=%NODE_PATHS%;C:\Program Files (x86)\nodejs
if exist "%APPDATA%\nodejs\node.exe" set NODE_PATHS=%NODE_PATHS%;%APPDATA%\nodejs
if exist "%USERPROFILE%\AppData\Local\fnpm\node.exe" set NODE_PATHS=%NODE_PATHS%;%USERPROFILE%\AppData\Local\fnpm
if exist "%USERPROFILE%\scoop\shims\node.exe" set NODE_PATHS=%NODE_PATHS%;%USERPROFILE%\scoop\shims

if "%NODE_PATHS%"=="" (
    echo [X] No Node.js installation found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: v20.10.0 LTS
    pause
    exit /b 1
)

echo [✓] Found Node.js at: %NODE_PATHS%
echo.
echo [3] Adding to current session PATH...
set PATH=%PATH%%NODE_PATHS%

echo [4] Verifying Node.js...
node --version
if %errorlevel% neq 0 (
    echo [X] Still cannot run Node.js. Please restart your terminal.
    pause
    exit /b 1
)

:check_npm
echo.
echo [5] Checking npm...
npm --version

echo.
echo [6] Installing/Reinstalling dependencies...
cd /d "D:\Rare_politics"
if exist "node_modules" (
    echo Removing old node_modules...
    rmdir /s /q node_modules 2>nul
)
if exist "package-lock.json" del package-lock.json

echo Running npm install...
call npm install --legacy-peer-deps

echo.
echo [7] Fixing Next.js SWC configuration...
if not exist "next.config.js" (
    echo Creating next.config.js...
    echo /** @type {import('next').NextConfig} */ > next.config.js
    echo const nextConfig = { >> next.config.js
    echo   swcMinify: true, >> next.config.js
    echo   reactStrictMode: true, >> next.config.js
    echo   transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'], >> next.config.js
    echo }; >> next.config.js
    echo module.exports = nextConfig; >> next.config.js
) else (
    echo Updating existing next.config.js...
)

echo.
echo ===============================================
echo    Fix Complete! Starting development server...
echo ===============================================
echo.

call npm run dev
pause
