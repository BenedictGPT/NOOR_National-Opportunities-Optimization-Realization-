"""
NOOR Platform - PostgreSQL Database Connection
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# Create async engine
async_engine = create_async_engine(
    settings.ASYNC_POSTGRES_URL,
    echo=settings.DEBUG,
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True
)

# Create sync engine for migrations
sync_engine = create_engine(
    settings.POSTGRES_URL,
    echo=settings.DEBUG,
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True
)

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

# Base class for models
Base = declarative_base()


async def init_postgres():
    """
    Initialize PostgreSQL connection
    """
    try:
        async with async_engine.begin() as conn:
            # Test connection
            await conn.execute("SELECT 1")
        logger.info("✅ PostgreSQL connected successfully")
    except Exception as e:
        logger.error(f"❌ PostgreSQL connection failed: {str(e)}")
        raise


async def get_db() -> AsyncSession:
    """
    Dependency to get database session
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

