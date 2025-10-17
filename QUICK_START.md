# 🚀 Quick Start Guide

## ✅ Fix for "Missing script: start" Error

You tried to run `npm start` from the root directory, but the scripts are in the `backend` and `frontend` folders.

I've created multiple ways to start the application. **Choose your preferred method:**

---

## 🎯 Method 1: Use Start Scripts (EASIEST)

### Option A: Start Everything at Once

**Double-click** or run in terminal:
```bash
start.bat
```

This will:
- ✅ Check MongoDB status
- ✅ Start backend server
- ✅ Start frontend server
- ✅ Open browser automatically

### Option B: Start Backend Only

**Double-click** or run:
```bash
start-backend.bat
```

### Option C: Start Frontend Only

**Double-click** or run:
```bash
start-frontend.bat
```

### Option D: PowerShell Script

```powershell
.\start.ps1
```

---

## 🎯 Method 2: Use npm from Root Directory

Now you can use these commands from the **root directory**:

```bash
# Check MongoDB connection
npm run check-db

# Start backend only
npm run dev:backend

# Start frontend only  
npm run dev:frontend

# Install all dependencies (backend + frontend)
npm run install:all

# Test the API
npm run test-api
```

**Note**: The `npm start` command now works and will guide you to use `npm run dev`.

---

## 🎯 Method 3: Manual Start (Traditional Way)

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

## 📋 Current File Structure

```
JWT PROJECT/
├── package.json           ← NEW! Root package.json with scripts
├── start.bat             ← UPDATED! Main startup script
├── start.ps1             ← NEW! PowerShell startup script
├── start-backend.bat     ← NEW! Backend only
├── start-frontend.bat    ← NEW! Frontend only
├── check-mongodb.js      ← Check MongoDB connection
├── backend/
│   ├── package.json      ← Backend scripts
│   └── ...
└── frontend/
    ├── package.json      ← Frontend scripts
    └── ...
```

---

## 🎯 Recommended Workflow

### First Time Setup:

1. **Install MongoDB** (if not done):
   - See: `MONGODB_SETUP.md`

2. **Check MongoDB**:
   ```bash
   npm run check-db
   ```

3. **Start the app**:
   ```bash
   start.bat
   ```
   Or double-click `start.bat`

### Daily Development:

**Option 1**: Double-click `start.bat` (opens 2 terminal windows)

**Option 2**: Use two separate terminals:
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

---

## 🐛 Troubleshooting "Missing script" Error

### If you see this error again:

```
npm error Missing script: "start"
```

**Cause**: You're in the wrong directory

**Solution**: Make sure you're in one of these locations:

1. **Root directory** (`JWT PROJECT/`) - Use new scripts:
   ```bash
   npm run check-db
   npm run dev:backend
   npm run dev:frontend
   ```

2. **Backend directory** (`backend/`) - Use:
   ```bash
   npm start
   npm run dev
   ```

3. **Frontend directory** (`frontend/`) - Use:
   ```bash
   npm run dev
   ```

---

## 📊 Available npm Scripts

### Root Directory (`JWT PROJECT/`):

| Command | Description |
|---------|-------------|
| `npm run check-db` | Check MongoDB connection |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run install:all` | Install all dependencies |
| `npm run test-api` | Test backend API |

### Backend Directory (`backend/`):

| Command | Description |
|---------|-------------|
| `npm start` | Start backend (production) |
| `npm run dev` | Start backend (development with nodemon) |
| `npm run check-db` | Check MongoDB connection |

### Frontend Directory (`frontend/`):

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## ✅ Verify Everything is Working

After starting the application:

### 1. Check Backend:
- Terminal shows: `Server is running on port 5000`
- Visit: http://localhost:5000/api/health
- Should see: `{"status":"OK","message":"Server is running"}`

### 2. Check Frontend:
- Terminal shows: `Local: http://localhost:5173/`
- Visit: http://localhost:5173
- Should see: Login page

### 3. Check MongoDB:
```bash
npm run check-db
```
Should show: `✅ SUCCESS! MongoDB is connected`

---

## 🎯 Quick Commands Reference

### From Root Directory:

```bash
# Start everything
start.bat

# Check MongoDB
npm run check-db

# Test API
npm run test-api

# Install dependencies
npm run install:all
```

### From Backend:

```bash
cd backend
npm run dev
```

### From Frontend:

```bash
cd frontend
npm run dev
```

---

## 💡 Pro Tips

1. **Use `start.bat` for quickest startup** - Just double-click it!

2. **Keep terminals open** - Don't close the backend/frontend terminal windows while using the app

3. **Check MongoDB first** - Run `npm run check-db` before starting if you have issues

4. **Use separate terminals for debugging** - Easier to see logs from backend and frontend separately

---

## 🆘 Still Getting Errors?

### Error: "Missing script"
- Make sure you're in the correct directory
- Check that `package.json` exists in that directory
- Use the table above to see available scripts

### Error: "MongoDB connection error"
- Run: `npm run check-db`
- See: `MONGODB_SETUP.md`

### Error: "Port already in use"
- Close other instances of the app
- Or change ports in `.env` file

---

## 📚 More Help

- **MongoDB Setup**: `MONGODB_SETUP.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **Features Guide**: `FEATURES_GUIDE.md`
- **Main README**: `README.md`

---

## ✅ Summary

**Problem**: `npm error Missing script: "start"`

**Cause**: No `package.json` in root directory

**Fixed**: ✅ Created root `package.json` with all necessary scripts

**Now you can**:
- ✅ Run `npm run check-db` from root
- ✅ Run `npm run dev:backend` from root
- ✅ Run `npm run dev:frontend` from root
- ✅ Or just double-click `start.bat`

**Recommended**: Just run `start.bat` - it does everything! 🚀

---

**Happy Coding!** 👨‍💻
