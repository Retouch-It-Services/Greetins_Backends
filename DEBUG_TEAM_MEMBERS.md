# Debugging Team Members 400 Error

## Common Causes of 400 Error

### 1. DATABASE_URL Not Set
The `.env` file must have `DATABASE_URL` configured.

**Check your `.env` file:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/greetins_db
```

**Or with MySQL:**
```
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/greetins_db
```

### 2. Database Connection Issues
Test the connection at: `http://localhost:8000/api/v1/team-members/test`

Should return:
```json
{
  "status": "OK",
  "message": "Database connected",
  "members_found": 0
}
```

If you see "ERROR", check:
- Is the database running?
- Is DATABASE_URL correct?
- Can the server access the database?

### 3. Database Tables Not Created
Tables are created automatically when the server starts. Check:
- Server logs for errors during `Base.metadata.create_all(bind=engine)`
- Manually verify table exists: `SELECT * FROM team_members;`

## Testing the API

### Step 1: Check Backend is Running
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload
```

Should show: `Uvicorn running on http://127.0.0.1:8000`

### Step 2: Test Database Connection
```bash
curl http://localhost:8000/api/v1/team-members/test
```

### Step 3: Create Team Member (Test)
```bash
curl -X POST http://localhost:8000/api/v1/team-members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "role": "Developer",
    "description": "Full stack developer"
  }'
```

### Step 4: Get All Members
```bash
curl http://localhost:8000/api/v1/team-members
```

## Frontend Debugging

### 1. Check Browser Console
Open DevTools (F12) → Console tab
Look for error messages when adding a member

### 2. Check Network Request
DevTools → Network tab
When you click "Add Member", look at the POST request to `/api/v1/team-members`
- **Status should be:** 201 (created)
- **Status 400:** Bad request (check response body for details)
- **Status 500:** Server error
- **Status 0:** No connection to backend

### 3. Check API Response
Click on the request → Response tab
Shows the error message from the backend

## Environment Setup

### PostgreSQL (Recommended)
```bash
# Install PostgreSQL
# Create database
createdb greetins_db

# Set DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/greetins_db
```

### MySQL
```bash
# Install MySQL
# Create database
mysql -u root -p
CREATE DATABASE greetins_db;

# Set DATABASE_URL in .env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/greetins_db
```

### SQLite (For Development)
```bash
# No installation needed, just set in .env
DATABASE_URL=sqlite:///./greetins.db
```

## Server Logs

Run the backend with verbose logging:
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload --log-level debug
```

The logs will show:
- "Creating team member: ..."
- "Team member created successfully: ..."
- "Error creating team member: ..." (if there's an error)

## If Still Having Issues

1. **Restart the backend server** after editing `.env`
2. **Check DATABASE_URL** - copy/paste exact value into terminal
3. **Verify database permissions** - user can create tables
4. **Check frontend API URL** - should be `http://localhost:8000/api/v1`
5. **Clear browser cache** - sometimes old requests cached

## Quick Fix Checklist

- [ ] `.env` has `DATABASE_URL` set
- [ ] Database server is running (PostgreSQL/MySQL)
- [ ] Backend server is running on port 8000
- [ ] `/api/v1/team-members/test` returns OK status
- [ ] Browser network tab shows 201 status (not 400)
- [ ] No CORS errors in browser console
