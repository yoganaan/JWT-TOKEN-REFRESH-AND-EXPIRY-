# 🔧 MongoDB Setup - Fix Connection Error

## ❌ Current Problem

Your backend is showing this error:
```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

This means **MongoDB is not running** on your computer.

---

## ✅ Solution Options

Choose **ONE** of the following options:

---

## 🚀 Option 1: Install MongoDB Locally (RECOMMENDED)

### Step 1: Download MongoDB

1. Visit: https://www.mongodb.com/try/download/community
2. Download **MongoDB Community Server** for Windows
3. Version: Latest stable version (7.0 or higher)

### Step 2: Install MongoDB

1. Run the downloaded `.msi` installer
2. Choose **"Complete"** installation type
3. **IMPORTANT**: Check these boxes:
   - ✅ Install MongoDB as a Service
   - ✅ Run service as Network Service user
   - Service Name: `MongoDB`
4. Optionally install **MongoDB Compass** (GUI tool)
5. Click "Install" and wait for completion

### Step 3: Verify MongoDB is Running

Open PowerShell and run:
```powershell
# Check if MongoDB service exists
Get-Service -Name MongoDB

# If not running, start it
net start MongoDB
```

### Step 4: Test Connection

```powershell
# Connect to MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/
# Connected successfully!
```

### Step 5: Restart Backend

The backend server will automatically reconnect once MongoDB is running.
You should see: `✅ MongoDB connected successfully`

---

## ☁️ Option 2: Use MongoDB Atlas (Cloud - FREE)

If you don't want to install MongoDB locally, use the cloud version:

### Step 1: Create Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google account
3. Choose **FREE** tier (M0 Sandbox)

### Step 2: Create Cluster

1. Choose Cloud Provider: **AWS** (or any)
2. Choose Region: Closest to you
3. Cluster Name: `jwt-auth-cluster`
4. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Click **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `admin`
5. Password: `admin123` (or create strong password)
6. Database User Privileges: **Atlas Admin**
7. Click **"Add User"**

### Step 4: Whitelist IP Address

1. Click **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string:
   ```
   mongodb+srv://admin:<password>@jwt-auth-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Backend .env File

1. Open: `backend/.env`
2. Replace the `MONGODB_URI` line with:
   ```env
   MONGODB_URI=mongodb+srv://admin:admin123@jwt-auth-cluster.xxxxx.mongodb.net/jwt_auth_db?retryWrites=true&w=majority
   ```
   **Replace:**
   - `admin123` with your actual password
   - `jwt-auth-cluster.xxxxx` with your actual cluster name

3. Save the file

### Step 7: Verify Connection

The backend will automatically restart (nodemon) and connect to Atlas.
Look for: `✅ MongoDB connected successfully`

---

## 🔍 Option 3: Quick Test with Docker (Advanced)

If you have Docker installed:

```powershell
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Check it's running
docker ps
```

---

## ✅ How to Know It's Working

Once MongoDB is connected, you'll see:

### Backend Terminal:
```
Server is running on port 5000
✅ MongoDB connected successfully
```

### No More Errors Like:
```
❌ MongoDB connection error: ECONNREFUSED
❌ Operation `users.findOne()` buffering timed out
```

---

## 🧪 Test the Connection

### Method 1: Use the Test Script

```powershell
cd "c:\Users\mass9\OneDrive\Desktop\JWT PROJECT"
node test-api.js
```

Expected output:
```
🧪 Testing JWT Authentication API...
1️⃣ Testing Health Check...
✅ Health Check: { status: 'OK', message: 'Server is running' }
2️⃣ Testing User Registration...
✅ Registration: Success
✅ Access Token: Received
...
```

### Method 2: Use Browser

1. Open: http://localhost:5173
2. Click "Register here"
3. Fill in the form and submit
4. If successful → You'll see the dashboard
5. If MongoDB issue → You'll see an error message

---

## 🐛 Troubleshooting

### Problem: "Get-Service: Cannot find service 'MongoDB'"

**Solution**: MongoDB is not installed. Follow Option 1 or use Option 2 (Atlas).

---

### Problem: "MongoDB service won't start"

**Solution**:
```powershell
# Check if another service is using port 27017
netstat -ano | findstr :27017

# If something is using it, stop that process or change MongoDB port
```

---

### Problem: "Authentication failed" with Atlas

**Solution**:
1. Check username/password in connection string
2. Verify IP whitelist includes your IP
3. Make sure you created the database user correctly

---

### Problem: Backend keeps showing connection errors

**Solution**:
1. Stop backend: Press `Ctrl + C` in backend terminal
2. Fix MongoDB connection (choose Option 1 or 2)
3. Restart backend: `npm run dev`

---

## 📋 Quick Checklist

Before moving forward, verify:

- [ ] MongoDB is installed OR Atlas cluster created
- [ ] MongoDB service is running OR connection string updated
- [ ] Backend terminal shows "MongoDB connected successfully"
- [ ] No "ECONNREFUSED" errors in backend
- [ ] Can register a new user in the frontend
- [ ] Can see users in admin dashboard

---

## 🎯 Recommended Option

For **learning/development**: Use **Option 1** (Local MongoDB)
- ✅ Faster
- ✅ No internet required
- ✅ Full control

For **quick start/production**: Use **Option 2** (MongoDB Atlas)
- ✅ No installation needed
- ✅ Free tier available
- ✅ Automatic backups

---

## 🆘 Still Having Issues?

1. **Check backend terminal** for specific error messages
2. **Verify MongoDB is actually running**: `Get-Service -Name MongoDB`
3. **Test MongoDB connection** directly: `mongosh`
4. **Check firewall** isn't blocking port 27017
5. **Try restarting** your computer (sometimes helps with service issues)

---

## ✅ Once Fixed

After MongoDB is connected:

1. **Refresh your browser** (http://localhost:5173)
2. **Register a new admin user**:
   - Username: admin
   - Email: admin@example.com  
   - Password: admin123
   - Role: **Admin**
3. **Access Admin Dashboard** to see MongoDB users
4. **Everything should work perfectly!** 🎉

---

**Next Step**: Choose Option 1 or 2 above and follow the steps!
