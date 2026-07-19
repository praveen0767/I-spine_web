# RarePolitics - Node.js Error Fix Guide

## Error: "node.exe not found"

### Quick Fix (Recommended):
1. Close all terminals/command prompts
2. Run `fix-node-path.bat` as Administrator
3. Restart your IDE (VS Code, etc.)
4. Run `npm run dev`

### Permanent Fix:
1. Install Node.js v20.10.0 LTS from https://nodejs.org/
2. During installation, check "Add to PATH"
3. Restart your computer
4. Verify with `node --version` in a new terminal

### Alternative Fix (Manual PATH):
1. Press Win + X → System → Advanced System Settings
2. Click "Environment Variables"
3. Under "System variables", find "Path" → Edit
4. Add: `C:\Program Files\nodejs`
5. Click OK → Restart terminal

### SWC Minifier Warning Fix:
The warning is now fixed in the updated `next.config.js` which has `swcMinify: true`.

### Still Having Issues?
Run these commands in order:
```bash
cd D:\Rare_politics
npm run reset
npm run dev:clean
```

## Verify Everything Works:
- `node --version` shows v20.10.0
- `npm --version` shows v10.2.0+
- `npm run dev` starts server on http://localhost:3000
- No "node.exe not found" error
- No SWC minifier warning
