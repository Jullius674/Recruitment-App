import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, UserCircle2 } from 'lucide-react';
import { PasswordChange } from './PasswordChange';

interface LoginProps {
  onLogin: (email: string, password: string, role: string) => void;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Если пароль временный (demo123), все равно выполняем логин
    // но показываем сообщение о необходимости сменить пароль
    if (password === 'demo123') {
      onLogin(email, password, selectedRole);
      return;
    }

    // Обычный логин
    onLogin(email, password, selectedRole);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setShowPasswordChange(true);
  };

  const handlePasswordChanged = () => {
    setShowPasswordChange(false);
    // Можно добавить сообщение об успешной смене пароля
  };

  const handleClosePasswordChange = () => {
    setShowPasswordChange(false);
  };

  const demoAccounts = [
    { role: 'Candidate', email: 'candidate@demo.com', password: 'demo123' },
    { role: 'HR Manager', email: 'hr@demo.com', password: 'demo123' },
    { role: 'Administrator', email: 'admin@demo.com', password: 'demo123' },
  ];

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl shadow-2xl p-16 sm:p-20">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-[#2563eb] rounded-lg flex items-center justify-center">
                  <UserCircle2 className="w-7 h-7 text-white"/>
                </div>
              </div>
              <h1 className="text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4"/>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label htmlFor="email" className="text-lg">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-14 text-base rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-lg">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-14 text-lg rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-base cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-base text-[#2563eb] hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to the platform?</span>
              </div>
            </div>

            {/* Register Link */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onNavigateToRegister}
            >
              Create Candidate Account
            </Button>

            {/* Demo Accounts */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                      setSelectedRole(account.role);
                    }}
                    className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:border-[#2563eb] hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-gray-900">{account.role}:</span>{' '}
                    <span className="text-gray-600">{account.email}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Диалог смены пароля */}
      <PasswordChange
        isOpen={showPasswordChange}
        onPasswordChanged={handlePasswordChanged}
        onClose={handleClosePasswordChange}
        userEmail={email}
      />
    </>
  );
}