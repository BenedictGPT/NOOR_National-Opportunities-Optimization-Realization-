"""
NOOR Platform - Gamification API Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# ============================================================================
# Data Models
# ============================================================================

class TokenWalletResponse(BaseModel):
    user_id: str
    balance: int
    total_earned: int
    total_spent: int
    last_updated: str

class TokenTransactionResponse(BaseModel):
    id: str
    user_id: str
    type: str  # 'earn' or 'spend'
    amount: int
    source: str
    description: str
    timestamp: str

class ProgressResponse(BaseModel):
    user_id: str
    level: int
    experience_points: int
    next_level_xp: int
    assessments_completed: int
    courses_completed: int
    streak: Dict[str, Any]

class AchievementResponse(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    token_reward: int
    unlocked_at: str = None

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    user_name: str
    score: float
    tokens_earned: int
    assessments_completed: int

# ============================================================================
# Endpoints
# ============================================================================

@router.get("/wallet", response_model=TokenWalletResponse)
async def get_wallet(user_id: str):
    """
    Get user's token wallet
    """
    # TODO: Implement with database
    return {
        "user_id": user_id,
        "balance": 425,
        "total_earned": 650,
        "total_spent": 225,
        "last_updated": datetime.utcnow().isoformat()
    }

@router.get("/wallet/transactions", response_model=List[TokenTransactionResponse])
async def get_transactions(user_id: str):
    """
    Get user's transaction history
    """
    # TODO: Implement with database
    return [
        {
            "id": "tx_001",
            "user_id": user_id,
            "type": "earn",
            "amount": 100,
            "source": "Intellectual Faculty Assessment",
            "description": "Scored 94 on Learning Agility Assessment",
            "timestamp": "2024-11-01T10:30:00Z"
        },
        {
            "id": "tx_002",
            "user_id": user_id,
            "type": "earn",
            "amount": 75,
            "source": "Mental Faculty Assessment",
            "description": "Scored 85 on Critical Thinking Assessment",
            "timestamp": "2024-11-01T14:15:00Z"
        },
        {
            "id": "tx_003",
            "user_id": user_id,
            "type": "spend",
            "amount": 150,
            "source": "Learning Center",
            "description": "Unlocked Advanced Python Programming course",
            "timestamp": "2024-11-02T09:20:00Z"
        }
    ]

@router.post("/wallet/earn")
async def earn_tokens(user_id: str, amount: int, source: str, description: str):
    """
    Award tokens to user
    """
    # TODO: Implement with database
    return {
        "success": True,
        "new_balance": 425 + amount,
        "transaction_id": "tx_new"
    }

@router.post("/wallet/spend")
async def spend_tokens(user_id: str, amount: int, source: str, description: str):
    """
    Deduct tokens from user
    """
    # TODO: Implement with database
    current_balance = 425
    if amount > current_balance:
        raise HTTPException(status_code=400, detail="Insufficient tokens")
    
    return {
        "success": True,
        "new_balance": current_balance - amount,
        "transaction_id": "tx_new"
    }

@router.get("/progress", response_model=ProgressResponse)
async def get_progress(user_id: str):
    """
    Get user's progress (level, XP, streak)
    """
    # TODO: Implement with database
    return {
        "user_id": user_id,
        "level": 5,
        "experience_points": 1250,
        "next_level_xp": 1500,
        "assessments_completed": 3,
        "courses_completed": 1,
        "streak": {
            "current_streak": 7,
            "longest_streak": 12,
            "bonus_multiplier": 1.2
        }
    }

@router.get("/achievements", response_model=List[AchievementResponse])
async def get_achievements(user_id: str):
    """
    Get user's achievements
    """
    # TODO: Implement with database
    return [
        {
            "id": "ach_001",
            "title": "First Steps",
            "description": "Complete your first assessment",
            "icon": "🎯",
            "token_reward": 25,
            "unlocked_at": "2024-11-01T10:30:00Z"
        },
        {
            "id": "ach_002",
            "title": "Token Collector",
            "description": "Earn 500 tokens",
            "icon": "🪙",
            "token_reward": 50,
            "unlocked_at": "2024-11-02T14:15:00Z"
        },
        {
            "id": "ach_003",
            "title": "Lifelong Learner",
            "description": "Unlock your first course",
            "icon": "📚",
            "token_reward": 50,
            "unlocked_at": "2024-11-02T09:20:00Z"
        }
    ]

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
async def get_leaderboard(period: str = "weekly"):
    """
    Get leaderboard rankings
    """
    # TODO: Implement with database
    return [
        {
            "rank": 1,
            "user_id": "user_001",
            "user_name": "Ahmed Al Mansoori",
            "score": 95.0,
            "tokens_earned": 850,
            "assessments_completed": 8
        },
        {
            "rank": 2,
            "user_id": "user_002",
            "user_name": "Fatima Al Hashimi",
            "score": 91.0,
            "tokens_earned": 650,
            "assessments_completed": 3
        },
        {
            "rank": 3,
            "user_id": "user_003",
            "user_name": "Sara Al Zaabi",
            "score": 89.0,
            "tokens_earned": 575,
            "assessments_completed": 5
        }
    ]

@router.get("/streak")
async def get_streak(user_id: str):
    """
    Get user's activity streak
    """
    # TODO: Implement with database
    return {
        "user_id": user_id,
        "current_streak": 7,
        "longest_streak": 12,
        "bonus_multiplier": 1.2,
        "last_activity": datetime.utcnow().isoformat()
    }

