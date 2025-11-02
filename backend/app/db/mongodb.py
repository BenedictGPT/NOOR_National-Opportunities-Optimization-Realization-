"""
NOOR Platform - MongoDB Connection
"""

from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# Global MongoDB client
mongodb_client: Optional[AsyncIOMotorClient] = None
mongodb_database = None


async def init_mongodb():
    """
    Initialize MongoDB connection
    """
    global mongodb_client, mongodb_database
    
    try:
        mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
        mongodb_database = mongodb_client[settings.MONGODB_DB]
        
        # Test connection
        await mongodb_client.admin.command('ping')
        logger.info("✅ MongoDB connected successfully")
    except Exception as e:
        logger.error(f"❌ MongoDB connection failed: {str(e)}")
        raise


async def get_mongodb():
    """
    Get MongoDB database instance
    """
    return mongodb_database


async def close_mongodb():
    """
    Close MongoDB connection
    """
    global mongodb_client
    if mongodb_client:
        mongodb_client.close()
        logger.info("MongoDB connection closed")

