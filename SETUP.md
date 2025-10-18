# Quick Setup Guide

## ✅ What's Already Done

1. ✅ Frontend is running on http://localhost:5173
2. ✅ Backend is running on http://localhost:5000
3. ✅ All dependencies are installed
4. ✅ All code files are created

## ⚠️ MongoDB Setup Required

The backend server is running but needs MongoDB to be installed and running. Choose one of the options below:

### Option 1: Install MongoDB Locally (Recommended for Development)

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows version
   - Run the installer

2. **Install MongoDB**
   - Choose "Complete" installation
   - Install MongoDB as a Service (check the box)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify MongoDB is Running**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   
   # Or start it manually if needed
   net start MongoDB
   ```

4. **Restart Backend Server**
   - The backend will automatically connect to MongoDB once it's running
   - You should see "MongoDB connected successfully" in the backend terminal

### Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster**
   - Choose the FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`

4. **Update Backend .env File**
   ```env
   MONGODB_URI=mongodb+srv://username:yourpassword@cluster.xxxxx.mongodb.net/jwt_auth_db?retryWrites=true&w=majority
   ```
   - Replace `username` and `yourpassword` with your credentials
   - The backend will automatically restart and connect

5. **Whitelist Your IP**
   - In Atlas, go to Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)

## 🚀 Testing the Application

Once MongoDB is connected, you can:

1. **Open the Application**
   - Click the preview button above
   - Or visit: http://localhost:5173

2. **Register a New User**
   - Click "Register here"
   - Fill in the form:
     - Username: admin
     - Email: admin@example.com
     - Password: admin123
     - Role: **Admin** (important!)
   - Click Register

3. **View Admin Dashboard**
   - You'll be redirected to the Admin Dashboard
   - You can see all registered users
   - View user statistics

4. **Test Token Refresh**
   - The access token expires in 15 minutes
   - It will automatically refresh without logging you out
   - You can check the browser console to see the refresh happening

5. **Register a Regular User**
   - Logout and register another user with "User" role
   - Login as this user to see the regular user dashboard

## 📝 Current Status

- ✅ Frontend: Running on port 5173
- ✅ Backend: Running on port 5000
- ⏳ MongoDB: Waiting to connect

## 🔧 Troubleshooting

### Backend keeps restarting
- This is normal with nodemon during development
- It will stabilize once MongoDB connects

### Can't connect to MongoDB
- Make sure MongoDB is installed and running (Option 1)
- Or use MongoDB Atlas cloud database (Option 2)
- Check your .env file has the correct MONGODB_URI

### CORS errors
- Make sure backend is on port 5000
- Make sure frontend is on port 5173
- Restart both servers if needed

### Token issues
- Clear browser localStorage: Open DevTools > Application > Local Storage > Clear
- Clear cookies: Application > Cookies > Clear
- Re-login

## 📞 Need Help?

Check the main README.md file for detailed documentation on:
- API endpoints
- Project structure
- Security features
- How JWT refresh works

---

**Next Step:** Install and start MongoDB, then refresh your browser to use the application!
