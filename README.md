# JWT Authentication MERN Stack Application

A full-stack MERN (MongoDB, Express, React, Node.js) application featuring JWT token-based authentication with automatic token refresh, user registration/login, and an admin dashboard to manage users.

## Features

### Backend
- ✅ JWT Authentication with Access & Refresh Tokens
- ✅ Access tokens (15 minutes expiry)
- ✅ Refresh tokens (7 days expiry, stored in HTTP-only cookies)
- ✅ Automatic token refresh mechanism
- ✅ Password hashing with bcrypt
- ✅ User registration and login
- ✅ Role-based access control (User & Admin)
- ✅ Admin dashboard to view all users
- ✅ MongoDB database for user storage
- ✅ Protected API routes
- ✅ CORS enabled

### Frontend
- ✅ React with Vite
- ✅ JWT token management
- ✅ Automatic token refresh on expiry
- ✅ Protected routes
- ✅ Login & Registration pages
- ✅ User Dashboard
- ✅ Admin Dashboard with user management
- ✅ Beautiful UI with gradient designs
- ✅ Responsive design

## Prerequisites

- Node.js (v14 or higher)
- **MongoDB** (local or Atlas) - **REQUIRED!**
- npm or yarn

## ⚠️ IMPORTANT: MongoDB Setup Required

**The application will NOT work without MongoDB running!**

If you see errors like:
- `MongoDB connection error: ECONNREFUSED`
- `Operation buffering timed out`

**→ See [MONGODB_SETUP.md](MONGODB_SETUP.md) for detailed setup instructions**

### Quick MongoDB Check

```bash
# Test if MongoDB is connected
node check-mongodb.js
```

## Installation & Setup

### 1. Install MongoDB

If you don't have MongoDB installed locally:
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Configure environment variables
# Edit the .env file and update the following:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_ACCESS_SECRET (change to a secure random string)
# - JWT_REFRESH_SECRET (change to a different secure random string)

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/jwt_auth_db
PORT=5000
JWT_ACCESS_SECRET=your_access_token_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_refresh_token_secret_key_here_change_in_production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
```

**⚠️ IMPORTANT:** Change the JWT secrets to secure random strings in production!

## Usage

### 1. Register a New User

1. Open your browser to `http://localhost:5173`
2. Click "Register here"
3. Fill in the registration form:
   - Username (min 3 characters)
   - Email
   - Password (min 6 characters)
   - Role (User or Admin)
4. Click "Register"

### 2. Login

1. Go to the login page
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to:
   - User Dashboard (if role is "user")
   - Admin Dashboard (if role is "admin")

### 3. User Dashboard

- View your profile information
- See your account details
- Logout functionality

### 4. Admin Dashboard

- View all registered users
- See user statistics
- Delete users (except yourself)
- View user details (username, email, role, creation date, last login)

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (Protected)

### Admin Routes (Protected - Admin Only)

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/stats` - Get user statistics
- `GET /api/admin/users/:id` - Get user by ID
- `DELETE /api/admin/users/:id` - Delete user

## How JWT Refresh Works

1. **Login/Register**: User receives an access token (15 min) and refresh token (7 days)
2. **Access Token**: Sent with every API request in Authorization header
3. **Token Expiry**: When access token expires (401 error)
4. **Auto Refresh**: Frontend automatically calls `/auth/refresh` with refresh token cookie
5. **New Tokens**: Backend validates refresh token and issues new access token
6. **Retry Request**: Original request is retried with new access token
7. **Seamless UX**: User doesn't notice the refresh happening

## Security Features

- ✅ Passwords hashed with bcrypt
- ✅ HTTP-only cookies for refresh tokens
- ✅ Refresh tokens stored in database
- ✅ Token validation on every protected route
- ✅ Role-based authorization
- ✅ CORS configured for frontend
- ✅ Environment variables for secrets

## Project Structure

```
JWT PROJECT/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── User.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── admin.routes.js
│   ├── utils/
│   │   └── jwt.utils.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── AdminDashboard.css
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## Testing the Application

1. **Start MongoDB** (if using local instance)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Register an Admin User**: Choose "Admin" role during registration
5. **Register a Regular User**: Choose "User" role
6. **Login as Admin**: Access the admin dashboard to see all users
7. **Test Token Refresh**: Wait 15 minutes or manually expire the token to see automatic refresh

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check the connection string in `.env`
- For local MongoDB: `mongodb://localhost:27017/jwt_auth_db`

### CORS Errors
- Ensure backend is running on port 5000
- Ensure frontend is running on port 5173
- Check CORS configuration in `server.js`

### Token Issues
- Clear browser localStorage and cookies
- Re-login to get fresh tokens

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- jsonwebtoken - JWT implementation
- bcryptjs - Password hashing
- cookie-parser - Cookie handling
- dotenv - Environment variables
- cors - CORS middleware

### Frontend
- React - UI framework
- Vite - Build tool
- React Router - Routing
- Axios - HTTP client

## License

MIT

## Author

Your Name

---

**Happy Coding! 🚀**
