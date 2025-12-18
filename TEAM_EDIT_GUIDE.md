# Team Member Edit Guide

## Overview
The "Meet Our Team" section now has a complete edit system allowing you to customize team member information including images, names, designations, and descriptions.

## Features

### 1. **Edit Details Button**
- Each team member card has an "Edit Details" button
- Click to open an edit modal with full customization options

### 2. **Edit Modal Form**
When you click "Edit Details", a modal popup appears with:

#### Name Field
- Edit the team member's full name
- Example: "Sarah Johnson", "Alex Chen", etc.

#### Designation Field
- Edit the professional role/position
- Examples: "Designer", "Developer", "Marketer", "Content Creator", "Brand Strategist", "Product Manager"

#### Description Field
- Edit the bio/description content
- Can include professional achievements, specialties, or motivational quotes
- Examples:
  - "Artistry fuels innovation in the digital landscapes"
  - "Coding innovation drives to the future of technology"
  - "Creative storytelling that inspires and connects hearts"

#### Image Preview & Change
- Shows the current team member's image
- "Change Image" button to upload a new photo

### 3. **Carousel Navigation**
- **Left Arrow (←)** - View previous 3 team members
- **Right Arrow (→)** - View next 3 team members
- **Indicator Dots** - Click to jump to a specific section
- The carousel shows 3 team members at a time

## How to Use

### Add/Edit Images
1. Hover over a team member's image on their card
2. Click the camera icon with "Edit" button
3. Select an image from your computer
4. The image updates immediately

### Edit Name, Designation & Description
1. Click the "Edit Details" button on a team member's card
2. A modal popup will appear with editable fields
3. Update the Name field with the team member's name
4. Update the Designation field with their role/position
5. Update the Description field with their bio/content
6. Optionally click "Change Image" to upload a new photo
7. Click "Save Changes" to apply all edits
8. Click "Cancel" to discard changes

## Current Team Members (6 total)

1. **Sarah Johnson** - Designer
   - "Artistry fuels innovation in the digital landscapes"

2. **Alex Chen** - Developer
   - "Coding innovation drives to the future of technology"

3. **Emma Davis** - Marketer
   - "Strategic marketing transform brand narratives"

4. **John Smith** - Content Creator
   - "Creative storytelling that inspires and connects hearts"

5. **Lisa Wang** - Brand Strategist
   - "Building brands that resonate with audiences globally"

6. **Michael Brown** - Product Manager
   - "Driving innovation through user-centered product design"

## Adding More Team Members

To add more team members, edit the `teamMembers` array in `Landing.jsx`:

```javascript
{
  name: "Your Name",
  role: "Your Designation",
  color: "from-[color]-300 to-[color]-300", // gradient colors
  description: "Your bio/content",
  image: "image-url-or-uploaded-image"
}
```

## Color Gradients Available
- `from-pink-300 to-red-300`
- `from-blue-300 to-cyan-300`
- `from-orange-300 to-yellow-300`
- `from-green-300 to-emerald-300`
- `from-indigo-300 to-purple-300`
- `from-red-300 to-pink-300`

## Tips

- Changes are stored in the component's state (refreshing the page will revert changes)
- To persist changes permanently, you'll need backend integration
- Images are converted to base64 for preview
- Designations should be concise (one or two words work best)
- Descriptions should be compelling and professional (50-80 characters ideal)

## File Location
`frontend/src/pages/Landing.jsx` - Lines 28-800+
