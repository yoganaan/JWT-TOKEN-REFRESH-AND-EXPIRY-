import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ShareAccess.css';

const ShareAccess = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [linkData, setLinkData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessLink = async () => {
      try {
        const response = await api.get(`/share/access/${token}`);
        setLinkData(response.data.data.shareLink);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to access share link');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      accessLink();
    }
  }, [token]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="share-access-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading share link...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="share-access-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Access Denied</h2>
          <p className="error-message">{error}</p>
          <div className="error-reasons">
            <h4>This could be because:</h4>
            <ul>
              <li>The link has expired</li>
              <li>The link has been deactivated</li>
              <li>The link has reached its maximum uses</li>
              <li>The link is invalid</li>
            </ul>
          </div>
          <button onClick={() => navigate('/')} className="btn-home">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="share-access-container">
      <div className="share-access-card">
        <div className="success-icon">✓</div>
        <h1>Share Link Accessed Successfully!</h1>
        
        <div className="share-content">
          <h2>{linkData.title}</h2>
          {linkData.description && (
            <p className="description">{linkData.description}</p>
          )}

          <div className="share-info">
            <div className="info-item">
              <span className="label">Shared by:</span>
              <span className="value">{linkData.createdBy.username}</span>
            </div>
            <div className="info-item">
              <span className="label">Created:</span>
              <span className="value">{formatDate(linkData.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="label">Expires:</span>
              <span className="value">{formatDate(linkData.expiresAt)}</span>
            </div>
            <div className="info-item">
              <span className="label">Total accesses:</span>
              <span className="value">{linkData.usedCount} {linkData.maxUses ? `/ ${linkData.maxUses}` : ''}</span>
            </div>
          </div>

          <div className="access-message">
            <p>🎉 You have successfully accessed this shared content!</p>
            <p>This link has been recorded and counted in the usage statistics.</p>
          </div>

          <div className="cta-section">
            <h3>Want to create your own share links?</h3>
            <p>Sign up for a free account and start sharing!</p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/register')} className="btn-primary">
                Create Account
              </button>
              <button onClick={() => navigate('/login')} className="btn-secondary">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAccess;
