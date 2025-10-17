const ShareLink = require('../models/ShareLink.model');

// Create a new share link
const createShareLink = async (req, res) => {
  try {
    const { title, description, expiryHours, maxUses } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // Calculate expiry time
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (expiryHours || 24)); // Default 24 hours

    // Create share link
    const shareLink = new ShareLink({
      createdBy: req.userId,
      title,
      description: description || '',
      expiresAt,
      maxUses: maxUses || null
    });

    await shareLink.save();

    // Populate creator info
    await shareLink.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      message: 'Share link created successfully',
      data: {
        shareLink,
        url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/share/${shareLink.token}`
      }
    });
  } catch (error) {
    console.error('Create share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating share link',
      error: error.message
    });
  }
};

// Get all share links created by the user
const getMyShareLinks = async (req, res) => {
  try {
    const shareLinks = await ShareLink.find({ createdBy: req.userId })
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { shareLinks }
    });
  } catch (error) {
    console.error('Get share links error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching share links',
      error: error.message
    });
  }
};

// Access a share link (public route)
const accessShareLink = async (req, res) => {
  try {
    const { token } = req.params;

    const shareLink = await ShareLink.findOne({ token })
      .populate('createdBy', 'username email');

    if (!shareLink) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found'
      });
    }

    // Check if link is valid
    if (!shareLink.isValid()) {
      let reason = 'Link is inactive';
      if (new Date() > shareLink.expiresAt) reason = 'Link has expired';
      if (shareLink.maxUses && shareLink.usedCount >= shareLink.maxUses) reason = 'Link has reached maximum uses';

      return res.status(403).json({
        success: false,
        message: reason
      });
    }

    // Record access
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    await shareLink.recordAccess(ip, userAgent);

    res.status(200).json({
      success: true,
      data: {
        shareLink: {
          title: shareLink.title,
          description: shareLink.description,
          createdBy: shareLink.createdBy,
          createdAt: shareLink.createdAt,
          expiresAt: shareLink.expiresAt,
          usedCount: shareLink.usedCount,
          maxUses: shareLink.maxUses
        }
      }
    });
  } catch (error) {
    console.error('Access share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Error accessing share link',
      error: error.message
    });
  }
};

// Delete a share link
const deleteShareLink = async (req, res) => {
  try {
    const { id } = req.params;

    const shareLink = await ShareLink.findOne({ _id: id, createdBy: req.userId });

    if (!shareLink) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found or unauthorized'
      });
    }

    await shareLink.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Share link deleted successfully'
    });
  } catch (error) {
    console.error('Delete share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting share link',
      error: error.message
    });
  }
};

// Toggle share link active status
const toggleShareLink = async (req, res) => {
  try {
    const { id } = req.params;

    const shareLink = await ShareLink.findOne({ _id: id, createdBy: req.userId });

    if (!shareLink) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found or unauthorized'
      });
    }

    shareLink.isActive = !shareLink.isActive;
    await shareLink.save();

    res.status(200).json({
      success: true,
      message: `Share link ${shareLink.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { shareLink }
    });
  } catch (error) {
    console.error('Toggle share link error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling share link',
      error: error.message
    });
  }
};

module.exports = {
  createShareLink,
  getMyShareLinks,
  accessShareLink,
  deleteShareLink,
  toggleShareLink
};
