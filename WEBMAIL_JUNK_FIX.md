# 🔧 Fix Webmail Junk Folder Issue - Step by Step

## Your Webmail: https://128.227.167.72.host.secureserver.net:2096

This is **GoDaddy cPanel Webmail**

---

## 📋 Steps to Fix Emails Going to Junk

### Step 1: Login to Your Webmail
1. Go to: https://128.227.167.72.host.secureserver.net:2096
2. Login with your credentials

---

### Step 2: Add Sender to Safe List (Whitelist)

#### Option A: From Junk Folder
1. Click **"Junk"** folder
2. Find the greeting email
3. Right-click on the email
4. Select **"Not Junk"** or **"Not Spam"**
5. Click **"Add to Whitelist"** or **"Add to Safe Senders"**

#### Option B: From Settings
1. Click **Settings** (gear icon)
2. Go to **"Spam Settings"** or **"Filters"**
3. Find **"Whitelist"** or **"Safe Senders"**
4. Add: `Greetins@ris.services`
5. Click **Save**

---

### Step 3: Create Email Filter Rule

1. Go to **Settings** → **"Filters"** or **"Rules"**
2. Click **"Create New Filter"**
3. Set conditions:
   ```
   From: contains "ris.services"
   OR
   From: contains "Greetins"
   ```
4. Set action:
   ```
   Move to: Inbox
   Mark as: Not Spam
   ```
5. Click **Save**

---

### Step 4: Adjust Spam Filter Level

1. Go to **Settings** → **"Spam Settings"**
2. Find **"Spam Filter Level"** or **"Spam Threshold"**
3. Change from "High" to **"Medium"** or **"Low"**
4. Uncheck **"Automatically delete spam"**
5. Click **Save**

---

### Step 5: Check SPF/DKIM Settings (cPanel)

1. Go back to main cPanel (not webmail)
2. Find **"Email Deliverability"** or **"Authentication"**
3. Look for your domain: `ris.services`
4. Check if these are enabled:
   - ✅ SPF Record
   - ✅ DKIM Record
   - ✅ DMARC Record
5. If any are ❌ red, click **"Repair"** or **"Enable"**

---

### Step 6: Test Email Delivery

1. Send a test greeting card
2. Check if it arrives in **Inbox** (not Junk)
3. If still in Junk, repeat Step 2

---

## 🎯 Quick Fix (Immediate)

**Do this right now:**

1. Login to webmail
2. Go to Junk folder
3. Select the greeting email
4. Click **"Not Spam"** button
5. Move to Inbox

**This trains the spam filter!**

---

## 🔍 Alternative: Use cPanel Email Authentication

### If you have cPanel access:

1. Login to cPanel: https://128.227.167.72.host.secureserver.net:2083
2. Search for **"Email Deliverability"**
3. Click on your domain
4. Click **"Manage"** next to each record
5. Copy the DNS records shown
6. Add them to your domain DNS settings

---

## 📧 For Recipients (Tell Them to Do This)

When they receive your greeting email:

1. Check Junk/Spam folder
2. Find your email
3. Click **"Not Spam"** or **"Not Junk"**
4. Right-click → **"Add to Contacts"**
5. Or click **"Move to Inbox"**

**After doing this once, future emails go to Inbox automatically!**

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| Can't find "Not Spam" button | Right-click email → More Actions |
| No Whitelist option | Use Filters instead (Step 3) |
| Still going to Junk | Lower spam filter level (Step 4) |
| cPanel access denied | Contact your hosting provider |

---

## 💡 Pro Tip

**Ask your recipients to:**
1. Add `Greetins@ris.services` to their contacts
2. Mark first email as "Not Spam"
3. This fixes it permanently for them

---

## 📞 Need Help?

- GoDaddy Support: 1-480-505-8877
- cPanel Documentation: https://docs.cpanel.net/cpanel/email/spam-filters/
- Email Deliverability: https://www.godaddy.com/help/email-deliverability

---

## ✅ Checklist

- [ ] Login to webmail
- [ ] Mark email as "Not Spam"
- [ ] Add sender to whitelist
- [ ] Create filter rule
- [ ] Lower spam filter level
- [ ] Check SPF/DKIM in cPanel
- [ ] Test with new email

---

**Note:** I cannot login to your webmail for security reasons, but follow these steps and your emails will go to Inbox instead of Junk!
