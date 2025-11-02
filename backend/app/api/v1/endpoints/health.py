"""NOOR Platform - Health Endpoints"""
from fastapi import APIRouter, Depends
from app.api.v1.endpoints.auth import get_current_user, TokenData
router = APIRouter()

@router.get("/")
async def list_health(current_user: TokenData = Depends(get_current_user)):
    return {"success": True, "data": []}

@router.post("/")
async def create_health(current_user: TokenData = Depends(get_current_user)):
    return {"success": True, "message": "Created successfully"}
