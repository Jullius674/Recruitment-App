import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Bell, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Activity, 
  Settings,
  Server,
  Database,
  Cpu,
  HardDrive,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface AdminDashboardProps {
  onLogout: () => void;
  userName: string;
}

export function AdminDashboard({ onLogout, userName }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'users' | 'logs' | 'settings'>('dashboard');

  const menuItems = [
    { id: 'dashboard' as const, label: 'System Dashboard', icon: LayoutDashboard },
    { id: 'users' as const, label: 'User Management', icon: Users },
    { id: 'logs' as const, label: 'Logs & Monitoring', icon: Activity },
    { id: 'settings' as const, label: 'System Settings', icon: Settings },
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: 45, status: 'good', icon: Cpu, color: 'text-green-600' },
    { name: 'Memory', value: 68, status: 'warning', icon: HardDrive, color: 'text-yellow-600' },
    { name: 'Database', value: 82, status: 'critical', icon: Database, color: 'text-red-600' },
    { name: 'Server Load', value: 35, status: 'good', icon: Server, color: 'text-green-600' },
  ];

  const recentActivity = [
    { id: '1', action: 'New user registered', user: 'john.doe@email.com', time: '2 minutes ago', type: 'success' },
    { id: '2', action: 'Failed login attempt', user: 'admin@company.com', time: '15 minutes ago', type: 'warning' },
    { id: '3', action: 'New vacancy created', user: 'hr.manager@company.com', time: '1 hour ago', type: 'info' },
    { id: '4', action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'success' },
    { id: '5', action: 'Database maintenance', user: 'System', time: '3 hours ago', type: 'info' },
  ];

  const SystemDashboardContent = () => (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.name} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  metric.status === 'good' ? 'bg-green-100' :
                  metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <Badge variant="outline" className={
                  metric.status === 'good' ? 'bg-green-50 text-green-700 border-green-200' :
                  metric.status === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }>
                  {metric.status}
                </Badge>
              </div>
              <h4 className="text-sm text-gray-600 mb-2">{metric.name}</h4>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl text-gray-900">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Users</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl text-gray-900 mb-1">2,847</p>
          <p className="text-sm text-gray-600">
            <span className="text-green-600">+12%</span> from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Active Sessions</h3>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl text-gray-900 mb-1">342</p>
          <p className="text-sm text-gray-600">
            Users currently online
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">System Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl text-gray-900 mb-1">3</p>
          <p className="text-sm text-gray-600">
            Require attention
          </p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.user}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                <Clock className="h-3 w-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Service Status</h3>
          <div className="space-y-3">
            {[
              { name: 'API Server', status: 'operational' },
              { name: 'Database', status: 'operational' },
              { name: 'Email Service', status: 'operational' },
              { name: 'File Storage', status: 'degraded' },
              { name: 'Search Engine', status: 'operational' },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{service.name}</span>
                <div className="flex items-center gap-2">
                  {service.status === 'operational' ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Operational</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-600">Degraded</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Storage Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Total Storage</span>
                <span className="text-gray-900">450 GB / 1 TB</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Backup Storage</span>
                <span className="text-gray-900">230 GB / 500 GB</span>
              </div>
              <Progress value={46} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Media Storage</span>
                <span className="text-gray-900">120 GB / 200 GB</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <SystemDashboardContent />;
      case 'users':
        return <UserManagement />;
      case 'logs':
        return (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Logs & Monitoring</h3>
            <p className="text-gray-600">System logs and monitoring dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">System configuration settings coming soon...</p>
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
              <div className="w-8 h-8 bg-[#ef4444] rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">TalentHub Admin</span>
            </div>

            {/* Right Side - полностью справа */}
            <div className="flex items-center gap-4">
              {/* System Alerts */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f59e0b] rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Профиль пользователя */}
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#ef4444] text-white">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500">Administrator</div>
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
                            ? 'bg-red-50 text-[#ef4444]'
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
                          ? 'bg-[#ef4444] text-white'
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