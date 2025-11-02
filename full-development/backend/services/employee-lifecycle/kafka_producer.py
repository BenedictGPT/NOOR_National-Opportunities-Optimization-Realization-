# Kafka Producer Module
# NOOR Platform v7.1 - Employee Lifecycle Service

from confluent_kafka import Producer
from confluent_kafka.serialization import SerializationContext, MessageField
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroSerializer
import json
import logging
from typing import Dict, Any
from datetime import datetime
import uuid

from config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)

# =============================================================================
# KAFKA PRODUCER CONFIGURATION
# =============================================================================

class KafkaEventProducer:
    """Kafka event producer for publishing domain events"""

    def __init__(self):
        self.producer_config = {
            'bootstrap.servers': settings.KAFKA_BOOTSTRAP_SERVERS,
            'compression.type': settings.KAFKA_PRODUCER_COMPRESSION,
            'linger.ms': 10,  # Batch messages for up to 10ms
            'batch.size': 32768,  # 32KB batch size
            'acks': 'all',  # Wait for all replicas
            'retries': 3,
            'max.in.flight.requests.per.connection': 5,
            'enable.idempotence': True,  # Exactly-once semantics
        }

        self.producer = Producer(self.producer_config)
        self.schema_registry_client = SchemaRegistryClient({
            'url': settings.KAFKA_SCHEMA_REGISTRY_URL
        })

        logger.info("Kafka producer initialized")

    def delivery_report(self, err, msg):
        """Callback for message delivery reports"""
        if err is not None:
            logger.error(f'Message delivery failed: {err}')
        else:
            logger.debug(f'Message delivered to {msg.topic()} [{msg.partition()}]')

    async def publish_event(
        self,
        topic: str,
        event_data: Dict[str, Any],
        key: str = None,
        headers: Dict[str, str] = None
    ):
        """
        Publish event to Kafka topic

        Args:
            topic: Kafka topic name
            event_data: Event payload (will be serialized to JSON)
            key: Message key for partitioning (default: random UUID)
            headers: Additional message headers
        """
        try:
            # Generate event ID if not present
            if 'event_id' not in event_data:
                event_data['event_id'] = str(uuid.uuid4())

            # Add timestamp if not present
            if 'timestamp' not in event_data:
                event_data['timestamp'] = int(datetime.utcnow().timestamp() * 1000)

            # Add metadata if not present
            if 'metadata' not in event_data:
                event_data['metadata'] = {
                    'source_service': settings.SERVICE_NAME,
                    'correlation_id': None
                }

            # Serialize to JSON
            value = json.dumps(event_data).encode('utf-8')

            # Use event_id as key if not provided
            if key is None:
                key = event_data.get('event_id', str(uuid.uuid4()))

            # Convert headers to list of tuples
            kafka_headers = []
            if headers:
                kafka_headers = [(k, v.encode('utf-8')) for k, v in headers.items()]

            # Publish to Kafka
            self.producer.produce(
                topic=topic,
                key=key.encode('utf-8'),
                value=value,
                headers=kafka_headers,
                callback=self.delivery_report
            )

            # Trigger message delivery
            self.producer.poll(0)

            logger.info(f"Published event to {topic}: {event_data.get('event_type', 'UNKNOWN')}")

        except Exception as e:
            logger.error(f"Failed to publish event to {topic}: {e}")
            raise

    def flush(self, timeout: float = 10.0):
        """Flush pending messages"""
        remaining = self.producer.flush(timeout)
        if remaining > 0:
            logger.warning(f"{remaining} messages were not delivered")

    def close(self):
        """Close producer connection"""
        self.flush()
        logger.info("Kafka producer closed")


# =============================================================================
# DOMAIN EVENT PUBLISHERS
# =============================================================================

