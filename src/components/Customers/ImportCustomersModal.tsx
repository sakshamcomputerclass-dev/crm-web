import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Customer } from '../../types';

interface ImportCustomersModalProps {
  onClose: () => void;
  onImport: (customers: Omit<Customer, 'id'>[]) => void;
}

interface ImportError {
  row: number;
  field: string;
  message: string;
}

const ImportCustomersModal: React.FC<ImportCustomersModalProps> = ({ onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [previewData, setPreviewData] = useState<Omit<Customer, 'id'>[]>([]);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [step, setStep] = useState<'upload' | 'preview' | 'complete'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = ['name', 'email', 'phone', 'company'];
  const csvHeaders = ['Name', 'Email', 'Phone', 'Company', 'Status'];

  const downloadTemplate = () => {
    const csvContent = [
      csvHeaders.join(','),
      'John Smith,john.smith@company.com,+1 (555) 123-4567,Acme Corp,active',
      'Sarah Johnson,sarah.j@techstart.io,+1 (555) 987-6543,TechStart Inc,active',
      'Mike Davis,mike.davis@solutions.net,+1 (555) 456-7890,Business Solutions LLC,inactive'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const data = lines.map(line => {
        // Simple CSV parsing - in production, use a proper CSV parser
        const values = line.split(',').map(val => val.trim().replace(/^"|"$/g, ''));
        return values;
      });
      
      setCsvData(data);
      validateAndPreview(data);
    };
    reader.readAsText(file);
  };

  const validateAndPreview = (data: string[][]) => {
    if (data.length < 2) {
      setErrors([{ row: 0, field: 'file', message: 'CSV file must contain at least a header row and one data row' }]);
      return;
    }

    const headers = data[0];
    const rows = data.slice(1);
    const newErrors: ImportError[] = [];
    const preview: Omit<Customer, 'id'>[] = [];

    // Validate headers
    const headerMap: { [key: string]: number } = {};
    headers.forEach((header, index) => {
      headerMap[header.toLowerCase()] = index;
    });

    requiredFields.forEach(field => {
      if (!(field in headerMap)) {
        newErrors.push({ row: 0, field, message: `Required column '${field}' not found in CSV headers` });
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate and process rows
    rows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because we start from row 2 (after header)
      
      if (row.length !== headers.length) {
        newErrors.push({ row: rowNumber, field: 'row', message: 'Row has incorrect number of columns' });
        return;
      }

      const customer: Omit<Customer, 'id'> = {
        name: row[headerMap.name] || '',
        email: row[headerMap.email] || '',
        phone: row[headerMap.phone] || '',
        company: row[headerMap.company] || '',
        status: (row[headerMap.status]?.toLowerCase() === 'active' ? 'active' : 'inactive') as 'active' | 'inactive',
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0]
      };

      // Validate required fields
      if (!customer.name.trim()) {
        newErrors.push({ row: rowNumber, field: 'name', message: 'Name is required' });
      }

      if (!customer.email.trim()) {
        newErrors.push({ row: rowNumber, field: 'email', message: 'Email is required' });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
        newErrors.push({ row: rowNumber, field: 'email', message: 'Invalid email format' });
      }

      if (!customer.phone.trim()) {
        newErrors.push({ row: rowNumber, field: 'phone', message: 'Phone is required' });
      }

      if (!customer.company.trim()) {
        newErrors.push({ row: rowNumber, field: 'company', message: 'Company is required' });
      }

      preview.push(customer);
    });

    setErrors(newErrors);
    setPreviewData(preview);
    
    if (newErrors.length === 0) {
      setStep('preview');
    }
  };

  const handleImport = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onImport(previewData);
    setIsProcessing(false);
    setStep('complete');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      parseCSV(droppedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Import Customer Master</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">CSV Format Requirements</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Your CSV file must include the following columns: Name, Email, Phone, Company, Status (active/inactive)
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Template</span>
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your CSV file here, or click to browse
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supports CSV files up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Select File
                </button>
              </div>

              {file && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                </div>
              )}

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-900">Validation Errors</h3>
                      <ul className="mt-2 space-y-1">
                        {errors.map((error, index) => (
                          <li key={index} className="text-sm text-red-700">
                            Row {error.row}: {error.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-900">Ready to Import</h3>
                    <p className="text-sm text-green-700">
                      {previewData.length} customers will be imported
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Preview Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.slice(0, 10).map((customer, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{customer.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{customer.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{customer.phone}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{customer.company}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              customer.status === 'active' 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-gray-600 bg-gray-100'
                            }`}>
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {previewData.length > 10 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                    Showing first 10 of {previewData.length} customers
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Import Successful!</h3>
                <p className="text-gray-600 mt-2">
                  {previewData.length} customers have been successfully imported to your database.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4">
          {step === 'upload' && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          
          {step === 'preview' && (
            <>
              <button
                onClick={() => setStep('upload')}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleImport}
                disabled={isProcessing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Importing...' : `Import ${previewData.length} Customers`}
              </button>
            </>
          )}
          
          {step === 'complete' && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportCustomersModal;