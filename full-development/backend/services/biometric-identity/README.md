# Biometric Identity Service

**NOOR Platform v7.1** - SECURITY CRITICAL: Biometric enrollment and verification

## ⚠️ Security Classification

- **Security Level**: CRITICAL
- **Data Zone**: L1 Personal (GDPR/HIPAA sensitive)
- **Node Pool**: GPU-Inference with high-sensitivity isolation
- **Encryption**: User-scoped AES-256 for all biometric embeddings
- **Compliance**: GDPR, UAE Data Protection Law, ISO 27001

## Overview

The Biometric Identity Service provides multi-factor biometric authentication using:

- **Facial Recognition**: FaceNet (512-dim embeddings)
- **Voice Recognition**: SpeechBrain (256-dim embeddings)
- **Multimodal**: Combined facial + voice (768-dim)

### Key Features

✅ **False Acceptance Rate (FAR) < 0.1%** - Industry-leading accuracy
✅ **Liveness Detection** - Anti-spoofing for photos, videos, recordings
✅ **User-Scoped Encryption** - All embeddings encrypted with user-specific keys
✅ **Fraud Detection** - Real-time anomaly detection and risk scoring
✅ **Quality Assessment** - Automatic sample quality checking
✅ **Device Fingerprinting** - Track and validate trusted devices
✅ **Audit Logging** - Complete audit trail for compliance
✅ **GDPR Compliance** - User data deletion on request

## Architecture

### Technology Stack

- **Framework**: FastAPI 0.104 (Python 3.11)
- **ML Models**:
  - FaceNet (facenet-pytorch) - Facial embeddings
  - SpeechBrain - Voice embeddings
  - MediaPipe - Liveness detection
- **Vector DB**: Pinecone (768-dim, Euclidean distance)
- **Databases**: PostgreSQL, MongoDB, Redis
- **Messaging**: Kafka
- **Encryption**: Fernet (symmetric), user-scoped keys
- **Deployment**: Kubernetes with GPU nodes (NVIDIA)

### System Flow

```
1. Enrollment:
   User → Capture biometric → Quality check → Liveness detection →
   Extract embedding → Encrypt → Store in Pinecone → Audit log

2. Verification:
   User → Capture biometric → Quality check → Liveness detection →
   Extract embedding → Query Pinecone → Compare similarity →
   Fraud detection → Return result → Audit log
```

## API Endpoints

### Enrollment

```
POST   /api/v1/enroll/initiate        Initiate enrollment (get session token)
POST   /api/v1/enroll/submit           Submit biometric sample
DELETE /api/v1/enroll/{user_id}/{modality}  Delete biometric data (GDPR)
```

### Verification

```
POST   /api/v1/verify                  Verify biometric (main auth endpoint)
GET    /api/v1/verify/history/{user_id}  Get verification history
```

### Statistics & Monitoring

```
GET    /api/v1/stats/{user_id}         Get user biometric statistics
GET    /api/v1/admin/security-alerts   Get security alerts (admin only)
```

## Data Models

### Biometric Enrollment

```python
{
  "enrollment_id": "uuid",
  "user_id": "uuid",
  "modality": "facial|voice|multimodal",
  "status": "pending|in_progress|completed|failed",
  "session_token": "secure_token",
  "expires_at": "2024-02-01T10:30:00Z",
  "instructions": "Complete enrollment within 30 minutes..."
}
```

### Biometric Embedding (Encrypted)

```python
{
  "id": "uuid",
  "user_id": "uuid",
  "modality": "facial",
  "embedding": [0.123, -0.456, ...],  # 512 or 256 dimensions
  "embedding_version": "v1.0",
  "quality_score": 0.85,
  "liveness_result": "live",
  "liveness_confidence": 0.95,
  "encrypted": true,
  "enrollment_date": "2024-01-15T10:00:00Z"
}
```

### Verification Response

```python
{
  "verification_id": "uuid",
  "user_id": "uuid",
  "result": "verified|rejected|suspicious|error",
  "confidence_score": 0.96,
  "modality": "facial",
  "timestamp": "2024-01-15T10:00:00Z",
  "liveness_passed": true,
  "quality_passed": true,
  "security_flags": {
    "fraud_score": 0.1,
    "anomalies": []
  },
  "action_taken": "logged|alert_sent|account_locked"
}
```

## Machine Learning Models

### FaceNet (Facial Recognition)

- **Architecture**: InceptionResnetV1
- **Pre-trained on**: VGGFace2
- **Embedding size**: 512 dimensions
- **Accuracy**: 99.6% on LFW dataset
- **Processing time**: ~100ms per image

