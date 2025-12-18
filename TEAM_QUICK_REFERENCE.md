# Team Member Management - Quick Reference

## DIRECT ANSWERS

### Q: WHERE IS THE SAVE OPTION?
**Answer:** THREE SAVE BUTTONS:
1. **"Save Changes"** (Purple button in Edit Modal)
2. **"Add Member"** (Green button in Add Modal)  
3. **Auto-save** when uploading images

### Q: HOW TO ADD MORE SECTIONS?
**Answer:** CLICK "Add New Team Member" BUTTON:
1. Click green button
2. Fill Name, Designation, Description
3. Click "Add Member"
4. New member + new section appears!

---

## QUICK ACTION BUTTONS

| ACTION | BUTTON | RESULT |
|--------|--------|--------|
| Edit Name/Role/Bio | Edit Details (Purple) | Opens modal form |
| Save Edits | Save Changes (Purple) | Saves changes |
| Add New Member | Add New Team... (Green) | Opens add form |
| Save New Member | Add Member (Green) | Adds to carousel |
| Change Image | Camera Icon (hover) | Auto-saves image |
| Next Members | → Right Arrow | Scrolls carousel |
| Previous Members | ← Left Arrow | Scrolls carousel |
| Jump to Section | Indicator Dots | Jumps to slide |

---

## SAVE WORKFLOW

### To Save Existing Member Edits:
```
1. Click "Edit Details" on card
2. Change Name / Designation / Description
3. Click "Save Changes" button
4. ✓ SAVED
```

### To Save New Member:
```
1. Click "Add New Team Member"
2. Fill Name, Designation, Description
3. Select Color, Upload Image
4. Click "Add Member" button
5. ✓ SAVED & APPEARS IN CAROUSEL
```

### To Save Image Change:
```
1. Hover over team photo
2. Click camera icon
3. Select image
4. ✓ AUTO-SAVED
```

---

## CAROUSEL NAVIGATION

**Current:** 11 Members total = ~4 slides of 3 members each

**Navigate:**
- Click → to see next members
- Click ← to see previous members
- Click dot to jump to section
- Loops back to start after end

**Example Flow:**
```
Start:    Sarah, Alex, Emma
Click →:  Emma, John, Lisa
Click →:  Lisa, Michael, Jessica
Click →:  Jessica, David, Rachel
Click →:  Rachel, Oliver, Nina
Click →:  Nina, Sarah, Alex (loops)
```

---

## CURRENT 11 TEAM MEMBERS

**Slide 1:**
- Sarah Johnson (Designer)
- Alex Chen (Developer)
- Emma Davis (Marketer)

**Slide 2:**
- John Smith (Content Creator)
- Lisa Wang (Brand Strategist)
- Michael Brown (Product Manager)

**Slide 3:**
- Jessica Lee (UX Specialist)
- David Kumar (Data Analyst)
- Rachel Green (Project Manager)

**Slide 4:**
- Oliver Scott (Backend Architect)
- Nina Patel (QA Lead)

---

## HOW TO ADD NEW TEAM MEMBER

### Step 1: Click Green Button
"Add New Team Member" (green button below team title)

### Step 2: Fill Form
- Name: "John Doe"
- Designation: "Lead Designer"
- Description: "Passionate about great design"
- Color Theme: Select from dropdown

### Step 3: Upload Image
- Click "Upload Image" button
- Select file from computer

### Step 4: Save
- Click "Add Member" (green button)

### Step 5: View
- Use → arrow to scroll to your new member

---

## AUTO-SAVE & STORAGE

✓ Changes saved to browser localStorage  
✓ Data persists across page refreshes  
✓ Data persists when closing browser  
✓ No database needed  
✓ Device-specific storage  

**What's Saved:**
- Member names
- Designations/roles
- Descriptions/bios
- Images (base64)
- Color themes

**To Clear (Reset to Defaults):**
1. Open F12 (Developer Tools)
2. Application tab
3. localStorage
4. Delete "teamMembers"
5. Refresh page

---

## COLOR THEMES (10 AVAILABLE)

1. Pink to Red
2. Blue to Cyan
3. Orange to Yellow
4. Green to Emerald
5. Indigo to Purple
6. Red to Pink
7. Cyan to Blue
8. Amber to Orange
9. Teal to Green
10. Violet to Purple

---

## MOST USED FEATURES

| Feature | Action |
|---------|--------|
| Add New Member | Click "Add New Team Member" button |
| Edit Details | Click "Edit Details" on card → Click "Save Changes" |
| Change Image | Hover on photo → Click camera icon → Select image |
| Navigate | Click → arrow (right) or ← arrow (left) |
| Save | "Save Changes" for editing / "Add Member" for new member |

---

## IMPORTANT NOTES

✓ YOU MUST CLICK SAVE BUTTON TO PERSIST EDITS  
✓ Images auto-save (no save button needed)  
✓ New members must have Name, Designation, Description filled  
✓ Color theme is optional (defaults to Pink-Red)  
✓ Image is optional (defaults to placeholder)  
✓ Changes saved to browser storage (not database)  
✓ Can add unlimited members  
✓ Each member appears in carousel  

---

## FILE LOCATION

**Path:** `frontend/src/pages/Landing.jsx`  
**Lines:** 1-1040+

**Implementation includes:**
- defaultTeamMembers array
- Carousel logic
- Edit modal
- Add new member modal
- Image upload handlers
- localStorage integration
