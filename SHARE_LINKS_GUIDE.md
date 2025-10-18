# 🔗 Share Access Links Feature Guide

## Overview

The Share Access Links feature allows users to create temporary, shareable links with custom expiration times and usage limits. Perfect for sharing access to content, inviting users, or providing time-limited access.

## ✨ Features

- ✅ **Create Custom Share Links** - Generate unique links with custom titles and descriptions
- ✅ **Flexible Expiration** - Set custom expiration times (1 hour to 30 days)
- ✅ **Usage Limits** - Limit how many times a link can be used
- ✅ **Access Tracking** - Track who accessed the link, when, and from where
- ✅ **Link Management** - Activate, deactivate, or delete links anytime
- ✅ **Public Access** - Share links with anyone, no login required
- ✅ **One-Click Copy** - Easy copy-to-clipboard functionality

---

## 🚀 How to Use

### 1. Access Share Links Page

After logging in:
1. Go to your **Dashboard**
2. Click **"Manage Share Links"** button
3. Or navigate directly to: http://localhost:5173/share-links

### 2. Create a New Share Link

1. Click **"+ Create New Link"** button
2. Fill in the form:
   - **Title** (required): Give your link a descriptive name
   - **Description** (optional): Add more details about the link
   - **Expires In**: Set hours until expiration (default: 24 hours)
   - **Max Uses**: Limit total uses (leave empty for unlimited)
3. Click **"Create Link"**
4. Your link will be generated instantly!

### 3. Share Your Link

1. Find your newly created link in the list
2. Click **"Copy"** button to copy the full URL
3. Share it via:
   - Email
   - SMS
   - Social media
   - Messaging apps
   - Any communication channel!

### 4. Manage Your Links

**View Stats:**
- See creation date, expiration date
- Track total uses (e.g., "5 / 10" or "5 / ∞")
- Check link status (Active, Inactive, Expired)

**Control Links:**
- **Deactivate**: Temporarily disable a link
- **Activate**: Re-enable a deactivated link
- **Delete**: Permanently remove a link

---

## 🎯 Use Cases

### Personal Use
- Share vacation photos with family
- Distribute event information
- Provide temporary file access
- Share project updates

### Business Use
- Client onboarding links
- Time-limited presentations
- Event registration links
- Partner resource access

### Team Collaboration
- Share meeting notes
- Distribute team resources
- Temporary contractor access
- Project documentation links

---

## 📊 Link States

| State | Description | Can Access? |
|-------|-------------|-------------|
| **Active** | Link is working and valid | ✅ Yes |
| **Inactive** | Manually deactivated by creator | ❌ No |
| **Expired** | Past expiration date | ❌ No |
| **Max Uses Reached** | Hit usage limit | ❌ No |

---

## 🔒 Security Features

### Access Control
- Each link has a unique 32-character token
- Tokens are cryptographically secure (impossible to guess)
- Creator can deactivate links instantly

### Tracking
- IP address tracking
- User agent (browser/device) logging
- Access timestamp recording
- Total usage counting

### Privacy
- Public links don't expose creator identity
- Access data only visible to creator
- Secure database storage

---

## 💡 Pro Tips

### Creating Effective Links

1. **Use Descriptive Titles**
   - ✅ Good: "Q4 2025 Sales Report"
   - ❌ Bad: "Link 1"

2. **Set Appropriate Expiration**
   - Event links: 2-7 days
   - Quick shares: 1-24 hours
   - Long-term access: 30+ days

3. **Use Usage Limits Wisely**
   - Small group: Set max uses = group size
   - Public sharing: Leave unlimited
   - One-time use: Set max uses = 1

### Managing Links

- **Delete old links** regularly to keep your list clean
- **Deactivate instead of delete** if you might need to reactivate
- **Monitor usage stats** to see engagement
- **Update expiration** by creating a new link if needed

---

## 📱 Public Access Experience

When someone clicks your share link:

1. **Valid Link** ✅
   - Shows success message
   - Displays link title and description
   - Shows creator username
   - Records the access
   - Offers signup/login options

2. **Invalid Link** ❌
   - Shows friendly error message
   - Explains why access was denied
   - Provides navigation options

---

## 🔧 Technical Details

### API Endpoints

**Protected Routes** (require authentication):
```
POST   /api/share/create          - Create new share link
GET    /api/share/my-links        - Get all user's links
DELETE /api/share/:id             - Delete a link
PATCH  /api/share/:id/toggle      - Toggle active status
```

**Public Routes**:
```
GET    /api/share/access/:token   - Access a share link
```

### Frontend Routes

```
/share-links              - Manage your share links (protected)
/share/:token             - Access a public share link (public)
```

### Database Schema

```javascript
{
  token: String (unique),
  createdBy: ObjectId (User),
  title: String,
  description: String,
  expiresAt: Date,
  maxUses: Number (null = unlimited),
  usedCount: Number,
  isActive: Boolean,
  accessedBy: Array [{
    ip: String,
    userAgent: String,
    accessedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Troubleshooting

### Link Not Working?

**Check these:**
1. Link hasn't expired
2. Link is still active
3. Max uses not reached
4. URL copied correctly
5. No typos in the URL

### Can't Create Links?

**Verify:**
1. You're logged in
2. All required fields filled
3. Expiration hours is valid (1-720)
4. Max uses is a positive number

### Link Shows Error?

**Possible reasons:**
- Link was deactivated by creator
- Link expired
- Maximum uses reached
- Invalid/incorrect URL
- Database connection issue

---

## 🎉 Success Metrics

Track your link performance:
- **Usage Rate**: How many times your link was accessed
- **Time to First Access**: How quickly people use your link
- **Access Pattern**: When people access your link
- **Completion Rate**: Uses vs. max uses

---

## 🔮 Future Enhancements

Potential features coming soon:
- Custom URLs/vanity links
- QR code generation
- Link analytics dashboard
- Email notifications on access
- Password-protected links
- Geographic access restrictions

---

## 📞 Support

Need help?
1. Check this guide
2. Review error messages
3. Check browser console for errors
4. Verify backend is running
5. Check MongoDB connection

---

## ✅ Quick Reference

**Default Settings:**
- Expiration: 24 hours
- Max Uses: Unlimited
- Status: Active

**Limits:**
- Min expiration: 1 hour
- Max expiration: 720 hours (30 days)
- Max uses: Any positive number

**Best Practices:**
- Create descriptive titles
- Set appropriate expiration
- Monitor usage regularly
- Delete old/unused links
- Keep sensitive links short-lived

---

**Happy Sharing! 🚀**
