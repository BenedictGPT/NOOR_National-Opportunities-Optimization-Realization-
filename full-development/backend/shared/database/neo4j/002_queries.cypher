// NOOR Platform - Neo4j Common Queries
// Version: 7.1.0
// Purpose: Pre-built queries for skill gaps, career paths, mentor matching

// ============================================================================
// SKILL GAP ANALYSIS
// ============================================================================

// Query 1: Find skill gaps for a user aspiring to a specific role
// Parameters: $user_id, $target_role_id
MATCH (u:User {id: $user_id})-[:HAS_COMPETENCY]->(current:Competency)
MATCH (r:Role {id: $target_role_id})-[req:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
RETURN
  required.id AS competency_id,
  required.name AS competency_name,
  required.category AS category,
  req.min_proficiency AS required_proficiency,
  req.mandatory AS is_mandatory,
  req.weight AS importance_weight
ORDER BY req.weight DESC, req.mandatory DESC;

// Query 2: Find users with specific competency gaps (for targeted training)
// Parameters: $competency_ids (list)
MATCH (u:User)
WHERE NOT EXISTS {
  MATCH (u)-[:HAS_COMPETENCY]->(c:Competency)
  WHERE c.id IN $competency_ids
}
RETURN u.id, u.name, u.current_role
LIMIT 100;

// Query 3: Calculate skill gap percentage for a user toward a role
// Parameters: $user_id, $target_role_id
MATCH (u:User {id: $user_id})
MATCH (r:Role {id: $target_role_id})-[req:REQUIRES]->(required:Competency)
WITH u, r, COUNT(required) AS total_required,
     SUM(CASE WHEN EXISTS((u)-[:HAS_COMPETENCY]->(required)) THEN 1 ELSE 0 END) AS has_count,
     SUM(CASE WHEN req.mandatory = true THEN 1 ELSE 0 END) AS mandatory_count,
     SUM(CASE WHEN req.mandatory = true AND EXISTS((u)-[:HAS_COMPETENCY]->(required)) THEN 1 ELSE 0 END) AS has_mandatory
RETURN
  u.id AS user_id,
  r.title AS target_role,
  total_required,
  has_count,
  ROUND((toFloat(has_count) / total_required) * 100, 2) AS completion_percentage,
  mandatory_count,
  has_mandatory,
  CASE WHEN has_mandatory = mandatory_count THEN true ELSE false END AS all_mandatory_met;

// ============================================================================
// LEARNING PATH RECOMMENDATIONS
// ============================================================================

// Query 4: Recommend learning content to fill skill gaps
// Parameters: $user_id, $target_role_id
MATCH (u:User {id: $user_id})
MATCH (r:Role {id: $target_role_id})-[:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
MATCH (lc:LearningContent)-[:TEACHES]->(required)
WHERE NOT (u)-[:COMPLETED]->(lc)
OPTIONAL MATCH (lc)-[:PREREQUISITE_FOR]->(next:LearningContent)
OPTIONAL MATCH (prereq:LearningContent)-[:PREREQUISITE_FOR]->(lc)
RETURN DISTINCT
  lc.id AS content_id,
  lc.title AS title,
  lc.content_type AS type,
  lc.difficulty_level AS difficulty,
  lc.duration_minutes AS duration,
  lc.rating AS rating,
  COLLECT(DISTINCT required.name) AS teaches_competencies,
  COLLECT(DISTINCT prereq.id) AS prerequisites,
  CASE WHEN EXISTS((u)-[:COMPLETED]->(prereq)) THEN true ELSE false END AS prerequisites_met
ORDER BY lc.rating DESC, lc.duration_minutes ASC
LIMIT 20;

// Query 5: Generate personalized learning pathway
// Parameters: $user_id, $target_role_id
MATCH (u:User {id: $user_id})
MATCH (r:Role {id: $target_role_id})-[:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
MATCH path = (start:LearningContent)-[:PREREQUISITE_FOR*0..3]->(lc:LearningContent)-[:TEACHES]->(required)
WHERE NOT (u)-[:COMPLETED]->(lc)
WITH u, lc, required, path, LENGTH(path) AS path_length
ORDER BY path_length ASC
WITH u, lc, COLLECT(DISTINCT required.name)[..5] AS competencies, MIN(path_length) AS min_path_length
RETURN
  lc.id AS content_id,
  lc.title AS title,
  lc.difficulty_level AS difficulty,
  lc.duration_minutes AS duration,
  competencies,
  min_path_length AS learning_sequence
ORDER BY min_path_length ASC, lc.rating DESC
LIMIT 10;

// ============================================================================
// CAREER PATH ANALYSIS
// ============================================================================

// Query 6: Find all possible career paths from current role to target role
// Parameters: $current_role_id, $target_role_id
MATCH path = (start:Role {id: $current_role_id})-[:LEADS_TO*1..4]->(end:Role {id: $target_role_id})
WITH path, RELATIONSHIPS(path) AS rels
RETURN
  [r IN NODES(path) | r.title] AS career_path,
  LENGTH(path) AS steps,
  REDUCE(years = 0, rel IN rels | years + rel.typical_years) AS estimated_years,
  REDUCE(prob = 1.0, rel IN rels | prob * rel.probability) AS success_probability
ORDER BY success_probability DESC, estimated_years ASC
LIMIT 10;

// Query 7: Calculate career pathway viability score
// Parameters: $user_id, $target_role_id
MATCH (u:User {id: $user_id})
MATCH (target:Role {id: $target_role_id})
OPTIONAL MATCH (u)-[:HAS_COMPETENCY]->(has:Competency)<-[:REQUIRES]-(target)
OPTIONAL MATCH (target)-[:REQUIRES]->(required:Competency)
WITH u, target,
     COUNT(DISTINCT has) AS has_competencies,
     COUNT(DISTINCT required) AS required_competencies,
     u.years_experience AS experience
RETURN
  target.title AS role_title,
  required_competencies,
  has_competencies,
  ROUND((toFloat(has_competencies) / required_competencies) * 100, 2) AS competency_match_percentage,
  CASE
    WHEN experience >= 5 THEN 'High'
    WHEN experience >= 3 THEN 'Medium'
    ELSE 'Low'
  END AS experience_level,
  ROUND(
    ((toFloat(has_competencies) / required_competencies) * 0.7) +
    (CASE WHEN experience >= 5 THEN 0.3 WHEN experience >= 3 THEN 0.2 ELSE 0.1 END),
    2
  ) AS viability_score;

// Query 8: Find users who successfully transitioned to a target role
// Parameters: $target_role_id
MATCH (u:User)-[w:WORKS_AT]->(c:Company)
WHERE w.position = $target_role_id AND w.current = true
MATCH (u)-[:HAS_COMPETENCY]->(comp:Competency)
RETURN
  u.id AS user_id,
  u.name AS name,
  u.years_experience AS experience,
  c.name AS company,
  COLLECT(DISTINCT comp.name) AS competencies,
  COUNT(DISTINCT comp) AS competency_count
ORDER BY competency_count DESC
LIMIT 20;

// ============================================================================
// MENTOR MATCHING
// ============================================================================

// Query 9: Find optimal mentors for a user based on skill gaps
// Parameters: $user_id, $target_role_id, $limit
MATCH (u:User {id: $user_id})
MATCH (r:Role {id: $target_role_id})-[:REQUIRES]->(required:Competency)
WHERE NOT (u)-[:HAS_COMPETENCY]->(required)
MATCH (m:Mentor)-[:EXPERT_IN]->(required)
WHERE NOT (u)-[:MENTORED_BY]->(m)
WITH u, m, COLLECT(DISTINCT required.name) AS expertise_areas, COUNT(DISTINCT required) AS match_count
OPTIONAL MATCH (m)-[:EXPERT_IN]->(other_comp:Competency)
WITH u, m, expertise_areas, match_count, COUNT(DISTINCT other_comp) AS total_expertise
RETURN
  m.id AS mentor_id,
  m.user_id AS mentor_user_id,
  m.years_of_experience AS experience,
  m.mentee_count AS current_mentees,
  m.avg_rating AS rating,
  m.availability AS availability,
  m.languages AS languages,
  expertise_areas AS can_help_with,
  match_count AS skill_gap_match,
  total_expertise AS total_competencies,
  ROUND((toFloat(match_count) / total_expertise) * m.avg_rating *
        (CASE WHEN m.mentee_count < 5 THEN 1.0 ELSE 0.8 END), 2) AS match_score
ORDER BY match_score DESC
LIMIT $limit;

// Query 10: Find mentors within the same company
// Parameters: $user_id, $competency_ids
MATCH (u:User {id: $user_id})-[:WORKS_AT]->(c:Company)
MATCH (other:User)-[:WORKS_AT]->(c)
MATCH (m:Mentor {user_id: other.id})-[:EXPERT_IN]->(comp:Competency)
WHERE comp.id IN $competency_ids AND other.id <> u.id
RETURN
  m.id AS mentor_id,
  other.name AS mentor_name,
  c.name AS company_name,
  COLLECT(DISTINCT comp.name) AS expertise,
  m.avg_rating AS rating,
  m.availability AS availability
ORDER BY m.avg_rating DESC, m.mentee_count ASC
LIMIT 10;

// ============================================================================
// TALENT DISCOVERY
// ============================================================================

// Query 11: Find talent pools with specific competency combinations
// Parameters: $competency_ids (list), $min_proficiency
MATCH (u:User)-[has:HAS_COMPETENCY]->(c:Competency)
WHERE c.id IN $competency_ids
  AND has.proficiency_level >= $min_proficiency
  AND has.verified = true
WITH u, COUNT(DISTINCT c) AS competency_match_count
WHERE competency_match_count = SIZE($competency_ids)
MATCH (u)-[:HAS_COMPETENCY]->(all_comp:Competency)
RETURN
  u.id AS user_id,
  u.name AS name,
  u.current_role AS current_role,
  u.years_experience AS experience,
  u.location AS location,
  COLLECT(DISTINCT all_comp.name) AS all_competencies
ORDER BY u.years_experience DESC
LIMIT 50;

// Query 12: Identify trending competencies in the network
MATCH (u:User)-[:HAS_COMPETENCY {verified: true}]->(c:Competency)
WITH c, COUNT(DISTINCT u) AS user_count
MATCH (r:Role)-[:REQUIRES]->(c)
WITH c, user_count, COUNT(DISTINCT r) AS role_demand
RETURN
  c.id AS competency_id,
  c.name AS competency_name,
  c.category AS category,
  user_count AS supply,
  role_demand AS demand,
  CASE
    WHEN role_demand > user_count THEN 'High Demand'
    WHEN role_demand * 2 > user_count THEN 'Growing'
    ELSE 'Stable'
  END AS market_status,
  ROUND(toFloat(role_demand) / user_count, 2) AS demand_supply_ratio
ORDER BY demand_supply_ratio DESC
LIMIT 20;

// ============================================================================
// ORGANIZATIONAL INSIGHTS
// ============================================================================

// Query 13: Map organizational competency distribution
// Parameters: $company_id
MATCH (c:Company {id: $company_id})<-[:WORKS_AT]-(u:User)
MATCH (u)-[:HAS_COMPETENCY {verified: true}]->(comp:Competency)
WITH comp, COUNT(DISTINCT u) AS user_count, c
RETURN
  comp.category AS competency_category,
  comp.name AS competency_name,
  user_count AS employee_count,
  ROUND((toFloat(user_count) / SIZE((c)<-[:WORKS_AT]-(:User))) * 100, 2) AS percentage_of_workforce
ORDER BY user_count DESC;

// Query 14: Identify critical skill gaps at company level
// Parameters: $company_id
MATCH (c:Company {id: $company_id})<-[:WORKS_AT]-(u:User)
MATCH (r:Role)-[:REQUIRES]->(comp:Competency)
WHERE NOT EXISTS((u)-[:HAS_COMPETENCY]->(comp))
WITH comp, COUNT(DISTINCT r) AS role_count, COUNT(DISTINCT u) AS gap_count
RETURN
  comp.id AS competency_id,
  comp.name AS competency_name,
  comp.category AS category,
  gap_count AS employees_lacking,
  role_count AS roles_requiring,
  ROUND(gap_count * role_count, 0) AS criticality_score
ORDER BY criticality_score DESC
LIMIT 20;

// Query 15: Find high-potential employees for succession planning
// Parameters: $target_role_id, $company_id
MATCH (c:Company {id: $company_id})<-[:WORKS_AT]-(u:User)
MATCH (target:Role {id: $target_role_id})-[:REQUIRES]->(required:Competency)
OPTIONAL MATCH (u)-[:HAS_COMPETENCY]->(has:Competency)
WHERE has.id = required.id
WITH u, target, COUNT(DISTINCT required) AS total_required, COUNT(DISTINCT has) AS has_count
WHERE toFloat(has_count) / total_required >= 0.6
RETURN
  u.id AS user_id,
  u.name AS name,
  u.current_role AS current_role,
  u.years_experience AS experience,
  total_required,
  has_count,
  ROUND((toFloat(has_count) / total_required) * 100, 2) AS readiness_percentage
ORDER BY readiness_percentage DESC, u.years_experience DESC
LIMIT 10;

// Confirmation
RETURN "Common queries library loaded successfully!" AS status;
