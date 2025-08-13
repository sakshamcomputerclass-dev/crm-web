import React from 'react';
import { User, Trophy, Clock } from 'lucide-react';
import { mockAgents, mockTickets } from '../../data/mockData';

const TeamPerformance: React.FC = () => {
  const getAgentStats = (agentName: string) => {
    const assigned = mockTickets.filter(t => t.assignee === agentName).length;
    const resolved = mockTickets.filter(t => t.assignee === agentName && t.status === 'resolved').length;
    return { assigned, resolved };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockAgents.map((agent) => {
            const stats = getAgentStats(agent.name);
            const completionRate = stats.assigned > 0 ? Math.round((stats.resolved / stats.assigned) * 100) : 0;
            
            return (
              <div key={agent.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-600">{agent.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {stats.assigned} assigned
                    </div>
                    <div className="flex items-center text-green-600">
                      <Trophy className="h-4 w-4 mr-1" />
                      {completionRate}% resolved
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;