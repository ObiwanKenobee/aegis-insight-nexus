
import React from 'react';
import { Activity, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { WidgetCard } from './WidgetCard';

const mockData = {
  healthAlerts: [
    { id: 1, type: 'High Priority', message: 'Flu outbreak reported in District 3', time: '2 hours ago' },
    { id: 2, type: 'Medium', message: 'Water quality concerns in Zone B', time: '4 hours ago' },
    { id: 3, type: 'Low', message: 'Vaccination drive reminder', time: '1 day ago' }
  ],
  climateData: {
    temperature: '24°C',
    airQuality: 'Good',
    humidity: '65%',
    trend: 'Improving'
  },
  governance: {
    activePolicies: 12,
    pendingDecisions: 5,
    citizenFeedback: 89
  }
};

export const OverviewDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WidgetCard
          title="Active Alerts"
          subtitle="Health & Safety"
          icon={AlertTriangle}
          iconColor="text-red-500"
        >
          <div className="text-3xl font-bold text-red-600">3</div>
          <p className="text-sm text-gray-500 mt-1">2 health, 1 climate</p>
        </WidgetCard>
        
        <WidgetCard
          title="AI Insights"
          subtitle="Generated Today"
          icon={TrendingUp}
          iconColor="text-blue-500"
        >
          <div className="text-3xl font-bold text-blue-600">24</div>
          <p className="text-sm text-gray-500 mt-1">+15% from yesterday</p>
        </WidgetCard>
        
        <WidgetCard
          title="Active Users"
          subtitle="Government & Community"
          icon={Users}
          iconColor="text-green-500"
        >
          <div className="text-3xl font-bold text-green-600">156</div>
          <p className="text-sm text-gray-500 mt-1">Online now</p>
        </WidgetCard>
        
        <WidgetCard
          title="System Health"
          subtitle="Platform Status"
          icon={Activity}
          iconColor="text-purple-500"
        >
          <div className="text-3xl font-bold text-purple-600">98.5%</div>
          <p className="text-sm text-gray-500 mt-1">Uptime</p>
        </WidgetCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetCard
          title="Recent Health Alerts"
          icon={Activity}
          iconColor="text-red-500"
        >
          <div className="space-y-3">
            {mockData.healthAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'High Priority' ? 'bg-red-500' :
                  alert.type === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
        
        <WidgetCard
          title="Climate & Environment"
          icon={Activity}
          iconColor="text-green-500"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-700">{mockData.climateData.temperature}</div>
              <div className="text-xs text-blue-600">Temperature</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-700">{mockData.climateData.airQuality}</div>
              <div className="text-xs text-green-600">Air Quality</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-semibold text-purple-700">{mockData.climateData.humidity}</div>
              <div className="text-xs text-purple-600">Humidity</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-semibold text-orange-700">{mockData.climateData.trend}</div>
              <div className="text-xs text-orange-600">Trend</div>
            </div>
          </div>
        </WidgetCard>
      </div>
    </div>
  );
};
