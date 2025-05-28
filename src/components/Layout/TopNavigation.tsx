
import React, { useState } from 'react';
import { Search, Bell, Menu, Wifi, WifiOff, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopNavigationProps {
  onToggleSidebar: () => void;
  onlineStatus: boolean;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onToggleSidebar,
  onlineStatus,
  user
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search insights, policies, alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={cn(
            "flex items-center space-x-2 px-3 py-1 rounded-full text-sm",
            onlineStatus 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          )}>
            {onlineStatus ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span>{onlineStatus ? 'Online' : 'Offline'}</span>
          </div>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {user && (
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
