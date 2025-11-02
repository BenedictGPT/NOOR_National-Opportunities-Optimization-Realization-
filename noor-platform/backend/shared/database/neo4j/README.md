# NOOR Platform - Neo4j Graph Database

Graph database for competency networks, career pathways, organizational relationships, and mentor matching.

## Overview

The Neo4j graph database powers the NOOR Platform's intelligence layer, enabling:
- **Skill Gap Analysis:** Identify missing competencies for target roles
- **Career Pathway Discovery:** Find optimal career progression routes
- **Mentor Matching:** Connect users with expert mentors
- **Learning Recommendations:** Personalized content based on graph traversal
- **Talent Discovery:** Find employees with specific competency combinations
- **Organizational Insights:** Map competency distribution and gaps

## Graph Schema

### Node Types

| Node Label | Key Properties | Description |
|------------|---------------|-------------|
| **User** | id, name, email, role, years_experience | Platform users (employees) |
| **Competency** | id, name, category, level, description | Skills and abilities |
| **Role** | id, title, seniority_level, demand_score | Job roles and positions |
| **Company** | id, name, industry, emiratization_rate | Organizations |
| **LearningContent** | id, title, content_type, difficulty_level | Courses and training materials |
| **Mentor** | id, user_id, expertise_areas, avg_rating | Expert mentors |
| **Skill** | id, name, trending_score, demand_score | Fine-grained skills |
| **Department** | id, name, employee_count | Organizational units |

### Relationship Types

| Relationship | Properties | Description |
|--------------|-----------|-------------|
| **HAS_COMPETENCY** | proficiency_level, verified, verified_date | User's skills |
| **ASPIRES_TO** | priority, target_date, motivation | Career goals |
| **WORKS_AT** | start_date, position, department, current | Employment |
| **REPORTS_TO** | since | Reporting structure |
| **REQUIRES** | min_proficiency, weight, mandatory | Role requirements |
| **LEADS_TO** | typical_years, probability | Career progression |
| **TEACHES** | proficiency_gain | Learning outcomes |
| **MENTORED_BY** | start_date, status, focus_areas, rating | Mentorship |
| **EXPERT_IN** | proficiency_level, years_experience | Mentor expertise |
| **PREREQUISITE_OF** | - | Learning/skill dependencies |
| **RELATED_TO** | similarity_score | Competency relationships |

## Installation

### Development Environment

```bash
# Connect to Neo4j Browser
http://localhost:7474

# Or use cypher-shell
docker exec -it noor-neo4j cypher-shell -u neo4j -p noor_password

# Run schema initialization
:source /path/to/001_graph_schema.cypher

# Load common queries
:source /path/to/002_queries.cypher
```

### Production Environment

```bash
# Connect via Kubernetes service
cypher-shell -a bolt://neo4j-service.noor-platform.svc.cluster.local:7687 \
  -u neo4j -p <PRODUCTION_PASSWORD>

# Run initialization scripts
:source 001_graph_schema.cypher
:source 002_queries.cypher
```

## Common Use Cases

### 1. Find Skill Gaps

```cypher
// Find what competencies a user needs for a target role
MATCH (u:User {id: '550e8400-e29b-41d4-a716-446655440000'})
MATCH (r:Role {id: 'role_ml_engineer'})-[req:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
RETURN
  required.name AS missing_competency,
  req.min_proficiency AS required_level,
  req.mandatory AS is_mandatory,
  req.weight AS importance
ORDER BY req.weight DESC;
```

**Result:** List of competencies the user needs to acquire

### 2. Recommend Learning Path

```cypher
// Get personalized learning recommendations
MATCH (u:User {id: '550e8400-e29b-41d4-a716-446655440000'})
MATCH (r:Role {id: 'role_data_scientist'})-[:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
MATCH (lc:LearningContent)-[:TEACHES]->(required)
WHERE NOT (u)-[:COMPLETED]->(lc)
RETURN
  lc.title AS recommended_course,
  lc.difficulty_level AS difficulty,
  lc.duration_minutes / 60 AS hours,
  COLLECT(DISTINCT required.name) AS will_teach
ORDER BY lc.rating DESC
LIMIT 5;
```

