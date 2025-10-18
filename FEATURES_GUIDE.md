# 🎯 Features Demonstration Guide

This guide shows you how to test all the features of the JWT Authentication MERN Stack application.

---

## 📋 Prerequisites Checklist

- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:5173
- ✅ MongoDB installed and running
- ✅ Browser with DevTools access (Chrome/Edge/Firefox)

---

## 🔐 Feature 1: User Registration

### Test Steps:

1. **Open the Application**
   - Navigate to http://localhost:5173
   - You should see the Login page

2. **Go to Registration**
   - Click "Register here" link at the bottom

3. **Register Admin User**
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: Select **Admin**
   - Click "Register"

4. **Verify**
   - ✅ You should be redirected to Admin Dashboard
   - ✅ Welcome message shows your username
   - ✅ User statistics are displayed

### What Happens Behind the Scenes:
- Password is hashed with bcrypt (10 rounds)
- User document created in MongoDB
- Access token (15 min) generated
- Refresh token (7 days) stored in HTTP-only cookie
- User automatically logged in

---

## 🔑 Feature 2: User Login

### Test Steps:

1. **Logout**
   - Click "Logout" button in the dashboard

2. **Login**
   - Enter email: `admin@example.com`
   - Enter password: `admin123`
   - Click "Login"

3. **Verify**
   - ✅ Redirected to Admin Dashboard
   - ✅ Last login time updated in database
   - ✅ New access token issued

### Test with DevTools:

```javascript
// Open Browser Console (F12)
// Check localStorage
localStorage.getItem('accessToken')
localStorage.getItem('user')

// Check cookies (Application tab)
// Look for 'refreshToken' cookie (HTTP-only)
```

---

## 🔄 Feature 3: Automatic Token Refresh

### Test Steps:

1. **Method 1: Manually Expire Token**

   ```javascript
   // In Browser Console:
   localStorage.setItem('accessToken', 'expired_token_here')
   
   // Then refresh the page or make an API call
   // The app should automatically refresh the token
   ```

2. **Method 2: Wait 15 Minutes**
   - Stay logged in
   - Wait 15 minutes (access token expires)
   - Try to navigate to a different page
   - ✅ Token refreshes automatically
   - ✅ No logout or error

3. **Check Console Logs**
   - Open DevTools → Console
   - Look for automatic refresh requests to `/api/auth/refresh`

### Expected Behavior:
- App detects 401 error
- Calls refresh endpoint with cookie
- Gets new access token
- Retries original request
- User stays logged in seamlessly

---

## 👥 Feature 4: View All Users (Admin)

### Test Steps:

1. **Access Admin Dashboard**
   - Login as admin user
   - Navigate to http://localhost:5173/admin/dashboard

2. **View User Table**
   - ✅ See all registered users
   - ✅ Columns: Username, Email, Role, Created At, Last Login
   - ✅ Color-coded role badges

3. **Check Statistics Cards**
   - Total Users count
   - Admin Users count
   - Regular Users count
   - Recent Users (last 7 days)

4. **Refresh Data**
   - Click "Refresh" button
   - ✅ Data updates from MongoDB

### Backend API Call:
```
GET /api/admin/users
Authorization: Bearer <access_token>
```

---

## ➕ Feature 5: Create Multiple Users

### Test Steps:

1. **Register Regular User**
   - Logout
   - Register new user:
     - Username: `john`
     - Email: `john@example.com`
     - Password: `john123`
     - Role: **User**
   - Click "Register"

2. **Verify Regular User Dashboard**
   - ✅ Redirected to User Dashboard (not Admin Dashboard)
   - ✅ See user profile information
   - ✅ JWT features list displayed
   - ✅ "Go to Admin Dashboard" button NOT visible

3. **Register More Users**
   - Logout and register additional users
   - Try different usernames and emails

4. **Login as Admin Again**
   - Login with admin credentials
   - ✅ See all users in the table

---

## 🗑️ Feature 6: Delete Users (Admin Only)

### Test Steps:

1. **As Admin**
   - Navigate to Admin Dashboard
   - Find a user to delete (not yourself)
   - Click "Delete" button

2. **Confirmation**
   - ✅ Browser confirmation dialog appears
   - Click "OK" to confirm

3. **Verify**
   - ✅ User removed from table
   - ✅ Statistics updated
   - ✅ User deleted from MongoDB

4. **Try to Delete Yourself**
   - Find your own user in the table
   - ✅ Delete button is disabled

### Backend API Call:
```
DELETE /api/admin/users/:id
Authorization: Bearer <access_token>
```

---

## 🚫 Feature 7: Protected Routes

### Test Steps:

1. **Test Unauthenticated Access**
   - Logout
   - Try to visit: http://localhost:5173/dashboard
   - ✅ Redirected to /login

2. **Test Non-Admin Access**
   - Login as regular user (john)
   - Try to visit: http://localhost:5173/admin/dashboard
   - ✅ Redirected to /dashboard

3. **Test Admin Access**
   - Login as admin
   - Visit: http://localhost:5173/admin/dashboard
   - ✅ Access granted

### Route Guards:
- `/dashboard` - Requires authentication
- `/admin/dashboard` - Requires authentication + admin role

---

## 🔐 Feature 8: Password Security

### Test in MongoDB:

1. **Open MongoDB Compass** (or use mongo shell)

