from sqlalchemy.orm import Session

from ..core.database import SessionLocal


# Dependency to get a DB session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
