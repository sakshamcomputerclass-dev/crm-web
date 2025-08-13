import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Customer } from '../../types';
import { mockCustomers } from '../../data/mockData';
import CustomerCard from './CustomerCard';
import ImportCustomersModal from './ImportCustomersModal';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportCustomers = (importedCustomers: Customer[]) => {
    const newCustomers = importedCustomers.map(customer => ({
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      totalTickets: 0,
      openTickets: 0
    }));
    setCustomers(prev => [...prev, ...newCustomers]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Import CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-500">
            {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No customers found</div>
            <div className="text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first customer'}
            </div>
          </div>
        )}
      </div>

      {showImportModal && (
        <ImportCustomersModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImportCustomers}
        />
      )}
    </div>
  );
};

export default CustomerList;