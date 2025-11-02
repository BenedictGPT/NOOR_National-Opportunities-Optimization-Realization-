"""
NOOR Platform - Redis Connection
"""

import redis.asyncio as redis
from typing import Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# Global Redis client
redis_client: Optional[redis.Redis] = None


async def init_redis():
    """
    Initialize Redis connection
    """
    global redis_client
    
    try:
        redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )
        
        # Test connection
        await redis_client.ping()
        logger.info("✅ Redis connected successfully")
    except Exception as e:
        logger.error(f"❌ Redis connection failed: {str(e)}")
        raise


async def get_redis():
    """
    Get Redis client instance
    """
    return redis_client


async def close_redis():
    """
    Close Redis connection
    """
    global redis_client
    if redis_client:
        await redis_client.close()
        logger.info("Redis connection closed")

