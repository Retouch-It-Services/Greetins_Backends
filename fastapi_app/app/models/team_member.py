from sqlalchemy import Column, Integer, String, Text, LargeBinary, DateTime, func

from ..core.database import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    color_theme = Column(String(100), default="from-pink-300 to-red-300")
    image_data = Column(LargeBinary, nullable=True)  # Store image as binary
    image_filename = Column(String(255), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    class Config:
        from_attributes = True
