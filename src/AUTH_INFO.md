# OCH Platform Authentication

## Default Login Credentials

### Administrator Account
- **Email:** admin@och.edu
- **Password:** admin123
- **Role:** Administrator
- **Access:** Full platform access including analytics, admissions, and mentorship management

## User Registration

### Student Registration
Students can register by providing:
- Full Name
- Email Address
- Phone Number
- Gender
- Location
- Profile Picture (optional)
- Password (minimum 6 characters)

**Access:** Students can access learning modules, profiling tests, portfolio management, mentorship, and career placement.

### Mentor Registration
Mentors can register by providing:
- Full Name
- Gender
- Email Address
- LinkedIn/Twitter Profile
- Educational Background
- Professional Background
- Mentorship Interests
- Profile Picture (optional)
- Password (minimum 6 characters)

**Access:** Mentors can access student management, project reviews, and coaching sessions.

### Employer Registration
Employers can register by providing:
- Contact Person Name
- Email Address
- Company/Organization Name
- Industry Sector
- Business Registration Number
- Company Size
- Website URL (optional)
- Company Description
- Physical Address
- Company Logo (optional)
- Password (minimum 6 characters)

**Access:** Employers can access candidate pipeline, student portfolios, and job posting management.

## Role-Based Access Control

The platform implements strict role-based access control:

1. **Students** can only access student-specific features
2. **Mentors** can only access mentor-specific features
3. **Employers** can only access employer-specific features
4. **Administrators** have full platform access

Users cannot switch roles after logging in - they can only access features appropriate to their registered role.

## Data Storage

Currently, the platform uses browser localStorage for data persistence:
- User accounts are stored in `ochUsers`
- Passwords are stored in `ochPasswords` (Note: In production, use proper backend authentication)
- Current session is stored in `ochUser`

## Security Notes

⚠️ **Important:** This is a demo/prototype implementation using localStorage. For production use:
- Implement proper backend authentication with Supabase or similar
- Use secure password hashing (bcrypt, argon2, etc.)
- Implement JWT tokens or session management
- Add email verification
- Implement password reset functionality
- Add rate limiting for login attempts
- Use HTTPS for all communications
