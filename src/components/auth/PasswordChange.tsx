import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertCircle, CheckCircle2, Lock, X } from 'lucide-react';

interface PasswordChangeProps {
  isOpen: boolean;
  onPasswordChanged: () => void;
  onClose: () => void;
  userName: string;
}

export function PasswordChange({ isOpen, onPasswordChanged, onClose, userName }: PasswordChangeProps) {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
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

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordStrength < 70) {
      setError('Please choose a stronger password');
      return;
    }

    setSuccess(true);
    setTimeout(() => onPasswordChanged(), 1500);
  };

  const handleClose = () => {
    if (!success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-0 overflow-hidden"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          disabled={success}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Close</span>
        </button>

        {/* Прокручиваемый контент */}
        <div className="max-h-[80vh] overflow-y-auto p-8 sm:p-10">
          <DialogHeader>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#2563eb] rounded-2xl shadow-md flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <DialogTitle className="text-center text-lg font-semibold text-gray-900">
              Change Your Password
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              Welcome, <span className="font-medium text-gray-800">{userName}</span>! Please create a new password to continue.
            </DialogDescription>
          </DialogHeader>

          {/* Alerts */}
          {success && (
            <Alert className="bg-green-50 border-green-300 mt-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Password changed successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 h-12 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-[#2563eb]"
                disabled={success}
              />
              <p className="text-lg text-gray-500 mt-1">
                Enter the email address associated with your account
              </p>
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-lg font-medium text-gray-700">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Create a strong password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-2 h-12 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-[#2563eb]"
                disabled={success}
              />

              {/* Strength bar */}
              {formData.newPassword && (
                <div className="mt-3">
                  <div className="flex justify-between text-lg mb-1">
                    <span className="text-gray-600">Password strength</span>
                    <span
                      className={`font-medium ${
                        passwordStrength < 40
                          ? 'text-red-500'
                          : passwordStrength < 70
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength < 40
                          ? 'bg-red-500'
                          : passwordStrength < 70
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-lg font-medium text-gray-700">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-2 h-12 text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-[#2563eb]"
                disabled={success}
              />
            </div>

            {/* Requirements Box */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Password requirements:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>At least 8 characters long</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Mix of uppercase and lowercase letters</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Include numbers and special characters</span>
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl transition-all"
              disabled={success}
            >
              {success ? 'Updating Password...' : 'Change Password'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}