**Result:** Top 5 courses to help close skill gaps

### 3. Find Career Paths

```cypher
// Discover possible career progressions
MATCH path = (current:Role {id: 'role_data_analyst'})-[:LEADS_TO*1..3]->(target:Role {id: 'role_team_lead'})
WITH path, RELATIONSHIPS(path) AS rels
RETURN
  [r IN NODES(path) | r.title] AS career_steps,
  REDUCE(years = 0, rel IN rels | years + rel.typical_years) AS estimated_years,
  REDUCE(prob = 1.0, rel IN rels | prob * rel.probability) AS success_probability
ORDER BY success_probability DESC;
```

**Result:** Ranked career progression paths with time estimates

### 4. Match with Mentors

```cypher
// Find mentors who can help with specific skills
MATCH (u:User {id: '550e8400-e29b-41d4-a716-446655440000'})
MATCH (r:Role {id: 'role_ml_engineer'})-[:REQUIRES]->(needed:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(needed)
MATCH (m:Mentor)-[:EXPERT_IN]->(needed)
WITH m, COLLECT(DISTINCT needed.name) AS can_teach, COUNT(DISTINCT needed) AS match_count
RETURN
  m.user_id AS mentor_id,
  m.years_of_experience AS experience,
  m.avg_rating AS rating,
  m.availability AS available,
  can_teach AS expertise_in,
  match_count AS skill_gaps_covered
ORDER BY match_count DESC, m.avg_rating DESC
LIMIT 10;
```

**Result:** Top 10 mentor matches ranked by relevance

### 5. Calculate Career Viability

```cypher
// How ready is a user for a target role?
MATCH (u:User {id: '550e8400-e29b-41d4-a716-446655440000'})
MATCH (target:Role {id: 'role_ml_engineer'})
OPTIONAL MATCH (u)-[:HAS_COMPETENCY]->(has:Competency)<-[:REQUIRES]-(target)
OPTIONAL MATCH (target)-[:REQUIRES]->(required:Competency)
WITH u, target,
     COUNT(DISTINCT has) AS has_count,
     COUNT(DISTINCT required) AS required_count
RETURN
  target.title AS role,
  required_count AS total_required,
  has_count AS currently_have,
  ROUND((toFloat(has_count) / required_count) * 100, 2) AS readiness_percentage,
  CASE
    WHEN has_count >= required_count THEN 'Ready Now'
    WHEN has_count >= required_count * 0.7 THEN 'Almost Ready'
    WHEN has_count >= required_count * 0.5 THEN 'In Progress'
    ELSE 'Just Starting'
  END AS readiness_level;
```

**Result:** Career readiness score and level

### 6. Discover Talent Pools

```cypher
// Find employees with specific competency combinations
MATCH (u:User)-[has:HAS_COMPETENCY]->(c:Competency)
WHERE c.id IN ['comp_python_programming', 'comp_machine_learning']
  AND has.verified = true
WITH u, COUNT(DISTINCT c) AS match_count
WHERE match_count = 2
RETURN
  u.name AS employee,
  u.current_role AS role,
  u.years_experience AS experience,
  u.location AS location
ORDER BY u.years_experience DESC;
```

**Result:** Employees matching all specified competencies

## Advanced Queries

### Competency Network Analysis

```cypher
// Find competencies that often appear together
MATCH (u:User)-[:HAS_COMPETENCY]->(c1:Competency)
MATCH (u)-[:HAS_COMPETENCY]->(c2:Competency)
WHERE c1.id < c2.id
WITH c1, c2, COUNT(DISTINCT u) AS co_occurrence
WHERE co_occurrence > 5
RETURN
  c1.name AS competency_1,
  c2.name AS competency_2,
  co_occurrence AS users_with_both,
  ROUND((toFloat(co_occurrence) / 100) * 100, 2) AS correlation_score
ORDER BY co_occurrence DESC
LIMIT 20;
```

