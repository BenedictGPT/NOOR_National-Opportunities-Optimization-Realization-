"""Seed data script for NOOR Platform development and testing."""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from datetime import date, datetime, timedelta
import uuid
from sqlalchemy.orm import Session

from app.db.postgres import SessionLocal, engine, Base
from app.db.models.user import User
from app.db.models.skills import Skill, UserSkill
from app.db.models.work_experience import WorkExperience
from app.db.models.education import Education
from app.db.models.certifications import Certification
from app.db.models.institutions import Institution
from app.db.models.applications import Application


def create_skills(db: Session):
    """Create sample skills."""
    skills_data = [
        {"name": "Python", "category": "technical"},
        {"name": "JavaScript", "category": "technical"},
        {"name": "React", "category": "technical"},
        {"name": "Node.js", "category": "technical"},
        {"name": "SQL", "category": "technical"},
        {"name": "Project Management", "category": "management"},
        {"name": "Leadership", "category": "soft_skills"},
        {"name": "Communication", "category": "soft_skills"},
        {"name": "Arabic", "category": "language"},
        {"name": "English", "category": "language"},
    ]
    
    skills = []
    for skill_data in skills_data:
        skill = Skill(
            id=uuid.uuid4(),
            name=skill_data["name"],
            category=skill_data["category"],
            created_at=datetime.utcnow()
        )
        db.add(skill)
        skills.append(skill)
    
    db.commit()
    print(f"✅ Created {len(skills)} skills")
    return skills


