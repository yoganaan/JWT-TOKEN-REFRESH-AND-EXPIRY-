# 👤 User Guide - How to Access the Website

## 🌐 **Accessing the Website**

### **Step 1: Open Your Browser**
1. Open any web browser (Chrome, Firefox, Edge, Safari, etc.)
2. Type in the address bar: **`http://localhost:5173`**
3. Press **Enter**

---

## 📝 **First Time Users - Registration**

### **Step 1: Go to Registration Page**
1. When you first visit `http://localhost:5173`, you'll see the **Login** page
2. Click on **"Register here"** link at the bottom

### **Step 2: Fill Registration Form**
Fill in the following information:

```
┌──────────────────────────────────┐
│  Register                        │
├──────────────────────────────────┤
│  Username:     [your_username]   │  ← Choose a username (min 3 characters)
│  Email:        [your@email.com]  │  ← Enter your email address
│  Password:     [••••••••]        │  ← Create a password (min 6 characters)
│  Confirm:      [••••••••]        │  ← Re-enter your password
│                                  │
│  [Register]                      │  ← Click to create account
│                                  │
│  Already have an account?        │
│  Login here                      │
└──────────────────────────────────┘
```

**Example:**
- Username: `john_doe`
- Email: `john@example.com`
- Password: `secure123`
- Confirm Password: `secure123`

### **Step 3: Click Register**
1. Click the **"Register"** button
2. If successful, you'll be automatically logged in
3. You'll be redirected to your **Dashboard**

---

## 🔐 **Returning Users - Login**

### **Step 1: Go to Login Page**
1. Visit: **`http://localhost:5173`** or **`http://localhost:5173/login`**

### **Step 2: Enter Your Credentials**

```
┌──────────────────────────────────┐
│  Login                           │
├──────────────────────────────────┤
│  Email:        [your@email.com]  │  ← Enter your email
│  Password:     [••••••••]        │  ← Enter your password
│                                  │
│  [Login]                         │  ← Click to login
│                                  │
│  Don't have an account?          │
│  Register here                   │
└──────────────────────────────────┘
```

**Example:**
- Email: `john@example.com`
- Password: `secure123`

### **Step 3: Click Login**
1. Click the **"Login"** button
2. You'll be redirected to your **Dashboard**

---

## 🎯 **User Dashboard Features**

After logging in, you'll see your personal dashboard with:

### **1. User Information**
- Your username
- Your email
- Your role (User or Admin)
- Member since date

### **2. Share Links Feature** 🔗
Click **"Manage Share Links"** to:
- Create shareable links
- Set expiration times
- Track link usage
- Manage your links

### **3. Logout**
Click **"Logout"** button in the top-right corner to sign out

---

## 👑 **Admin Users - Additional Features**

If you're an **Admin**, you'll see extra features:

### **Admin Dashboard Access**
1. From your regular dashboard, click **"Go to Admin Dashboard"**
2. Or visit: **`http://localhost:5173/admin/dashboard`**

### **Admin Features:**
- View all registered users
- See user statistics
- Promote users to admin role
- Demote admins to user role
- Delete users (except yourself)

---

## 🔗 **Creating and Sharing Links**

### **Step 1: Access Share Links**
1. Login to your account
2. Click **"Manage Share Links"** on your dashboard
3. Or visit: **`http://localhost:5173/share-links`**

### **Step 2: Create a New Link**
1. Click **"+ Create New Link"** button
2. Fill in the form:

```
┌──────────────────────────────────────┐
│  Create New Share Link              │
├──────────────────────────────────────┤
│  Title: *                            │
│  [My Share Link]                     │
│                                      │
│  Description:                        │
│  [Optional description here...]      │
│                                      │
│  Expires In (hours):  [24]           │
│  Max Uses (optional): [10]           │
│                                      │
│  [Create Link]                       │
└──────────────────────────────────────┘
```

3. Click **"Create Link"**

### **Step 3: Copy and Share**
1. Find your new link in the list
2. Click **"Copy"** button
3. Share the link via:
   - Email
   - Text message
   - Social media
   - Any messaging app

**Link format:** `http://localhost:5173/share/abc123xyz456...`

### **Step 4: Manage Your Links**
- **Deactivate**: Temporarily disable a link
- **Activate**: Re-enable a deactivated link
- **Delete**: Permanently remove a link

---

## 🌐 **Accessing Shared Links** (No Login Required!)

When someone shares a link with you:

### **Step 1: Click the Link**
1. Click on the shared link
2. Or paste it in your browser: `http://localhost:5173/share/[token]`

