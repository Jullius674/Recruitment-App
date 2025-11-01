import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bell, LogOut, LayoutDashboard, Briefcase, Users, BarChart3, FileText, Settings } from 'lucide-react';
import { Dashboard } from '../Dashboard';
import { CreateVacancy } from '../CreateVacancy';
import { VacancyAnalytics } from '../VacancyAnalytics';
import { CandidateManagement } from '../CandidateManagement';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HRDashboardProps {
  onLogout: () => void;
  userName: string;
}

export function HRDashboard({ onLogout, userName }: HRDashboardProps) {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'vacancies' | 'candidates' | 'analytics' | 'templates' | 'settings'>('dashboard');

  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vacancies' as const, label: 'My Vacancies', icon: Briefcase },
    { id: 'candidates' as const, label: 'Candidates', icon: Users },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'templates' as const, label: 'Templates', icon: FileText },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={(section) => {
          if (section === 'create-vacancy') setActiveSection('vacancies');
          if (section === 'candidates') setActiveSection('candidates');
          if (section === 'analytics') setActiveSection('analytics');
        }} />;
      case 'vacancies':
        return <CreateVacancy />;
      case 'candidates':
        return <CandidateManagement />;
      case 'analytics':
        return <VacancyAnalytics />;
      case 'templates':
        return (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Job Templates</h3>
            <p className="text-gray-600 mb-4">Create and manage reusable job posting templates</p>
            <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
              Create Template
            </Button>
          </div>
        );
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
              <span className="text-xl font-semibold text-gray-900">TalentHub HR</span>
            </div>

            {/* Right Side - полностью справа */}
            <div className="flex items-center gap-4">
              {/* Уведомления */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] rounded-full text-xs text-white flex items-center justify-center">
                  5
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
                  <div className="text-xs text-gray-500">HR Manager</div>
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