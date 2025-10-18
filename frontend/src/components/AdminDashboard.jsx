import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, statsResponse] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getUserStats()
      ]);

      setUsers(usersResponse.data.data.users);
      setStats(statsResponse.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
      fetchData(); // Refresh stats
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const handleChangeRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMessage = `Change this user's role from "${currentRole}" to "${newRole}"?`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await adminAPI.updateUserRole(userId, newRole);
      // Update user in the list
      setUsers(users.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      fetchData(); // Refresh stats to update counts
      alert(`User role updated to ${newRole} successfully!`);
    } catch (err) {
      console.error('Error updating user role:', err);
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Admin Users</h3>
            <p className="stat-number">{stats.adminUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Regular Users</h3>
            <p className="stat-number">{stats.regularUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Recent Users (7 days)</h3>
            <p className="stat-number">{stats.recentUsers}</p>
          </div>
        </div>
      )}

      <div className="users-section">
        <div className="section-header">
          <h2>All Users</h2>
          <button onClick={fetchData} className="btn-refresh">
            Refresh
          </button>
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge badge-${u.role}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u.lastLogin 
                      ? new Date(u.lastLogin).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleChangeRole(u._id, u.role)}
                        className="btn-role"
                        disabled={u._id === user?._id}
                        title={u._id === user?._id ? 'Cannot change your own role' : 'Toggle role'}
                      >
                        {u.role === 'admin' ? '👤 Make User' : '👑 Make Admin'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="btn-delete"
                        disabled={u._id === user?._id}
                        title={u._id === user?._id ? 'Cannot delete yourself' : 'Delete user'}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="no-data">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
