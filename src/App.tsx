import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { PasswordChange } from './components/auth/PasswordChange';
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { HRDashboard } from './components/hr/HRDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

type AuthView = 'login' | 'register';
type UserRole = 'Candidate' | 'HR Manager' | 'Administrator' | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
  isFirstLogin: boolean;
}

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, selectedRole: string) => {
    // Mock authentication logic
    let role: UserRole = null;
    let name = '';
    let isFirstLogin = false;

    // Determine role based on email or selected role
    if (email === 'candidate@demo.com' || selectedRole === 'Candidate') {
      role = 'Candidate';
      name = 'John Doe';
      isFirstLogin = false;
    } else if (email === 'hr@demo.com' || selectedRole === 'HR Manager') {
      role = 'HR Manager';
      name = 'Sarah Smith';
      isFirstLogin = true; // First login for HR/Admin
    } else if (email === 'admin@demo.com' || selectedRole === 'Administrator') {
      role = 'Administrator';
      name = 'Emily Davis';
      isFirstLogin = true; // First login for HR/Admin
    } else {
      // Default to candidate for any other email
      role = 'Candidate';
      name = email.split('@')[0].replace('.', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      isFirstLogin = false;
    }

    const user: User = {
      name,
      email,
      role,
      isFirstLogin,
    };

    // If HR or Admin and first login, show password change modal
    if (isFirstLogin && (role === 'HR Manager' || role === 'Administrator')) {
      setPendingUser(user);
      setShowPasswordChange(true);
    } else {
      setCurrentUser(user);
    }
  };

  const handleRegister = (data: { name: string; email: string; password: string }) => {
    // Mock registration - create candidate user
    const user: User = {
      name: data.name,
      email: data.email,
      role: 'Candidate',
      isFirstLogin: false,
    };
    setCurrentUser(user);
  };

  const handlePasswordChanged = () => {
    // Password changed successfully, log in the pending user
    if (pendingUser) {
      setCurrentUser({ ...pendingUser, isFirstLogin: false });
      setPendingUser(null);
      setShowPasswordChange(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPendingUser(null);
    setShowPasswordChange(false);
    setAuthView('login');
  };

  // Show password change modal for first-time HR/Admin users
  if (showPasswordChange && pendingUser) {
    return (
      <>
        <PasswordChange
          isOpen={showPasswordChange}
          onPasswordChanged={handlePasswordChanged}
          userName={pendingUser.name}
        />
        <Toaster />
      </>
    );
  }

  // Show role-based dashboard if user is logged in
  if (currentUser) {
    return (
      <>
        {currentUser.role === 'Candidate' && (
          <CandidateDashboard onLogout={handleLogout} userName={currentUser.name} />
        )}
        {currentUser.role === 'HR Manager' && (
          <HRDashboard onLogout={handleLogout} userName={currentUser.name} />
        )}
        {currentUser.role === 'Administrator' && (
          <AdminDashboard onLogout={handleLogout} userName={currentUser.name} />
        )}
        <Toaster />
      </>
    );
  }

  // Show authentication screens
  return (
    <>
      {authView === 'login' ? (
        <Login
          onLogin={handleLogin}
          onNavigateToRegister={() => setAuthView('register')}
        />
      ) : (
        <Register
          onRegister={handleRegister}
          onNavigateToLogin={() => setAuthView('login')}
        />
      )}
      <Toaster />
    </>
  );
}
