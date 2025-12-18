# Persistent Team Member Images - Implementation Guide

## Overview
Images uploaded to team members in the "Meet Our Team" section now persist across browser refreshes using IndexedDB storage.

## What Changed

### 1. **New Storage System**
- Created `frontend/src/utils/teamMemberStorage.js` - A utility module for managing persistent storage
- Uses **IndexedDB** for storing images (no size limits unlike localStorage)
- Uses **localStorage** for storing team member metadata (name, role, description, color)

### 2. **Features**

#### ✅ **Persistent Image Storage**
- Upload images to team members
- Images are automatically saved to IndexedDB
- Images persist after page refresh
- Images persist across browser sessions

#### ✅ **Team Member Management**
- Add new team members with images
- Edit existing team members and update their images
- Delete team members (removes both metadata and images)
- Multiple sections support (unlimited team members)

#### ✅ **Automatic Loading**
- On page load, the component initializes IndexedDB
- Loads all saved team members from localStorage
- Fetches their corresponding images from IndexedDB
- Displays complete team member cards with images

## How It Works

### Storage Architecture

```
┌─────────────────────────────────────────┐
│   localStorage (Metadata)                │
│   - name, role, description, color      │
│   - Team member IDs for linking         │
└─────────────────────────────────────────┘
           ↓ (via ID)
┌─────────────────────────────────────────┐
│   IndexedDB (Image Data)                │
│   - Base64 encoded images               │
│   - Linked by team member ID            │
└─────────────────────────────────────────┘
```

### Flow Diagram

```
User Actions:
  1. Upload Image → handleImageUpload()
  2. Save image to IndexedDB → saveTeamMemberImage()
  3. Save metadata to localStorage → saveTeamMembersData()

On Page Load:
  1. Initialize IndexedDB → initDB()
  2. Load metadata from localStorage → loadTeamMembersData()
  3. Load images from IndexedDB → getTeamMemberImage()
  4. Display complete team member cards
```

## API Reference

### Core Functions

#### `initDB()`
Initializes the IndexedDB database. Must be called once before using other functions.

```javascript
await initDB();
```

#### `saveTeamMemberImage(id, imageData)`
Saves an image to IndexedDB.

```javascript
await saveTeamMemberImage('member_id', base64ImageData);
```

#### `getTeamMemberImage(id)`
Retrieves an image from IndexedDB.

```javascript
const imageData = await getTeamMemberImage('member_id');
```

#### `deleteTeamMemberImage(id)`
Deletes an image from IndexedDB.

```javascript
await deleteTeamMemberImage('member_id');
```

#### `saveTeamMembersData(members)`
Saves team member metadata (without images) to localStorage.

```javascript
saveTeamMembersData(teamMembersArray);
```

#### `loadTeamMembersData()`
Loads team member metadata from localStorage.

```javascript
const members = loadTeamMembersData();
```

#### `getAllTeamMemberImages()`
Retrieves all stored images.

```javascript
const allImages = await getAllTeamMemberImages();
```

#### `clearAllTeamData()`
Clears all data from both localStorage and IndexedDB.

```javascript
await clearAllTeamData();
```

## Usage Examples

### Adding a New Team Member with Image

```javascript
const newMember = {
  id: `member_${Date.now()}`,
  name: "John Doe",
  role: "Developer",
  description: "Full-stack developer",
  color: "from-blue-300 to-cyan-300",
  image: base64ImageData
};

// Save image
await saveTeamMemberImage(newMember.id, base64ImageData);

// Save metadata
const updatedMembers = [...teamMembers, newMember];
saveTeamMembersData(updatedMembers);
```

### Updating a Team Member's Image

```javascript
const memberId = teamMembers[0].id;
const newImageData = base64NewImage;

// Update in state
teamMembers[0].image = newImageData;

// Save to IndexedDB
await saveTeamMemberImage(memberId, newImageData);

// Save metadata
saveTeamMembersData(teamMembers);
```

### Loading Team Members on Component Mount

```javascript
useEffect(() => {
  const loadTeamData = async () => {
    await initDB();
    const savedData = loadTeamMembersData();
    
    const membersWithImages = await Promise.all(
      savedData.map(async (member) => ({
        ...member,
        image: await getTeamMemberImage(member.id)
      }))
    );
    
    setTeamMembers(membersWithImages);
  };
  
  loadTeamData();
}, []);
```

## Data Structure

### Team Member Object

```javascript
{
  id: "member_1234567890",  // Unique identifier
  name: "Sarah Johnson",     // Team member name
  role: "Designer",          // Job role
  color: "from-pink-300 to-red-300",  // Tailwind gradient color
  description: "Artistry fuels innovation",  // Description
  image: "data:image/jpeg;base64,..."  // Base64 encoded image (from IndexedDB)
}
```

### localStorage Schema

```json
{
  "teamMembers": [
    {
      "id": "member_1234567890",
      "name": "Sarah Johnson",
      "role": "Designer",
      "color": "from-pink-300 to-red-300",
      "description": "Artistry fuels innovation"
    }
  ]
}
```

### IndexedDB Schema

```
Database: GreetinsDB
Store: teamMembers
{
  "id": "member_1234567890",
  "imageData": "data:image/jpeg;base64,...",
  "timestamp": 1234567890000
}
```

## Browser Support

This implementation uses:
- **IndexedDB** - Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- **localStorage** - Supported in all modern browsers
- **FileReader API** - Supported in all modern browsers
- **Promise API** - Supported in all modern browsers

## Size Limits

- **IndexedDB**: Typically 50MB+ per domain (browser dependent)
- **localStorage**: Typically 5-10MB per domain (browser dependent)

This means you can store many high-quality images without hitting size limits.

## Troubleshooting

### Images not persisting after refresh

1. Check browser console for errors
2. Verify IndexedDB is enabled in browser settings
3. Check if site has permission to use local storage
4. Clear browser cache and reload

### Slow image loading

- Images are loaded in parallel using `Promise.all()`
- Consider optimizing image sizes before upload
- Use browser DevTools to check network/indexeddb performance

### Out of storage errors

- Check available device storage
- Clear old browser data if needed
- Compress images before upload

## Adding More Sections

To add more team member sections:

1. Create another carousel section in Landing.jsx
2. Each section can use the same team members array or a separate array
3. The storage system handles unlimited members automatically

Example:

```javascript
// Section 1: Management Team
<section className="py-16">
  <h2>Management Team</h2>
  <CarouselComponent members={teamMembers.slice(0, 5)} />
</section>

// Section 2: Technical Team
<section className="py-16">
  <h2>Technical Team</h2>
  <CarouselComponent members={teamMembers.slice(5, 10)} />
</section>

// Section 3: Support Team
<section className="py-16">
  <h2>Support Team</h2>
  <CarouselComponent members={teamMembers.slice(10)} />
</section>
```

## Future Enhancements

- Backend API for cloud storage of images
- Image optimization/compression before storage
- Batch export/import of team members
- Image editing tools
- Team member profile URLs
- Analytics tracking for team section views
