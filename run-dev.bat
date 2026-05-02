@echo off
set PATH=D:\Rare_politics\node-portable;%PATH%
set NODE_SKIP_PLATFORM_CHECK=1
echo Using portable Node.js...
node --version
npm --version
npm run dev
pause