### **Step 2: View Content**
1. You'll see:
   - Link title and description
   - Who shared it
   - When it was created
   - When it expires

### **Step 3: Access Granted!**
- ✅ No login required
- ✅ One-click access
- ✅ Automatic access tracking

---

## 📱 **Accessing from Different Devices**

### **On the Same Network:**

**From your computer:**
```
http://localhost:5173
```

**From phone/tablet (on same WiFi):**
1. Find your computer's IP address:
   - Windows: Open PowerShell, type: `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. On your phone/tablet browser, visit:
   ```
   http://192.168.1.100:5173
   ```
   (Replace `192.168.1.100` with your actual IP)

---

## 🔒 **Security Tips**

### **Password Best Practices:**
- ✅ Use at least 8 characters
- ✅ Mix letters, numbers, and symbols
- ✅ Don't reuse passwords from other sites
- ✅ Don't share your password with anyone

### **Account Safety:**
- ✅ Logout when using shared computers
- ✅ Don't share your login credentials
- ✅ Change password if you suspect compromise

---

## ❓ **Common Questions**

### **Q: I forgot my password, what do I do?**
A: Currently, you need to contact an admin to reset your password. (Password reset feature coming soon!)

### **Q: Can I change my email or username?**
A: Not yet - profile editing feature is planned for a future update.

### **Q: How do I become an admin?**
A: Only existing admins can promote users to admin role. Contact your system administrator.

### **Q: Can I access this from the internet?**
A: Currently, this runs locally (`localhost`). For internet access, the app needs to be deployed to a web server.

### **Q: Is my data secure?**
A: Yes! The app uses:
- JWT authentication
- Encrypted passwords (bcrypt)
- Secure HTTP-only cookies
- MongoDB Atlas cloud database

### **Q: Can I delete my account?**
A: Contact an admin to delete your account.

---

## 🆘 **Troubleshooting**

### **Problem: Can't access http://localhost:5173**

**Solutions:**
1. Check if the server is running
2. Look for this in the terminal:
   ```
   ➜  Local:   http://localhost:5173/
   ```
3. If not running, start it:
   ```
   npm run dev
   ```

### **Problem: "Invalid credentials" when logging in**

**Solutions:**
1. Double-check your email and password
2. Make sure Caps Lock is OFF
3. Try registering a new account
4. Clear browser cache and try again

### **Problem: Registration not working**

**Solutions:**
1. Check all fields are filled
2. Username must be at least 3 characters
3. Password must be at least 6 characters
4. Passwords must match
5. Email must be valid format

### **Problem: Link says "Access Denied"**

**Reasons:**
- Link has expired
- Link was deactivated by creator
- Link reached maximum uses
- Link is invalid/incorrect

---

## 📞 **Getting Help**

### **Check Documentation:**
- `README.md` - Overview and setup
- `QUICK_START.md` - Quick start guide
- `TROUBLESHOOTING.md` - Common issues
- `FEATURES_GUIDE.md` - All features explained

### **Contact Admin:**
- Login as admin
- Go to Admin Dashboard
- View admin contact information

---

## 🎯 **Quick Reference**

| Action | URL |
|--------|-----|
| **Homepage/Login** | http://localhost:5173 |
| **Register** | http://localhost:5173/register |
| **User Dashboard** | http://localhost:5173/dashboard |
| **Admin Dashboard** | http://localhost:5173/admin/dashboard |
| **Share Links** | http://localhost:5173/share-links |
| **Access Share** | http://localhost:5173/share/[token] |

---

## ✅ **Step-by-Step: Complete User Journey**

### **First Time Visit:**
```
1. Open browser
2. Go to: http://localhost:5173
3. Click "Register here"
4. Fill registration form
5. Click "Register"
6. ✅ You're in! Welcome to your dashboard
```

### **Regular Login:**
```
1. Go to: http://localhost:5173
2. Enter email and password
3. Click "Login"
4. ✅ You're in your dashboard
```

### **Create Share Link:**
```
1. Login
2. Click "Manage Share Links"
3. Click "+ Create New Link"
4. Fill in details
5. Click "Create Link"
6. Click "Copy"
7. ✅ Share with anyone!
```

### **Access Someone's Link:**
```
1. Click the shared link
2. ✅ View content instantly (no login needed!)
```

---

## 🎉 **You're All Set!**

Now you know how to:
- ✅ Register an account
- ✅ Login and logout
- ✅ Access your dashboard
- ✅ Create and share links
- ✅ Access shared links
- ✅ Manage your account

**Start using the app:** http://localhost:5173

**Enjoy!** 🚀
