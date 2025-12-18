# Quick Team Member Management Guide

## WHERE IS THE SAVE OPTION?

### The Save Options:
```
1. EDIT DETAILS MODAL
   └─ Save Changes Button (Purple)
      └─ Click after editing name, designation, or description

2. ADD NEW MEMBER MODAL  
   └─ Add Member Button (Green)
      └─ Click to add a new team member (automatically saves)

3. EDIT IMAGE (Hover on Image)
   └─ Edit Button with Camera Icon
      └─ Auto-saves immediately when you select an image
```

---

## HOW TO SAVE CHANGES

### For Editing Existing Member:
```
1. Click "Edit Details" button on team card
2. Update Name, Designation, or Description
3. Click "Save Changes" button
4. ✓ Changes saved to browser storage
```

### For Adding New Member:
```
1. Click green "Add New Team Member" button
2. Fill in all fields:
   - Name
   - Designation  
   - Description
   - Color Theme (optional)
   - Upload Image (optional)
3. Click "Add Member" button
4. ✓ New member saved and appears in carousel
```

### For Changing Image:
```
1. Hover over team member's photo
2. Click camera icon + "Edit" text
3. Select image file
4. ✓ Image saved immediately
```

---

## MORE SECTIONS - HOW THE CAROUSEL WORKS

### Current Setup:
- **11 Total Team Members** (You can add more!)
- **3 Members Per Section/Slide**
- **Total Sections: ~4-5 slides**

### Navigation:

```
Starting View (Slide 1):
Sarah Johnson | Alex Chen | Emma Davis

Click → (Right Arrow):
Emma Davis | John Smith | Lisa Wang

Click → Again:
Lisa Wang | Michael Brown | Jessica Lee

Click → Again:
Jessica Lee | David Kumar | Rachel Green

Click → Again:
Rachel Green | Oliver Scott | Nina Patel

Click → Again (Loops back):
Nina Patel | Sarah Johnson | Alex Chen
```

### Navigation Methods:

**1. Click Right Arrow (→)**
- Moves to next 3 members
- Bottom right corner on desktop
- Auto-loops back to start

**2. Click Left Arrow (←)**
- Moves to previous 3 members
- Bottom left corner on desktop
- Auto-loops to end

**3. Click Indicator Dots**
- 4-5 small dots at bottom
- Click any dot to jump to that section
- Active dot is highlighted (wider/different color)

---

## ADD MORE IMAGES/MEMBERS

### Step-by-Step:

**Step 1: Click Green Button**
```
"Add New Team Member" button (green with + icon)
Located below "Meet Our Team" title
```

**Step 2: Fill Form**
```
Name: "Your Name"
Designation: "Your Role"
Description: "Your bio text"
Color Theme: Select from dropdown
Image: Click "Upload Image" button
```

**Step 3: Save**
```
Click "Add Member" button
✓ Member instantly appears in carousel
```

**Step 4: View Your New Member**
```
Click → Arrow to scroll carousel
Your new member will appear in the slides
You can edit it anytime with "Edit Details"
```

---

## TOTAL TEAM MEMBERS NOW

### Pre-loaded (11 members):
1. Sarah Johnson - Designer
2. Alex Chen - Developer
3. Emma Davis - Marketer
4. John Smith - Content Creator
5. Lisa Wang - Brand Strategist
6. Michael Brown - Product Manager
7. Jessica Lee - UX Specialist
8. David Kumar - Data Analyst
9. Rachel Green - Project Manager
10. Oliver Scott - Backend Architect
11. Nina Patel - Quality Assurance Lead

**You can add unlimited more!**

---

## CAROUSEL EXAMPLE

**Initial State:**
```
[  Sarah   ]  [  Alex  ]  [  Emma  ]  →  [  John  ]  [ Lisa  ]  [Michael]
    Slide 1                            Slide 2
```

**Keep Clicking Right Arrow:**
```
Each click moves to next set of 3 members
Shows 3, slides to next 3, then next 3...
Eventually loops back to beginning
```

---

## QUICK TIPS

✓ All changes auto-save to browser storage  
✓ Changes persist even after closing browser  
✓ You can edit or add members anytime  
✓ More members = more carousel sections  
✓ Click arrows to navigate through all members  
✓ Edit images by hovering and clicking camera icon  
✓ Edit all other info with "Edit Details" button  

---

## STORAGE INFO

All data saved in browser's **localStorage**:
- Automatically backed up
- Persists across sessions
- No backend needed

To see saved data:
```javascript
// Open browser console (F12) and type:
localStorage.getItem("teamMembers")
```

---

## FILE LOCATION
`frontend/src/pages/Landing.jsx` - Complete implementation

