
import React, { useState } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { TopNavigation } from '@/components/Layout/TopNavigation';
import { OverviewDashboard } from '@/components/Dashboard/OverviewDashboard';
import { AIInteractionPanel } from '@/components/AI/AIInteractionPanel';
import { SearchPanel } from '@/components/Search/SearchPanel';

const Index = () => {
  const [activeModule, setActiveModule] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [onlineStatus] = useState(true); // This would be managed by a context/hook in real app

  const mockUser = {
    name: 'Dr. Sarah Chen',
    role: 'Health Officer',
    avatar: ''
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewDashboard />;
      case 'search':
        return <SearchPanel />;
      case 'health':
      case 'governance':
      case 'climate':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                {activeModule} Intelligence
              </h2>
              <OverviewDashboard />
            </div>
            <AIInteractionPanel />
          </div>
        );
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        collapsed={sidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onlineStatus={onlineStatus}
          user={mockUser}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
