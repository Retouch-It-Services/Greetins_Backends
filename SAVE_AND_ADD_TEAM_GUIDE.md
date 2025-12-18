# Team Member Management & Save Guide

## SAVE FUNCTIONALITY - Auto Saving with Local Storage

### How Saving Works
All changes to team members are **automatically saved** using browser's localStorage. This means:

✅ **When you save:**
- Click "Save Changes" in the Edit Modal
- Click "Add Member" in the Add New Member Modal
- Changes are instantly saved to your browser
- If you refresh the page, all changes persist

✅ **What gets saved:**
- All team member names
- All designations
- All descriptions
- All images (converted to base64)
- All color themes

### Visual Feedback
- ✓ "Save Changes" button in Edit Modal - Click after editing
- ✓ "Add Member" button in Add Member Modal - Click to add new team member
- Green "Add New Team Member" button appears below section title

---

## ADD MORE TEAM MEMBERS/SECTIONS

### Starting Team Members (11 total)
1. Sarah Johnson - Designer
2. Alex Chen - Developer
3. Emma Davis - Marketer
4. John Smith - Content Creator
5. Lisa Wang - Brand Strategist
6. Michael Brown - Product Manager
7. **Jessica Lee** - UX Specialist
8. **David Kumar** - Data Analyst
9. **Rachel Green** - Project Manager
10. **Oliver Scott** - Backend Architect
11. **Nina Patel** - Quality Assurance Lead

### How Carousel Works
- **Displays 3 members at a time**
- Click **← Left Arrow** to see previous members
- Click **→ Right Arrow** to see next members
- Click **Indicator Dots** to jump to specific sections
- Carousel auto-loops (last section wraps back to first)

### Example Flow
- **Slide 1:** Sarah, Alex, Emma
- **Click →** Shows: Emma, John, Lisa
- **Click →** Shows: Lisa, Michael, Jessica
- **Click →** Shows: Jessica, David, Rachel
- **Click →** Shows: Rachel, Oliver, Nina
- **Click →** Shows: Nina, Sarah, Alex (loops back)

---

## ADDING NEW TEAM MEMBERS

### Step 1: Click "Add New Team Member" Button
- Green button with **+** icon
- Located below "Meet Our Team" title
- Opens a popup modal form

### Step 2: Fill in Member Details
In the popup form, fill in:

#### Name
- Example: "John Doe"
- Required field

#### Designation
- Example: "Senior Designer"
- Required field
- Keep it concise (1-2 words work best)

#### Description
- Example: "Passionate about creating beautiful experiences"
- Required field
- 50-80 characters ideal
- This is the bio text shown on the card

#### Color Theme (Optional)
- Select from 10 color options:
  - Pink to Red
  - Blue to Cyan
  - Orange to Yellow
  - Green to Emerald
  - Indigo to Purple
  - Red to Pink
  - Cyan to Blue
  - Amber to Orange
  - Teal to Green
  - Violet to Purple

#### Upload Image (Optional)
- Click "Upload Image" button
- Select image from your computer
- Image preview updates automatically
- Default placeholder if not uploaded

### Step 3: Save New Member
- Click **"Add Member"** button (green)
- Member is instantly added to the team
- Changes are saved to localStorage
- New member appears in carousel

### Step 4: Navigate to New Member
- Click **→ Right Arrow** to scroll carousel
- Keep clicking until you see your new member
- Edit the member using "Edit Details" button if needed

---

## EDITING EXISTING MEMBERS

### Edit Details
1. Click **"Edit Details"** button (purple) on any team member card
2. Modal opens with current information
3. Change Name, Designation, or Description
4. Click **"Save Changes"** to save

### Edit Image
1. Hover over team member's image
2. Click camera icon with **"Edit"** text
3. Select new image from your computer
4. Image updates immediately (auto-saved)

---

## DELETE A TEAM MEMBER (If needed)

Currently, there's no delete button. To delete a member:

**Option 1:** Manual browser localStorage reset
- Open browser Developer Tools (F12)
- Go to "Application" tab
- Find localStorage → teamMembers
- Delete the entry
- Refresh page (reverts to default team)

**Option 2:** Edit feature can be added
- Let me know if you want a delete button added

---

## TROUBLESHOOTING

### Changes Not Saving?
- Check browser console for errors (F12)
- Make sure localStorage is enabled
- Try refreshing the page
- Clear browser cache if needed

### Lost Changes?
- If you closed the browser without saving, changes are lost
- Always click "Save Changes" or "Add Member" to persist

### Image Not Uploading?
- Check file size (should be under 5MB)
- Supported formats: JPG, PNG, GIF, WebP
- Try refreshing and uploading again

### Need More Sections?
- Each "section" shows 3 members
- With 11 members: 5 sections total
- Add more members to create more sections
- Members auto-scroll using arrows

---

## PERSISTENT STORAGE

All data is stored in browser's **localStorage** under key: `teamMembers`

To export your team data:
```javascript
// In browser console (F12):
localStorage.getItem("teamMembers")
```

To backup:
```javascript
// Copy the entire output and save as .json file
```

To restore:
```javascript
// Paste into console:
localStorage.setItem("teamMembers", '[paste-json-here]')
```

---

## FILE LOCATION
- `frontend/src/pages/Landing.jsx` - Complete implementation
- Lines: 28-1040

## State Variables
- `teamMembers` - Array of all team members
- `carouselIndex` - Current carousel position
- `editingIndex` - Which member is being edited
- `addingMember` - Add member modal visibility
- `editForm` - Edit modal form data
- `newMemberForm` - Add member form data
