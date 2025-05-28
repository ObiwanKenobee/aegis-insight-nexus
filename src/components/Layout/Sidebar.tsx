
import React from 'react';
import { 
  Shield, 
  Activity, 
  Cloud, 
  Search, 
  Settings,
  User,
  Bell,
  Plus 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  collapsed?: boolean;
}

const modules = [
  { id: 'overview', label: 'Overview', icon: Shield, color: 'text-blue-500' },
  { id: 'health', label: 'Health Alerts', icon: Activity, color: 'text-red-500' },
  { id: 'governance', label: 'Governance', icon: User, color: 'text-purple-500' },
  { id: 'climate', label: 'Climate', icon: Cloud, color: 'text-green-500' },
  { id: 'search', label: 'AI Search', icon: Search, color: 'text-orange-500' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onModuleChange, 
  collapsed = false 
}) => {
  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">AEGIS</h1>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        <ul className="space-y-2 px-3">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : module.color)} />
                  {!collapsed && (
                    <span className="font-medium">{module.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button className={cn(
          "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors",
          collapsed && "justify-center"
        )}>
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};
