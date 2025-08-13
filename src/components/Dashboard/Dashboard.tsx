import React from 'react';
import StatsCards from './StatsCards';
import RecentTickets from './RecentTickets';
import TeamPerformance from './TeamPerformance';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your support operations</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTickets />
        <TeamPerformance />
      </div>
    </div>
  );
};

export default Dashboard;