# NOOR Platform - MongoDB Collections

MongoDB document database schemas for employee engagement, performance, learning content, guilds, and AI agent operations.

## Collections Overview

### Employee Engagement & Culture (3 collections)

**1. employee_engagement**
- Survey responses and metrics
- Sentiment analysis
- Participation tracking
- Engagement scores (0-100)

**2. performance_reviews**
- 360-degree feedback
- Competency ratings
- Goal achievement tracking
- Development plans

**3. work_life_balance**
- Working hours tracking
- Overtime and weekend work
- PTO usage
- Burnout risk scoring
- Wellness activities

### Learning & Content (3 collections)

**4. learning_content**
- Courses, modules, videos, assessments
- Bilingual support (Arabic/English)
- Competencies covered
- Instructor information
- Content structure and certification

**5. user_learning_progress**
- Enrollment and progress tracking
- Quiz attempts and scores
- Bookmarks and notes
- Completion certificates

**6. knowledge_base**
- HR policies and procedures
- FAQs and documentation
- Full-text search enabled
- Version control

### Professional Guilds (1 collection)

**7. guilds**
- Professional communities
- Activities and events
- Discussions and resources
- Member management

### AI Agent Operations (4 collections)

**8. agent_interactions**
- User-agent conversations
- Chat messages and context
- Tool usage tracking
- Sentiment analysis
- TTL: 90 days

**9. agent_decisions**
- Agent decision-making logs
- Confidence scores
- Human approval workflow
- Outcome tracking

**10. agent_performance**
- Performance metrics by period
- Quality indicators
- Resource utilization
- Cost tracking

**11. mcp_messages**
- Model Context Protocol logs
- Inter-agent communication
- Message delivery tracking
- TTL: 30 days

## Initialization

### Development Environment

```bash
# Connect to MongoDB
docker exec -it noor-mongodb mongosh -u noor_user -p noor_password --authenticationDatabase admin

# Switch to noor_mongo database
use noor_mongo

# Run initialization scripts
load("/path/to/001_engagement_performance_wellness.js")
load("/path/to/002_learning_content_guilds.js")
load("/path/to/003_ai_agent_logs.js")
```

### Production Environment

```bash
# Connect to MongoDB
mongosh "mongodb://noor_user:PASSWORD@mongodb-service.noor-platform.svc.cluster.local:27017/noor_mongo?authSource=admin"

# Run scripts
load("001_engagement_performance_wellness.js")
load("002_learning_content_guilds.js")
load("003_ai_agent_logs.js")
```

## Key Features

### Data Validation

All collections use JSON Schema validation to ensure:
- Required fields are present
- Data types are correct
- Enums contain valid values
- Numeric ranges are enforced
- Nested document structures are validated

### Indexing Strategy

**Performance indexes:**
- Primary lookups (user_id, employee_id, agent_id)
- Date range queries (timestamp, period_start)
- Full-text search (learning_content, knowledge_base)
- Compound indexes for common queries

**TTL Indexes:**
- `agent_interactions`: Auto-delete after 90 days
- `mcp_messages`: Auto-delete after 30 days
- `work_life_balance`: Auto-delete after 2 years

### Sharding Recommendations (Production)

For horizontal scaling:

```javascript
// Shard employee_engagement by employee_id
sh.enableSharding("noor_mongo")
sh.shardCollection("noor_mongo.employee_engagement", { "employee_id": "hashed" })

// Shard agent_interactions by agent_id and timestamp
sh.shardCollection("noor_mongo.agent_interactions", { "agent_id": 1, "timestamp": 1 })

// Shard learning_content by content_id
sh.shardCollection("noor_mongo.learning_content", { "content_id": "hashed" })
```

## Usage Examples

### Employee Engagement

```javascript
// Insert engagement survey
db.employee_engagement.insertOne({
  employee_id: "550e8400-e29b-41d4-a716-446655440000",
  company_id: "660e8400-e29b-41d4-a716-446655440001",
  survey_date: new Date(),
  survey_type: "quarterly",
  metrics: {
    overall_satisfaction: 4.2,
    engagement_score: 82.5,
    work_life_balance: 4.0,
    career_development: 3.8
  },
  sentiment_analysis: {
    overall_sentiment: "positive",
    sentiment_score: 0.72,
    key_themes: ["growth", "collaboration", "flexible work"]
  },
  created_at: new Date(),
  updated_at: new Date()
})

// Query high engagement scores
db.employee_engagement.find({
  "metrics.engagement_score": { $gte: 80 }
}).sort({ "survey_date": -1 })
```

### Agent Interactions

