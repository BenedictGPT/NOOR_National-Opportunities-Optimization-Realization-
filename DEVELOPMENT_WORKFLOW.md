# NOOR Platform - Development Workflow

**Version**: 1.0.0  
**Last Updated**: November 3, 2024  
**Author**: Manus AI

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Branching Strategy](#branching-strategy)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Deployment Process](#deployment-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Best Practices](#best-practices)

---

## Overview

This document defines the development workflow for the NOOR Platform, ensuring consistency, quality, and efficiency across all contributions. The workflow is designed to support multiple developers working simultaneously while maintaining code quality and production stability.

### Workflow Principles

The NOOR Platform development workflow is built on several core principles that guide all development activities. **Quality over speed** ensures that every contribution meets high standards of code quality, testing, and documentation before merging. **Collaboration and transparency** promote open communication, thorough code reviews, and clear documentation of all changes. **Continuous integration** enables automated testing and deployment to catch issues early and deploy frequently. **Security first** requires security considerations in every development decision, with regular security audits and immediate response to vulnerabilities.

---

## Repository Structure

### Primary Repository

**noor-repo** serves as the primary development repository with all active development occurring here.

**GitHub URL**: https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-

**Branch**: `master` (to be renamed to `main`)

### Directory Structure

```
noor-repo/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend documentation
│
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── tests/              # Test suite
│   ├── requirements.txt    # Dependencies
│   └── README.md           # Backend documentation
│
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── .github/                # GitHub Actions workflows
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
└── DEVELOPMENT_WORKFLOW.md # This file
```

---

## Branching Strategy

### Branch Types

The NOOR Platform uses a structured branching strategy to organize development work and manage releases effectively.

#### Main Branches

**`main`** (Production Branch)
- Contains production-ready code
- Protected branch with required reviews
- Automatically deploys to production
- Only accepts merges from `release/*` branches
- Tagged with version numbers

**`develop`** (Integration Branch)
- Integration branch for features
- Contains latest development changes
- Automatically deploys to staging environment
- Accepts merges from `feature/*` and `bugfix/*` branches
- Always in a deployable state

#### Supporting Branches

**`feature/*`** (Feature Branches)
- Used for developing new features
- Created from `develop`
- Merged back to `develop`
- Naming convention: `feature/feature-name`
- Examples: `feature/skills-passport`, `feature/token-purchase`

**`bugfix/*`** (Bug Fix Branches)
- Used for fixing bugs in development
- Created from `develop`
- Merged back to `develop`
- Naming convention: `bugfix/bug-description`
- Examples: `bugfix/login-error`, `bugfix/assessment-scoring`

**`hotfix/*`** (Hotfix Branches)
- Used for emergency production fixes
- Created from `main`
- Merged to both `main` and `develop`
- Naming convention: `hotfix/issue-description`
- Examples: `hotfix/payment-failure`, `hotfix/security-patch`

**`release/*`** (Release Branches)
- Used for release preparation
- Created from `develop`
- Merged to `main` and back to `develop`
- Naming convention: `release/version-number`
- Examples: `release/1.1.0`, `release/2.0.0`

### Branch Naming Conventions

All branch names should be lowercase with words separated by hyphens. Use descriptive names that clearly indicate the purpose of the branch.

**Good Examples**:
- `feature/eight-faculty-visualization`
- `bugfix/token-balance-calculation`
- `hotfix/stripe-webhook-error`
- `release/1.2.0`

**Bad Examples**:
- `feature/update` (too vague)
- `myFeature` (wrong case)
- `feature_new_stuff` (underscores instead of hyphens)

---

## Development Process

### 1. Starting New Work

#### For New Features

```bash
# Ensure you have the latest develop branch
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name

# Verify you're on the correct branch
git branch
```

#### For Bug Fixes

```bash
# For development bugs
git checkout develop
git pull origin develop
git checkout -b bugfix/bug-description

# For production hotfixes
git checkout main
git pull origin main
git checkout -b hotfix/issue-description
```

### 2. Development Workflow

#### Make Changes

Write your code following the established code standards and best practices. Ensure your changes are focused and related to the branch purpose.

```bash
# Make your changes
# Edit files as needed

# Check what changed
git status
git diff
```

#### Test Locally

Before committing, thoroughly test your changes locally to ensure they work as expected and don't break existing functionality.

```bash
# Frontend testing
cd frontend
npm run lint
npm run type-check
npm test
npm run build

# Backend testing
cd backend
pytest
python -m pylint app/
python -m mypy app/
```

#### Commit Changes

Write clear, descriptive commit messages following the conventional commits specification.

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: Add Eight-Faculty radar chart visualization"
```

**Commit Message Format**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(frontend): Add Skills Passport radar chart component

Implement interactive radar chart for Eight-Faculty visualization
using Recharts library. Includes responsive design and accessibility
features.

Closes #123
```

```
fix(backend): Correct token balance calculation

Fixed issue where token balance was not updating correctly after
assessment completion. Updated transaction logic to properly
credit tokens.

Fixes #456
```

### 3. Pushing Changes

```bash
# Push your branch to remote
git push origin feature/your-feature-name

# If this is the first push
git push -u origin feature/your-feature-name
```

### 4. Creating Pull Request

Navigate to the GitHub repository and create a pull request from your branch to the appropriate target branch (`develop` for features/bugfixes, `main` for hotfixes).

---

## Code Standards

### Frontend Standards

#### TypeScript

The frontend codebase uses TypeScript for type safety and better developer experience. All code must be properly typed with no `any` types unless absolutely necessary.

**Type Definitions**:
```typescript
// Define interfaces for all data structures
interface User {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'institutional' | 'federal';
}

// Use type aliases for complex types
type SkillsPassport = {
  userId: string;
  faculties: Faculty[];
  overallScore: number;
};

// Avoid 'any' - use 'unknown' if type is truly unknown
function processData(data: unknown): ProcessedData {
  // Type guard
  if (isValidData(data)) {
    return transformData(data);
  }
  throw new Error('Invalid data');
}
```

#### React Components

Use functional components with hooks. Implement proper prop types and error boundaries.

```typescript
// Component with proper types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

#### Styling

Use Tailwind CSS utility classes. Follow the design system for each interface.

```typescript
// Good: Using Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>

// Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>
  ...
</div>
```

#### File Organization

```
src/
├── app/
│   ├── federal/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── page.tsx
├── components/
│   ├── shared/
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── federal/
│       └── FederalNav.tsx
├── lib/
│   ├── api.ts
│   └── utils.ts
└── types/
    └── index.ts
```

### Backend Standards

#### Python Style

Follow PEP 8 style guide. Use type hints for all functions.

```python
from typing import List, Optional
from pydantic import BaseModel

class User(BaseModel):
    """User model with validation."""
    id: str
    email: str
    name: str
    role: str

def get_user_by_id(user_id: str) -> Optional[User]:
    """
    Retrieve a user by ID.
    
    Args:
        user_id: The unique identifier of the user
        
    Returns:
        User object if found, None otherwise
        
    Raises:
        ValueError: If user_id is invalid
    """
    if not user_id:
        raise ValueError("user_id cannot be empty")
    
    # Implementation
    return user
```

#### API Endpoints

Use FastAPI best practices with proper documentation.

```python
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas import UserResponse, UserCreate
from app.services import UserService

router = APIRouter(prefix="/api/v1/users", tags=["users"])

@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
    description="Create a new user account with the provided information"
)
async def create_user(
    user_data: UserCreate,
    service: UserService = Depends()
) -> UserResponse:
    """
    Create a new user.
    
    - **email**: User's email address (must be unique)
    - **name**: User's full name
    - **password**: User's password (min 8 characters)
    """
    try:
        user = await service.create_user(user_data)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
