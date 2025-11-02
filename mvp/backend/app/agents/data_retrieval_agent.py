"""
Data Retrieval Agent for NOOR Platform

This agent is responsible for fetching and managing data from various sources:
- Database queries (PostgreSQL, MongoDB, Redis)
- API calls to external services
- Data caching and optimization
- Data transformation and validation
"""

import logging
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import json

from app.agents.base_agent import BaseAgent, AgentCapability, AgentStatus
from app.core.ai_client import get_ai_client
from app.db.postgres import get_db
from app.db.mongodb import get_mongodb
from app.db.redis import get_redis
from sqlalchemy.orm import Session
from sqlalchemy import text

logger = logging.getLogger(__name__)


class DataRetrievalAgent(BaseAgent):
    """Agent for retrieving and managing data from various sources"""
    
    def __init__(self):
        super().__init__(
            agent_id="data-retrieval-001",
            name="Data Retrieval Agent",
            description="Fetches and manages data from databases and external APIs",
            capabilities=[
                AgentCapability.DATA_RETRIEVAL,
                AgentCapability.CACHING,
                AgentCapability.DATA_TRANSFORMATION
            ]
        )
        self.cache_ttl = 300  # 5 minutes default TTL
        
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute data retrieval task
        
        Args:
            task: Task dictionary with action and parameters
            
        Returns:
            Result dictionary with retrieved data
        """
        try:
            self.status = AgentStatus.BUSY
            action = task.get("action")
            parameters = task.get("parameters", {})
            
            logger.info(f"Data Retrieval Agent executing: {action}")
            
            # Route to appropriate method
            if action == "fetch_user_profile":
                result = await self.fetch_user_profile(parameters.get("user_id"))
            elif action == "fetch_user_skills":
                result = await self.fetch_user_skills(parameters.get("user_id"))
            elif action == "fetch_work_experience":
                result = await self.fetch_work_experience(parameters.get("user_id"))
            elif action == "fetch_job_postings":
                result = await self.fetch_job_postings(parameters.get("filters", {}))
            elif action == "fetch_institution_data":
                result = await self.fetch_institution_data(parameters.get("institution_id"))
            elif action == "search_skills":
                result = await self.search_skills(parameters.get("query"))
            elif action == "get_cached_data":
                result = await self.get_cached_data(parameters.get("key"))
            elif action == "set_cached_data":
                result = await self.set_cached_data(
                    parameters.get("key"),
                    parameters.get("value"),
                    parameters.get("ttl", self.cache_ttl)
                )
            else:
                raise ValueError(f"Unknown action: {action}")
            
            self.status = AgentStatus.IDLE
            return {
                "success": True,
                "action": action,
                "data": result,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.ERROR
            logger.error(f"Data Retrieval Agent error: {e}")
            return {
                "success": False,
                "error": str(e),
                "action": task.get("action"),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def fetch_user_profile(self, user_id: str) -> Dict[str, Any]:
        """Fetch user profile from database"""
        try:
            # Check cache first
            cache_key = f"user_profile:{user_id}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                logger.info(f"Cache hit for user profile: {user_id}")
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            query = text("""
                SELECT id, email, first_name, last_name, phone, 
                       date_of_birth, nationality, emirate, 
                       created_at, updated_at
                FROM users
                WHERE id = :user_id
            """)
            result = db.execute(query, {"user_id": user_id}).fetchone()
            
            if not result:
                return {"error": "User not found"}
            
            user_data = dict(result._mapping)
            
            # Convert datetime objects to ISO format
            for key, value in user_data.items():
                if isinstance(value, datetime):
                    user_data[key] = value.isoformat()
            
            # Cache the result
            await self.set_cached_data(cache_key, user_data, ttl=600)  # 10 minutes
            
            logger.info(f"Fetched user profile: {user_id}")
            return user_data
            
        except Exception as e:
            logger.error(f"Error fetching user profile: {e}")
            raise
    
    async def fetch_user_skills(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch user skills from database"""
        try:
            # Check cache
            cache_key = f"user_skills:{user_id}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            query = text("""
                SELECT us.id, us.user_id, us.skill_id, us.proficiency_level,
                       us.years_of_experience, us.last_used_date, us.is_verified,
                       s.name as skill_name, s.category as skill_category
                FROM user_skills us
                JOIN skills s ON us.skill_id = s.id
                WHERE us.user_id = :user_id
                ORDER BY us.proficiency_level DESC, us.years_of_experience DESC
            """)
            results = db.execute(query, {"user_id": user_id}).fetchall()
            
            skills = []
            for row in results:
                skill_data = dict(row._mapping)
                # Convert datetime objects
                for key, value in skill_data.items():
                    if isinstance(value, datetime):
                        skill_data[key] = value.isoformat()
                skills.append(skill_data)
            
            # Cache the result
            await self.set_cached_data(cache_key, skills, ttl=300)  # 5 minutes
            
            logger.info(f"Fetched {len(skills)} skills for user: {user_id}")
            return skills
            
        except Exception as e:
            logger.error(f"Error fetching user skills: {e}")
            raise
    
    async def fetch_work_experience(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch user work experience from database"""
        try:
            # Check cache
            cache_key = f"work_experience:{user_id}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            query = text("""
                SELECT id, user_id, company_name, job_title, employment_type,
                       industry, location, start_date, end_date, is_current,
                       description, achievements, skills_used, is_verified
                FROM work_experience
                WHERE user_id = :user_id
                ORDER BY start_date DESC
            """)
            results = db.execute(query, {"user_id": user_id}).fetchall()
            
            experiences = []
            for row in results:
                exp_data = dict(row._mapping)
                # Convert datetime and JSON objects
                for key, value in exp_data.items():
                    if isinstance(value, datetime):
                        exp_data[key] = value.isoformat()
                experiences.append(exp_data)
            
            # Cache the result
            await self.set_cached_data(cache_key, experiences, ttl=300)
            
            logger.info(f"Fetched {len(experiences)} work experiences for user: {user_id}")
            return experiences
            
        except Exception as e:
            logger.error(f"Error fetching work experience: {e}")
            raise
    
    async def fetch_job_postings(self, filters: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Fetch job postings with filters"""
        try:
            # Build cache key from filters
            cache_key = f"job_postings:{json.dumps(filters, sort_keys=True)}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            
            # Build dynamic query based on filters
            where_clauses = ["status = 'active'"]
            params = {}
            
            if filters.get("location"):
                where_clauses.append("location = :location")
                params["location"] = filters["location"]
            
            if filters.get("industry"):
                where_clauses.append("industry = :industry")
                params["industry"] = filters["industry"]
            
            if filters.get("min_salary"):
                where_clauses.append("salary_min >= :min_salary")
                params["min_salary"] = filters["min_salary"]
            
            where_sql = " AND ".join(where_clauses)
            
            query = text(f"""
                SELECT id, institution_id, title, description, location,
                       employment_type, industry, salary_min, salary_max,
                       required_skills, preferred_skills, posted_date
                FROM job_postings
                WHERE {where_sql}
                ORDER BY posted_date DESC
                LIMIT :limit
            """)
            params["limit"] = filters.get("limit", 50)
            
            results = db.execute(query, params).fetchall()
            
            jobs = []
            for row in results:
                job_data = dict(row._mapping)
                # Convert datetime objects
                for key, value in job_data.items():
                    if isinstance(value, datetime):
                        job_data[key] = value.isoformat()
                jobs.append(job_data)
            
            # Cache the result
            await self.set_cached_data(cache_key, jobs, ttl=180)  # 3 minutes
            
            logger.info(f"Fetched {len(jobs)} job postings with filters: {filters}")
            return jobs
            
        except Exception as e:
            logger.error(f"Error fetching job postings: {e}")
            raise
    
    async def fetch_institution_data(self, institution_id: str) -> Dict[str, Any]:
        """Fetch institution data from database"""
        try:
            # Check cache
            cache_key = f"institution:{institution_id}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            query = text("""
                SELECT id, name, type, industry, size, location,
                       website, description, is_verified, created_at
                FROM institutions
                WHERE id = :institution_id
            """)
            result = db.execute(query, {"institution_id": institution_id}).fetchone()
            
            if not result:
                return {"error": "Institution not found"}
            
            institution_data = dict(result._mapping)
            
            # Convert datetime objects
            for key, value in institution_data.items():
                if isinstance(value, datetime):
                    institution_data[key] = value.isoformat()
            
            # Cache the result
            await self.set_cached_data(cache_key, institution_data, ttl=600)
            
            logger.info(f"Fetched institution data: {institution_id}")
            return institution_data
            
        except Exception as e:
            logger.error(f"Error fetching institution data: {e}")
            raise
    
    async def search_skills(self, query: str) -> List[Dict[str, Any]]:
        """Search skills by name or category"""
        try:
            # Check cache
            cache_key = f"skill_search:{query.lower()}"
            cached_data = await self.get_cached_data(cache_key)
            if cached_data:
                return cached_data
            
            # Fetch from database
            db: Session = next(get_db())
            sql_query = text("""
                SELECT id, name, category, description
                FROM skills
                WHERE LOWER(name) LIKE :query OR LOWER(category) LIKE :query
                ORDER BY name
                LIMIT 50
            """)
            results = db.execute(sql_query, {"query": f"%{query.lower()}%"}).fetchall()
            
            skills = [dict(row._mapping) for row in results]
            
            # Cache the result
            await self.set_cached_data(cache_key, skills, ttl=600)
            
            logger.info(f"Found {len(skills)} skills matching query: {query}")
            return skills
            
        except Exception as e:
            logger.error(f"Error searching skills: {e}")
            raise
    
    async def get_cached_data(self, key: str) -> Optional[Any]:
        """Get data from Redis cache"""
        try:
            redis_client = await get_redis()
            cached = await redis_client.get(key)
            if cached:
                return json.loads(cached)
            return None
        except Exception as e:
            logger.warning(f"Cache get error: {e}")
            return None
    
    async def set_cached_data(self, key: str, value: Any, ttl: int = 300) -> bool:
        """Set data in Redis cache"""
        try:
            redis_client = await get_redis()
            await redis_client.setex(key, ttl, json.dumps(value))
            return True
        except Exception as e:
            logger.warning(f"Cache set error: {e}")
            return False
    
    async def invalidate_cache(self, pattern: str) -> int:
        """Invalidate cache keys matching pattern"""
        try:
            redis_client = await get_redis()
            keys = await redis_client.keys(pattern)
            if keys:
                return await redis_client.delete(*keys)
            return 0
        except Exception as e:
            logger.warning(f"Cache invalidation error: {e}")
            return 0


# Singleton instance
_data_retrieval_agent = None


def get_data_retrieval_agent() -> DataRetrievalAgent:
    """Get or create Data Retrieval Agent instance"""
    global _data_retrieval_agent
    if _data_retrieval_agent is None:
        _data_retrieval_agent = DataRetrievalAgent()
    return _data_retrieval_agent

