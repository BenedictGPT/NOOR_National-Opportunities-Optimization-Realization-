"""
NOOR Platform - Base AI Agent Class
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List
from datetime import datetime
import logging
import json
from enum import Enum

from anthropic import Anthropic
from openai import OpenAI

from app.core.config import settings

logger = logging.getLogger(__name__)


class AgentStatus(str, Enum):
    """Agent execution status"""
    IDLE = "idle"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PAUSED = "paused"


class AgentCapability(str, Enum):
    """Agent capabilities"""
    CODE_GENERATION = "code_generation"
    DATA_ANALYSIS = "data_analysis"
    API_INTEGRATION = "api_integration"
    DATABASE_MANAGEMENT = "database_management"
    TESTING = "testing"
    DEPLOYMENT = "deployment"
    MONITORING = "monitoring"
    SECURITY = "security"


class BaseAgent(ABC):
    """
    Base class for all NOOR AI agents
    
    All agents inherit from this class and implement the execute() method.
    Provides common functionality for:
    - LLM communication (OpenAI/Anthropic)
    - Task execution tracking
    - Error handling
    - Logging
    - MCP protocol communication
    """
    
    def __init__(
        self,
        agent_id: str,
        name: str,
        description: str,
        capabilities: List[AgentCapability],
        model: str = "claude-3-opus-20240229"
    ):
        self.agent_id = agent_id
        self.name = name
        self.description = description
        self.capabilities = capabilities
        self.model = model
        self.status = AgentStatus.IDLE
        self.created_at = datetime.utcnow()
        self.last_execution = None
        self.execution_count = 0
        
        # Initialize LLM clients
        self.anthropic_client = Anthropic(api_key=settings.ANTHROPIC_API_KEY) if settings.ANTHROPIC_API_KEY else None
        self.openai_client = OpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None
        
        logger.info(f"Agent initialized: {self.name} ({self.agent_id})")
    
    @abstractmethod
    async def execute(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute agent task
        
        Args:
            task: Task parameters and context
            
        Returns:
            Execution result with status and output
        """
        pass
    
    async def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        Run agent with error handling and logging
        
        Args:
            task: Task to execute
            
        Returns:
            Execution result
        """
        self.status = AgentStatus.RUNNING
        self.execution_count += 1
        start_time = datetime.utcnow()
        
        logger.info(f"Agent {self.name} starting execution #{self.execution_count}")
        
        try:
            result = await self.execute(task)
            
            self.status = AgentStatus.COMPLETED
            self.last_execution = datetime.utcnow()
            
            execution_time = (datetime.utcnow() - start_time).total_seconds()
            logger.info(f"Agent {self.name} completed in {execution_time:.2f}s")
            
            return {
                "success": True,
                "agent_id": self.agent_id,
                "agent_name": self.name,
                "execution_time": execution_time,
                "result": result,
                "timestamp": self.last_execution.isoformat()
            }
            
        except Exception as e:
            self.status = AgentStatus.FAILED
            logger.error(f"Agent {self.name} failed: {str(e)}", exc_info=True)
            
            return {
                "success": False,
                "agent_id": self.agent_id,
                "agent_name": self.name,
                "error": str(e),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    async def call_llm(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        max_tokens: int = 4000,
        temperature: float = 0.7
    ) -> str:
        """
        Call LLM (Anthropic Claude or OpenAI)
        
        Args:
            prompt: User prompt
            system_prompt: System prompt (optional)
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature
            
        Returns:
            LLM response text
        """
        try:
            # Use Anthropic Claude by default
            if self.anthropic_client and "claude" in self.model.lower():
                messages = [{"role": "user", "content": prompt}]
                
                response = self.anthropic_client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system_prompt or "",
                    messages=messages
                )
                
                return response.content[0].text
            
            # Fallback to OpenAI
            elif self.openai_client:
                messages = []
                if system_prompt:
                    messages.append({"role": "system", "content": system_prompt})
                messages.append({"role": "user", "content": prompt})
                
                response = self.openai_client.chat.completions.create(
                    model=self.model if "gpt" in self.model.lower() else "gpt-4",
                    messages=messages,
                    max_tokens=max_tokens,
                    temperature=temperature
                )
                
                return response.choices[0].message.content
            
            else:
                raise ValueError("No LLM client available")
                
        except Exception as e:
            logger.error(f"LLM call failed: {str(e)}")
            raise
    
    def get_status(self) -> Dict[str, Any]:
        """Get agent status"""
        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "description": self.description,
            "status": self.status.value,
            "capabilities": [cap.value for cap in self.capabilities],
            "execution_count": self.execution_count,
            "last_execution": self.last_execution.isoformat() if self.last_execution else None,
            "created_at": self.created_at.isoformat()
        }
    
    def validate_task(self, task: Dict[str, Any], required_fields: List[str]) -> bool:
        """
        Validate task has required fields
        
        Args:
            task: Task to validate
            required_fields: List of required field names
            
        Returns:
            True if valid, raises ValueError if invalid
        """
        missing_fields = [field for field in required_fields if field not in task]
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
        return True
    
    def log_task(self, task: Dict[str, Any], result: Dict[str, Any]):
        """
        Log task execution to MongoDB
        
        Args:
            task: Task that was executed
            result: Execution result
        """
        # TODO: Implement MongoDB logging
        log_entry = {
            "agent_id": self.agent_id,
            "agent_name": self.name,
            "task": task,
            "result": result,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"Task log: {json.dumps(log_entry)}")