```

#### Error Handling

Implement comprehensive error handling with appropriate HTTP status codes.

```python
from fastapi import HTTPException, status

class UserNotFoundError(Exception):
    """Raised when a user is not found."""
    pass

async def get_user(user_id: str) -> User:
    """Get user by ID with proper error handling."""
    try:
        user = await db.get_user(user_id)
        if not user:
            raise UserNotFoundError(f"User {user_id} not found")
        return user
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found"
        )
    except Exception as e:
        logger.error(f"Error retrieving user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while retrieving the user"
        )
```

---

## Testing Requirements

### Frontend Testing

#### Unit Tests

Test individual components and functions in isolation.

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

#### Integration Tests

Test component interactions and data flow.

```typescript
// SkillsPassport.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { SkillsPassport } from './SkillsPassport';
import { mockApiResponse } from '../test-utils';

describe('SkillsPassport', () => {
  it('loads and displays skills data', async () => {
    mockApiResponse('/api/v1/skills-passport/me', {
      faculties: [/* mock data */]
    });

    render(<SkillsPassport />);

    await waitFor(() => {
      expect(screen.getByText('Cognitive Faculty')).toBeInTheDocument();
    });
  });
});
```

### Backend Testing

#### Unit Tests

Test individual functions and methods.

```python
# test_user_service.py
import pytest
from app.services.user_service import UserService
from app.schemas import UserCreate

