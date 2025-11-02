# Database Integration Module
# NOOR Platform v7.1 - Employee Lifecycle Service

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
import redis.asyncio as aioredis
from typing import AsyncGenerator
import logging

from config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)

# =============================================================================
# POSTGRESQL
# =============================================================================

# Async engine for PostgreSQL
async_engine = create_async_engine(
    settings.postgres_async_url,
    echo=settings.DEBUG,
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True,
    pool_recycle=3600
)

# Async session factory
AsyncSessionLocal = sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency for getting async database session.
    Usage:
        async def endpoint(db: AsyncSession = Depends(get_db)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# =============================================================================
# MONGODB
# =============================================================================

# Async MongoDB client
mongodb_client: AsyncIOMotorClient = None
mongodb_db = None


async def get_mongodb():
    """Get MongoDB database instance"""
    return mongodb_db


async def connect_mongodb():
    """Initialize MongoDB connection"""
    global mongodb_client, mongodb_db
    try:
        mongodb_client = AsyncIOMotorClient(
            settings.mongodb_url,
            maxPoolSize=50,
            minPoolSize=10,
            serverSelectionTimeoutMS=5000
        )
        mongodb_db = mongodb_client[settings.MONGODB_DB]

        # Test connection
        await mongodb_client.server_info()
        logger.info("Connected to MongoDB successfully")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise


async def close_mongodb():
    """Close MongoDB connection"""
    global mongodb_client
    if mongodb_client:
        mongodb_client.close()
        logger.info("MongoDB connection closed")


# =============================================================================
# REDIS CACHE
# =============================================================================

redis_client = None


async def get_redis():
    """Get Redis client instance"""
    return redis_client


async def connect_redis():
    """Initialize Redis connection"""
    global redis_client
    try:
        redis_client = await aioredis.from_url(
            settings.redis_url,
            encoding="utf-8",
            decode_responses=True,
            max_connections=50
        )

        # Test connection
        await redis_client.ping()
        logger.info("Connected to Redis successfully")
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {e}")
        raise


async def close_redis():
    """Close Redis connection"""
    global redis_client
    if redis_client:
        await redis_client.close()
        logger.info("Redis connection closed")


# =============================================================================
# CONNECTION LIFECYCLE
# =============================================================================

async def init_databases():
    """Initialize all database connections"""
    logger.info("Initializing database connections...")
    await connect_mongodb()
    await connect_redis()
    logger.info("All database connections initialized")


async def close_databases():
    """Close all database connections"""
    logger.info("Closing database connections...")
    await close_mongodb()
    await close_redis()
    logger.info("All database connections closed")


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

async def execute_with_retry(func, max_retries=3):
    """Execute database operation with retry logic"""
    for attempt in range(max_retries):
        try:
            return await func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            logger.warning(f"Database operation failed (attempt {attempt + 1}/{max_retries}): {e}")
            await asyncio.sleep(2 ** attempt)  # Exponential backoff


# Cache decorators
def cache_result(ttl=300):
    """
    Decorator to cache function result in Redis

    Usage:
        @cache_result(ttl=600)
        async def get_employee(employee_id: str):
            ...
    """
    def decorator(func):
        async def wrapper(*args, **kwargs):
            cache_key = f"{func.__name__}:{':'.join(map(str, args))}"

            # Try to get from cache
            cached = await redis_client.get(cache_key)
            if cached:
                import json
                return json.loads(cached)

            # Execute function
            result = await func(*args, **kwargs)

            # Cache result
            if result:
                import json
                await redis_client.setex(cache_key, ttl, json.dumps(result))

            return result
        return wrapper
    return decorator
