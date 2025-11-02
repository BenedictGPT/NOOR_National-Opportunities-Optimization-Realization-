# Master Orchestrator Agent
# NOOR Platform v7.1
# Central coordinator for 31-agent AI workforce

from anthropic import Anthropic
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from enum import Enum
from pydantic import BaseModel, Field
import json
import uuid
import logging
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# =============================================================================
# ENUMS & TYPES
# =============================================================================

class AgentType(str, Enum):
    """Types of agents in the NOOR ecosystem"""
    MASTER_ORCHESTRATOR = "master_orchestrator"

    # Category Orchestrators (6)
    TALENT_ORCHESTRATOR = "talent_orchestrator"
    LEARNING_ORCHESTRATOR = "learning_orchestrator"
    OPERATIONS_ORCHESTRATOR = "operations_orchestrator"
    COMPLIANCE_ORCHESTRATOR = "compliance_orchestrator"
    ENGAGEMENT_ORCHESTRATOR = "engagement_orchestrator"
    INSIGHTS_ORCHESTRATOR = "insights_orchestrator"

    # Execution Agents (24)
    CAREER_ADVISOR = "career_advisor"
    SKILL_GAP_ANALYST = "skill_gap_analyst"
    JOB_MATCHER = "job_matcher"
    LEARNING_CURATOR = "learning_curator"
    VERIFICATION_AGENT = "verification_agent"
    BIOMETRIC_SECURITY = "biometric_security"
    PAYROLL_PROCESSOR = "payroll_processor"
    COMPLIANCE_MONITOR = "compliance_monitor"
    EMIRATIZATION_ADVISOR = "emiratization_advisor"
    WELLNESS_COACH = "wellness_coach"
    PERFORMANCE_ANALYST = "performance_analyst"
    ONBOARDING_GUIDE = "onboarding_guide"
    OFFBOARDING_SPECIALIST = "offboarding_specialist"
    BENEFITS_ADVISOR = "benefits_advisor"
    TRAINING_COORDINATOR = "training_coordinator"
    MENTOR_MATCHER = "mentor_matcher"
    GUILD_FACILITATOR = "guild_facilitator"
    REPORT_GENERATOR = "report_generator"
    ANOMALY_DETECTOR = "anomaly_detector"
    NOTIFICATION_DISPATCHER = "notification_dispatcher"
    FEEDBACK_ANALYZER = "feedback_analyzer"
    POLICY_INTERPRETER = "policy_interpreter"
    SUCCESSION_PLANNER = "succession_planner"
    CREDENTIAL_VERIFIER = "credential_verifier"
    HEALTH_CERTIFIER = "health_certifier"

class TaskPriority(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class TaskStatus(str, Enum):
    PENDING = "pending"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    ESCALATED = "escalated"

# =============================================================================
# PYDANTIC MODELS
# =============================================================================

class AgentCapability(BaseModel):
    """Agent capability definition"""
    name: str
    description: str
    tools: List[str]
    max_concurrent_tasks: int = 5
    average_response_time_ms: float = 1000.0

class AgentProfile(BaseModel):
    """Profile of an agent in the system"""
    agent_id: str
    agent_type: AgentType
    name: str
    description: str
    capabilities: List[AgentCapability]
    is_online: bool = True
    current_load: int = 0
    max_load: int = 10
    parent_orchestrator: Optional[AgentType] = None
    child_agents: List[AgentType] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_heartbeat: datetime = Field(default_factory=datetime.utcnow)

class Task(BaseModel):
    """Task to be executed by agents"""
    task_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    task_type: str
    description: str
    priority: TaskPriority
    status: TaskStatus = TaskStatus.PENDING
    assigned_agent: Optional[AgentType] = None
    context: Dict[str, Any] = {}
    result: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    assigned_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
    execution_time_ms: Optional[float] = None

class MCPMessage(BaseModel):
    """Model Context Protocol message for inter-agent communication"""
    message_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    from_agent: AgentType
    to_agent: AgentType
    message_type: str  # "task_assignment", "status_update", "query", "response"
    payload: Dict[str, Any]
    correlation_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    requires_response: bool = False

class ConversationContext(BaseModel):
    """User conversation context"""
    conversation_id: str
    user_id: str
    messages: List[Dict[str, str]] = []
    current_task: Optional[Task] = None
    session_start: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = {}

# =============================================================================
# MASTER ORCHESTRATOR CLASS
# =============================================================================

class MasterOrchestrator:
    """
    Master Orchestrator Agent - Central coordinator for all 31 agents.

    Responsibilities:
    - Route user requests to appropriate category orchestrators
    - Monitor agent health and performance
    - Handle escalations and complex multi-domain tasks
    - Coordinate cross-functional workflows
    - Maintain system-wide context and state
    """

    def __init__(self, anthropic_api_key: str):
        self.agent_id = "master-orchestrator-001"
        self.agent_type = AgentType.MASTER_ORCHESTRATOR
        self.name = "NOOR Master Orchestrator"

        # Initialize Anthropic client
        self.client = Anthropic(api_key=anthropic_api_key)
        self.model = "claude-opus-4-20250514"  # Latest and most capable model

        # Agent registry
        self.agents: Dict[AgentType, AgentProfile] = {}
        self._initialize_agent_registry()

        # Task queue
        self.pending_tasks: List[Task] = []
        self.active_tasks: Dict[str, Task] = {}
        self.completed_tasks: List[Task] = []

        # Active conversations
        self.conversations: Dict[str, ConversationContext] = {}

        # MCP message queue
        self.mcp_messages: List[MCPMessage] = []

        logger.info(f"Master Orchestrator initialized: {self.agent_id}")

    def _initialize_agent_registry(self):
        """Initialize the registry of all 31 agents"""

        # Category Orchestrators (6)
        category_orchestrators = [
            {
                "type": AgentType.TALENT_ORCHESTRATOR,
                "name": "Talent Orchestrator",
                "description": "Coordinates talent acquisition, career development, and succession planning",
                "children": [AgentType.CAREER_ADVISOR, AgentType.SKILL_GAP_ANALYST,
                           AgentType.JOB_MATCHER, AgentType.SUCCESSION_PLANNER]
            },
            {
                "type": AgentType.LEARNING_ORCHESTRATOR,
                "name": "Learning Orchestrator",
                "description": "Manages learning pathways, certifications, and skill development",
                "children": [AgentType.LEARNING_CURATOR, AgentType.TRAINING_COORDINATOR,
                           AgentType.VERIFICATION_AGENT, AgentType.CREDENTIAL_VERIFIER]
            },
            {
                "type": AgentType.OPERATIONS_ORCHESTRATOR,
                "name": "Operations Orchestrator",
                "description": "Handles HR operations, payroll, benefits, and lifecycle management",
                "children": [AgentType.PAYROLL_PROCESSOR, AgentType.BENEFITS_ADVISOR,
                           AgentType.ONBOARDING_GUIDE, AgentType.OFFBOARDING_SPECIALIST,
                           AgentType.HEALTH_CERTIFIER]
            },
            {
                "type": AgentType.COMPLIANCE_ORCHESTRATOR,
                "name": "Compliance Orchestrator",
                "description": "Ensures regulatory compliance and security",
                "children": [AgentType.COMPLIANCE_MONITOR, AgentType.EMIRATIZATION_ADVISOR,
                           AgentType.BIOMETRIC_SECURITY, AgentType.POLICY_INTERPRETER]
            },
            {
                "type": AgentType.ENGAGEMENT_ORCHESTRATOR,
                "name": "Engagement Orchestrator",
                "description": "Manages employee engagement, wellness, and performance",
                "children": [AgentType.WELLNESS_COACH, AgentType.PERFORMANCE_ANALYST,
                           AgentType.FEEDBACK_ANALYZER, AgentType.MENTOR_MATCHER,
                           AgentType.GUILD_FACILITATOR]
            },
            {
                "type": AgentType.INSIGHTS_ORCHESTRATOR,
                "name": "Insights Orchestrator",
                "description": "Generates analytics, reports, and detects anomalies",
                "children": [AgentType.REPORT_GENERATOR, AgentType.ANOMALY_DETECTOR,
                           AgentType.NOTIFICATION_DISPATCHER]
            }
        ]

        # Register category orchestrators
        for orch in category_orchestrators:
            profile = AgentProfile(
                agent_id=f"{orch['type'].value}-001",
                agent_type=orch["type"],
                name=orch["name"],
                description=orch["description"],
                capabilities=[
                    AgentCapability(
                        name="Task Routing",
                        description="Route tasks to specialized execution agents",
                        tools=["task_assignment", "priority_management"],
                        max_concurrent_tasks=20
                    )
                ],
                parent_orchestrator=AgentType.MASTER_ORCHESTRATOR,
                child_agents=orch["children"]
            )
            self.agents[orch["type"]] = profile

        logger.info(f"Registered {len(self.agents)} agents in registry")

    async def handle_user_request(
        self,
        user_id: str,
        message: str,
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Handle incoming user request.
        Main entry point for user interactions.
        """
        # Get or create conversation context
        if conversation_id and conversation_id in self.conversations:
            context = self.conversations[conversation_id]
        else:
            conversation_id = str(uuid.uuid4())
            context = ConversationContext(
                conversation_id=conversation_id,
                user_id=user_id
            )
            self.conversations[conversation_id] = context

        # Add user message to context
        context.messages.append({
            "role": "user",
            "content": message
        })
        context.last_activity = datetime.utcnow()

        logger.info(f"Processing request from user {user_id}: {message[:100]}...")

        # Build system prompt for Master Orchestrator
        system_prompt = self._build_system_prompt()

        # Prepare messages for Claude
        messages = context.messages.copy()

        try:
            # Call Claude API
            response = self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                system=system_prompt,
                messages=messages,
                tools=self._get_available_tools()
            )

            # Process response
            assistant_message = self._process_claude_response(response, context)

            # Add assistant message to context
            context.messages.append({
                "role": "assistant",
                "content": assistant_message
            })

            return {
                "conversation_id": conversation_id,
                "response": assistant_message,
                "status": "success"
            }

        except Exception as e:
            logger.error(f"Error processing user request: {e}")
            return {
                "conversation_id": conversation_id,
                "response": "I apologize, but I encountered an error processing your request. Please try again.",
                "status": "error",
                "error": str(e)
            }

    def _build_system_prompt(self) -> str:
        """Build comprehensive system prompt for Master Orchestrator"""

        return """You are the Master Orchestrator for NOOR, the UAE's National Human Capital Intelligence Platform.

# YOUR ROLE

You are the central AI coordinator managing a workforce of 31 specialized agents organized into 6 categories:

1. **Talent Orchestrator** - Career development, job matching, succession planning
2. **Learning Orchestrator** - Training, certifications, skill development
3. **Operations Orchestrator** - HR operations, payroll, benefits, onboarding/offboarding
4. **Compliance Orchestrator** - Regulatory compliance, security, emiratization
5. **Engagement Orchestrator** - Employee wellness, performance, mentoring
6. **Insights Orchestrator** - Analytics, reporting, anomaly detection

# YOUR CAPABILITIES

You can:
- Route complex requests to appropriate category orchestrators
- Coordinate multi-domain tasks requiring multiple agent types
- Monitor agent performance and health
- Handle escalations from category orchestrators
- Maintain system-wide context across user sessions
- Make intelligent decisions about task prioritization
- Explain NOOR platform capabilities to users

# INTERACTION GUIDELINES

1. **Be Helpful & Professional**: Assist Emirati users with their career, learning, and employment needs
2. **Be Bilingual**: Support both English and Arabic naturally
3. **Protect Privacy**: Never expose internal agent coordination details to users
4. **Route Intelligently**: Determine which orchestrator(s) to involve based on request
5. **Explain Clearly**: When you route tasks, explain what will happen next
6. **Handle Ambiguity**: Ask clarifying questions when requests are unclear
7. **Show Empathy**: Understand this impacts real careers and livelihoods

# EXAMPLE INTERACTIONS

User: "I want to find a new job in data science"
→ Route to: Talent Orchestrator → Career Advisor + Job Matcher agents

User: "How do I renew my health certificate?"
→ Route to: Operations Orchestrator → Health Certifier agent

User: "I need a learning plan to become a manager"
→ Route to: Learning Orchestrator + Talent Orchestrator (multi-domain)

User: "Show me my company's emiratization compliance"
→ Route to: Compliance Orchestrator → Emiratization Advisor agent

# TOOLS AVAILABLE

Use the available tools to:
- route_to_orchestrator: Assign tasks to category orchestrators
- get_agent_status: Check health and availability of agents
- create_task: Create structured tasks for agents
- query_user_context: Get user profile and history

# IMPORTANT

- Always maintain user context across conversation
- Prioritize tasks appropriately (CRITICAL for security/compliance)
- Log all significant decisions for audit trail
- Escalate to human supervisors when appropriate (e.g., policy violations)

You are the intelligent face of NOOR. Be helpful, efficient, and trustworthy."""

    def _get_available_tools(self) -> List[Dict[str, Any]]:
        """Define tools available to Master Orchestrator"""

        return [
            {
                "name": "route_to_orchestrator",
                "description": "Route a task to a specific category orchestrator for handling",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "orchestrator_type": {
                            "type": "string",
                            "enum": [
                                "talent_orchestrator",
                                "learning_orchestrator",
                                "operations_orchestrator",
                                "compliance_orchestrator",
                                "engagement_orchestrator",
                                "insights_orchestrator"
                            ],
                            "description": "Which category orchestrator to route to"
                        },
                        "task_description": {
                            "type": "string",
                            "description": "Description of the task to be performed"
                        },
                        "priority": {
                            "type": "string",
                            "enum": ["critical", "high", "medium", "low"],
                            "description": "Task priority level"
                        },
                        "context": {
                            "type": "object",
                            "description": "Additional context for the task",
                            "additionalProperties": True
                        }
                    },
                    "required": ["orchestrator_type", "task_description", "priority"]
                }
            },
            {
                "name": "get_agent_status",
                "description": "Get current status and availability of an agent",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "agent_type": {
                            "type": "string",
                            "description": "Type of agent to check status for"
                        }
                    },
                    "required": ["agent_type"]
                }
            },
            {
                "name": "create_task",
                "description": "Create a structured task for agent execution",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "task_type": {
                            "type": "string",
                            "description": "Type of task (e.g., 'job_search', 'certification_renewal')"
                        },
                        "description": {
                            "type": "string",
                            "description": "Detailed task description"
                        },
                        "priority": {
                            "type": "string",
                            "enum": ["critical", "high", "medium", "low"]
                        },
                        "user_id": {
                            "type": "string",
                            "description": "User ID for this task"
                        }
                    },
                    "required": ["task_type", "description", "priority", "user_id"]
                }
            },
            {
                "name": "query_user_context",
                "description": "Retrieve user profile and historical context",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "user_id": {
                            "type": "string",
                            "description": "User ID to query"
                        },
                        "include_history": {
                            "type": "boolean",
                            "description": "Whether to include interaction history"
                        }
                    },
                    "required": ["user_id"]
                }
            }
        ]

    def _process_claude_response(
        self,
        response: Any,
        context: ConversationContext
    ) -> str:
        """Process Claude's response and execute any tool calls"""

        # Extract content and tool uses
        content_blocks = response.content

        text_response = ""
        tool_results = []

        for block in content_blocks:
            if block.type == "text":
                text_response = block.text

            elif block.type == "tool_use":
                # Execute tool
                tool_name = block.name
                tool_input = block.input

                logger.info(f"Executing tool: {tool_name} with input: {tool_input}")

                # Execute the tool
                result = self._execute_tool(tool_name, tool_input, context)
                tool_results.append({
                    "tool": tool_name,
                    "result": result
                })

        # If tools were used, append results to response
        if tool_results:
            text_response += "\n\n[Task routed to specialized agents]"

        return text_response

    def _execute_tool(
        self,
        tool_name: str,
        tool_input: Dict[str, Any],
        context: ConversationContext
    ) -> Dict[str, Any]:
        """Execute a tool call"""

        if tool_name == "route_to_orchestrator":
            return self._route_to_orchestrator(
                orchestrator_type=tool_input["orchestrator_type"],
                task_description=tool_input["task_description"],
                priority=tool_input["priority"],
                context=tool_input.get("context", {}),
                user_id=context.user_id
            )

        elif tool_name == "get_agent_status":
            return self._get_agent_status(tool_input["agent_type"])

        elif tool_name == "create_task":
            return self._create_task(
                task_type=tool_input["task_type"],
                description=tool_input["description"],
                priority=tool_input["priority"],
                user_id=tool_input["user_id"]
            )

        elif tool_name == "query_user_context":
            return self._query_user_context(
                user_id=tool_input["user_id"],
                include_history=tool_input.get("include_history", False)
            )

        else:
            return {"error": f"Unknown tool: {tool_name}"}

    def _route_to_orchestrator(
        self,
        orchestrator_type: str,
        task_description: str,
        priority: str,
        context: Dict[str, Any],
        user_id: str
    ) -> Dict[str, Any]:
        """Route task to category orchestrator"""

        # Create task
        task = Task(
            user_id=user_id,
            task_type=orchestrator_type,
            description=task_description,
            priority=TaskPriority(priority),
            assigned_agent=AgentType(orchestrator_type),
            context=context,
            status=TaskStatus.ASSIGNED,
            assigned_at=datetime.utcnow()
        )

        # Add to active tasks
        self.active_tasks[task.task_id] = task

        # Send MCP message to orchestrator
        message = MCPMessage(
            from_agent=AgentType.MASTER_ORCHESTRATOR,
            to_agent=AgentType(orchestrator_type),
            message_type="task_assignment",
            payload={
                "task_id": task.task_id,
                "description": task_description,
                "priority": priority,
                "context": context
            },
            requires_response=True
        )
        self.mcp_messages.append(message)

        logger.info(f"Routed task {task.task_id} to {orchestrator_type}")

        return {
            "status": "routed",
            "task_id": task.task_id,
            "assigned_to": orchestrator_type,
            "message": f"Task assigned to {orchestrator_type}"
        }

    def _get_agent_status(self, agent_type: str) -> Dict[str, Any]:
        """Get agent status"""

        try:
            agent = self.agents.get(AgentType(agent_type))
            if agent:
                return {
                    "agent_type": agent_type,
                    "is_online": agent.is_online,
                    "current_load": agent.current_load,
                    "max_load": agent.max_load,
                    "availability": (agent.max_load - agent.current_load) / agent.max_load
                }
            else:
                return {"error": "Agent not found"}
        except:
            return {"error": "Invalid agent type"}

    def _create_task(
        self,
        task_type: str,
        description: str,
        priority: str,
        user_id: str
    ) -> Dict[str, Any]:
        """Create a task"""

        task = Task(
            user_id=user_id,
            task_type=task_type,
            description=description,
            priority=TaskPriority(priority)
        )

        self.pending_tasks.append(task)

        return {
            "task_id": task.task_id,
            "status": "created",
            "priority": priority
        }

    def _query_user_context(
        self,
        user_id: str,
        include_history: bool = False
    ) -> Dict[str, Any]:
        """Query user context"""

        # TODO: Fetch from database
        return {
            "user_id": user_id,
            "profile": {
                "name": "Mock User",
                "nationality": "UAE",
                "current_role": "Data Analyst"
            },
            "history": [] if not include_history else []
        }


# =============================================================================
# MAIN EXECUTION
# =============================================================================

async def main():
    """Main execution for testing"""

    import os

    # Initialize Master Orchestrator
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    orchestrator = MasterOrchestrator(api_key)

    # Test conversation
    response = await orchestrator.handle_user_request(
        user_id="user-123",
        message="I want to find a new job in data science and AI. Can you help me?"
    )

    print("Response:", response)


if __name__ == "__main__":
    asyncio.run(main())
