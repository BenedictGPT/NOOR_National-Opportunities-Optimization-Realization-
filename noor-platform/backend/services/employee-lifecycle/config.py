# Configuration Module
# NOOR Platform v7.1 - Employee Lifecycle Service

from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # Service Information
    SERVICE_NAME: str = "employee-lifecycle"
    SERVICE_VERSION: str = "7.1.0"
    ENVIRONMENT: str = "development"  # development, staging, production

    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    # PostgreSQL Configuration
    POSTGRES_HOST: str = "postgresql.noor-data.svc.cluster.local"
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str = "noor_db"
    POSTGRES_USER: str = "noor_service"
    POSTGRES_PASSWORD: str  # Required, no default

    # MongoDB Configuration
    MONGODB_HOST: str = "mongodb.noor-data.svc.cluster.local"
    MONGODB_PORT: int = 27017
    MONGODB_DB: str = "noor_operational"
    MONGODB_USER: str = "noor_service"
    MONGODB_PASSWORD: str  # Required, no default

    # Redis Configuration
    REDIS_HOST: str = "redis.noor-data.svc.cluster.local"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_PASSWORD: Optional[str] = None

    # Kafka Configuration
    KAFKA_BOOTSTRAP_SERVERS: str = "kafka.noor-messaging.svc.cluster.local:9092"
    KAFKA_SCHEMA_REGISTRY_URL: str = "http://schema-registry.noor-messaging.svc.cluster.local:8081"
    KAFKA_PRODUCER_COMPRESSION: str = "lz4"

    # JWT Authentication
    JWT_SECRET_KEY: str  # Required, no default
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60

    # CORS
    CORS_ORIGINS: list = ["*"]  # Configure per environment
    CORS_ALLOW_CREDENTIALS: bool = True

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 100

    # Monitoring
    PROMETHEUS_ENABLED: bool = True
    PROMETHEUS_PORT: int = 9090

    # Data Zones (for RLS)
    DATA_ZONE: str = "L2_INSTITUTIONAL"

    @property
    def postgres_url(self) -> str:
        """PostgreSQL connection URL"""
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def postgres_async_url(self) -> str:
        """Async PostgreSQL connection URL"""
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def mongodb_url(self) -> str:
        """MongoDB connection URL"""
        return f"mongodb://{self.MONGODB_USER}:{self.MONGODB_PASSWORD}@{self.MONGODB_HOST}:{self.MONGODB_PORT}/{self.MONGODB_DB}"

    @property
    def redis_url(self) -> str:
        """Redis connection URL"""
        if self.REDIS_PASSWORD:
            return f"redis://:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


# Example .env file content:
"""
# PostgreSQL
POSTGRES_PASSWORD=your_secure_password_here

# MongoDB
MONGODB_PASSWORD=your_secure_password_here

# JWT
JWT_SECRET_KEY=your_jwt_secret_key_here_minimum_32_characters

# Environment
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=INFO

# CORS (production)
CORS_ORIGINS=["https://noor.gov.ae", "https://app.noor.gov.ae"]
"""