def create_users(db: Session):
    """Create sample users."""
    users_data = [
        {"email": "ahmed.ali@example.ae", "full_name": "Ahmed Ali", "phone": "+971501234567"},
        {"email": "fatima.hassan@example.ae", "full_name": "Fatima Hassan", "phone": "+971502345678"},
        {"email": "mohammed.khalid@example.ae", "full_name": "Mohammed Khalid", "phone": "+971503456789"},
    ]
    
    users = []
    for user_data in users_data:
        user = User(
            id=uuid.uuid4(),
            email=user_data["email"],
            password_hash="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS5MRby3S",  # "password123"
            full_name=user_data["full_name"],
            phone=user_data["phone"],
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(user)
        users.append(user)
    
    db.commit()
    print(f"✅ Created {len(users)} users")
    return users


def create_user_skills(db: Session, users, skills):
    """Create user-skill associations."""
    user_skills = []
    proficiency_levels = ["beginner", "intermediate", "advanced", "expert"]
    
    for user in users[:2]:  # First 2 users
        for skill in skills[:5]:  # First 5 skills
            user_skill = UserSkill(
                id=uuid.uuid4(),
                user_id=user.id,
                skill_id=skill.id,
                proficiency_level=proficiency_levels[len(user_skills) % 4],
                years_of_experience=float((len(user_skills) % 5) + 1),
                is_verified=len(user_skills) % 2 == 0,
                created_at=datetime.utcnow()
            )
            db.add(user_skill)
            user_skills.append(user_skill)
    
    db.commit()
    print(f"✅ Created {len(user_skills)} user-skill associations")
    return user_skills


def create_work_experience(db: Session, users):
    """Create work experience records."""
    experiences = []
    companies = ["Emirates Digital Solutions", "Dubai Tech Hub", "Abu Dhabi Innovation Center"]
    titles = ["Software Engineer", "Senior Developer", "Tech Lead"]
    
    for i, user in enumerate(users):
        experience = WorkExperience(
            id=uuid.uuid4(),
            user_id=user.id,
            company_name=companies[i % len(companies)],
            job_title=titles[i % len(titles)],
            employment_type="full_time",
            industry="technology",
            start_date=date.today() - timedelta(days=365 * 3),
            end_date=None if i == 0 else date.today() - timedelta(days=30),
            is_current=i == 0,
            description="Developed and maintained enterprise applications",
            created_at=datetime.utcnow()
        )
        db.add(experience)
        experiences.append(experience)
    
    db.commit()
    print(f"✅ Created {len(experiences)} work experience records")
    return experiences


def create_education(db: Session, users):
    """Create education records."""
    educations = []
    institutions = ["UAE University", "American University of Dubai", "Khalifa University"]
    fields = ["Computer Science", "Software Engineering", "Information Technology"]
    
    for i, user in enumerate(users):
        education = Education(
            id=uuid.uuid4(),
            user_id=user.id,
            institution_name=institutions[i % len(institutions)],
            degree_level="bachelors",
            field_of_study=fields[i % len(fields)],
            start_date=date(2015, 9, 1),
            end_date=date(2019, 6, 30),
            is_current=False,
            gpa=3.5 + (i * 0.2),
            is_verified=True,
            created_at=datetime.utcnow()
        )
        db.add(education)
        educations.append(education)
    
    db.commit()
    print(f"✅ Created {len(educations)} education records")
    return educations


def create_certifications(db: Session, users):
    """Create certification records."""
    certifications = []
    certs = [
        {"name": "AWS Certified Solutions Architect", "org": "Amazon Web Services"},
        {"name": "Google Cloud Professional", "org": "Google"},
        {"name": "Microsoft Azure Administrator", "org": "Microsoft"},
    ]
    
    for i, user in enumerate(users):
        cert_data = certs[i % len(certs)]
        certification = Certification(
            id=uuid.uuid4(),
            user_id=user.id,
            name=cert_data["name"],
            issuing_organization=cert_data["org"],
            certification_type="technical",
            issue_date=date.today() - timedelta(days=365),
            expiry_date=date.today() + timedelta(days=730),
            credential_id=f"CERT-{i+1:04d}",
            status="active",
            is_verified=True,
            created_at=datetime.utcnow()
        )
        db.add(certification)
        certifications.append(certification)
    
    db.commit()
    print(f"✅ Created {len(certifications)} certifications")
    return certifications


def create_institutions(db: Session):
    """Create institution records."""
    institutions_data = [
        {
            "name": "Emirates Digital Solutions LLC",
            "type": "private",
            "industry": "technology",
            "size": "medium",
            "email": "hr@emiratesdigital.ae",
            "phone": "+971-4-123-4567",
            "city": "Dubai",
            "emirate": "Dubai",
            "license": "CN-1234567",
            "employees": 150
        },
        {
            "name": "Abu Dhabi Innovation Hub",
            "type": "government",
            "industry": "technology",
            "size": "large",
            "email": "careers@adih.ae",
            "phone": "+971-2-234-5678",
            "city": "Abu Dhabi",
            "emirate": "Abu Dhabi",
            "license": "CN-2345678",
            "employees": 500
        },
    ]
    
    institutions = []
    for inst_data in institutions_data:
        institution = Institution(
            id=uuid.uuid4(),
            name=inst_data["name"],
            institution_type=inst_data["type"],
            industry=inst_data["industry"],
            size=inst_data["size"],
            email=inst_data["email"],
            phone=inst_data["phone"],
            address_line1="Main Street",
            city=inst_data["city"],
            emirate=inst_data["emirate"],
            trade_license_number=inst_data["license"],
            established_date=date(2015, 1, 1),
            employee_count=inst_data["employees"],
            is_verified=True,
            verification_status="verified",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(institution)
        institutions.append(institution)
    
    db.commit()
    print(f"✅ Created {len(institutions)} institutions")
    return institutions


def seed_database():
    """Main function to seed the database."""
    print("🌱 Starting database seeding...")
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    # Create session
    db = SessionLocal()
    
    try:
        # Seed data
        skills = create_skills(db)
        users = create_users(db)
        user_skills = create_user_skills(db, users, skills)
        experiences = create_work_experience(db, users)
        educations = create_education(db, users)
        certifications = create_certifications(db, users)
        institutions = create_institutions(db)
        
        print("\n🎉 Database seeding completed successfully!")
        print(f"\nSummary:")
        print(f"  - Users: {len(users)}")
        print(f"  - Skills: {len(skills)}")
        print(f"  - User Skills: {len(user_skills)}")
        print(f"  - Work Experience: {len(experiences)}")
        print(f"  - Education: {len(educations)}")
        print(f"  - Certifications: {len(certifications)}")
        print(f"  - Institutions: {len(institutions)}")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

