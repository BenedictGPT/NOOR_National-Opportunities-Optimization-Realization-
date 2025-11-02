# Master Orchestrator Agent

**NOOR Platform v7.1** - Central AI coordinator for 31-agent workforce

## Overview

The Master Orchestrator is the central intelligence coordinating all 31 AI agents in the NOOR Platform. It serves as the primary interface for user interactions and intelligently routes tasks to specialized category orchestrators and execution agents.

## Architecture

### Agent Hierarchy

```
Master Orchestrator (1)
├── Talent Orchestrator (6 execution agents)
│   ├── Career Advisor
│   ├── Skill Gap Analyst
│   ├── Job Matcher
│   └── Succession Planner
├── Learning Orchestrator (4 execution agents)
│   ├── Learning Curator
│   ├── Training Coordinator
│   ├── Verification Agent
│   └── Credential Verifier
├── Operations Orchestrator (5 execution agents)
│   ├── Payroll Processor
│   ├── Benefits Advisor
│   ├── Onboarding Guide
│   ├── Offboarding Specialist
│   └── Health Certifier
├── Compliance Orchestrator (4 execution agents)
│   ├── Compliance Monitor
│   ├── Emiratization Advisor
│   ├── Biometric Security
│   └── Policy Interpreter
├── Engagement Orchestrator (5 execution agents)
│   ├── Wellness Coach
│   ├── Performance Analyst
│   ├── Feedback Analyzer
│   ├── Mentor Matcher
│   └── Guild Facilitator
└── Insights Orchestrator (3 execution agents)
    ├── Report Generator
    ├── Anomaly Detector
    └── Notification Dispatcher
```

## Core Responsibilities

1. **User Interaction**: Primary interface for all user requests
2. **Task Routing**: Intelligent routing to appropriate category orchestrators
3. **Agent Coordination**: Coordinate multi-domain tasks across orchestrators
4. **Performance Monitoring**: Monitor health and performance of all 31 agents
5. **Escalation Handling**: Handle complex cases requiring human intervention
6. **Context Management**: Maintain conversation context and user state
7. **MCP Communication**: Facilitate Model Context Protocol messages between agents

## Technology Stack

- **AI Model**: Claude Opus 4 (claude-opus-4-20250514) - Latest and most capable
- **Framework**: Python 3.11 with Anthropic SDK
- **API**: FastAPI for REST endpoints
- **Communication**: Model Context Protocol (MCP) via Kafka
- **State Management**: Redis for conversation context
- **Persistence**: MongoDB for agent logs and task history
- **Deployment**: Kubernetes with 2-5 pod autoscaling

## API Endpoints

### Chat Interface

```
POST   /api/v1/chat           Main chat endpoint for user interactions
GET    /api/v1/conversations/{id}  Get conversation details
```

### Agent Management

```
GET    /api/v1/agents         List all registered agents
GET    /api/v1/agents/{type}/status  Get agent status
```

### Task Management

```
GET    /api/v1/tasks          List tasks (filterable by user/status)
```

### Health & Monitoring

```
GET    /health                Health check
GET    /ready                 Readiness check
```

## Data Models

### Task

```python
{
  "task_id": "uuid",
  "user_id": "uuid",
  "task_type": "job_search",
  "description": "Find data science jobs in Dubai",
  "priority": "high",
  "status": "assigned",
  "assigned_agent": "talent_orchestrator",
  "context": {
    "location": "Dubai",
    "role": "Data Scientist"
  },
  "created_at": "2024-01-15T10:00:00Z",
  "assigned_at": "2024-01-15T10:00:05Z"
}
```

### MCP Message

```python
{
  "message_id": "uuid",
  "from_agent": "master_orchestrator",
  "to_agent": "talent_orchestrator",
  "message_type": "task_assignment",
  "payload": {
    "task_id": "uuid",
    "description": "Find jobs for user",
    "priority": "high"
  },
  "timestamp": "2024-01-15T10:00:05Z",
  "requires_response": true
}
```

### Conversation Context

```python
{
  "conversation_id": "uuid",
  "user_id": "uuid",
  "messages": [
    {"role": "user", "content": "I want a new job"},
    {"role": "assistant", "content": "I can help..."}
  ],
  "session_start": "2024-01-15T10:00:00Z",
  "last_activity": "2024-01-15T10:05:00Z"
}
```

## Intelligent Routing

The Master Orchestrator uses Claude Opus 4 to intelligently understand user intent and route to appropriate orchestrators:

### Examples

**User**: "I want to find a new job in data science"
→ **Routes to**: Talent Orchestrator → Career Advisor + Job Matcher

**User**: "How do I renew my health certificate?"
→ **Routes to**: Operations Orchestrator → Health Certifier

**User**: "I need a learning plan to become a manager"
→ **Routes to**: Learning Orchestrator + Talent Orchestrator (multi-domain)

**User**: "Show me our company's emiratization compliance status"
→ **Routes to**: Compliance Orchestrator → Emiratization Advisor + Report Generator

**User**: "I'm feeling stressed at work"
→ **Routes to**: Engagement Orchestrator → Wellness Coach

## Tools Available

The Master Orchestrator has access to these tools:

1. **route_to_orchestrator**: Route tasks to category orchestrators
2. **get_agent_status**: Check agent health and availability
3. **create_task**: Create structured tasks for execution
4. **query_user_context**: Retrieve user profile and history

## Configuration

### Environment Variables

