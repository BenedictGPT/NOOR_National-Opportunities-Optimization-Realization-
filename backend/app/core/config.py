"""
NOOR Platform - Configuration Settings
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """
    
    # Application
    APP_NAME: str = "NOOR Platform"
    APP_VERSION: str = "7.2.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://noor.gov.ae"
    ]
    
    # PostgreSQL
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "noor"
    POSTGRES_PASSWORD: str = "noor_password"
    POSTGRES_DB: str = "noor_db"
    
    @property
    def POSTGRES_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    @property
    def ASYNC_POSTGRES_URL(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # MongoDB
    MONGODB_HOST: str = "localhost"
    MONGODB_PORT: int = 27017
    MONGODB_USER: str = "noor"
    MONGODB_PASSWORD: str = "noor_password"
    MONGODB_DB: str = "noor_logs"
    
    @property
    def MONGODB_URL(self) -> str:
        return f"mongodb://{self.MONGODB_USER}:{self.MONGODB_PASSWORD}@{self.MONGODB_HOST}:{self.MONGODB_PORT}/{self.MONGODB_DB}"
    
    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: Optional[str] = None
    REDIS_DB: int = 0
    
    @property
    def REDIS_URL(self) -> str:
        if self.REDIS_PASSWORD:
            return f"redis://:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
    
    # Neo4j
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "noor_password"
    
    # Elasticsearch
    ELASTICSEARCH_HOST: str = "localhost"
    ELASTICSEARCH_PORT: int = 9200
    ELASTICSEARCH_USER: str = "elastic"
    ELASTICSEARCH_PASSWORD: str = "noor_password"
    
    @property
    def ELASTICSEARCH_URL(self) -> str:
        return f"http://{self.ELASTICSEARCH_USER}:{self.ELASTICSEARCH_PASSWORD}@{self.ELASTICSEARCH_HOST}:{self.ELASTICSEARCH_PORT}"
    
    # Kafka
    KAFKA_BOOTSTRAP_SERVERS: List[str] = ["localhost:9092"]
    
    # OpenAI
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4"
    
    # Anthropic AI
    ANTHROPIC_API_KEY: Optional[str] = None
    AI_MODEL: str = "claude-3-5-sonnet-20241022"
    AI_MAX_TOKENS: int = 4096
    AI_TEMPERATURE: float = 0.7
    MASTER_ORCHESTRATOR_MODEL: str = "claude-3-5-sonnet-20241022"
    
    # Agent Configuration
    AGENT_MAX_RETRIES: int = 3
    AGENT_TIMEOUT_SECONDS: int = 300
    ENABLE_AGENT_LOGGING: bool = True
    ENABLE_AI_FEATURES: bool = True
    
    # UAE Pass Integration
    UAE_PASS_CLIENT_ID: Optional[str] = None
    UAE_PASS_CLIENT_SECRET: Optional[str] = None
    UAE_PASS_REDIRECT_URI: str = "https://noor.gov.ae/auth/callback"
    UAE_PASS_BASE_URL: str = "https://stg-id.uaepass.ae"
    
    # SEHA Integration
    SEHA_API_KEY: Optional[str] = None
    SEHA_BASE_URL: str = "https://api.seha.ae"
    
    # DHA Integration
    DHA_API_KEY: Optional[str] = None
    DHA_BASE_URL: str = "https://api.dha.gov.ae"
    
    # MOHAP Integration
    MOHAP_API_KEY: Optional[str] = None
    MOHAP_BASE_URL: str = "https://api.mohap.gov.ae"
    
    # GPSSA Integration
    GPSSA_API_KEY: Optional[str] = None
    GPSSA_BASE_URL: str = "https://api.gpssa.gov.ae"
    
    # ADPF Integration
    ADPF_API_KEY: Optional[str] = None
    ADPF_BASE_URL: str = "https://api.adpf.gov.ae"
    
    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAIL_FROM: str = "noreply@noor.gov.ae"
    
    # SMS (Twilio)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None
    
    # File Storage
    UPLOAD_DIR: str = "/var/noor/uploads"
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Monitoring
    SENTRY_DSN: Optional[str] = None
    
    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance
    """
    return Settings()


# Global settings instance
settings = get_settings()

