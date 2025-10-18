import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './ShareLinks.css';

const ShareLinks = () => {
  const { user } = useAuth();
  const [shareLinks, setShareLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expiryHours: 24,
    maxUses: ''
  });

  // Fetch share links
  const fetchShareLinks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/share/my-links');
      setShareLinks(response.data.data.shareLinks);
    } catch (error) {
      console.error('Error fetching share links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShareLinks();
  }, []);

  // Create share link
  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/share/create', {
        ...formData,
        maxUses: formData.maxUses ? parseInt(formData.maxUses) : null
      });
      
      alert('Share link created successfully!');
      setShowCreateForm(false);
      setFormData({ title: '', description: '', expiryHours: 24, maxUses: '' });
      fetchShareLinks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating share link');
    }
  };

  // Copy link to clipboard
  const copyToClipboard = (token) => {
    const url = `${window.location.origin}/share/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Toggle link active status
  const toggleLink = async (id) => {
    try {
      await api.patch(`/share/${id}/toggle`);
      fetchShareLinks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error toggling link');
    }
  };

  // Delete link
  const deleteLink = async (id) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    try {
      await api.delete(`/share/${id}`);
      alert('Link deleted successfully');
      fetchShareLinks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting link');
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  // Check if expired
  const isExpired = (expiresAt) => {
    return new Date() > new Date(expiresAt);
  };

  return (
    <div className="share-links-container">
      <div className="share-links-header">
        <h2>🔗 Share Links</h2>
        <button 
          className="btn-create-link"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : '+ Create New Link'}
        </button>
      </div>

      {showCreateForm && (
        <div className="create-link-form">
          <h3>Create New Share Link</h3>
          <form onSubmit={handleCreateLink}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Project Access Link"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Optional description"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expires In (hours)</label>
                <input
                  type="number"
                  value={formData.expiryHours}
                  onChange={(e) => setFormData({...formData, expiryHours: e.target.value})}
                  min="1"
                  max="720"
                />
              </div>

              <div className="form-group">
                <label>Max Uses (optional)</label>
                <input
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData({...formData, maxUses: e.target.value})}
                  placeholder="Unlimited"
                  min="1"
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Create Link</button>
          </form>
        </div>
      )}

      <div className="share-links-list">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : shareLinks.length === 0 ? (
          <div className="empty-state">
            <p>No share links created yet.</p>
            <p>Click "Create New Link" to get started!</p>
          </div>
        ) : (
          shareLinks.map((link) => (
            <div key={link._id} className={`link-card ${!link.isActive ? 'inactive' : ''} ${isExpired(link.expiresAt) ? 'expired' : ''}`}>
              <div className="link-header">
                <h3>{link.title}</h3>
                <div className="link-status">
                  {isExpired(link.expiresAt) ? (
                    <span className="badge badge-expired">Expired</span>
                  ) : !link.isActive ? (
                    <span className="badge badge-inactive">Inactive</span>
                  ) : (
                    <span className="badge badge-active">Active</span>
                  )}
                </div>
              </div>

              {link.description && (
                <p className="link-description">{link.description}</p>
              )}

              <div className="link-details">
                <div className="detail-item">
                  <span className="label">Created:</span>
                  <span>{formatDate(link.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Expires:</span>
                  <span>{formatDate(link.expiresAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Uses:</span>
                  <span>{link.usedCount} / {link.maxUses || '∞'}</span>
                </div>
              </div>

              <div className="link-url">
                <input 
                  type="text" 
                  value={`${window.location.origin}/share/${link.token}`}
                  readOnly
                />
                <button 
                  onClick={() => copyToClipboard(link.token)}
                  className="btn-copy"
                >
                  {copiedToken === link.token ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <div className="link-actions">
                <button 
                  onClick={() => toggleLink(link._id)}
                  className="btn-toggle"
                  disabled={isExpired(link.expiresAt)}
                >
                  {link.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  onClick={() => deleteLink(link._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShareLinks;
