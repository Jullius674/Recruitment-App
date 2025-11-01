import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bell, LogOut, User, Briefcase, FileText, Settings } from 'lucide-react';
import { JobBoard } from './JobBoard';
import { MyApplications } from './MyApplications';
import { MyProfile } from './MyProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CandidateDashboardProps {
  onLogout: () => void;
  userName: string;
}

export function CandidateDashboard({ onLogout, userName }: CandidateDashboardProps) {
  const [activeSection, setActiveSection] = useState<'profile' | 'applications' | 'jobs' | 'settings'>('jobs');

  const menuItems = [
    { id: 'profile' as const, label: 'My Profile', icon: User },
    { id: 'applications' as const, label: 'My Applications', icon: FileText },
    { id: 'jobs' as const, label: 'Job Board', icon: Briefcase },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <MyProfile />;
      case 'applications':
        return <MyApplications />;
      case 'jobs':
        return <JobBoard />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - слева */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">TalentHub</span>
            </div>

            {/* Right Side - полностью справа */}
            <div className="flex items-center gap-4">
              {/* Уведомления */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Профиль пользователя */}
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#2563eb] text-white">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500">Senior Software Engineer</div>
                </div>
              </div>

              {/* Выпадающее меню */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setActiveSection('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="flex gap-8 max-w-7xl w-full">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-[#2563eb]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Mobile Menu */}
            <div className="lg:hidden w-full mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#2563eb] text-white'
                          : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 max-w-4xl">
              {renderContent()}
            </main>

            {/* Пустое пространство справа (только для больших экранов) */}
            <div className="flex-1 hidden xl:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}