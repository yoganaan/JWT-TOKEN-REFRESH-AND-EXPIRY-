const express = require('express');
const router = express.Router();
const {
  createShareLink,
  getMyShareLinks,
  accessShareLink,
  deleteShareLink,
  toggleShareLink
} = require('../controllers/shareLink.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Public route - Access share link
router.get('/access/:token', accessShareLink);

// Protected routes - Require authentication
router.post('/create', authenticate, createShareLink);
router.get('/my-links', authenticate, getMyShareLinks);
router.delete('/:id', authenticate, deleteShareLink);
router.patch('/:id/toggle', authenticate, toggleShareLink);

module.exports = router;
