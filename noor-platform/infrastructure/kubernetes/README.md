# NOOR Platform - Kubernetes Configuration

Production-ready Kubernetes manifests for deploying the NOOR Platform with 3-tier node pool architecture and network isolation.

## Architecture

### Node Pools

**1. General-Purpose Pool**
- Services: Employee Lifecycle, Learning & Assessment, Emiratization Compliance
- Components: Kafka, Redis, Frontend
- Node Count: 5-20 (autoscaling)
- Resources: Standard compute instances

**2. GPU-Enabled Inference Pool**
- Services: Radiant AI, Mentor Matching, Predictive Analytics, Scholar AI
- Components: Vector Database
- Node Count: 3-10 (autoscaling)
- Resources: GPU instances (NVIDIA T4 or better)

**3. High-Sensitivity Pool**
- Services: Payroll & Pensions, Health Certification, Biometric Identity
- Components: Security Agent, Federal Intelligence (dormant)
- Node Count: 3-8 (autoscaling)
- Resources: Isolated compute instances with enhanced security

### Network Isolation

```
┌─────────────────────┐
│  General Purpose    │
│  ✓ → GPU Pool       │
│  ✓ → Databases      │
│  ✓ → Internet       │
│  ✗ → High-Sens      │
└─────────────────────┘

┌─────────────────────┐
│  GPU Inference      │
│  ✓ → General Pool   │
│  ✓ → Databases      │
│  ✓ → AI APIs        │
│  ✗ → High-Sens      │
└─────────────────────┘

┌─────────────────────┐
│  High-Sensitivity   │
│  ✓ → PostgreSQL     │
│  ✓ → Vector DB      │
│  ✓ → External APIs  │
│  ✗ → General Pool   │
│  ✗ → GPU Pool       │
└─────────────────────┘
```

## Quick Start

### Prerequisites

- Kubernetes cluster (1.25+)
- kubectl configured
- Helm 3.x
- cert-manager (for TLS certificates)
- NVIDIA GPU Operator (for GPU pool)

### Installation

1. **Create namespaces:**
```bash
kubectl apply -f base/namespace.yaml
```

2. **Create secrets:**
```bash
# Copy and edit the secrets file
cp base/secrets.yaml.example base/secrets.yaml
# Edit base/secrets.yaml with actual base64-encoded values
kubectl apply -f base/secrets.yaml
```

3. **Apply ConfigMap:**
```bash
kubectl apply -f base/configmap.yaml
```

4. **Apply Network Policies:**
```bash
kubectl apply -f network-policies/
```

5. **Deploy Services:**
```bash
# General purpose services
kubectl apply -f base/backend-deployment.yaml

# GPU pool services
kubectl apply -f base/gpu-pool-deployments.yaml

# High-sensitivity services
kubectl apply -f base/high-sensitivity-deployments.yaml
```

6. **Configure Ingress:**
```bash
kubectl apply -f base/ingress.yaml
```

## Deployment Verification

### Check Pod Status

```bash
# All pods
kubectl get pods -n noor-platform

# High-sensitivity pods
kubectl get pods -n noor-high-sensitivity

# Pods by pool
kubectl get pods -n noor-platform -l pool=general-purpose
kubectl get pods -n noor-platform -l pool=gpu-inference
kubectl get pods -n noor-high-sensitivity -l pool=high-sensitivity
```

### Check Network Policies

```bash
# List network policies
kubectl get networkpolicies -A

# Describe a specific policy
kubectl describe networkpolicy general-pool-policy -n noor-platform
```

### Check Services

```bash
# All services
kubectl get svc -n noor-platform

# Check ingress
kubectl get ingress -n noor-platform
```

### Check HPA (Horizontal Pod Autoscaler)

```bash
kubectl get hpa -n noor-platform
```

## Monitoring

### View Logs

```bash
# Specific pod
kubectl logs -f <pod-name> -n noor-platform

# All pods of a service
kubectl logs -f -l app=employee-lifecycle -n noor-platform

# Previous crashed pod
kubectl logs --previous <pod-name> -n noor-platform
```

### Port Forwarding (for testing)

```bash
# Forward employee lifecycle service
kubectl port-forward svc/employee-lifecycle-service 8001:8001 -n noor-platform

# Forward biometric service
kubectl port-forward svc/biometric-identity-service 8006:8006 -n noor-high-sensitivity

# Forward Radiant AI
kubectl port-forward svc/radiant-ai-service 8101:8101 -n noor-platform
```

