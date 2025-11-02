"""
NOOR Platform - Backend API Agent
"""

from typing import Dict, Any
import logging

from app.agents.base_agent import BaseAgent, AgentCapability

logger = logging.getLogger(__name__)


class BackendAPIAgent(BaseAgent):
    """
    Backend API Agent
    
    Responsibilities:
    - Generate FastAPI endpoints
    - Create Pydantic models
    - Implement business logic
    - Handle request validation
    - Generate API documentation
    """
    
    def __init__(self):
        super().__init__(
            agent_id="backend-api-agent",
            name="Backend API Agent",
            description="Generates FastAPI endpoints and business logic",
            capabilities=[
                AgentCapability.CODE_GENERATION,
                AgentCapability.API_INTEGRATION
            ],
            model="claude-3-opus-20240229"
        )
    
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute API generation task
        
        Args:
            task: Task parameters
            {
                "endpoint_path": "/api/v1/resource",
                "http_method": "GET|POST|PUT|DELETE",
                "description": "Endpoint description",
                "request_schema": {...},
                "response_schema": {...},
                "business_logic": "Description of logic"
            }
        
        Returns:
            Generated code and metadata
        """
        self.validate_task(task, ["endpoint_path", "http_method", "description"])
        
        logger.info(f"Generating API endpoint: {task['http_method']} {task['endpoint_path']}")
        
        # Generate endpoint code
        endpoint_code = await self._generate_endpoint(task)
        
        # Generate Pydantic models
        models_code = await self._generate_models(task)
        
        # Generate tests
        test_code = await self._generate_tests(task)
        
        return {
            "endpoint_code": endpoint_code,
            "models_code": models_code,
            "test_code": test_code,
            "file_path": self._get_file_path(task['endpoint_path']),
            "documentation": self._generate_documentation(task)
        }
    
    async def _generate_endpoint(self, task: Dict[str, Any]) -> str:
        """
        Generate FastAPI endpoint code
        
        Args:
            task: Task parameters
            
        Returns:
            Python code for endpoint
        """
        system_prompt = """You are an expert FastAPI developer.
Generate production-ready FastAPI endpoint code following these guidelines:
- Use async/await for all endpoints
- Include proper type hints
- Add comprehensive docstrings
- Implement error handling
- Use dependency injection for database sessions
- Follow RESTful conventions
- Include request validation
- Add logging statements"""
        
        prompt = f"""Generate a FastAPI endpoint with these specifications:

Path: {task['endpoint_path']}
Method: {task['http_method']}
Description: {task['description']}
Request Schema: {task.get('request_schema', 'None')}
Response Schema: {task.get('response_schema', {})}
Business Logic: {task.get('business_logic', 'Standard CRUD operation')}

Return only the Python code, no explanations."""
        
        code = await self.call_llm(prompt, system_prompt, max_tokens=1500)
        return code
    
    async def _generate_models(self, task: Dict[str, Any]) -> str:
        """
        Generate Pydantic models
        
        Args:
            task: Task parameters
            
        Returns:
            Python code for models
        """
        if not task.get('request_schema') and not task.get('response_schema'):
            return ""
        
        system_prompt = """You are an expert in Pydantic models.
Generate Pydantic model classes following these guidelines:
- Use appropriate field types
- Add field validation
- Include descriptions
- Use Optional for nullable fields
- Add example values in Config"""
        
        prompt = f"""Generate Pydantic models for:

Request Schema: {task.get('request_schema', 'None')}
Response Schema: {task.get('response_schema', {})}

Return only the Python code."""
        
        code = await self.call_llm(prompt, system_prompt, max_tokens=1000)
        return code
    
    async def _generate_tests(self, task: Dict[str, Any]) -> str:
        """
        Generate pytest tests
        
        Args:
            task: Task parameters
            
        Returns:
            Python test code
        """
        system_prompt = """You are an expert in pytest and API testing.
Generate comprehensive test cases including:
- Happy path tests
- Error cases
- Edge cases
- Authentication tests
- Input validation tests"""
        
        prompt = f"""Generate pytest tests for:

Endpoint: {task['http_method']} {task['endpoint_path']}
Description: {task['description']}

Return only the Python test code."""
        
        code = await self.call_llm(prompt, system_prompt, max_tokens=1000)
        return code
    
    def _get_file_path(self, endpoint_path: str) -> str:
        """
        Determine file path for endpoint
        
        Args:
            endpoint_path: API endpoint path
            
        Returns:
            File path
        """
        # Extract resource name from path
        # /api/v1/users -> users.py
        parts = endpoint_path.strip('/').split('/')
        resource = parts[-1] if parts else 'default'
        return f"backend/app/api/v1/endpoints/{resource}.py"
    
    def _generate_documentation(self, task: Dict[str, Any]) -> str:
        """
        Generate API documentation
        
        Args:
            task: Task parameters
            
        Returns:
            Markdown documentation
        """
        return f"""## {task['http_method']} {task['endpoint_path']}

{task['description']}

### Request
```json
{task.get('request_schema', 'No request body')}
```

### Response
```json
{task.get('response_schema', {})}
```

### Business Logic
{task.get('business_logic', 'Standard operation')}
"""


# Singleton instance
backend_api_agent = BackendAPIAgent()