**Pipeline**:
1. MTCNN face detection
2. Face alignment and cropping
3. InceptionResnetV1 embedding extraction
4. L2 normalization

### SpeechBrain (Voice Recognition)

- **Architecture**: ECAPA-TDNN
- **Pre-trained on**: VoxCeleb
- **Embedding size**: 256 dimensions
- **Accuracy**: 98.5% EER on VoxCeleb1
- **Processing time**: ~150ms per audio sample

**Pipeline**:
1. Audio preprocessing (resampling, normalization)
2. ECAPA-TDNN embedding extraction
3. L2 normalization

### Liveness Detection

- **Facial**: Texture analysis, 3D depth, blink detection
- **Voice**: Voice activity detection, anti-replay
- **Confidence threshold**: 90%

## Security

### Encryption

All biometric embeddings are encrypted using user-specific keys:

```python
# User key derivation
user_key = HMAC-SHA256(master_key, user_id)

# Embedding encryption
encrypted_embedding = Fernet(user_key).encrypt(embedding_bytes)
```

- **Master Key**: Stored in Kubernetes secrets
- **User Keys**: Derived on-the-fly (not stored)
- **Algorithm**: Fernet (AES-128-CBC + HMAC-SHA256)

### Fraud Detection

Real-time fraud detection based on:
- Impossible travel (geolocation jumping)
- Device fingerprint mismatches
- Unusual verification patterns
- Multiple failed attempts
- Timing anomalies

**Risk Scoring**:
- Low risk (0.0-0.3): Normal operation
- Medium risk (0.3-0.7): Increased monitoring
- High risk (0.7-1.0): Alert security team

### Audit Logging

All operations are logged:
- Enrollment attempts
- Verification attempts
- Data deletions (GDPR)
- Security events
- Configuration changes

**Retention**: 7 years (compliance requirement)

## Configuration

### Environment Variables

```bash
# Service
SERVICE_NAME=biometric-identity
SECURITY_LEVEL=CRITICAL

# Databases
POSTGRES_PASSWORD=your_secure_password
MONGODB_PASSWORD=your_secure_password

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-west1-gcp

# Encryption
BIOMETRIC_MASTER_KEY=your_32_byte_master_key

# Thresholds
FACIAL_VERIFICATION_THRESHOLD=0.95  # 95% similarity required
VOICE_VERIFICATION_THRESHOLD=0.92   # 92% similarity required
LIVENESS_CONFIDENCE_THRESHOLD=0.90  # 90% liveness confidence
MAX_FAILED_ATTEMPTS=3
LOCKOUT_DURATION_MINUTES=30
```

## Events Published

### Enrollment Events

**Topic**: `noor.biometric.enrollment.requested`
**Topic**: `noor.biometric.enrollment.completed`

### Verification Events

**Topic**: `noor.biometric.verification.attempted`
```json
{
  "event_type": "VERIFICATION_ATTEMPTED",
  "user_id": "uuid",
  "modality": "facial",
  "timestamp": 1704447600000,
  "device_id": "device_uuid",
  "ip_address": "10.0.1.5",
  "geolocation": {"lat": 25.276, "lng": 55.296}
}
```

**Topic**: `noor.biometric.verification.succeeded`
**Topic**: `noor.biometric.verification.failed`

### Security Events

**Topic**: `noor.biometric.security.suspicious_activity`
```json
{
  "event_type": "SUSPICIOUS_ACTIVITY",
  "user_id": "uuid",
  "risk_score": 0.85,
  "anomalies": ["impossible_travel", "device_mismatch"],
  "action_taken": "account_locked"
}
```

## Development

### Local Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Download ML models
python -c "from facenet_pytorch import MTCNN, InceptionResnetV1; MTCNN(); InceptionResnetV1(pretrained='vggface2').eval()"

# Run service
uvicorn main:app --reload --port 8003
```

### Testing

```bash
# Unit tests
pytest tests/

# Integration tests
pytest tests/integration/

# Performance tests
locust -f tests/load/locustfile.py
```

### Docker Build

```bash
# Build image (includes ML models)
docker build -t biometric-identity:7.1.0 .

# Run container
docker run --gpus all -p 8003:8003 \
  -e PINECONE_API_KEY=your_key \
  -e BIOMETRIC_MASTER_KEY=your_master_key \
  biometric-identity:7.1.0
