# Contributing to NOOR Platform

Thank you for your interest in contributing to the NOOR Platform! This document provides guidelines and instructions for contributing to the project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Questions](#questions)

---

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes**:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes**:
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**
- **Code editor** (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/NOOR_National-Opportunities-Optimization-Realization-.git
cd noor-repo
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/BenedictGPT/NOOR_National-Opportunities-Optimization-Realization-.git
```

---

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

**Code Contributions**:
- New features
- Bug fixes
- Performance improvements
- Refactoring

**Documentation**:
- Improving existing documentation
- Adding new documentation
- Fixing typos or clarifying content
- Translating documentation

**Testing**:
- Writing unit tests
- Writing integration tests
- Improving test coverage
- Reporting bugs

**Design**:
- UI/UX improvements
- Design system enhancements
- Accessibility improvements

---

## Development Setup

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Start development server
uvicorn app.main:app --reload
```

The backend will be available at http://localhost:8000

### Database Setup

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and API keys to `.env` files
3. Run database migrations (if available)

---

## Coding Standards

### Frontend (TypeScript/React)

**TypeScript**:
- Use strict type checking
- Avoid `any` types
- Define interfaces for all data structures
- Use type guards for runtime type checking

**React**:
- Use functional components with hooks
- Implement proper prop types
- Use meaningful component and variable names
- Keep components focused and single-purpose

**Styling**:
- Use Tailwind CSS utility classes
- Follow the design system for each interface
- Ensure responsive design (mobile-first)
- Maintain accessibility (WCAG 2.1 AA)

**Example**:
```typescript
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
      className={`px-4 py-2 rounded font-medium ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
};
```

### Backend (Python/FastAPI)

**Python**:
- Follow PEP 8 style guide
- Use type hints for all functions
- Write comprehensive docstrings
- Keep functions focused and single-purpose

**FastAPI**:
- Use Pydantic models for request/response validation
- Document all endpoints with descriptions
- Implement proper error handling
- Use dependency injection

**Example**:
```python
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
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
    
    Args:
        user_data: User creation data
        service: User service dependency
        
    Returns:
        Created user information
        
    Raises:
        HTTPException: If user creation fails
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

### Code Formatting

**Frontend**:
```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

**Backend**:
```bash
# Run linter
pylint app/

# Format code
black app/

# Type checking
mypy app/
```

---

## Commit Guidelines

### Commit Message Format

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Scope

The scope should specify the area of change:
- `frontend`: Frontend changes
- `backend`: Backend changes
- `api`: API changes
- `docs`: Documentation changes
- `ci`: CI/CD changes

### Examples

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

```
docs: Update API documentation for authentication endpoints

Added examples and clarified authentication flow in API docs.
```

---

## Pull Request Process

### Before Creating a PR

1. **Update your branch** with the latest changes from upstream:
```bash
git fetch upstream
git rebase upstream/develop
```

2. **Run tests** to ensure everything works:
```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && pytest
```

3. **Check code quality**:
```bash
# Frontend
npm run lint

# Backend
pylint app/
```

### Creating a Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Go to the repository on GitHub and click "New Pull Request"

3. Fill out the PR template with:
   - Clear description of changes
   - Type of change (bug fix, feature, etc.)
   - Related issues
   - Testing performed
   - Screenshots (if applicable)

### PR Template

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

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
```

### Code Review

All PRs require at least one approval before merging. Reviewers will check:
- Code quality and standards compliance
- Test coverage
- Documentation
- Security considerations
- Performance implications

### Addressing Feedback

- Respond to all review comments
- Make requested changes or explain why they're not necessary
- Push additional commits to address feedback
- Request re-review when ready

---

## Reporting Bugs

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** to see if the bug is already fixed
3. **Gather information** about the bug

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

---

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

---

## Questions

If you have questions about contributing:

1. **Check the documentation** in the `docs/` directory
2. **Search existing issues** and discussions
3. **Ask in GitHub Discussions**
4. **Contact the maintainers**

---

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- The contributors page

Thank you for contributing to the NOOR Platform! 🌟

---

**Last Updated**: November 3, 2024  
**Version**: 1.0.0