@pytest.fixture
def user_service():
    return UserService()

def test_create_user(user_service):
    """Test user creation."""
    user_data = UserCreate(
        email="test@example.com",
        name="Test User",
        password="password123"
    )
    
    user = user_service.create_user(user_data)
    
    assert user.email == "test@example.com"
    assert user.name == "Test User"
    assert user.id is not None

def test_create_user_duplicate_email(user_service):
    """Test that duplicate email raises error."""
    user_data = UserCreate(
        email="test@example.com",
        name="Test User",
        password="password123"
    )
    
    user_service.create_user(user_data)
    
    with pytest.raises(ValueError, match="Email already exists"):
        user_service.create_user(user_data)
```

#### API Tests

Test API endpoints end-to-end.

```python
# test_api_users.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user():
    """Test user creation endpoint."""
    response = client.post(
        "/api/v1/users/",
        json={
            "email": "test@example.com",
            "name": "Test User",
            "password": "password123"
        }
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_get_user():
    """Test get user endpoint."""
    # Create user first
    create_response = client.post(
        "/api/v1/users/",
        json={
            "email": "test@example.com",
            "name": "Test User",
            "password": "password123"
        }
    )
    user_id = create_response.json()["id"]
    
    # Get user
    response = client.get(f"/api/v1/users/{user_id}")
    
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == user_id
```

### Test Coverage Requirements

All code must maintain minimum test coverage:
- **Frontend**: 80% coverage
- **Backend**: 90% coverage
- **Critical paths**: 100% coverage

Run coverage reports:
```bash
# Frontend
npm run test:coverage

# Backend
pytest --cov=app --cov-report=html
```

---

## Pull Request Process

### Creating a Pull Request

When your feature or fix is complete and tested, create a pull request on GitHub.

#### PR Title Format

```
<type>(<scope>): <description>

Examples:
feat(frontend): Add Skills Passport radar chart
fix(backend): Correct token balance calculation
docs: Update API documentation
```

#### PR Description Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #123
Related to #456

## Changes Made
- Added radar chart component for Skills Passport
- Implemented responsive design for mobile devices
- Added unit tests for new component

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
- [ ] Branch is up to date with base branch
```

### Code Review Process

All pull requests require at least one approval before merging. Reviewers should check:

**Code Quality**:
- Code follows established standards
- No code smells or anti-patterns
- Proper error handling
- Appropriate comments and documentation

**Functionality**:
- Changes work as intended
- No breaking changes (unless intentional)
- Edge cases handled
- Performance considerations addressed

**Testing**:
- Adequate test coverage
- Tests are meaningful and effective
- All tests passing

**Security**:
- No security vulnerabilities introduced
- Sensitive data properly handled
- Input validation implemented

### Addressing Review Comments

Respond to all review comments, either by making requested changes or explaining why changes aren't necessary.

```bash
# Make requested changes
git add .
git commit -m "refactor: Address review comments"
git push origin feature/your-feature-name
```

### Merging

Once approved, the PR can be merged. Use squash and merge for feature branches to keep history clean.

---

## Deployment Process

### Staging Deployment

Automatic deployment to staging occurs when code is merged to `develop` branch.

**Staging URLs**:
- Frontend: https://staging-frontend.noor.ae
- Backend: https://staging-backend.noor.ae

### Production Deployment

Production deployment follows a structured release process:

#### 1. Create Release Branch

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.1.0
```

#### 2. Prepare Release

- Update version numbers
- Update CHANGELOG.md
- Final testing and bug fixes
- Update documentation

#### 3. Merge to Main

```bash
git checkout main
git pull origin main
git merge release/1.1.0
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin main --tags
```

#### 4. Merge Back to Develop

```bash
git checkout develop
git merge release/1.1.0
git push origin develop
```

#### 5. Deploy to Production

Production deployment is triggered automatically when code is pushed to `main` branch.

**Production URLs**:
- Frontend: https://frontend-minimal-ebp5u3vy6-bes-projects-a8583333.vercel.app
- Backend: https://backend-ixwb77mau-bes-projects-a8583333.vercel.app

---

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration and deployment.

#### Current Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Run linter
        run: cd frontend && npm run lint
      - name: Run tests
        run: cd frontend && npm test
      - name: Build
        run: cd frontend && npm run build

  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: cd backend && pip install -r requirements.txt
      - name: Run tests
        run: cd backend && pytest
      - name: Run linter
        run: cd backend && pylint app/
```

### Future Enhancements

Planned improvements to the CI/CD pipeline:

- Automated security scanning
- Performance testing
- E2E testing with Playwright
- Automated database migrations
- Blue-green deployment
- Canary releases
- Automated rollback on failure

---

## Best Practices

### General Best Practices

**Commit Often**: Make small, focused commits that are easy to review and revert if necessary.

**Write Clear Messages**: Use descriptive commit messages that explain what and why, not just what.

**Test Before Pushing**: Always run tests locally before pushing to ensure you're not breaking builds.

**Keep Branches Updated**: Regularly merge or rebase from the base branch to avoid conflicts.

**Review Your Own Code**: Before requesting review, review your own changes to catch obvious issues.

**Communicate**: Use PR descriptions and comments to explain complex changes or decisions.

### Frontend Best Practices

**Component Reusability**: Create reusable components that can be used across different interfaces.

**Accessibility**: Ensure all components are accessible (WCAG 2.1 AA compliance).

**Performance**: Optimize images, lazy load components, minimize bundle size.

**Responsive Design**: Test on multiple screen sizes and devices.

**Error Handling**: Implement proper error boundaries and user-friendly error messages.

### Backend Best Practices

**API Design**: Follow REST principles, use appropriate HTTP methods and status codes.

**Input Validation**: Validate all input data using Pydantic schemas.

**Error Handling**: Return appropriate error responses with helpful messages.

**Documentation**: Document all endpoints with clear descriptions and examples.

**Security**: Implement authentication, authorization, rate limiting, and input sanitization.

### Database Best Practices

**Migrations**: Use database migrations for all schema changes.

**Indexing**: Add indexes for frequently queried columns.

**Relationships**: Define proper foreign key relationships.

**Backups**: Ensure regular automated backups are configured.

**Security**: Use row-level security and encryption where appropriate.

---

## Troubleshooting

### Common Issues

**Merge Conflicts**:
```bash
# Update your branch with latest changes
git checkout develop
git pull origin develop
git checkout your-branch
git merge develop

# Resolve conflicts in your editor
# Then commit the merge
git add .
git commit -m "merge: Resolve conflicts with develop"
```

**Failed Tests**:
```bash
# Run tests locally to identify issues
npm test  # Frontend
pytest    # Backend

# Fix issues and rerun tests
# Commit fixes
git add .
git commit -m "fix: Resolve test failures"
```

**Build Failures**:
```bash
# Clear caches and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or for backend
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## Conclusion

This development workflow ensures consistent, high-quality contributions to the NOOR Platform. By following these guidelines, we maintain code quality, enable effective collaboration, and deliver reliable software to production.

For questions or suggestions about this workflow, please open an issue or discussion on GitHub.

---

**Document Version**: 1.0.0  
**Last Updated**: November 3, 2024  
**Author**: Manus AI  
**Status**: Active

