# 🚀 Quick Start - Enable Network Access

## ⚡ **IMPORTANT: You Need to Restart the Frontend!**

The configuration has been updated to allow access from other devices on your network.

---

## 🔄 **Restart Steps:**

### **Step 1: Stop Current Frontend Server**

In the terminal running the frontend:
1. Press **`Ctrl + C`**
2. Wait for it to stop

### **Step 2: Restart Frontend**

Run this command:
```bash
cd "c:\Users\mass9\OneDrive\Desktop\JWT PROJECT\frontend"
npm run dev
```

### **Step 3: Look for Network Address**

You should now see **TWO URLs**:
```
  ROLLDOWN-VITE v7.1.14  ready in 885 ms

  ➜  Local:   http://localhost:5173/           ← Use this on SAME computer
  ➜  Network: http://192.168.1.100:5173/       ← Use this on OTHER devices
  ➜  press h + enter to show help
```

---

## 🎯 **Now Users Can Access From:**

### **1. Same Computer:**
```
http://localhost:5173
```

### **2. Other Devices (Same WiFi):**
```
http://192.168.1.100:5173
```
(Use the IP address shown in your terminal under "Network:")

### **3. Phone/Tablet (Same WiFi):**
```
http://192.168.1.100:5173
```

---

## ✅ **What Changed?**

**File Updated:** `frontend/vite.config.js`

**Before:**
```javascript
export default defineConfig({
  plugins: [react()],
})
```

**After:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // Now listens on ALL network interfaces!
    port: 5173,
    strictPort: true
  }
})
```

---

## 🔥 **Firewall Notice:**

If users on other devices still can't connect, you may need to allow the port through Windows Firewall:

### **Quick Firewall Fix (Run as Administrator):**

```powershell
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

---

## 📱 **Share These URLs:**

**For users on YOUR computer:**
```
http://localhost:5173
```

**For users on phones/tablets/other computers (same WiFi):**
```
http://[YOUR-IP-ADDRESS]:5173
```

Check your terminal for the exact Network URL after restart!

---

**Restart the frontend now to enable network access!** 🚀
