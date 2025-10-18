// MongoDB Connection Checker
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwt_auth_db';

console.log('\n🔍 Checking MongoDB Connection...\n');
console.log('📍 Connection URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
console.log('');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => {
  console.log('✅ SUCCESS! MongoDB is connected and ready!\n');
  console.log('📊 Connection Details:');
  console.log('   - Database:', mongoose.connection.name);
  console.log('   - Host:', mongoose.connection.host);
  console.log('   - Port:', mongoose.connection.port);
  console.log('');
  console.log('🎉 You can now use the application!');
  console.log('   - Backend: http://localhost:5000');
  console.log('   - Frontend: http://localhost:5173');
  console.log('');
  
  mongoose.connection.close();
  process.exit(0);
})
.catch((error) => {
  console.log('❌ FAILED! MongoDB connection error:\n');
  console.log('   Error:', error.message);
  console.log('');
  console.log('🔧 Common Solutions:\n');
  
  if (error.message.includes('ECONNREFUSED')) {
    console.log('   ⚠️  MongoDB is not running on your computer\n');
    console.log('   Solution 1 - Start MongoDB Service:');
    console.log('      net start MongoDB\n');
    console.log('   Solution 2 - Install MongoDB:');
    console.log('      Download from: https://www.mongodb.com/try/download/community\n');
    console.log('   Solution 3 - Use MongoDB Atlas (Cloud):');
    console.log('      See: MONGODB_SETUP.md');
  } else if (error.message.includes('authentication failed')) {
    console.log('   ⚠️  Authentication failed\n');
    console.log('   - Check your username and password in .env file');
    console.log('   - Verify database user exists in MongoDB Atlas');
  } else if (error.message.includes('ENOTFOUND')) {
    console.log('   ⚠️  Cannot find MongoDB server\n');
    console.log('   - Check your connection string in .env file');
    console.log('   - Verify internet connection (if using Atlas)');
  } else {
    console.log('   - Check backend/.env file configuration');
    console.log('   - Verify MONGODB_URI is correct');
  }
  
  console.log('');
  console.log('📖 For detailed setup instructions, see: MONGODB_SETUP.md');
  console.log('');
  
  mongoose.connection.close();
  process.exit(1);
});

// Timeout handler
setTimeout(() => {
  console.log('⏱️  Connection timeout - MongoDB may not be accessible\n');
  console.log('See MONGODB_SETUP.md for help\n');
  mongoose.connection.close();
  process.exit(1);
}, 10000);
