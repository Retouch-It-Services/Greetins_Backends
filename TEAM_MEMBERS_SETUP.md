# Team Members Feature - PostgreSQL Setup

## Overview
The team members section now uses PostgreSQL database for persistent storage instead of IndexedDB. This allows for:
- Unlimited team members
- Image storage in the database
- Edit/delete functionality
- Modern carousel design

## Backend Setup

### 1. Database Model
Created: `fastapi_app/app/models/team_member.py`
- Stores team member details (name, role, description, color theme)
- Stores images as binary data
- Tracks created_at and updated_at timestamps

### 2. API Endpoints
Created: `fastapi_app/app/api/v1/endpoints/team_members.py`

Available endpoints:
```
GET    /api/v1/team-members              - Get all team members
GET    /api/v1/team-members/{id}         - Get single team member
GET    /api/v1/team-members/{id}/image   - Get team member image
POST   /api/v1/team-members              - Create new team member
POST   /api/v1/team-members/{id}/upload-image         - Upload image (multipart)
POST   /api/v1/team-members/{id}/upload-image-base64  - Upload image (base64)
PUT    /api/v1/team-members/{id}         - Update team member
DELETE /api/v1/team-members/{id}         - Delete team member
```

### 3. Updated Files
- `fastapi_app/app/main.py` - Added team_members router
- `fastapi_app/app/schemas.py` - Added TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse

## Frontend Setup

### 1. API Client
Created: `frontend/src/api/teamMembers.js`
- Functions to communicate with backend API
- Handles image uploads (both file and base64)

### 2. Components Created

#### TeamCarousel Component
`frontend/src/components/TeamCarousel.jsx`
- Modern carousel displaying 3 team members
- Left/right navigation arrows
- Carousel indicators
- Edit functionality for each member
- Delete functionality
- Image upload with cropping
- Automatically loads from database on mount

#### AddTeamMemberModal Component
`frontend/src/components/AddTeamMemberModal.jsx`
- Modal to add new team members
- Form inputs: name, role, description, color theme
- Image upload with cropping
- Saves to PostgreSQL database

### 3. Updated Pages
- `frontend/src/pages/Landing.jsx` - Completely redesigned with new team carousel

## Design Features

### Team Member Card
- Circular profile image with border
- Name and role badge
- Description text
- Edit and Delete buttons
- Color-coded role badges

### Carousel
- 3 members visible at once
- Smooth navigation arrows
- Carousel indicators for page jumping
- Responsive design
- Beautiful gradient backgrounds

## How to Use

### Adding a Team Member
1. Click "➕ Add New Team Member" button
2. Fill in: Name, Role, Description
3. Choose a color theme
4. Upload an image (optional - will be cropped)
5. Click "Add Member"

### Editing a Team Member
1. Click "✏️ Edit" on a team member card
2. Modify: Name, Role, Description
3. Upload a new image (optional)
4. Click "Save"

### Deleting a Team Member
1. Click "🗑️ Delete" on a team member card
2. Confirm deletion

### Uploading Images
- Supports PNG, JPG, WEBP formats
- Images are automatically cropped to circular format
- Stored in PostgreSQL as binary data
- Retrieved as base64 for display

## Database Schema

```sql
CREATE TABLE team_members (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    color_theme VARCHAR(100) DEFAULT 'from-pink-300 to-red-300',
    image_data LONGBLOB,
    image_filename VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Running the Application

### Backend
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm start
```

## API Examples

### Create Team Member
```bash
curl -X POST http://localhost:8000/api/v1/team-members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "role": "Developer",
    "description": "Full stack developer",
    "color_theme": "from-blue-300 to-cyan-300"
  }'
```

### Upload Image (Base64)
```bash
curl -X POST http://localhost:8000/api/v1/team-members/1/upload-image-base64 \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'image_data=data:image/jpeg;base64,...&filename=profile.jpg'
```

### Get All Team Members
```bash
curl http://localhost:8000/api/v1/team-members
```

### Get Team Member Image
```bash
curl http://localhost:8000/api/v1/team-members/1/image
```

## Troubleshooting

### Images not displaying
- Check browser console for errors
- Verify images are saved in database
- Try clearing cache and refreshing

### Database errors
- Ensure PostgreSQL is running
- Check .env file for correct DATABASE_URL
- Run migrations if needed

### Upload failures
- Check file size (should be < 10MB)
- Verify image format is supported
- Check server logs for detailed errors

## Color Theme Options
- Pink to Red: `from-pink-300 to-red-300`
- Blue to Cyan: `from-blue-300 to-cyan-300`
- Orange to Yellow: `from-orange-300 to-yellow-300`
- Green to Emerald: `from-green-300 to-emerald-300`
- Indigo to Purple: `from-indigo-300 to-purple-300`
- Cyan to Blue: `from-cyan-300 to-blue-300`
- Amber to Orange: `from-amber-300 to-orange-300`
- Teal to Green: `from-teal-300 to-green-300`
- Violet to Purple: `from-violet-300 to-purple-300`
