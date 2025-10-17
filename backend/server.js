const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const shareLinkRoutes = require('./routes/shareLink.routes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('📊 Database:', process.env.MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('\n⚠️  MongoDB is not running or not accessible!');
  console.error('\n📝 To fix this issue:');
  console.error('   1. Install MongoDB: https://www.mongodb.com/try/download/community');
  console.error('   2. Start MongoDB service: net start MongoDB');
  console.error('   3. Or use MongoDB Atlas (cloud): See MONGODB_SETUP.md');
  console.error('\n📖 See MONGODB_SETUP.md for detailed instructions\n');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/share', shareLinkRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