2. **Connect to Database**
   - Connection string: `mongodb://localhost:27017`
   - Database: `jwt_auth_db`
   - Collection: `users`

3. **View Users**
   ```javascript
   // Example user document:
   {
     _id: ObjectId("..."),
     username: "admin",
     email: "admin@example.com",
     password: "$2a$10$hashed_password_here...",  // ✅ Hashed, not plain text
     role: "admin",
     refreshToken: "jwt_token_here...",
     createdAt: ISODate("..."),
     lastLogin: ISODate("..."),
     updatedAt: ISODate("...")
   }
   ```

4. **Verify**
   - ✅ Password is hashed with bcrypt
   - ✅ Original password not visible
   - ✅ Refresh token stored for validation

---

## 🍪 Feature 9: HTTP-Only Cookies

### Test Steps:

1. **Open DevTools** (F12)

2. **Go to Application Tab** (or Storage)

3. **Check Cookies**
   - Domain: `localhost`
   - Look for: `refreshToken`
   - ✅ HTTPOnly: ✓ (checked)
   - ✅ Secure: (depends on NODE_ENV)
   - ✅ SameSite: Strict

4. **Try to Access via JavaScript**
   ```javascript
   // In Browser Console:
   document.cookie
   // ✅ refreshToken is NOT visible (HTTP-only protection)
   ```

---

## 📊 Feature 10: Real-time Statistics

### Test Steps:

1. **As Admin on Dashboard**
   - Note current statistics

2. **Open New Incognito Window**
   - Register a new user

3. **Return to Admin Dashboard**
   - Click "Refresh" button
   - ✅ Total Users increased
   - ✅ Recent Users updated
   - ✅ New user appears in table

---

## 🎨 Feature 11: Responsive Design

### Test Steps:

1. **Desktop View**
   - ✅ Full layout with all elements visible
   - ✅ Table displays all columns

2. **Tablet View**
   - Press F12 → Toggle device toolbar
   - Select iPad or similar
   - ✅ Layout adapts
   - ✅ Statistics cards stack properly

3. **Mobile View**
   - Select iPhone or similar
   - ✅ Single column layout
   - ✅ Table scrolls horizontally
   - ✅ Forms remain usable

---

## 🔍 Feature 12: Error Handling

### Test Steps:

1. **Wrong Password**
   - Try to login with wrong password
   - ✅ Error message: "Invalid credentials"

2. **Duplicate Email**
   - Try to register with existing email
   - ✅ Error message: "User with this email already exists"

3. **Invalid Token**
   - Manually corrupt access token in localStorage
   - Try to access protected route
   - ✅ Automatic refresh attempt
   - ✅ Redirect to login if refresh fails

4. **Network Error**
   - Stop backend server
   - Try to login
   - ✅ Error message displayed

---

## 🧪 API Testing with Thunder Client / Postman

### Test Endpoints:

1. **Health Check**
   ```
   GET http://localhost:5000/api/health
   ```

2. **Register**
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json
   
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "test123",
     "role": "user"
   }
   ```

3. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "test@example.com",
     "password": "test123"
   }
   ```

4. **Get Current User**
   ```
   GET http://localhost:5000/api/auth/me
   Authorization: Bearer <your_access_token>
   ```

5. **Get All Users (Admin)**
   ```
   GET http://localhost:5000/api/admin/users
   Authorization: Bearer <admin_access_token>
   ```

6. **Refresh Token**
   ```
   POST http://localhost:5000/api/auth/refresh
   Cookie: refreshToken=<your_refresh_token>
   ```

---

## 📝 Verification Checklist

After testing all features, verify:

- [ ] Users can register with both roles (User/Admin)
- [ ] Users can login with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Access tokens expire after 15 minutes
- [ ] Tokens refresh automatically
- [ ] Admin can see all users from MongoDB
- [ ] Admin can view user statistics
- [ ] Admin can delete users (except themselves)
- [ ] Regular users cannot access admin routes
- [ ] Unauthenticated users redirected to login
- [ ] Passwords are hashed in database
- [ ] Refresh tokens in HTTP-only cookies
- [ ] Logout clears tokens properly
- [ ] UI is responsive on mobile/tablet/desktop
- [ ] Error messages display correctly

---

## 🎓 Learning Points

This application demonstrates:
- ✅ JWT token lifecycle
- ✅ Refresh token rotation
- ✅ Role-based access control (RBAC)
- ✅ MongoDB CRUD operations
- ✅ React Context API
- ✅ Axios interceptors
- ✅ Protected routing
- ✅ Form validation
- ✅ Error handling
- ✅ Security best practices

---

## 🐛 Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution**: Make sure MongoDB is running
```bash
net start MongoDB  # Windows
```

### Issue: "CORS error"
**Solution**: Check ports (backend: 5000, frontend: 5173)

### Issue: "Token expired" repeatedly
**Solution**: Clear localStorage and cookies, re-login

### Issue: "Cannot find module"
**Solution**: Run `npm install` in both frontend and backend

---

## 🎉 Congratulations!

You've successfully tested all features of the JWT Authentication MERN Stack application! 

The application is production-ready with:
- ✅ Secure authentication
- ✅ Automatic token refresh
- ✅ Admin dashboard
- ✅ MongoDB integration
- ✅ Beautiful UI

**Enjoy building with your new authentication system!** 🚀
