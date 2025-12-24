# 📧 Email Inbox Delivery Setup Guide

## ✅ Code Changes Applied

### 1. Simple HTML (No Promotional Look)
- Removed complex tables and styling
- Plain, personal email format
- Looks like a personal message, not marketing

### 2. Subject Line Changed
- Changed from: "Greeting from John"
- Changed to: "Re: John"
- "Re:" makes it look like a reply (personal conversation)

### 3. Plain Text Version Added
- Gmail/Outlook require both HTML + plain text
- Emails with only HTML → Promotions/Spam
- Emails with both → Primary inbox

---

## 🔧 CRITICAL: Domain Authentication Setup

Your email: `Greetins@ris.services`

### You MUST configure these DNS records for `ris.services`:

#### 1. SPF Record (Prevents Spam)
```
Type: TXT
Host: @
Value: v=spf1 include:zeptomail.in ~all
```

#### 2. DKIM Record (Email Signature)
Login to ZeptoMail → Settings → Domain Authentication
Copy the DKIM record they provide:
```
Type: TXT
Host: zeptomail._domainkey
Value: [Get from ZeptoMail dashboard]
```

#### 3. DMARC Record (Email Policy)
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:Greetins@ris.services
```

### How to Add DNS Records:
1. Go to your domain registrar (GoDaddy/Namecheap/Cloudflare)
2. Find DNS settings for `ris.services`
3. Add the 3 TXT records above
4. Wait 24-48 hours for propagation

---

## 📝 Additional Best Practices

### 1. Warm Up Your Domain
- Start by sending 10-20 emails/day
- Gradually increase over 2 weeks
- Don't send 1000 emails on day 1

### 2. Subject Line Tips
**✅ GOOD (Primary Inbox):**
- "Re: John"
- "Hi from Sarah"
- "Quick note"
- "Thinking of you"

**❌ BAD (Promotions/Spam):**
- "Special Offer!"
- "Click Here Now"
- "Free Gift Inside"
- "Limited Time Only"

### 3. Email Content Tips
**✅ DO:**
- Keep it short and personal
- Use recipient's name
- Write like a human
- Include sender's real name

**❌ DON'T:**
- Use ALL CAPS
- Add multiple links
- Use words: free, discount, offer, buy now
- Add large images (>500KB)

### 4. Sender Name
Current: "Greetins@ris.services"
Better: Use sender's actual name from form

---

## 🧪 Testing Email Deliverability

### Test Your Email Score:
1. Send test email to: `check-auth@verifier.port25.com`
2. You'll receive a report showing SPF/DKIM/DMARC status

### Check Spam Score:
1. Visit: https://www.mail-tester.com
2. Send email to the address they provide
3. Get spam score (aim for 8+/10)

---

## 🚨 Why Emails Go to Promotions/Spam

| Issue | Solution |
|-------|----------|
| No SPF/DKIM/DMARC | Add DNS records (see above) |
| Marketing language | Use personal subject/content |
| Only HTML, no plain text | ✅ Fixed in code |
| Complex HTML tables | ✅ Fixed in code |
| Promotional subject | ✅ Fixed in code |
| New domain (no reputation) | Warm up domain gradually |
| High volume suddenly | Start slow, increase gradually |

---

## 📊 Expected Results After Setup

| Before | After |
|--------|-------|
| 5 minutes to send | 2 seconds response |
| Goes to Promotions | Goes to Primary |
| Goes to Spam | Goes to Inbox |
| No pop-up notification | ✅ Pop-up notification |

---

## 🔍 Verify Setup

### 1. Check DNS Records:
```
Visit: https://mxtoolbox.com/SuperTool.aspx
Enter: ris.services
Check: SPF, DKIM, DMARC all green ✅
```

### 2. Send Test Email:
- Send to your Gmail
- Check if it lands in Primary
- Check if you get notification

### 3. Check Email Headers:
- Open email in Gmail
- Click "Show original"
- Look for:
  - `spf=pass`
  - `dkim=pass`
  - `dmarc=pass`

---

## 💡 Pro Tips

1. **Use Real Sender Email**: If sender enters `john@gmail.com`, use that in reply-to
2. **Avoid Attachments**: Use inline images only
3. **Keep Image Size Small**: Max 200KB per image
4. **Test Different Email Providers**: Gmail, Outlook, Yahoo
5. **Monitor Bounce Rate**: Keep below 5%

---

## 🆘 Still Going to Spam?

1. Check DNS records are active (wait 48 hours)
2. Verify ZeptoMail domain authentication
3. Send from a personal email domain (not @gmail.com)
4. Ask recipients to mark as "Not Spam" first few times
5. Ask recipients to add sender to contacts

---

## 📞 Support

- ZeptoMail Support: https://www.zoho.com/zeptomail/help/
- DNS Setup Help: Contact your domain registrar
- Email Deliverability: https://www.mail-tester.com

---

**Status: Code changes complete ✅**
**Next Step: Configure DNS records for ris.services domain**
