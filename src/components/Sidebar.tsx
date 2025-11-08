import { UserRole, NavItem } from '../App';
import { Shield, ChevronDown, LogOut, User } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface NavItemType {
  id: NavItem;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  navItems: NavItemType[];
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
}

export function Sidebar({ currentRole, onRoleChange, navItems, activeNav, onNavChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const roleLabels: Record<UserRole, string> = {
    student: 'Student',
    mentor: 'Mentor',
    admin: 'Administrator',
    employer: 'Employer',
  };

  const roleColors: Record<UserRole, string> = {
    student: 'from-cyan-500 to-blue-500',
    mentor: 'from-purple-500 to-pink-500',
    admin: 'from-red-500 to-orange-500',
    employer: 'from-green-500 to-emerald-500',
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 flex flex-col">
      {/* Logo & Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${roleColors[currentRole]}`}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white">Ongoza Cyber Hub</h1>
            <p className="text-xs text-slate-400">Student Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${roleColors[currentRole]} text-white shadow-lg`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Footer */}
      <div className="p-4 border-t border-slate-800">
        {/* User Info */}
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700">
              <Avatar className={`w-10 h-10 bg-gradient-to-br ${roleColors[currentRole]}`}>
                <AvatarFallback className="text-white">
                  {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm text-white truncate">{user?.fullName || 'User'}</p>
                <p className="text-xs text-slate-400">{roleLabels[currentRole]}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-xs text-slate-500 text-center">
          OCH SMP v2.0
        </div>
      </div>
    </div>
  );
}
