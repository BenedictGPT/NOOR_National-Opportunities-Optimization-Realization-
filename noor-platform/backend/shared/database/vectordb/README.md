# NOOR Platform - Vector Database (Pinecone)

Vector database configuration for biometric embeddings, semantic search, and AI-powered matching.

## Overview

The Pinecone vector database enables:
- **Biometric Identity Verification:** Facial + voice embedding matching (FAR < 0.1%)
- **Job/Skill Matching:** Semantic similarity between users and jobs
- **Learning Recommendations:** Content recommendations based on skill gaps
- **User Discovery:** Find similar users for mentoring and networking
- **Semantic Search:** Natural language search across content

## Indexes

| Index Name | Dimension | Metric | Purpose |
|------------|-----------|--------|---------|
| **noor-biometric-embeddings** | 768 | Euclidean | Facial (512) + Voice (256) biometric verification |
| **noor-job-skill-embeddings** | 768 | Cosine | Job descriptions and requirements |
| **noor-user-skill-embeddings** | 768 | Cosine | User skill profiles |
| **noor-learning-content-embeddings** | 768 | Cosine | Courses, articles, training materials |
| **noor-user-profile-embeddings** | 768 | Cosine | User profiles for networking/mentoring |

## Models Used

- **Biometric:** FaceNet (512-dim facial) + SpeechBrain (256-dim voice)
- **Semantic:** `sentence-transformers/paraphrase-multilingual-mpnet-base-v2` (768-dim)
- **Language Support:** English + Arabic (multilingual model)

## Installation

### Development Environment

```bash
# Install Pinecone Python client
pip install pinecone-client

# Set environment variables
export PINECONE_API_KEY="your-api-key"
export PINECONE_ENVIRONMENT="us-west1-gcp"

# Initialize indexes
cd backend/shared/database/vectordb
python pinecone_config.py
```

### Production Environment

```bash
# Add to Kubernetes secrets
kubectl create secret generic pinecone-secrets \
  --from-literal=api-key=YOUR_PRODUCTION_API_KEY \
  --namespace=noor-platform

# Environment variables in deployment
env:
  - name: PINECONE_API_KEY
    valueFrom:
      secretKeyRef:
        name: pinecone-secrets
        key: api-key
  - name: PINECONE_ENVIRONMENT
    value: "us-west1-gcp"
```

## Usage Examples

### 1. Biometric Identity Verification

```python
from vectordb.vector_operations import BiometricVectorDB
import numpy as np

# Initialize
biometric_db = BiometricVectorDB()

# Enroll facial biometric
user_id = "550e8400-e29b-41d4-a716-446655440000"
facial_embedding = extract_facial_features(image)  # 512-dim from FaceNet

biometric_db.enroll_biometric(
    user_id=user_id,
    embedding=facial_embedding,
    modality="facial",
    encrypted=True
)

# Verify identity
test_embedding = extract_facial_features(verification_image)
verified, confidence = biometric_db.verify_biometric(
    user_id=user_id,
    embedding=test_embedding,
    modality="facial"
)

print(f"Verified: {verified}, Confidence: {confidence:.4f}")
# Output: Verified: True, Confidence: 0.9742
```

**Security Features:**
- ✅ Only embeddings stored (no raw biometric data)
- ✅ User-scoped encryption (L1 Personal Zone)
- ✅ Euclidean distance for precise matching
- ✅ Configurable thresholds (FAR < 0.1%)
- ✅ Verification count tracking
- ✅ Audit logging

### 2. Job/Skill Matching

```python
from vectordb.vector_operations import JobMatchingVectorDB
from sentence_transformers import SentenceTransformer

# Initialize
job_db = JobMatchingVectorDB()
model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')

# Add job posting
job_description = """
Machine Learning Engineer with 5+ years experience in Python,
TensorFlow, and deploying ML models to production.
Strong background in NLP and computer vision.
"""
job_embedding = model.encode(job_description).tolist()

job_db.add_job_posting(
    job_id="job_ml_engineer_001",
    job_description_embedding=job_embedding,
    metadata={
        "role_title": "Machine Learning Engineer",
        "company_id": "comp_123",
        "seniority_level": "senior",
        "location": "Dubai",
        "salary_range_min": 25000,
        "salary_range_max": 40000,
        "required_skills": ["python", "tensorflow", "nlp", "cv"],
        "emiratization_priority": False
    }
)

# Find matching candidates
candidates = job_db.find_matching_candidates(
    job_id="job_ml_engineer_001",
    top_k=20,
    filters={"location": "Dubai", "years_experience": {"$gte": 5}}
)

for candidate in candidates:
    print(f"User: {candidate.id}, Match Score: {candidate.score:.4f}")
    print(f"Role: {candidate.metadata['current_role']}")
    print(f"Experience: {candidate.metadata['years_experience']} years\n")
```

