from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Form
from sqlalchemy.orm import Session
import base64
import os
from pathlib import Path

from ....models.team_member import TeamMember
from ....schemas import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse
from ....db.session import get_db

router = APIRouter(prefix="/team-members", tags=["Team Members"])

# Directory to store uploaded images
UPLOAD_DIR = Path("uploads/team_members")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.get("/test", tags=["Team Members"])
async def test_connection(db: Session = Depends(get_db)):
    """Test database connection"""
    try:
        # Try to query team members to test connection
        members = db.query(TeamMember).limit(1).all()
        return {"status": "OK", "message": "Database connected", "members_found": len(members)}
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}


@router.get("/", response_model=list[TeamMemberResponse])
async def get_all_team_members(db: Session = Depends(get_db)):
    """Get all team members"""
    members = db.query(TeamMember).all()
    return members


@router.get("/{member_id}", response_model=TeamMemberResponse)
async def get_team_member(member_id: int, db: Session = Depends(get_db)):
    """Get a specific team member"""
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return member


@router.get("/{member_id}/image")
async def get_team_member_image(member_id: int, db: Session = Depends(get_db)):
    """Get team member image as base64"""
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member or not member.image_data:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Return image as base64
    image_base64 = base64.b64encode(member.image_data).decode('utf-8')
    return {
        "id": member.id,
        "image": f"data:image/jpeg;base64,{image_base64}",
        "filename": member.image_filename
    }


@router.post("/", response_model=TeamMemberResponse)
async def create_team_member(
    member_data: TeamMemberCreate,
    db: Session = Depends(get_db)
):
    """Create a new team member"""
    try:
        print(f"[CREATE MEMBER] Input data: {member_data.dict()}")
        
        new_member = TeamMember(
            name=member_data.name,
            role=member_data.role,
            description=member_data.description,
            color_theme=member_data.color_theme
        )
        
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        
        print(f"[CREATE MEMBER SUCCESS] Created member ID: {new_member.id}")
        print(f"[CREATE MEMBER RESPONSE] {new_member.id}, {new_member.name}, {new_member.role}")
        
        return new_member
    except Exception as e:
        db.rollback()
        error_msg = str(e)
        print(f"[CREATE MEMBER ERROR] {error_msg}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Database error: {error_msg}")


@router.post("/{member_id}/upload-image")
async def upload_team_member_image(
    member_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload image for a team member"""
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    try:
        # Read image file
        image_content = await file.read()
        
        # Store as binary in database
        member.image_data = image_content
        member.image_filename = file.filename
        
        db.commit()
        db.refresh(member)
        
        return {
            "message": "Image uploaded successfully",
            "member_id": member.id,
            "filename": member.image_filename
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{member_id}/upload-image-base64")
async def upload_team_member_image_base64(
    member_id: int,
    image_data: str = Form(...),
    filename: str = Form(default="image.jpg"),
    db: Session = Depends(get_db)
):
    """Upload image for a team member as base64"""
    try:
        print(f"[UPLOAD IMAGE] Starting upload for member ID: {member_id}")
        print(f"[UPLOAD IMAGE] Filename: {filename}")
        print(f"[UPLOAD IMAGE] Image data length: {len(image_data)} bytes")
        
        member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
        if not member:
            raise HTTPException(status_code=404, detail="Team member not found")
        
        try:
            # Convert base64 to binary
            base64_data = image_data
            if image_data.startswith("data:"):
                # Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                base64_data = image_data.split(",")[1]
            
            print(f"Base64 data length after cleanup: {len(base64_data)}")
            
            # Decode base64 to bytes
            image_bytes = base64.b64decode(base64_data)
            print(f"Image bytes size: {len(image_bytes)} bytes ({len(image_bytes) / (1024*1024):.2f} MB)")
            
            # Check file size (max 5MB)
            if len(image_bytes) > 5 * 1024 * 1024:
                raise ValueError(f"Image too large: {len(image_bytes) / (1024*1024):.2f} MB (max 5 MB)")
            
            # Store as binary in database
            member.image_data = image_bytes
            member.image_filename = filename
            
            db.commit()
            db.refresh(member)
            
            print(f"Image uploaded successfully for member {member.id}")
            
            return {
                "message": "Image uploaded successfully",
                "member_id": member.id,
                "filename": member.image_filename,
                "size_bytes": len(image_bytes)
            }
        except ValueError as e:
            db.rollback()
            print(f"Validation error: {str(e)}")
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            db.rollback()
            print(f"Error decoding/saving image: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Image processing error: {str(e)}")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@router.put("/{member_id}", response_model=TeamMemberResponse)
async def update_team_member(
    member_id: int,
    member_data: TeamMemberUpdate,
    db: Session = Depends(get_db)
):
    """Update team member details"""
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    # Update fields if provided
    if member_data.name is not None:
        member.name = member_data.name
    if member_data.role is not None:
        member.role = member_data.role
    if member_data.description is not None:
        member.description = member_data.description
    if member_data.color_theme is not None:
        member.color_theme = member_data.color_theme
    
    db.commit()
    db.refresh(member)
    return member


@router.delete("/{member_id}")
async def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    """Delete a team member"""
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    db.delete(member)
    db.commit()
    
    return {"message": "Team member deleted successfully"}
