import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>User Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to Your Dashboard!</h2>
          <div className="user-details">
            <div className="detail-item">
              <strong>Username:</strong> {user?.username}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {user?.email}
            </div>
            <div className="detail-item">
              <strong>Role:</strong> <span className={`badge badge-${user?.role}`}>{user?.role}</span>
            </div>
            <div className="detail-item">
              <strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>

          {user?.role === 'admin' && (
            <div className="admin-notice">
              <p>You have admin privileges!</p>
              <button 
                onClick={() => navigate('/admin/dashboard')} 
                className="btn-primary"
              >
                Go to Admin Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>🔒 JWT Authentication Features</h3>
          <ul>
            <li>✅ Secure login with JWT tokens</li>
            <li>✅ Access tokens (15 minutes expiry)</li>
            <li>✅ Refresh tokens (7 days expiry)</li>
            <li>✅ Automatic token refresh on expiry</li>
            <li>✅ HTTP-only cookies for refresh tokens</li>
            <li>✅ Protected routes and admin access control</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>🔗 Share Access Links</h3>
          <p>Create and manage shareable links with custom expiration times!</p>
          <button 
            onClick={() => navigate('/share-links')} 
            className="btn-primary"
          >
            Manage Share Links
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