### 3. Learning Content Recommendations

```python
from vectordb.vector_operations import LearningContentVectorDB

# Initialize
content_db = LearningContentVectorDB()

# User's skill gap query
skill_gap_query = "I need to learn Python programming and data analysis"
query_embedding = model.encode(skill_gap_query).tolist()

# Get recommendations
recommendations = content_db.recommend_content(
    query_embedding=query_embedding,
    top_k=5,
    filters={
        "language": "both",  # English + Arabic
        "difficulty_level": "beginner"
    }
)

for rec in recommendations:
    print(f"Course: {rec.metadata['title']}")
    print(f"Relevance: {rec.score:.4f}")
    print(f"Duration: {rec.metadata['duration_minutes']} minutes")
    print(f"Rating: {rec.metadata['rating']}/5.0\n")
```

### 4. Mentor Matching

```python
from vectordb.vector_operations import UserDiscoveryVectorDB

# Initialize
user_db = UserDiscoveryVectorDB()

# Find potential mentors for a user
mentors = user_db.find_potential_mentors(
    user_id="550e8400-e29b-41d4-a716-446655440000",
    top_k=10
)

for mentor in mentors:
    print(f"Mentor: {mentor.id}")
    print(f"Similarity: {mentor.score:.4f}")
    print(f"Role: {mentor.metadata['role']}")
    print(f"Experience: {mentor.metadata['years_experience']} years")
    print(f"Interests: {', '.join(mentor.metadata['interests'])}\n")
```

### 5. Batch Operations

```python
from vectordb.vector_operations import batch_upsert, VectorRecord
from vectordb.pinecone_config import IndexName

# Prepare batch of user profiles
records = []
for user in users:
    embedding = model.encode(user.bio + " " + user.skills).tolist()
    record = VectorRecord(
        id=user.id,
        values=embedding,
        metadata={
            "role": user.current_role,
            "years_experience": user.years_experience,
            "location": user.location,
            "interests": user.interests
        }
    )
    records.append(record)

# Batch upsert (100 vectors per batch)
total = batch_upsert(
    index_name=IndexName.USER_PROFILE_EMBEDDINGS.value,
    records=records,
    batch_size=100
)

print(f"Upserted {total} user profiles")
```

## Biometric Thresholds

### Verification Thresholds

| Modality | Threshold | FAR Target | FRR Target |
|----------|-----------|------------|------------|
| **Facial** | 0.95 (95%) | < 0.001 (0.1%) | < 0.01 (1%) |
| **Voice** | 0.92 (92%) | < 0.002 (0.2%) | < 0.02 (2%) |
| **Multimodal** | 0.97 (97%) | < 0.0001 (0.01%) | < 0.005 (0.5%) |

**FAR (False Acceptance Rate):** Probability of accepting an impostor
**FRR (False Rejection Rate):** Probability of rejecting a legitimate user

### Security Considerations

- **No Raw Biometrics:** Only embeddings stored, never raw images/audio
- **Local Processing:** Feature extraction happens on device/server, not cloud
- **Encryption:** All embeddings encrypted with user-scoped keys
- **Audit Logging:** Every verification attempt logged for compliance
- **L1 Zone:** Biometric data in Personal Zone (highest security)

## Query Performance

### Optimization Tips

```python
# ✅ GOOD: Use metadata filters to reduce search space
results = index.query(
    vector=embedding,
    filter={"location": "Dubai", "years_experience": {"$gte": 5}},
    top_k=20
)

# ✅ GOOD: Use appropriate top_k
results = index.query(vector=embedding, top_k=10)  # Not 1000

# ✅ GOOD: Batch operations for bulk inserts
batch_upsert(index_name, records, batch_size=100)

# ❌ BAD: No filters on large indexes
results = index.query(vector=embedding, top_k=1000)  # Slow!

# ❌ BAD: Individual upserts in loop
for record in records:
    index.upsert(vectors=[(record.id, record.values)])  # Inefficient
```

### Expected Latency

| Operation | Latency | Notes |
|-----------|---------|-------|
| **Upsert (single)** | 10-30ms | Depends on pod type |
| **Upsert (batch 100)** | 50-100ms | Much more efficient |
| **Query (top_k=10)** | 20-50ms | With metadata filters |
| **Query (top_k=100)** | 50-150ms | Larger result sets |
| **Fetch (single ID)** | 10-20ms | Fast ID lookup |

## Monitoring

### Index Statistics

```python
from vectordb.pinecone_config import get_index_stats

# Get stats for all indexes
stats = get_index_stats()

for index_name, index_stats in stats.items():
    print(f"\n{index_name}:")
    print(f"  Total Vectors: {index_stats['total_vector_count']:,}")
    print(f"  Dimension: {index_stats['dimension']}")
    print(f"  Fullness: {index_stats['index_fullness']:.2%}")
```

