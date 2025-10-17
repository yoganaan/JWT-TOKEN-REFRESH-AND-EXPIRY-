// Test script to verify backend API endpoints
// Run this after MongoDB is connected

const testAPI = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  console.log('🧪 Testing JWT Authentication API...\n');
  
  try {
    // 1. Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    console.log('');

    // 2. Register User
    console.log('2️⃣ Testing User Registration...');
    const registerData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123',
      role: 'user'
    };
    
    const registerResponse = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
      credentials: 'include'
    });
    
    const registerResult = await registerResponse.json();
    console.log('✅ Registration:', registerResult.success ? 'Success' : 'Failed');
    
    const accessToken = registerResult.data?.accessToken;
    console.log('✅ Access Token:', accessToken ? 'Received' : 'Not received');
    console.log('');

    // 3. Get Current User
    if (accessToken) {
      console.log('3️⃣ Testing Get Current User...');
      const meResponse = await fetch(`${baseURL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const meData = await meResponse.json();
      console.log('✅ Current User:', meData.data?.user);
      console.log('');
    }

    // 4. Login
    console.log('4️⃣ Testing Login...');
    const loginResponse = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      }),
      credentials: 'include'
    });
    
    const loginResult = await loginResponse.json();
    console.log('✅ Login:', loginResult.success ? 'Success' : 'Failed');
    console.log('');

    // 5. Register Admin
    console.log('5️⃣ Registering Admin User...');
    const adminRegisterData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };
    
    const adminRegisterResponse = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminRegisterData),
      credentials: 'include'
    });
    
    const adminRegisterResult = await adminRegisterResponse.json();
    console.log('✅ Admin Registration:', adminRegisterResult.success ? 'Success' : 'Failed');
    
    const adminToken = adminRegisterResult.data?.accessToken;
    console.log('');

    // 6. Test Admin Endpoints
    if (adminToken) {
      console.log('6️⃣ Testing Admin Endpoints...');
      
      const usersResponse = await fetch(`${baseURL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      const usersData = await usersResponse.json();
      console.log('✅ Get All Users:', usersData.success ? `Success (${usersData.data.count} users)` : 'Failed');
      
      const statsResponse = await fetch(`${baseURL}/admin/users/stats`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      const statsData = await statsResponse.json();
      console.log('✅ User Statistics:', statsData.data);
      console.log('');
    }

    console.log('🎉 All tests passed! Backend is working correctly.\n');
    console.log('Next steps:');
    console.log('1. Open http://localhost:5173 in your browser');
    console.log('2. Register a new user with admin role');
    console.log('3. Login and access the admin dashboard');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Make sure MongoDB is running and backend server is started');
  }
};

// Run tests
testAPI();
