"""NOOR Platform - Education Endpoints"""
from fastapi import APIRouter, Depends
from app.api.v1.endpoints.auth import get_current_user, TokenData
router = APIRouter()

@router.get("/me")
async def get_my_education(current_user: TokenData = Depends(get_current_user)):
    return {"success": True, "education": []}

@router.post("/me")
async def add_education(current_user: TokenData = Depends(get_current_user)):
    return {"success": True, "message": "Education added"}