### Cost Estimation

**Pinecone Pricing (p1.x1 pods):**
- $0.096 per pod per hour
- ~$70/month per pod
- 1M vectors per pod (768-dim)

**NOOR Platform Estimate:**
- 5 indexes × 1 pod = $350/month (development)
- 5 indexes × 2 pods (replicas) = $700/month (production)
- Biometric index with 2 pods = $140/month (high availability)

**Total:** ~$840/month for production deployment

## Backup & Disaster Recovery

### Export Vectors

```python
import pinecone

# Initialize
pinecone.init(api_key="...", environment="us-west1-gcp")
index = pinecone.Index("noor-user-skill-embeddings")

# Fetch all vector IDs
index_stats = index.describe_index_stats()

# Export in batches
batch_size = 1000
all_ids = []  # Get from your database

for i in range(0, len(all_ids), batch_size):
    batch_ids = all_ids[i:i + batch_size]
    result = index.fetch(ids=batch_ids)

    # Save to file
    with open(f"backup_batch_{i}.json", "w") as f:
        json.dump(result.to_dict(), f)
```

### Restore from Backup

```python
import json

# Load backup
with open("backup_batch_0.json") as f:
    backup = json.load(f)

# Restore
vectors = []
for vec_id, vec_data in backup["vectors"].items():
    vectors.append((vec_id, vec_data["values"], vec_data["metadata"]))

# Upsert in batches
for i in range(0, len(vectors), 100):
    batch = vectors[i:i + 100]
    index.upsert(vectors=batch)
```

## Scaling Considerations

### When to Scale

- **Vector Count** > 1M per index → Add more pods or use larger pod type
- **Query Latency** > 100ms → Add read replicas
- **Upsert Rate** > 1000/sec → Use larger pod type (p1.x2 or higher)

### Pod Types

| Pod Type | Memory | Vectors (768-dim) | Cost/Hour |
|----------|--------|-------------------|-----------|
| **p1.x1** | 4GB | ~1M | $0.096 |
| **p1.x2** | 8GB | ~2M | $0.192 |
| **p1.x4** | 16GB | ~4M | $0.384 |
| **p1.x8** | 32GB | ~8M | $0.768 |

### Sharding Strategy

For > 10M vectors per index:
- Use horizontal sharding (multiple pods)
- Enable replicas for high availability
- Use namespaces for logical separation

## Troubleshooting

### Common Issues

**Issue:** Quota exceeded
**Solution:**
```python
# Check current usage
stats = index.describe_index_stats()
print(f"Vectors: {stats['total_vector_count']}")
print(f"Fullness: {stats['index_fullness']}")

# Upgrade pod type or add more pods
```

**Issue:** Slow queries
**Solution:**
- Add metadata filters to reduce search space
- Use smaller top_k values
- Enable read replicas
- Consider larger pod type

**Issue:** Low match scores
**Solution:**
- Check embedding model consistency
- Verify dimension matches index
- Review normalization (cosine requires normalized vectors)
- Adjust similarity thresholds

## Integration with Other Systems

### Sync from PostgreSQL

```python
# Fetch users with verified competencies
users = pg_cursor.execute("""
    SELECT u.id, u.name, array_agg(c.name) as skills
    FROM users u
    JOIN user_competencies uc ON u.id = uc.user_id
    JOIN competencies c ON uc.competency_id = c.id
    WHERE uc.verified = true
    GROUP BY u.id, u.name
""")

# Generate embeddings and upsert
for user in users:
    skill_text = " ".join(user.skills)
    embedding = model.encode(skill_text).tolist()

    job_db.update_user_skill_profile(
        user_id=user.id,
        skill_profile_embedding=embedding,
        metadata={"skills": user.skills}
    )
```

### Real-time Updates

Use Kafka to stream updates to vector database:

```python
from kafka import KafkaConsumer

consumer = KafkaConsumer('user_competencies_updated')

for message in consumer:
    user_id = message.value['user_id']
    # Regenerate embedding
    embedding = generate_user_embedding(user_id)
    # Update vector DB
    user_db.update_user_profile(user_id, embedding, metadata)
```

## Support

- **Pinecone Documentation:** https://docs.pinecone.io/
- **Sentence Transformers:** https://www.sbert.net/
- **NOOR Platform Team:** [support contact]

---

**Indexes:** ✅ 5 configured
**Security:** ✅ L1 encryption, no raw biometrics
**Performance:** ✅ < 50ms query latency
**Scalability:** ✅ Millions of vectors per index
**Cost:** ~$840/month (production with HA)
