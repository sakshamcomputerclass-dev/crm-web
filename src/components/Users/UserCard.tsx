import React from 'react';
import { Mail, Calendar, Shield, Building, Clock, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getRoleColor = (roleLevel: number) => {
    switch (roleLevel) {
      case 1: return 'text-purple-600 bg-purple-100'; // Administrator
      case 2: return 'text-blue-600 bg-blue-100';     // Manager
      case 3: return 'text-green-600 bg-green-100';   // Support Agent
      default: return 'text-gray-600 bg-gray-100';    // Viewer
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.department}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role.level)}`}>
            <Shield className="h-3 w-3 mr-1" />
            {user.role.name}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Building className="h-4 w-4" />
          <span>{user.department} Department</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Joined: {user.createdAt}</span>
        </div>
        
        {user.lastLogin && (
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Last login: {user.lastLogin}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Permissions</span>
          <span className="text-xs text-gray-500">{user.permissions.length} granted</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {user.permissions.slice(0, 3).map((permission) => (
            <span
              key={permission.id}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
            >
              {permission.name}
            </span>
          ))}
          {user.permissions.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
              +{user.permissions.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Edit User
          </button>
          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;