import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { AlertCircle, CheckCircle2, UserCircle2 } from 'lucide-react';

interface RegisterProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthColor = (strength: number): string => {
    if (strength < 40) return 'bg-[#ef4444]';
    if (strength < 70) return 'bg-[#f59e0b]';
    return 'bg-[#10b981]';
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onRegister({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <UserCircle2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-lg text-gray-600">Join our platform to find your next opportunity</p>
          </div>

          {/* Success Alert */}
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-lg text-green-800">
                Account created successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-lg">{error}</AlertDescription>
            </Alert>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-lg">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-2 h-12 text-lg"
                disabled={success}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-lg">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 h-12 text-lg"
                disabled={success}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-lg">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 h-12 text-lg"
                disabled={success}
              />
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg text-gray-600">Password strength:</span>
                    <span className={`text-lg font-medium ${
                      passwordStrength < 40 ? 'text-[#ef4444]' : 
                      passwordStrength < 70 ? 'text-[#f59e0b]' : 'text-[#10b981]'
                    }`}>
                      {getStrengthLabel(passwordStrength)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-2 h-12 text-lg"
                disabled={success}
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                disabled={success}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-[#2563eb] hover:underline">
                  Terms & Conditions
                </button>{' '}
                and{' '}
                <button type="button" className="text-[#2563eb] hover:underline">
                  Privacy Policy
                </button>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-[#2563eb] hover:bg-[#1d4ed8]"
              disabled={success}
            >
              {success ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-10 text-sm"
            onClick={onNavigateToLogin}
            disabled={success}
          >
            Sign In Instead
          </Button>
        </div>
      </div>
    </div>
  );
}