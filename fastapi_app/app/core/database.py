import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Get the database URL from environment variables
DATABASE_URL = os.environ.get("DATABASE_URL")

# Create a Base class that our models will inherit from
Base = declarative_base()

if DATABASE_URL:
    # Create the SQLAlchemy engine
    engine = create_engine(DATABASE_URL)
    # Create a configured "Session" class
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
else:
    engine = None
    SessionLocal = None