### Execute Commands in Pods

```bash
# Get shell access
kubectl exec -it <pod-name> -n noor-platform -- /bin/bash

# Run a command
kubectl exec <pod-name> -n noor-platform -- env
```

## Scaling

### Manual Scaling

```bash
# Scale deployment
kubectl scale deployment employee-lifecycle-service --replicas=5 -n noor-platform

# Scale high-sensitivity service
kubectl scale deployment biometric-identity-service --replicas=4 -n noor-high-sensitivity
```

### Auto-scaling (HPA)

HPA is configured for all services with:
- Min replicas: 3
- Max replicas: 10
- CPU target: 70%
- Memory target: 80%

## Security

### Network Policies

Network policies enforce strict isolation:
- General pool CANNOT access High-Sensitivity pool
- GPU pool CANNOT access High-Sensitivity pool
- High-Sensitivity pool has minimal egress (databases + external APIs only)

### Pod Security

All high-sensitivity pods run with:
- Non-root user (UID 1000)
- Read-only root filesystem
- No privilege escalation
- All capabilities dropped
- Pod anti-affinity (spread across nodes)

### Secrets Management

Secrets are stored in Kubernetes Secrets and injected as environment variables.

For production, consider using:
- HashiCorp Vault
- AWS Secrets Manager
- Azure Key Vault
- Google Secret Manager

## Troubleshooting

### Pods not starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n noor-platform

# Check pod logs
kubectl logs <pod-name> -n noor-platform

# Check resource availability
kubectl top nodes
kubectl top pods -n noor-platform
```

### Network connectivity issues

```bash
# Test DNS resolution
kubectl run -it --rm debug --image=busybox --restart=Never -- nslookup employee-lifecycle-service.noor-platform.svc.cluster.local

# Test network connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -- wget -O- http://employee-lifecycle-service.noor-platform.svc.cluster.local:8001/health

# Check network policies
kubectl describe networkpolicy -n noor-platform
```

### Service not accessible

```bash
# Check service endpoints
kubectl get endpoints -n noor-platform

# Check ingress
kubectl describe ingress noor-ingress -n noor-platform

# Check ingress controller logs
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

## Backup & Disaster Recovery

### Database Backups

Databases are deployed separately (StatefulSets with persistent volumes).

```bash
# Backup PostgreSQL
kubectl exec postgres-0 -n noor-platform -- pg_dump -U noor_user noor_db > backup.sql

# Backup MongoDB
kubectl exec mongodb-0 -n noor-platform -- mongodump --archive > backup.archive

# Backup Neo4j
kubectl exec neo4j-0 -n noor-platform -- neo4j-admin backup --backup-dir=/backups
```

### Cluster Backup

Use Velero for cluster-level backups:

```bash
# Install Velero
velero install --provider aws --bucket noor-backups --secret-file ./credentials

# Backup specific namespace
velero backup create noor-platform-backup --include-namespaces noor-platform

# Restore from backup
velero restore create --from-backup noor-platform-backup
```

## Updates & Rollouts

### Rolling Updates

```bash
# Update image
kubectl set image deployment/employee-lifecycle-service employee-lifecycle=noor-backend:v2 -n noor-platform

# Check rollout status
kubectl rollout status deployment/employee-lifecycle-service -n noor-platform

# Rollback if needed
kubectl rollout undo deployment/employee-lifecycle-service -n noor-platform
```

### Blue-Green Deployment

For zero-downtime updates, use blue-green deployments with separate services and switch traffic via Ingress.

## Cost Optimization

- Use HPA to scale down during low traffic
- Use cluster autoscaler to reduce node count during off-peak
- Use spot instances for non-critical workloads
- Monitor resource usage with Prometheus/Grafana

## Production Checklist

- [ ] All secrets properly configured (not using example values)
- [ ] TLS certificates configured
- [ ] Network policies tested and verified
- [ ] Resource limits configured for all pods
- [ ] HPA configured and tested
- [ ] Monitoring and alerting set up
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan tested
- [ ] Security audit completed
- [ ] Load testing completed
- [ ] Documentation updated

## Support

For issues, contact the NOOR Platform team or check the main repository documentation.