### Identify Trending Skills

```cypher
// Which competencies are in high demand but low supply?
MATCH (u:User)-[:HAS_COMPETENCY {verified: true}]->(c:Competency)
WITH c, COUNT(DISTINCT u) AS supply
MATCH (r:Role)-[:REQUIRES]->(c)
WITH c, supply, COUNT(DISTINCT r) AS demand
WHERE demand > supply
RETURN
  c.name AS competency,
  supply AS available_talent,
  demand AS roles_requiring,
  ROUND(toFloat(demand) / supply, 2) AS demand_supply_ratio,
  CASE
    WHEN demand > supply * 2 THEN 'Critical Shortage'
    WHEN demand > supply THEN 'High Demand'
    ELSE 'Balanced'
  END AS market_status
ORDER BY demand_supply_ratio DESC
LIMIT 10;
```

### Succession Planning

```cypher
// Find high-potential employees for a role
MATCH (u:User)-[:WORKS_AT]->(c:Company {id: '660e8400-e29b-41d4-a716-446655440001'})
MATCH (target:Role {id: 'role_team_lead'})-[:REQUIRES]->(required:Competency)
OPTIONAL MATCH (u)-[:HAS_COMPETENCY]->(has:Competency)
WHERE has.id = required.id
WITH u, target, COUNT(DISTINCT required) AS total, COUNT(DISTINCT has) AS current
WHERE toFloat(current) / total >= 0.6
RETURN
  u.name AS employee,
  u.current_role AS current_role,
  u.years_experience AS experience,
  ROUND((toFloat(current) / total) * 100, 2) AS readiness_percentage
ORDER BY readiness_percentage DESC, u.years_experience DESC
LIMIT 5;
```

## Performance Optimization

### Indexes

The schema includes indexes on:
- Node IDs (unique constraints)
- Frequently queried properties (name, category, industry)
- Full-text search (names and descriptions)

### Query Optimization Tips

```cypher
// ✅ GOOD: Start with most selective node
MATCH (u:User {id: $user_id})-[:HAS_COMPETENCY]->(c:Competency)
RETURN c

// ❌ BAD: Start with least selective
MATCH (c:Competency)<-[:HAS_COMPETENCY]-(u:User {id: $user_id})
RETURN c

// ✅ GOOD: Use LIMIT to reduce result set
MATCH (u:User)-[:HAS_COMPETENCY]->(c:Competency)
RETURN c.name, COUNT(u) AS user_count
ORDER BY user_count DESC
LIMIT 10

// ✅ GOOD: Use EXISTS for existence checks
MATCH (u:User)
WHERE EXISTS((u)-[:HAS_COMPETENCY]->(:Competency {id: 'comp_python'}))
RETURN u

// ❌ BAD: Collect then filter
MATCH (u:User)
WITH u, [(u)-[:HAS_COMPETENCY]->(c:Competency {id: 'comp_python'}) | c] AS comps
WHERE SIZE(comps) > 0
RETURN u
```

## Backup & Restore

### Backup

```bash
# Stop Neo4j
docker-compose stop noor-neo4j

# Backup data
docker cp noor-neo4j:/data /backup/neo4j/data
docker cp noor-neo4j:/logs /backup/neo4j/logs

# Restart Neo4j
docker-compose start noor-neo4j
```

### Restore

```bash
# Stop Neo4j
docker-compose stop noor-neo4j

# Restore data
docker cp /backup/neo4j/data noor-neo4j:/data
docker cp /backup/neo4j/logs noor-neo4j:/logs

# Restart Neo4j
docker-compose start noor-neo4j
```

### Export to CSV

```cypher
// Export users with competencies
CALL apoc.export.csv.query(
  "MATCH (u:User)-[r:HAS_COMPETENCY]->(c:Competency)
   RETURN u.id, u.name, c.name, r.proficiency_level",
  "users_competencies.csv",
  {}
)
```

## Monitoring

