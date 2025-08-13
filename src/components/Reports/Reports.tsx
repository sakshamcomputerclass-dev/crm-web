import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600 mt-1">Track performance and generate insights</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ticket Volume</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">247</p>
          <p className="text-sm text-gray-600 mt-2">Total tickets this month</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resolution Time</h3>
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.2h</p>
          <p className="text-sm text-gray-600 mt-2">Average resolution time</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">-8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction</h3>
            <TrendingUp className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.8/5</p>
          <p className="text-sm text-gray-600 mt-2">Average rating</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">+3% from last month</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Monthly Support Report</p>
              <p className="text-sm text-gray-600">Generated on Dec 20, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download PDF
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Customer Satisfaction Survey</p>
              <p className="text-sm text-gray-600">Generated on Dec 18, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download PDF
            </button>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Team Performance Report</p>
              <p className="text-sm text-gray-600">Generated on Dec 15, 2024</p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;