# Team Members Setup - Step by Step

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL or MySQL running

### Step 1: Set Environment Variables

**Edit `fastapi_app/.env`:**

#### For PostgreSQL
```env
DATABASE_URL=postgresql://username:password@localhost:5432/greetins_db
```

#### For MySQL
```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/greetins_db
```

#### For SQLite (Development)
```env
DATABASE_URL=sqlite:///./greetins.db
```

### Step 2: Start Backend

```bash
cd fastapi_app
pip install -r requirements.txt  # if needed
python -m uvicorn app.main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Step 3: Start Frontend

```bash
cd frontend
npm install  # if needed
npm start
```

Expected output:
```
Compiled successfully!
You can now view greetins-app in the browser.
```

### Step 4: Test the Connection

Open browser and go to: `http://localhost:3000`

Navigate to: **Add New Team Member**

## ✅ Verification Checklist

### Backend Running?
```bash
curl http://localhost:8000/
# Should return: {"message": "Welcome to the Greetins API!"}
```

### Database Connected?
```bash
curl http://localhost:8000/api/v1/team-members/test
# Should return: {"status": "OK", "message": "Database connected", ...}
```

### Can Create Member?
```bash
curl -X POST http://localhost:8000/api/v1/team-members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "role": "Developer",
    "description": "Test member"
  }'
# Should return member object with ID
```

## 📊 Database Setup

### PostgreSQL (Recommended)

**Mac/Linux:**
```bash
# Install
brew install postgresql
# Start service
brew services start postgresql
# Create database
createdb greetins_db
```

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Install PostgreSQL
- In pgAdmin: Create new database "greetins_db"

**Connection String:**
```
postgresql://postgres:password@localhost:5432/greetins_db
```

### MySQL

**Mac/Linux:**
```bash
brew install mysql
brew services start mysql
mysql -u root -p
CREATE DATABASE greetins_db;
```

**Windows:**
- Download from https://www.mysql.com/downloads/
- Install MySQL
- Use MySQL Workbench to create database

**Connection String:**
```
mysql+pymysql://root:password@localhost:3306/greetins_db
```

### SQLite (Easiest for Development)

No installation needed!

**Connection String:**
```
sqlite:///./greetins.db
```

## 🐛 Troubleshooting

### Error: ModuleNotFoundError: No module named 'app...'

**Solution:**
```bash
cd fastapi_app
pip install -e .  # or ensure you're in correct directory
```

### Error: Failed to add team member: Request failed with status code 400

**Check these in order:**

1. **Backend running?**
   ```bash
   curl http://localhost:8000/
   ```
   If error: Start backend server

2. **Database connected?**
   ```bash
   curl http://localhost:8000/api/v1/team-members/test
   ```
   If error: Check DATABASE_URL in .env

3. **Database server running?**
   - PostgreSQL: `pg_isready`
   - MySQL: `mysqladmin -u root ping`
   - SQLite: (no server needed)

4. **Check backend logs** for the exact error:
   Look at the terminal running `uvicorn app.main:app --reload`

### Error: Cannot connect to backend

**Cause:** Frontend can't reach backend API

**Solution:**
- Verify backend running: `curl http://localhost:8000/`
- Check frontend .env: Should have `REACT_APP_API_BASE_URL=http://localhost:8000/api/v1` (or leave unset for default)
- Check browser console for CORS errors

### Error: Tables don't exist

**Solution:** 
Tables create automatically, but if they don't:

```bash
# Manually create in database
# For PostgreSQL, connect and run:
psql greetins_db < create_tables.sql
```

Or use Alembic migrations:
```bash
cd fastapi_app
alembic upgrade head
```

## 🔍 Debug Mode

### Enable Detailed Logging

**Backend:**
```bash
python -m uvicorn app.main:app --reload --log-level debug
```

**Frontend:** Open DevTools (F12)
- Go to **Console** tab - see all logs
- Go to **Network** tab - see HTTP requests
- Click request to see details

### Test Endpoints Manually

Use curl or Postman:

```bash
# Create member
curl -X POST http://localhost:8000/api/v1/team-members \
  -H "Content-Type: application/json" \
  -d '{"name":"John","role":"Dev","description":"Test"}'

# Get all members
curl http://localhost:8000/api/v1/team-members

# Get one member
curl http://localhost:8000/api/v1/team-members/1

# Update member
curl -X PUT http://localhost:8000/api/v1/team-members/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane"}'

# Delete member
curl -X DELETE http://localhost:8000/api/v1/team-members/1
```

## 📝 Features Working

Once setup is complete, you should be able to:

✅ Add new team members with name, role, description, color theme  
✅ Upload and crop profile images  
✅ Edit member details  
✅ Delete members  
✅ View carousel of team members  
✅ Images persist in database  

## 🎉 You're Done!

Go to `http://localhost:3000` → "Meet Our Team" section → Click "Add New Team Member" button

Happy coding! 🚀
