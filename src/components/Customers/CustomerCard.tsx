import React from 'react';
import { Mail, Phone, Building, Calendar, User } from 'lucide-react';
import { Customer } from '../../types';

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-100' 
      : 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
            <p className="text-sm text-gray-600">{customer.company}</p>
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
          {customer.status}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{customer.email}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{customer.phone}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Building className="h-4 w-4" />
          <span>{customer.company}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Last contact: {customer.lastContact}</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Profile
          </button>
          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;