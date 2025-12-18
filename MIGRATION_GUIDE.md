# 🔄 Database Migration - Add Card Image Support

## What Changed

Added support for storing and sending card images in greeting emails.

### New Features:
- ✅ Users can upload custom card images
- ✅ Images are displayed in emails
- ✅ Images are stored in database for records

### Database Changes:
- Added `card_image` column to `greetings` table (Text, nullable)

---

## How to Apply the Migration

### **Option 1: Automatic (Recommended)**

```bash
cd fastapi_app
alembic upgrade head
```

This will automatically run all pending migrations.

### **Option 2: Specific Migration**

```bash
cd fastapi_app
alembic upgrade add_card_image
```

### **Option 3: Check Migration Status**

```bash
cd fastapi_app
alembic current
```

Shows which migration you're currently at.

---

## Verify the Migration Worked

After running the migration, check your database:

```sql
-- Using PostgreSQL:
\d greetings

-- Should show:
-- Column    | Type | Modifiers
-- card_image | text | 

SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name='greetings';
```

---

## What to Do If Migration Fails

### If you get "Can't locate revision identified by 'add_card_image'"

1. Check the migration file exists:
   ```bash
   ls fastapi_app/alembic/versions/add_card_image_column.py
   ```

2. Check alembic.ini is pointing to correct directory:
   ```bash
   cat fastapi_app/alembic.ini | grep sqlalchemy.url
   ```

3. Try downgrading and re-upgrading:
   ```bash
   cd fastapi_app
   alembic downgrade -1
   alembic upgrade head
   ```

### If you still have issues:

Just manually add the column:

```bash
# Using PostgreSQL:
psql -U neondb_owner -h ep-divine-base-a4ik7357-pooler.us-east-1.aws.neon.tech -d neondb

# Then run:
ALTER TABLE greetings ADD COLUMN card_image TEXT NULL;
```

---

## Testing Card Image Upload

1. **Restart Backend:**
   ```bash
   cd fastapi_app
   uvicorn main:app --reload
   ```

2. **Go through Complete Flow:**
   - Click "Create Cards"
   - Select a card
   - Click "Finalize the card"
   - **Upload an image** (new feature!)
   - Fill recipient email
   - Click "Send via Email"

3. **Check Results:**
   - Backend logs should show image being processed
   - Database should have card_image saved
   - Email should contain the image

---

## Backend Code Changes

### API Schema (`schemas.py`):
```python
class GreetingSendRequest(BaseModel):
    # ... existing fields ...
    card_image: Optional[str] = None  # New field
```

### Database Model (`models/greeting.py`):
```python
class Greeting(Base):
    # ... existing fields ...
    card_image = Column(Text, nullable=True)  # New column
```

### Email Processing (`utils/greeting_processor.py`):
```python
# Now includes image in HTML email if provided
card_image_html = f'<img src="{payload.card_image}" ...>'
```

### Endpoint (`endpoints/greetings.py`):
```python
# Now saves card_image to database
card_image=payload.card_image
```

---

## Frontend Changes

### PersonalizeCard Page:
- ✅ Image upload preview
- ✅ Preview toggle button
- ✅ Image stored as base64 data URL

### SendGreeting Page:
- ✅ Passes card_image to backend API

---

## Expected Email Output

When a user uploads an image, the email will contain:

```
🎉 Special Greeting for You!

[CARD IMAGE HERE - displayed in email]

Your greeting message...

From: Sender Name
```

---

## File Changes Summary

```
Modified Files:
  ✅ fastapi_app/app/schemas.py - Added card_image field
  ✅ fastapi_app/app/models/greeting.py - Added card_image column
  ✅ fastapi_app/app/api/v1/endpoints/greetings.py - Save card_image
  ✅ fastapi_app/app/utils/greeting_processor.py - Include image in email
  ✅ frontend/src/pages/SendGreeting.jsx - Send card_image to API

New Migration:
  ✅ fastapi_app/alembic/versions/add_card_image_column.py
```

---

## Next Steps

1. ✅ Apply migration: `alembic upgrade head`
2. ✅ Restart backend: `uvicorn main:app --reload`
3. ✅ Test image upload and email sending
4. ✅ Verify image appears in recipient's email

---

**Card image support is now fully implemented! 🎉**