### Check Database Stats

```cypher
// Count nodes and relationships
MATCH (n) RETURN COUNT(n) AS total_nodes;
MATCH ()-[r]->() RETURN COUNT(r) AS total_relationships;

// Count by label
MATCH (n) RETURN labels(n) AS label, COUNT(n) AS count
ORDER BY count DESC;

// Count by relationship type
MATCH ()-[r]->() RETURN type(r) AS relationship_type, COUNT(r) AS count
ORDER BY count DESC;
```

### Check Query Performance

```cypher
// Profile a query
PROFILE
MATCH (u:User {id: '550e8400-e29b-41d4-a716-446655440000'})-[:HAS_COMPETENCY]->(c:Competency)
RETURN c.name;

// Explain query plan
EXPLAIN
MATCH path = (start:Role)-[:LEADS_TO*1..3]->(end:Role)
RETURN path;
```

## Scaling Considerations

### When to Scale

- **Node Count** > 10 million: Consider clustering
- **Relationship Count** > 100 million: Enable clustering
- **Query Latency** > 1 second: Optimize queries and add indexes
- **Concurrent Users** > 1000: Add read replicas

### Neo4j Clustering

For production deployments >100GB:

```yaml
# Neo4j Causal Cluster (3 core servers minimum)
neo4j:
  core:
    replicas: 3
    server_groups: "core1,core2,core3"
  read_replica:
    replicas: 2
```

## Integration with Other Databases

### PostgreSQL

- **Use PostgreSQL for:** Transactional data, audit logs, GDPR compliance
- **Use Neo4j for:** Relationship queries, recommendations, path finding

### MongoDB

- **Use MongoDB for:** Document storage, flexible schemas, time-series data
- **Use Neo4j for:** Skill networks, mentor matching, career pathways

### Sync Strategy

```python
# Example: Sync user competencies from PostgreSQL to Neo4j
import psycopg2
from neo4j import GraphDatabase

# Fetch from PostgreSQL
pg_conn = psycopg2.connect("postgresql://...")
pg_cursor = pg_conn.cursor()
pg_cursor.execute("SELECT user_id, competency_id, proficiency_level FROM user_competencies WHERE verified = true")

# Write to Neo4j
neo4j_driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))
with neo4j_driver.session() as session:
    for user_id, comp_id, level in pg_cursor.fetchall():
        session.run("""
            MATCH (u:User {id: $user_id})
            MATCH (c:Competency {id: $comp_id})
            MERGE (u)-[r:HAS_COMPETENCY]->(c)
            SET r.proficiency_level = $level, r.synced_at = datetime()
        """, user_id=user_id, comp_id=comp_id, level=level)
```

## Troubleshooting

### Common Issues

**Issue:** Query is slow
**Solution:**
```cypher
// Check if indexes exist
CALL db.indexes();

// Create missing index
CREATE INDEX user_name_idx FOR (u:User) ON (u.name);
```

**Issue:** Out of memory errors
**Solution:**
- Increase heap size in `neo4j.conf`:
  ```
  dbms.memory.heap.max_size=4G
  ```
- Use `LIMIT` clauses
- Break large queries into smaller batches

**Issue:** Relationship not found
**Solution:**
```cypher
// Check if relationship exists
MATCH (u:User {id: $user_id})-[r]->(c:Competency {id: $comp_id})
RETURN type(r), r;

// Create if missing
MERGE (u:User {id: $user_id})-[r:HAS_COMPETENCY]->(c:Competency {id: $comp_id})
SET r.created_at = datetime();
```

## Support

- **Neo4j Documentation:** https://neo4j.com/docs/
- **Cypher Manual:** https://neo4j.com/docs/cypher-manual/
- **NOOR Platform Team:** [support contact]

---

**Graph Schema:** ✅ 8 node types, 12 relationship types
**Indexes:** ✅ Unique constraints + performance indexes + full-text search
**Sample Data:** ✅ Competencies, roles, career paths included
**Queries:** ✅ 15 pre-built common queries