```javascript
// Log agent interaction
db.agent_interactions.insertOne({
  agent_id: "radiant-ai-001",
  agent_name: "Radiant AI",
  agent_category: "intelligence",
  user_id: "550e8400-e29b-41d4-a716-446655440000",
  session_id: "sess_" + new Date().getTime(),
  timestamp: new Date(),
  interaction_type: "chat",
  messages: [
    {
      message_id: "msg_001",
      role: "user",
      content: "Help me find a mentor for data science",
      timestamp: new Date()
    },
    {
      message_id: "msg_002",
      role: "agent",
      content: "I found 3 potential mentors based on your profile...",
      timestamp: new Date(),
      tokens_used: 150,
      model: "gpt-4"
    }
  ],
  sentiment_analysis: {
    user_sentiment: "positive",
    satisfaction_score: 0.85
  },
  created_at: new Date()
})

// Query agent performance
db.agent_interactions.aggregate([
  {
    $match: {
      agent_id: "radiant-ai-001",
      timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    }
  },
  {
    $group: {
      _id: "$agent_id",
      total_interactions: { $sum: 1 },
      avg_satisfaction: { $avg: "$sentiment_analysis.satisfaction_score" }
    }
  }
])
```

### Learning Content

```javascript
// Create learning content
db.learning_content.insertOne({
  content_id: "course_python_basics",
  title: "Python Programming Basics",
  title_ar: "أساسيات برمجة بايثون",
  content_type: "course",
  category: "technical",
  difficulty_level: "beginner",
  language: "both",
  duration_minutes: 360,
  tags: ["programming", "python", "beginner"],
  competencies_covered: [
    {
      competency_id: "comp_001",
      competency_name: "Python Programming",
      proficiency_level: "beginner"
    }
  ],
  status: "published",
  created_at: new Date(),
  published_at: new Date()
})

// Full-text search
db.knowledge_base.find({
  $text: { $search: "leave policy vacation" }
}).limit(10)
```

## Backup & Restore

### Backup

```bash
# Backup entire database
mongodump --uri="mongodb://noor_user:PASSWORD@localhost:27017/noor_mongo?authSource=admin" --out=/backup/mongodb/

# Backup specific collection
mongodump --uri="mongodb://noor_user:PASSWORD@localhost:27017/noor_mongo?authSource=admin" --collection=employee_engagement --out=/backup/mongodb/
```

### Restore

```bash
# Restore entire database
mongorestore --uri="mongodb://noor_user:PASSWORD@localhost:27017/noor_mongo?authSource=admin" /backup/mongodb/noor_mongo/

# Restore specific collection
mongorestore --uri="mongodb://noor_user:PASSWORD@localhost:27017/noor_mongo?authSource=admin" --collection=employee_engagement /backup/mongodb/noor_mongo/employee_engagement.bson
```

## Monitoring

### Collection Stats

```javascript
// Get collection statistics
db.employee_engagement.stats()

// Get index usage
db.employee_engagement.aggregate([{ $indexStats: {} }])

// Current operations
db.currentOp()
```

### Performance Tuning

```javascript
// Explain query plan
db.employee_engagement.find({ employee_id: "xxx" }).explain("executionStats")

// Create covering index
db.employee_engagement.createIndex(
  { employee_id: 1, survey_date: -1 },
  { background: true }
)
```

## Security

### Access Control

```javascript
// Create read-only user for analytics
db.createUser({
  user: "noor_analytics",
  pwd: "secure_password",
  roles: [
    { role: "read", db: "noor_mongo" }
  ]
})

// Create application user with full access
db.createUser({
  user: "noor_app",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "noor_mongo" }
  ]
})
```

### Encryption

- **At Rest**: Enable MongoDB encryption at rest
- **In Transit**: Use TLS/SSL for all connections
- **Field-Level**: Use Client-Side Field Level Encryption (CSFLE) for sensitive data

## Migration Notes

When migrating from development to production:

1. Update connection strings
2. Enable authentication
3. Configure replication (3+ nodes)
4. Set up monitoring (MongoDB Atlas or Ops Manager)
5. Configure automated backups
6. Review and optimize indexes
7. Enable sharding if needed (>1TB data)

## Support

For issues or questions:
- Check MongoDB logs: `docker logs noor-mongodb`
- MongoDB documentation: https://docs.mongodb.com/
- NOOR Platform team: [support contact]

---

**Total Collections:** 11
**Total Indexes:** 50+
**Schema Validation:** ✅ Enabled on all collections
**TTL Indexes:** ✅ Configured for logs
**Full-Text Search:** ✅ Enabled on knowledge_base
