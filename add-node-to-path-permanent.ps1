# Run this script as Administrator
Write-Host "RarePolitics - Permanent Node.js PATH Fixer" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Find Node.js installations
$nodePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:APPDATA\nodejs",
    "$env:LOCALAPPDATA\fnpm",
    "$env:LOCALAPPDATA\nodejs",
    "$env:USERPROFILE\scoop\shims"
)

$foundPath = $null
foreach ($path in $nodePaths) {
    if (Test-Path "$path\node.exe") {
        $foundPath = $path
        Write-Host "✓ Found Node.js at: $foundPath" -ForegroundColor Green
        break
    }
}

if ($foundPath -eq $null) {
    Write-Host "✗ Node.js not found. Please install Node.js v20 LTS" -ForegroundColor Red
    exit 1
}

# Add to System PATH (requires Admin)
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$foundPath*") {
    Write-Host "Adding to System PATH..." -ForegroundColor Yellow
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$foundPath", "Machine")
    Write-Host "✓ Added to System PATH" -ForegroundColor Green
} else {
    Write-Host "✓ Node.js already in System PATH" -ForegroundColor Green
}

# Add to User PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$foundPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$foundPath", "User")
    Write-Host "✓ Added to User PATH" -ForegroundColor Green
}

Write-Host ""
Write-Host "IMPORTANT: Please restart your terminal for changes to take effect." -ForegroundColor Yellow
Write-Host "Then run 'node --version' to verify." -ForegroundColor Yellow
