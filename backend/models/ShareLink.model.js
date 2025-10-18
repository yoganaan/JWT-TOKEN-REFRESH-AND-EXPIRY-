const mongoose = require('mongoose');
const crypto = require('crypto');

const shareLinkSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  expiresAt: {
    type: Date,
    required: true
  },
  maxUses: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  accessedBy: [{
    ip: String,
    userAgent: String,
    accessedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Method to check if link is valid
shareLinkSchema.methods.isValid = function() {
  // Check if active
  if (!this.isActive) return false;
  
  // Check if expired
  if (new Date() > this.expiresAt) return false;
  
  // Check if max uses reached
  if (this.maxUses && this.usedCount >= this.maxUses) return false;
  
  return true;
};

// Method to record access
shareLinkSchema.methods.recordAccess = async function(ip, userAgent) {
  this.usedCount += 1;
  this.accessedBy.push({
    ip,
    userAgent,
    accessedAt: new Date()
  });
  await this.save();
};

const ShareLink = mongoose.model('ShareLink', shareLinkSchema);

module.exports = ShareLink;