```bash
# Anthropic API
ANTHROPIC_API_KEY=your_anthropic_api_key
CLAUDE_MODEL=claude-opus-4-20250514
MAX_TOKENS=4096

# Databases
MONGODB_HOST=mongodb.noor-data.svc.cluster.local
MONGODB_PASSWORD=your_password
REDIS_HOST=redis.noor-data.svc.cluster.local

# Kafka (MCP)
KAFKA_BOOTSTRAP_SERVERS=kafka.noor-messaging.svc.cluster.local:9092
KAFKA_MCP_TOPIC=noor.agents.mcp.message
```

## Development

### Local Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Set API key
export ANTHROPIC_API_KEY=your_key

# Run agent
python agent.py

# Or run API server
python api.py
```

### Testing

```bash
# Unit tests
pytest tests/

# Test chat interaction
curl -X POST "http://localhost:8100/api/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user-123",
    "message": "I want to find a job in AI"
  }'
```

## Deployment

### Kubernetes

```bash
# Create namespace
kubectl create namespace noor-agents

# Create secrets
kubectl create secret generic master-orchestrator-secrets \
  --from-literal=ANTHROPIC_API_KEY=your_key \
  --from-literal=MONGODB_PASSWORD=your_password \
  -n noor-agents

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -n noor-agents -l app=master-orchestrator
```

### Scaling

- **Min Replicas**: 2 (high availability)
- **Max Replicas**: 5
- **CPU Target**: 70%
- **Memory Target**: 80%

## API Usage Examples

### Chat with Master Orchestrator

```python
import requests

response = requests.post(
    "http://master-orchestrator.noor-agents.svc.cluster.local/api/v1/chat",
    json={
        "user_id": "user-550e8400",
        "message": "I want to upskill in machine learning. What courses do you recommend?"
    }
)

print(response.json())
# {
#   "conversation_id": "conv-660e8400",
#   "response": "I'd be happy to help you upskill in machine learning! ...",
#   "status": "success",
#   "timestamp": "2024-01-15T10:00:00Z"
# }
```

### List All Agents

```python
response = requests.get(
    "http://master-orchestrator.noor-agents.svc.cluster.local/api/v1/agents"
)

print(response.json())
# {
#   "total_agents": 6,
#   "agents": [
#     {
#       "agent_type": "talent_orchestrator",
#       "name": "Talent Orchestrator",
#       "is_online": true,
#       "current_load": 3,
#       "child_agents": ["career_advisor", "job_matcher", ...]
#     },
#     ...
#   ]
# }
```

### Get Agent Status

```python
response = requests.get(
    "http://master-orchestrator.noor-agents.svc.cluster.local/api/v1/agents/talent_orchestrator/status"
)

print(response.json())
# {
#   "agent_type": "talent_orchestrator",
#   "is_online": true,
#   "current_load": 3,
#   "max_load": 10,
#   "availability": 0.7
# }
```

## Model Context Protocol (MCP)

The Master Orchestrator uses MCP for inter-agent communication:

### Message Flow

```
User Request
    ↓
Master Orchestrator (analyzes intent)
    ↓
MCP Message (task_assignment) → Category Orchestrator
    ↓
MCP Message (task_assignment) → Execution Agent
    ↓
MCP Message (result) → Category Orchestrator
    ↓
MCP Message (result) → Master Orchestrator
    ↓
Response to User
```

### MCP Topics (Kafka)

- `noor.agents.mcp.message`: All inter-agent MCP messages
- `noor.agents.mcp.task_assignment`: Task assignments
- `noor.agents.mcp.status_update`: Agent status updates
- `noor.agents.mcp.result`: Task results

## Performance

### Latency Targets

- **Simple Routing**: < 500ms
- **Complex Multi-Domain**: < 2000ms
- **Agent Status Check**: < 100ms

### Throughput

- **Concurrent Conversations**: 1000+
- **Tasks per Second**: 50+
- **Messages per Second**: 200+

### Resource Usage

- **CPU**: 500m-1000m per pod
- **Memory**: 1-2Gi per pod
- **API Calls**: ~10-20 Anthropic API calls per conversation

## Monitoring

### Metrics

- Agent registration count
- Active conversations
- Task routing distribution
- Response latency (p50, p95, p99)
- Error rate by orchestrator
- MCP message throughput
- Anthropic API usage

### Alerts

- Agent offline > 5 minutes
- Task failure rate > 5%
- Response latency > 3s
- Anthropic API errors
- Memory pressure

## Security

### Authentication

- All API endpoints require JWT bearer token
- User context validated against auth service
- Agent-to-agent communication secured via MCP

### Authorization

- User can only access own conversations/tasks
- Admin role required for agent management endpoints
- RBAC enforced at API Gateway level

### Data Protection

- Conversation data encrypted at rest
- PII handled according to L1/L2/L3 zones
- Audit logging for all agent interactions
- GDPR-compliant data retention

## Troubleshooting

### Common Issues

**Agent shows as offline**:
```bash
# Check agent pod status
kubectl get pods -n noor-agents

# Check agent logs
kubectl logs -n noor-agents -l app=master-orchestrator
```

**High API latency**:
- Check Anthropic API status
- Review Claude model response times
- Check database connection pool
- Monitor network latency to Anthropic API

**Task routing failures**:
- Verify agent registry is populated
- Check MCP message queue (Kafka)
- Review orchestrator logs
- Validate tool execution results

## License

Proprietary - UAE Government - NOOR Platform

## Support

- **Email**: noor-agents@mohre.gov.ae
- **Slack**: #noor-platform-agents
- **Docs**: https://docs.noor.gov.ae/master-orchestrator
