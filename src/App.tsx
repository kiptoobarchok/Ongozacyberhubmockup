import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from './components/ui/toast-simple';
import { WelcomePage } from './components/auth/WelcomePage';
import { LoginPage } from './components/auth/LoginPage';
import { StudentRegistration } from './components/auth/StudentRegistration';
import { EmployerRegistration } from './components/auth/EmployerRegistration';
import { MentorRegistration } from './components/auth/MentorRegistration';
import { AdminRegistration } from './components/auth/AdminRegistration';
import { DashboardOverview } from './components/DashboardOverview';
import { AdmissionsOnboarding } from './components/AdmissionsOnboarding';
import { LearningDelivery } from './components/LearningDelivery';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { MentorshipCoaching } from './components/MentorshipCoaching';
import { CareerPlacement } from './components/CareerPlacement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Sidebar } from './components/Sidebar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { JobListings } from './components/employer/JobListings';
import { OnboardingModal } from './components/OnboardingModal';
import { 
  LayoutDashboard, 
  UserPlus, 
  BookOpen, 
  FolderKanban, 
  Users, 
  Briefcase, 
  BarChart3 
} from 'lucide-react';

export type UserRole = 'student' | 'mentor' | 'admin' | 'employer';
export type NavItem = 'dashboard' | 'admissions' | 'learning' | 'projects' | 'mentorship' | 'placement' | 'analytics' | 'jobs';

type AuthView = 'welcome' | 'login' | 'student-signup' | 'employer-signup' | 'mentor-signup' | 'admin-signup';

function MainApp() {
  const { user, isAuthenticated, completeOnboarding } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('welcome');
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');

  // If not authenticated, show auth screens
  if (!isAuthenticated || !user) {
    switch (authView) {
      case 'login':
        return <LoginPage onBack={() => setAuthView('welcome')} />;
      case 'student-signup':
        return <StudentRegistration onBack={() => setAuthView('welcome')} />;
      case 'employer-signup':
        return <EmployerRegistration onBack={() => setAuthView('welcome')} />;
      case 'mentor-signup':
        return <MentorRegistration onBack={() => setAuthView('welcome')} />;
      case 'admin-signup':
        return <AdminRegistration onBack={() => setAuthView('welcome')} />;
      default:
        return (
          <WelcomePage
            onRoleSelect={(role) => {
              if (role === 'login') {
                setAuthView('login');
              } else if (role === 'student') {
                setAuthView('student-signup');
              } else if (role === 'employer') {
                setAuthView('employer-signup');
              } else if (role === 'mentor') {
                setAuthView('mentor-signup');
              } else if (role === 'admin') {
                setAuthView('admin-signup');
              }
            }}
          />
        );
    }
  }

  // Role-based navigation items
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (user.role === 'admin') {
      return baseItems; // Admin uses tabs in AdminDashboard component
    }

    if (user.role === 'student') {
      const studentItems = [...baseItems];
      
      // Only show Onboarding nav item if onboarding is not completed
      if (!user.onboardingCompleted) {
        studentItems.push({ id: 'admissions' as NavItem, label: 'Onboarding', icon: UserPlus });
      }
      
      studentItems.push(
        { id: 'learning' as NavItem, label: 'Learning', icon: BookOpen },
        { id: 'projects' as NavItem, label: 'Portfolio', icon: FolderKanban },
        { id: 'placement' as NavItem, label: 'Careers', icon: Briefcase }
      );
      
      return studentItems;
    }

    if (user.role === 'mentor') {
      return [
        ...baseItems,
        { id: 'mentorship' as NavItem, label: 'My Students', icon: Users },
        { id: 'projects' as NavItem, label: 'Review Projects', icon: FolderKanban },
      ];
    }

    if (user.role === 'employer') {
      return [
        ...baseItems,
        { id: 'jobs' as NavItem, label: 'Job Listings', icon: Briefcase },
        { id: 'placement' as NavItem, label: 'Candidates', icon: Users },
        { id: 'projects' as NavItem, label: 'Portfolios', icon: FolderKanban },
      ];
    }

    return baseItems;
  };

  // Role-based content rendering with access control
  const renderContent = () => {
    // Admin always shows AdminDashboard
    if (user.role === 'admin') {
      return <AdminDashboard />;
    }

    // Dashboard is accessible to all other roles
    if (activeNav === 'dashboard') {
      return <DashboardOverview role={user.role} />;
    }

    // Student-only routes
    if (user.role === 'student') {
      switch (activeNav) {
        case 'admissions':
          return <AdmissionsOnboarding />;
        case 'learning':
          return <LearningDelivery />;
        case 'projects':
          return <ProjectsPortfolio role={user.role} />;
        case 'placement':
          return <CareerPlacement role={user.role} />;
        default:
          return <DashboardOverview role={user.role} />;
      }
    }

    // Mentor-only routes
    if (user.role === 'mentor') {
      switch (activeNav) {
        case 'mentorship':
          return <MentorshipCoaching role={user.role} />;
        case 'projects':
          return <ProjectsPortfolio role={user.role} />;
        default:
          return <DashboardOverview role={user.role} />;
      }
    }

    // Employer-only routes
    if (user.role === 'employer') {
      switch (activeNav) {
        case 'jobs':
          return <JobListings />;
        case 'placement':
          return <CareerPlacement role={user.role} />;
        case 'projects':
          return <ProjectsPortfolio role={user.role} />;
        default:
          return <DashboardOverview role={user.role} />;
      }
    }

    return <DashboardOverview role={user.role} />;
  };

  // Check if student needs to complete onboarding
  const needsOnboarding = user.role === 'student' && !user.onboardingCompleted;

  const handleOnboardingComplete = () => {
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Show onboarding modal for new students */}
      {needsOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
      
      <Sidebar
        currentRole={user.role}
        onRoleChange={() => {}} // Role switching disabled in auth mode
        navItems={getNavItems()}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />
      <div className="ml-64 min-h-screen">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <MainApp />
    </AuthProvider>
  );
}

export default App;
