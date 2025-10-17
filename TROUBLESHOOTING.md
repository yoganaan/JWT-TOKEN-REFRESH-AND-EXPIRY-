# 🔧 Troubleshooting Guide

## Current Issues & Solutions

---

## ❌ Issue 1: MongoDB Connection Error

### Error Message:
```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
Operation `users.findOne()` buffering timed out after 10000ms
```

### ✅ Solution:

**MongoDB is not running!** Follow these steps:

#### Quick Fix (Windows):

1. **Check if MongoDB is installed:**
   ```powershell
   Get-Service -Name MongoDB
   ```

2. **If installed, start the service:**
   ```powershell
   net start MongoDB
   ```

3. **If not installed, choose one option:**

   **Option A: Install MongoDB Locally**
   - Download: https://www.mongodb.com/try/download/community
   - See: [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed steps

   **Option B: Use MongoDB Atlas (Cloud - Free)**
   - Sign up: https://www.mongodb.com/cloud/atlas
   - See: [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed steps

4. **Verify connection:**
   ```bash
   node check-mongodb.js
   ```

---

## ❌ Issue 2: Backend Won't Start

### Symptoms:
- Backend terminal shows errors
- Cannot connect to http://localhost:5000

### ✅ Solutions:

1. **Check if dependencies are installed:**
   ```bash
   cd backend
   npm install
   ```

2. **Verify .env file exists:**
   - Location: `backend/.env`
   - Should contain: MONGODB_URI, PORT, JWT secrets

3. **Check if port 5000 is already in use:**
   ```powershell
   netstat -ano | findstr :5000
   ```
   If something is using it, either:
   - Stop that process
   - Change PORT in `.env` to another port (e.g., 5001)

---

## ❌ Issue 3: Frontend Shows "Network Error"

### Symptoms:
- Can't login or register
- Console shows network errors
- Red error messages in UI

### ✅ Solutions:

1. **Ensure backend is running:**
   - Check terminal shows: "Server is running on port 5000"
   - Visit: http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Check CORS settings:**
   - Backend `server.js` should have correct frontend URL
   - Should be: `http://localhost:5173`

3. **Clear browser cache and localStorage:**
   ```javascript
   // In browser console (F12)
   localStorage.clear();
   location.reload();
   ```

---

## ❌ Issue 4: "Cannot register user" / "Cannot login"

### Error in Backend:
```
Operation `users.findOne()` buffering timed out
```

### ✅ Solution:

This is a **MongoDB connection issue**. See Issue 1 above.

---

## ❌ Issue 5: Admin Dashboard Not Loading

### Symptoms:
- Empty user list
- No statistics showing
- Console errors

### ✅ Solutions:

1. **Check if logged in as admin:**
   - Role must be "admin"
   - Re-register with Admin role if needed

2. **Verify MongoDB has users:**
   ```bash
   # If using local MongoDB
   mongosh
   use jwt_auth_db
   db.users.find()
   ```

3. **Check backend API:**
   - Visit: http://localhost:5000/api/admin/users
   - Should require authentication

---

## ❌ Issue 6: Token Expired Errors

### Symptoms:
- Keeps logging out
- "Token expired" messages

### ✅ Solutions:

1. **Clear old tokens:**
   ```javascript
   // Browser console
   localStorage.removeItem('accessToken');
   localStorage.removeItem('user');
   document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
   ```

2. **Re-login:**
   - Go to login page
   - Login again with correct credentials

3. **Check token expiry settings:**
   - `backend/.env` → `ACCESS_TOKEN_EXPIRY=15m`
   - Should auto-refresh, but if not, see above

---

## ❌ Issue 7: "Module not found" Errors

### Error:
```
Error: Cannot find module 'express'
```

### ✅ Solution:

Dependencies not installed:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## 🔍 Diagnostic Commands

Run these to check system status:

### 1. Check MongoDB Connection
```bash
node check-mongodb.js
```

### 2. Check if Backend is Running
```bash
curl http://localhost:5000/api/health
# OR visit in browser
```

### 3. Check if Frontend is Running
```bash
# Visit: http://localhost:5173
```

### 4. Check MongoDB Service (Windows)
```powershell
Get-Service -Name MongoDB
```

### 5. Check Ports in Use
```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :27017
```

---

## 📋 Pre-Flight Checklist

Before using the application, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] MongoDB is installed and running
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] `.env` file exists in `backend/`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access: http://localhost:5000/api/health
- [ ] Can access: http://localhost:5173
- [ ] MongoDB connection successful (run `node check-mongodb.js`)

---

## 🆘 Still Having Issues?

1. **Stop all servers:**
   - Press `Ctrl + C` in all terminal windows

2. **Restart MongoDB:**
   ```powershell
   net stop MongoDB
   net start MongoDB
   ```

3. **Clear all caches:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules
   npm install

   # Frontend
   cd frontend
   rm -rf node_modules
   npm install
   ```

4. **Restart everything:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Check logs:**
   - Backend terminal for errors
   - Frontend terminal for errors
   - Browser console (F12) for frontend errors

---

## 📞 Common Error Messages Explained

| Error | Meaning | Solution |
|-------|---------|----------|
| `ECONNREFUSED` | MongoDB not running | Start MongoDB service |
| `buffering timed out` | MongoDB not connected | See Issue 1 |
| `401 Unauthorized` | Invalid/expired token | Re-login |
| `403 Forbidden` | Not admin user | Login as admin |
| `CORS error` | Backend/Frontend mismatch | Check ports |
| `Module not found` | Missing dependencies | Run `npm install` |

---

## ✅ Success Indicators

When everything is working:

### Backend Terminal:
```
Server is running on port 5000
✅ MongoDB connected successfully
📊 Database: Local MongoDB
```

### Frontend Terminal:
```
ROLLDOWN-VITE v7.1.14 ready
➜ Local: http://localhost:5173/
```

### Browser:
- ✅ Can register new users
- ✅ Can login
- ✅ Can see dashboard
- ✅ Admin can see user list
- ✅ No console errors

---

## 🎯 Most Common Issue

**95% of problems are due to MongoDB not running!**

**Quick fix:**
```powershell
net start MongoDB
```

**Or use MongoDB Atlas (cloud):** See [MONGODB_SETUP.md](MONGODB_SETUP.md)

---

## 📚 Additional Resources

- **MongoDB Setup**: [MONGODB_SETUP.md](MONGODB_SETUP.md)
- **Features Testing**: [FEATURES_GUIDE.md](FEATURES_GUIDE.md)
- **Project Overview**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **Main README**: [README.md](README.md)

---

**Remember**: Most issues are simple fixes! Check MongoDB first! 🚀