```

## Deployment

### Kubernetes

```bash
# Create secrets
kubectl create secret generic biometric-identity-secrets \
  --from-literal=PINECONE_API_KEY=your_key \
  --from-literal=BIOMETRIC_MASTER_KEY=your_master_key \
  -n noor-services

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check GPU allocation
kubectl get pods -n noor-services -o json | jq '.items[].spec.containers[].resources'
```

### GPU Requirements

- **Node Pool**: gpu-inference (NVIDIA T4 or better)
- **GPU per Pod**: 1
- **Min Replicas**: 3
- **Max Replicas**: 6 (limited by GPU availability)

## API Usage Examples

### Enroll Facial Biometric

```bash
# Step 1: Initiate enrollment
curl -X POST "http://localhost:8003/api/v1/enroll/initiate" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "modality": "facial",
    "consent_given": true,
    "device_info": {"type": "mobile", "os": "iOS"}
  }'

# Response:
# {
#   "enrollment_id": "uuid",
#   "session_token": "secure_token",
#   "expires_at": "2024-01-15T11:00:00Z",
#   "instructions": "Complete enrollment within 30 minutes..."
# }

# Step 2: Submit biometric sample
curl -X POST "http://localhost:8003/api/v1/enroll/submit?enrollment_id=uuid&session_token=secure_token" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -F "biometric_file=@face_image.jpg"
```

### Verify Identity

```bash
curl -X POST "http://localhost:8003/api/v1/verify" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "modality": "facial",
    "biometric_data": "base64_encoded_image_data",
    "device_info": {"type": "mobile", "device_id": "device_uuid"},
    "geolocation": {"lat": 25.276, "lng": 55.296},
    "ip_address": "10.0.1.5"
  }'

# Response:
# {
#   "verification_id": "uuid",
#   "result": "verified",
#   "confidence_score": 0.96,
#   "liveness_passed": true,
#   "quality_passed": true,
#   "security_flags": {"fraud_score": 0.1}
# }
```

### Delete Biometric Data (GDPR)

```bash
curl -X DELETE "http://localhost:8003/api/v1/enroll/550e8400-e29b-41d4-a716-446655440000/facial" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

## Performance

### Latency Targets

- **Enrollment**: < 500ms (including ML inference)
- **Verification**: < 300ms (including ML inference, liveness, fraud detection)
- **Quality assessment**: < 100ms
- **Liveness detection**: < 150ms

### Throughput

- **Enrollments**: 20 req/sec per pod
- **Verifications**: 50 req/sec per pod
- **GPU utilization**: 70-80% average

### Resource Usage

- **CPU**: 1-2 cores per pod
- **Memory**: 4-8 GB per pod
- **GPU**: 1 NVIDIA T4 per pod
- **Storage**: 2 GB (ML models cached)

## Monitoring

### Metrics

- Verification success/failure rate
- Average confidence scores
- Liveness detection pass rate
- Fraud detection alerts
- Model inference latency
- GPU utilization
- Failed attempt rate by user

### Alerts

- High failed verification rate (> 10%)
- Liveness detection failures spike
- Fraud score > 0.7
- GPU memory pressure
- Model inference latency > 500ms

## Troubleshooting

### Common Issues

**Low confidence scores**:
- Check image/audio quality
- Ensure proper lighting (facial)
- Reduce background noise (voice)
- Verify enrollment completed successfully

**Liveness detection failures**:
- Ensure user follows on-screen instructions
- Check for good lighting (no shadows)
- Verify camera quality
- Test anti-spoofing challenge

**GPU not available**:
```bash
# Check GPU allocation
kubectl describe pod -n noor-services <pod-name> | grep nvidia.com/gpu

# Verify GPU driver on node
kubectl exec -it <pod-name> -- nvidia-smi
```

## Security Considerations

### Threat Model

- **Spoofing**: Mitigated by liveness detection
- **Replay attacks**: Prevented by challenge-response
- **Data breach**: Encrypted embeddings, user-scoped keys
- **Man-in-the-middle**: TLS 1.3 required
- **Brute force**: Account lockout after 3 failures

### Compliance

- **GDPR**: User data deletion on request
- **UAE Data Protection Law**: L1 Personal Zone deployment
- **ISO 27001**: Audit logging, access controls
- **HIPAA**: Encrypted storage, access logs

## License

Proprietary - UAE Government - NOOR Platform

## Support

- **Email**: noor-security@mohre.gov.ae
- **Slack**: #noor-platform-security
- **Docs**: https://docs.noor.gov.ae/biometric-identity
- **Security Issues**: security@noor.gov.ae (PGP key available)