class EmploymentEventPublisher:
    """Publisher for employment-related events"""

    def __init__(self, producer: KafkaEventProducer):
        self.producer = producer

    async def publish_employee_hired(
        self,
        employee_id: str,
        user_id: str,
        company_id: str,
        role_id: str,
        start_date: str,
        employment_type: str
    ):
        """Publish employee hired event"""
        event_data = {
            'event_type': 'HIRED',
            'employee_id': employee_id,
            'user_id': user_id,
            'company_id': company_id,
            'role_id': role_id,
            'start_date': start_date,
            'employment_type': employment_type
        }

        await self.producer.publish_event(
            topic='noor.users.employment.hired',
            event_data=event_data,
            key=employee_id
        )

    async def publish_employee_terminated(
        self,
        employee_id: str,
        user_id: str,
        company_id: str,
        termination_date: str,
        reason: str
    ):
        """Publish employee termination event"""
        event_data = {
            'event_type': 'TERMINATED',
            'employee_id': employee_id,
            'user_id': user_id,
            'company_id': company_id,
            'termination_date': termination_date,
            'reason': reason
        }

        await self.producer.publish_event(
            topic='noor.users.employment.terminated',
            event_data=event_data,
            key=employee_id
        )

    async def publish_role_change(
        self,
        employee_id: str,
        user_id: str,
        previous_role_id: str,
        new_role_id: str,
        effective_date: str,
        change_type: str  # PROMOTION, LATERAL, DEMOTION
    ):
        """Publish role change event"""
        event_data = {
            'event_type': 'ROLE_CHANGED',
            'employee_id': employee_id,
            'user_id': user_id,
            'previous_role_id': previous_role_id,
            'new_role_id': new_role_id,
            'effective_date': effective_date,
            'change_type': change_type
        }

        await self.producer.publish_event(
            topic='noor.users.role.changed',
            event_data=event_data,
            key=employee_id
        )


class OnboardingEventPublisher:
    """Publisher for onboarding-related events"""

    def __init__(self, producer: KafkaEventProducer):
        self.producer = producer

    async def publish_onboarding_started(
        self,
        employee_id: str,
        checklist_id: str,
        expected_completion_date: str
    ):
        """Publish onboarding started event"""
        event_data = {
            'event_type': 'STARTED',
            'employee_id': employee_id,
            'checklist_id': checklist_id,
            'expected_completion_date': expected_completion_date
        }

        await self.producer.publish_event(
            topic='noor.onboarding.started',
            event_data=event_data,
            key=employee_id
        )

    async def publish_onboarding_completed(
        self,
        employee_id: str,
        checklist_id: str,
        completion_date: str,
        duration_days: int
    ):
        """Publish onboarding completed event"""
        event_data = {
            'event_type': 'COMPLETED',
            'employee_id': employee_id,
            'checklist_id': checklist_id,
            'completion_date': completion_date,
            'duration_days': duration_days
        }

        await self.producer.publish_event(
            topic='noor.onboarding.completed',
            event_data=event_data,
            key=employee_id
        )


class PerformanceEventPublisher:
    """Publisher for performance review events"""

    def __init__(self, producer: KafkaEventProducer):
        self.producer = producer

    async def publish_review_created(
        self,
        review_id: str,
        employee_id: str,
        reviewer_id: str,
        overall_rating: str,
        review_period_start: str,
        review_period_end: str
    ):
        """Publish performance review created event"""
        event_data = {
            'event_type': 'CREATED',
            'review_id': review_id,
            'employee_id': employee_id,
            'reviewer_id': reviewer_id,
            'overall_rating': overall_rating,
            'review_period_start': review_period_start,
            'review_period_end': review_period_end
        }

        await self.producer.publish_event(
            topic='noor.performance.review.created',
            event_data=event_data,
            key=employee_id
        )

    async def publish_review_acknowledged(
        self,
        review_id: str,
        employee_id: str,
        acknowledged_at: str
    ):
        """Publish review acknowledgment event"""
        event_data = {
            'event_type': 'ACKNOWLEDGED',
            'review_id': review_id,
            'employee_id': employee_id,
            'acknowledged_at': acknowledged_at
        }

        await self.producer.publish_event(
            topic='noor.performance.review.acknowledged',
            event_data=event_data,
            key=employee_id
        )


# =============================================================================
# GLOBAL PRODUCER INSTANCE
# =============================================================================

_kafka_producer: KafkaEventProducer = None


def get_kafka_producer() -> KafkaEventProducer:
    """Get global Kafka producer instance"""
    global _kafka_producer
    if _kafka_producer is None:
        _kafka_producer = KafkaEventProducer()
    return _kafka_producer


def close_kafka_producer():
    """Close global Kafka producer"""
    global _kafka_producer
    if _kafka_producer:
        _kafka_producer.close()
        _kafka_producer = None
