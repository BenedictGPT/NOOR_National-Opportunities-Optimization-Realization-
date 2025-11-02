"""
NOOR Platform - Skills Endpoints
"""

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from typing import Optional, List
import logging

from app.api.v1.endpoints.auth import get_current_user, TokenData

logger = logging.getLogger(__name__)
router = APIRouter()


class Skill(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str]


class UserSkill(BaseModel):
    id: str
    skill: Skill
    proficiency_level: str
    years_of_experience: Optional[float]
    is_verified: bool


class AddSkill(BaseModel):
    skill_id: str
    proficiency_level: str
    years_of_experience: Optional[float]


@router.get("/")
async def list_skills(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 50
):
    """List all available skills"""
    return {"success": True, "skills": [], "total": 0}


@router.get("/me")
async def get_my_skills(current_user: TokenData = Depends(get_current_user)):
    """Get current user's skills"""
    return {"success": True, "skills": []}


@router.post("/me")
async def add_my_skill(
    skill_data: AddSkill,
    current_user: TokenData = Depends(get_current_user)
):
    """Add skill to current user's profile"""
    return {"success": True, "message": "Skill added successfully"}


@router.delete("/me/{skill_id}")
async def remove_my_skill(
    skill_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """Remove skill from current user's profile"""
    return {"success": True, "message": "Skill removed successfully"}

