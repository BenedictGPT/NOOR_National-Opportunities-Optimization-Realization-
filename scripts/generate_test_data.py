#!/usr/bin/env python3
"""
NOOR Platform - Test Data Generator
Generates realistic sample data for UAT testing
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict

# Eight Faculties Configuration
FACULTIES = [
    {"id": "physical", "name": "Physical", "color": "#CC0000"},
    {"id": "mental", "name": "Mental", "color": "#2E5984"},
    {"id": "emotional", "name": "Emotional", "color": "#FF6B35"},
    {"id": "spiritual", "name": "Spiritual", "color": "#FFD700"},
    {"id": "social", "name": "Social", "color": "#28A745"},
    {"id": "volitional", "name": "Volitional", "color": "#6F42C1"},
    {"id": "intellectual", "name": "Intellectual", "color": "#17A2B8"},
    {"id": "moral", "name": "Moral", "color": "#8AA0B0"}
]

# Sample UAE Names
FIRST_NAMES_MALE = ["Mohammed", "Ahmed", "Ali", "Omar", "Khalid", "Rashid", "Sultan", "Hamdan", "Saeed", "Abdullah"]
FIRST_NAMES_FEMALE = ["Fatima", "Aisha", "Maryam", "Noura", "Hessa", "Shamma", "Latifa", "Maitha", "Sara", "Amna"]
LAST_NAMES = ["Al Hashimi", "Al Maktoum", "Al Nahyan", "Al Qasimi", "Al Falasi", "Al Mazrouei", "Al Ketbi", "Al Mansoori", "Al Shamsi", "Al Zaabi"]

# UAE Ministries and Institutions
INSTITUTIONS = [
    "Ministry of Artificial Intelligence",
    "Ministry of Health and Prevention",
    "Ministry of Education",
    "Ministry of Interior",
    "Ministry of Community Development",
    "Ministry of Culture and Youth",
    "Ministry of Tolerance and Coexistence",
    "Etihad Credit Bureau",
    "Dubai Police",
    "Abu Dhabi Department of Education"
]

def generate_user(user_type: str, index: int) -> Dict:
    """Generate a test user"""
    is_male = random.choice([True, False])
    first_name = random.choice(FIRST_NAMES_MALE if is_male else FIRST_NAMES_FEMALE)
    last_name = random.choice(LAST_NAMES)
    
    user = {
        "id": f"{user_type}_{index}",
        "email": f"{first_name.lower()}.{last_name.lower().replace(' ', '')}@{'gov.ae' if user_type != 'individual' else 'gmail.com'}",
        "first_name": first_name,
        "last_name": last_name,
        "user_type": user_type,
        "created_at": (datetime.now() - timedelta(days=random.randint(30, 365))).isoformat()
    }
    
    if user_type == "individual":
        user["emirates_id"] = f"784-{random.randint(1980, 2005)}-{random.randint(1000000, 9999999)}-{random.randint(1, 9)}"
        user["date_of_birth"] = f"{random.randint(1980, 2005)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}"
        user["gender"] = "male" if is_male else "female"
        user["nationality"] = "UAE"
        user["token_balance"] = random.randint(50, 500)
        
    elif user_type == "institutional":
        user["institution"] = random.choice(INSTITUTIONS)
        user["role"] = "HR Manager"
        user["department"] = random.choice(["Human Resources", "Talent Acquisition", "Learning & Development"])
        
    elif user_type == "federal":
        user["ministry"] = random.choice(INSTITUTIONS)
        user["role"] = "Federal Administrator"
        user["clearance_level"] = "high"
    
    return user

def generate_eight_faculty_scores() -> Dict:
    """Generate realistic Eight-Faculty scores"""
    scores = {}
    overall_tendency = random.uniform(0.6, 0.95)  # Overall performance tendency
    
    for faculty in FACULTIES:
        # Add some variation around the overall tendency
        faculty_score = overall_tendency + random.uniform(-0.15, 0.15)
        faculty_score = max(0.4, min(1.0, faculty_score))  # Clamp between 40-100
        
        # Generate 12 competency scores for this faculty
        competencies = []
        for i in range(12):
            comp_score = faculty_score + random.uniform(-0.1, 0.1)
            comp_score = max(0.3, min(1.0, comp_score))
            competencies.append({
                "competency_id": f"{faculty['id']}_comp_{i+1}",
                "competency_name": f"{faculty['name']} Competency {i+1}",
                "score": round(comp_score * 100, 1),
                "last_assessed": (datetime.now() - timedelta(days=random.randint(1, 90))).isoformat()
            })
        
        scores[faculty['id']] = {
            "faculty_name": faculty['name'],
            "overall_score": round(faculty_score * 100, 1),
            "competencies": competencies,
            "assessments_completed": random.randint(1, 5),
            "last_updated": (datetime.now() - timedelta(days=random.randint(1, 90))).isoformat()
        }
    
    return scores

def generate_assessment_attempt(user_id: str, faculty_id: str) -> Dict:
    """Generate an assessment attempt record"""
    score = random.randint(60, 100)
    
    # Determine tokens earned based on score
    if score >= 90:
        tokens = 100
        performance = "Excellent"
    elif score >= 80:
        tokens = 75
        performance = "Good"
    elif score >= 70:
        tokens = 50
        performance = "Average"
    elif score >= 60:
        tokens = 25
        performance = "Fair"
    else:
        tokens = 10
        performance = "Needs Improvement"
    
    return {
        "id": f"assessment_{user_id}_{faculty_id}_{random.randint(1000, 9999)}",
        "user_id": user_id,
        "faculty_id": faculty_id,
        "score": score,
        "performance_band": performance,
        "tokens_earned": tokens,
        "questions_answered": 48,
        "correct_answers": int(48 * (score / 100)),
        "time_taken_minutes": random.randint(25, 45),
        "completed_at": (datetime.now() - timedelta(days=random.randint(1, 60))).isoformat()
    }

def generate_token_transaction(user_id: str, transaction_type: str, amount: int, source: str) -> Dict:
    """Generate a token transaction"""
    return {
        "id": f"txn_{user_id}_{random.randint(10000, 99999)}",
        "user_id": user_id,
        "type": transaction_type,  # "earned" or "spent"
        "amount": amount,
        "source": source,
        "timestamp": (datetime.now() - timedelta(days=random.randint(1, 30), hours=random.randint(0, 23))).isoformat(),
        "balance_after": random.randint(50, 500)  # Will be calculated properly in real system
    }

def generate_course() -> Dict:
    """Generate a course"""
    faculty = random.choice(FACULTIES)
    difficulty = random.choice(["Beginner", "Intermediate", "Advanced"])
    
    token_cost = {
        "Beginner": 50,
        "Intermediate": 100,
        "Advanced": 150
    }[difficulty]
    
    return {
        "id": f"course_{faculty['id']}_{random.randint(1000, 9999)}",
        "title": f"{faculty['name']} {difficulty} Course",
        "description": f"Comprehensive {difficulty.lower()} level course focusing on {faculty['name']} faculty development",
        "faculty_id": faculty['id'],
        "difficulty": difficulty,
        "token_cost": token_cost,
        "duration_hours": random.randint(10, 40),
        "modules": random.randint(5, 12),
        "instructor": f"Dr. {random.choice(FIRST_NAMES_MALE + FIRST_NAMES_FEMALE)} {random.choice(LAST_NAMES)}",
        "rating": round(random.uniform(4.0, 5.0), 1),
        "enrollments": random.randint(50, 500),
        "created_at": (datetime.now() - timedelta(days=random.randint(90, 365))).isoformat()
    }

def generate_job_posting(institution: str) -> Dict:
    """Generate a job posting"""
    titles = [
        "Senior AI Engineer",
        "Data Scientist",
        "Policy Analyst",
        "Healthcare Administrator",
        "Education Specialist",
        "Community Development Officer",
        "Cybersecurity Analyst",
        "Digital Transformation Manager"
    ]
    
    # Select required faculties (2-3 faculties)
    required_faculties = random.sample(FACULTIES, random.randint(2, 3))
    requirements = {}
    for faculty in required_faculties:
        requirements[faculty['id']] = {
            "faculty_name": faculty['name'],
            "minimum_score": random.randint(70, 90)
        }
    
    return {
        "id": f"job_{random.randint(10000, 99999)}",
        "title": random.choice(titles),
        "institution": institution,
        "department": random.choice(["Operations", "Strategy", "Technology", "Research"]),
        "description": "Detailed job description here...",
        "salary_min": random.randint(15000, 25000),
        "salary_max": random.randint(30000, 50000),
        "required_faculties": requirements,
        "application_deadline": (datetime.now() + timedelta(days=random.randint(30, 90))).isoformat(),
        "applications_count": random.randint(10, 100),
        "status": random.choice(["active", "active", "active", "closed"]),
        "posted_at": (datetime.now() - timedelta(days=random.randint(1, 60))).isoformat()
    }

def main():
    """Generate complete test dataset"""
    print("🚀 Generating NOOR Platform Test Data...")
    
    # Generate users
    print("\n📊 Generating users...")
    individuals = [generate_user("individual", i) for i in range(100)]
    institutionals = [generate_user("institutional", i) for i in range(20)]
    federals = [generate_user("federal", i) for i in range(5)]
    
    print(f"  ✅ {len(individuals)} individual users")
    print(f"  ✅ {len(institutionals)} institutional users")
    print(f"  ✅ {len(federals)} federal users")
    
    # Generate Eight-Faculty scores for individuals
    print("\n🎯 Generating Eight-Faculty scores...")
    skills_passports = {}
    for user in individuals:
        skills_passports[user['id']] = {
            "user_id": user['id'],
            "user_name": f"{user['first_name']} {user['last_name']}",
            "overall_score": round(random.uniform(70, 95), 1),
            "faculties": generate_eight_faculty_scores(),
            "last_updated": datetime.now().isoformat()
        }
    print(f"  ✅ {len(skills_passports)} Skills Passports generated")
    
    # Generate assessment attempts
    print("\n📝 Generating assessment attempts...")
    assessments = []
    for user in individuals[:50]:  # Half of users have completed assessments
        num_assessments = random.randint(1, 5)
        for _ in range(num_assessments):
            faculty = random.choice(FACULTIES)
            assessments.append(generate_assessment_attempt(user['id'], faculty['id']))
    print(f"  ✅ {len(assessments)} assessment attempts generated")
    
    # Generate token transactions
    print("\n🪙 Generating token transactions...")
    transactions = []
    for user in individuals:
        # Earned transactions (from assessments)
        for _ in range(random.randint(2, 8)):
            faculty = random.choice(FACULTIES)
            amount = random.choice([25, 50, 75, 100])
            transactions.append(generate_token_transaction(
                user['id'], "earned", amount, f"{faculty['name']} Assessment"
            ))
        
        # Spent transactions (on courses)
        for _ in range(random.randint(1, 4)):
            amount = random.choice([50, 75, 100, 150])
            transactions.append(generate_token_transaction(
                user['id'], "spent", -amount, f"Course Unlock"
            ))
    print(f"  ✅ {len(transactions)} token transactions generated")
    
    # Generate courses
    print("\n📚 Generating courses...")
    courses = [generate_course() for _ in range(64)]
    print(f"  ✅ {len(courses)} courses generated")
    
    # Generate job postings
    print("\n💼 Generating job postings...")
    jobs = []
    for institution in INSTITUTIONS:
        num_jobs = random.randint(3, 8)
        for _ in range(num_jobs):
            jobs.append(generate_job_posting(institution))
    print(f"  ✅ {len(jobs)} job postings generated")
    
    # Compile all data
    test_data = {
        "generated_at": datetime.now().isoformat(),
        "summary": {
            "total_users": len(individuals) + len(institutionals) + len(federals),
            "individual_users": len(individuals),
            "institutional_users": len(institutionals),
            "federal_users": len(federals),
            "skills_passports": len(skills_passports),
            "assessments": len(assessments),
            "transactions": len(transactions),
            "courses": len(courses),
            "job_postings": len(jobs)
        },
        "users": {
            "individuals": individuals,
            "institutionals": institutionals,
            "federals": federals
        },
        "skills_passports": skills_passports,
        "assessments": assessments,
        "token_transactions": transactions,
        "courses": courses,
        "job_postings": jobs
    }
    
    # Save to file
    output_file = "/home/ubuntu/noor-repo/test_data.json"
    with open(output_file, 'w') as f:
        json.dump(test_data, f, indent=2)
    
    print(f"\n✅ Test data generated successfully!")
    print(f"📁 Saved to: {output_file}")
    print(f"\n📊 Summary:")
    print(f"  • Total Users: {test_data['summary']['total_users']}")
    print(f"  • Skills Passports: {test_data['summary']['skills_passports']}")
    print(f"  • Assessments: {test_data['summary']['assessments']}")
    print(f"  • Token Transactions: {test_data['summary']['transactions']}")
    print(f"  • Courses: {test_data['summary']['courses']}")
    print(f"  • Job Postings: {test_data['summary']['job_postings']}")
    print(f"\n🎉 Ready for UAT!")

if __name__ == "__main__":
    main()

