# TalentHub - AI-Powered Recruitment Platform

A modern B2B SaaS web application for AI-powered recruitment and talent screening with role-based access control.

## Features

### 🔐 Authentication System
- **Login Page**: Clean, professional login with demo account quick access
- **Registration**: Candidate self-registration with password strength indicator
- **Password Change**: Forced password change for first-time HR/Admin users
- **Role-Based Access**: Three distinct user roles with different permissions

### 👥 User Roles

#### 1. Candidate Portal
- **Job Board**: Browse and search open positions with advanced filters
  - Search by title, company, or skills
  - Filter by location, experience level, and salary range
  - Quick Apply functionality for eligible positions
  - Save favorite jobs
  
- **My Applications**: Track application status through the hiring pipeline
  - Visual progress indicators
  - Interview scheduling
  - Offer management
  
- **Profile Management**: Complete candidate profile
  - Resume upload and management
  - Skills and experience
  - Education and certifications
  - Work history

#### 2. HR Manager Portal
- **Dashboard**: Overview of active vacancies and recruitment metrics
  - Quick stats cards
  - Vacancy listings with match rates
  - Recent activity feed
  
- **Vacancy Management**: Create and edit job postings
  - Multi-step form wizard
  - AI screening criteria configuration
  - Skills tags and requirements
  
- **Candidate Pipeline**: Kanban-style candidate management
  - Drag-and-drop candidate cards
  - Application status tracking
  - Filtering and search
  
- **Analytics**: Detailed recruitment analytics
  - Charts and visualizations
  - Conversion metrics
  - Performance tracking

#### 3. Administrator Portal
- **System Dashboard**: Real-time system monitoring
  - CPU, memory, and database metrics
  - Service status monitoring
  - Storage usage tracking
  - Recent system activity
  
- **User Management**: Complete user administration
  - User table with role filtering
  - Bulk actions (activate, deactivate, delete)
  - Role assignment
  - Activity tracking
  
- **Logs & Monitoring**: System logs and alerts (coming soon)
- **Settings**: System configuration (coming soon)

## Demo Accounts

Use these credentials to explore different user roles:

**Candidate:**
- Email: `candidate@demo.com`
- Password: `demo123`

**HR Manager:**
- Email: `hr@demo.com`
- Password: `demo123`
- Note: Will require password change on first login

**Administrator:**
- Email: `admin@demo.com`
- Password: `demo123`
- Note: Will require password change on first login

## Design System

### Colors
- **Primary**: #2563eb (Deep Blue)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Neutral**: Gray scale

### Typography
- **Font Family**: Inter / System UI
- **Responsive sizing**: Default typography tokens

### Components
- **Border Radius**: 8px
- **Card Shadows**: Subtle elevation
- **Grid System**: 12-column responsive grid

## Technology Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner

## Getting Started

1. The application starts with the Login screen
2. Click on any demo account to auto-fill credentials
3. Click "Sign In" to access the role-based dashboard
4. For HR/Admin roles, complete the password change on first login

## Features by Screen

### Authentication
- ✅ Email/password validation
- ✅ Password strength meter
- ✅ Remember me functionality
- ✅ Forgot password link
- ✅ Terms & Conditions acceptance

### Candidate Features
- ✅ Job search and filtering
- ✅ Quick apply functionality
- ✅ Application tracking
- ✅ Profile management
- ✅ Resume upload
- ✅ Skills management

### HR Features
- ✅ Vacancy creation wizard
- ✅ AI screening criteria
- ✅ Candidate pipeline management
- ✅ Analytics dashboard
- ✅ Match rate visualization

### Admin Features
- ✅ System health monitoring
- ✅ User management table
- ✅ Bulk user actions
- ✅ Role-based filtering
- ✅ Activity logs

## Security Features

- Role-based access control (RBAC)
- Forced password change for privileged users
- Password strength validation
- Session management
- Input validation

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Notes

- All data is currently mocked for demonstration purposes
- API integrations would require backend implementation
- No PII or sensitive data should be stored in this demo
- Toast notifications provide user feedback for all actions
