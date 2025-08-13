import { Customer, Ticket, SupportAgent } from '../types';
import { User, UserRole, Permission } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    createdAt: '2024-01-15',
    lastContact: '2024-12-20',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@techstart.io',
    phone: '+1 (555) 987-6543',
    company: 'TechStart Inc',
    createdAt: '2024-02-10',
    lastContact: '2024-12-18',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@solutions.net',
    phone: '+1 (555) 456-7890',
    company: 'Business Solutions LLC',
    createdAt: '2024-01-20',
    lastContact: '2024-12-15',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@innovate.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Systems',
    createdAt: '2024-03-05',
    lastContact: '2024-12-19',
    status: 'active'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 'TK-001',
    title: 'Login Authentication Issues',
    description: 'User unable to log in to the system after password reset. Getting error message about invalid credentials.',
    customerId: '1',
    customerName: 'John Smith',
    priority: 'high',
    status: 'open',
    assignee: 'Alice Johnson',
    createdAt: '2024-12-20',
    updatedAt: '2024-12-20',
    category: 'Authentication'
  },
  {
    id: 'TK-002',
    title: 'Data Export Feature Not Working',
    description: 'Customer reports that the CSV export feature is not generating files correctly. Files appear to be empty.',
    customerId: '2',
    customerName: 'Sarah Johnson',
    priority: 'medium',
    status: 'in-progress',
    assignee: 'Bob Wilson',
    createdAt: '2024-12-19',
    updatedAt: '2024-12-20',
    category: 'Feature Request'
  },
  {
    id: 'TK-003',
    title: 'Slow Dashboard Performance',
    description: 'Dashboard takes over 30 seconds to load. Customer has tried multiple browsers with same result.',
    customerId: '4',
    customerName: 'Emily Chen',
    priority: 'medium',
    status: 'resolved',
    assignee: 'Carol Brown',
    createdAt: '2024-12-18',
    updatedAt: '2024-12-19',
    category: 'Performance'
  },
  {
    id: 'TK-004',
    title: 'Mobile App Crashing',
    description: 'Mobile application crashes when trying to upload images. Occurs on both iOS and Android devices.',
    customerId: '1',
    customerName: 'John Smith',
    priority: 'urgent',
    status: 'open',
    assignee: 'David Lee',
    createdAt: '2024-12-20',
    updatedAt: '2024-12-20',
    category: 'Bug Report'
  },
  {
    id: 'TK-005',
    title: 'Account Billing Inquiry',
    description: 'Customer has questions about recent billing charges and wants detailed breakdown of services.',
    customerId: '3',
    customerName: 'Mike Davis',
    priority: 'low',
    status: 'closed',
    assignee: 'Alice Johnson',
    createdAt: '2024-12-15',
    updatedAt: '2024-12-16',
    category: 'Billing'
  }
];

export const mockAgents: SupportAgent[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Senior Support' },
  { id: '2', name: 'Bob Wilson', email: 'bob.wilson@company.com', role: 'Technical Support' },
  { id: '3', name: 'Carol Brown', email: 'carol.brown@company.com', role: 'Support Specialist' },
  { id: '4', name: 'David Lee', email: 'david.lee@company.com', role: 'Technical Support' }
];

export const mockPermissions: Permission[] = [
  { id: '1', name: 'View Dashboard', resource: 'dashboard', action: 'read' },
  { id: '2', name: 'Manage Tickets', resource: 'tickets', action: 'create' },
  { id: '3', name: 'Edit Tickets', resource: 'tickets', action: 'update' },
  { id: '4', name: 'Delete Tickets', resource: 'tickets', action: 'delete' },
  { id: '5', name: 'View Customers', resource: 'customers', action: 'read' },
  { id: '6', name: 'Manage Customers', resource: 'customers', action: 'create' },
  { id: '7', name: 'Edit Customers', resource: 'customers', action: 'update' },
  { id: '8', name: 'Delete Customers', resource: 'customers', action: 'delete' },
  { id: '9', name: 'View Reports', resource: 'reports', action: 'read' },
  { id: '10', name: 'Manage Users', resource: 'users', action: 'create' },
  { id: '11', name: 'Edit Users', resource: 'users', action: 'update' },
  { id: '12', name: 'Delete Users', resource: 'users', action: 'delete' },
  { id: '13', name: 'System Settings', resource: 'settings', action: 'update' }
];

export const mockRoles: UserRole[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    level: 1
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage teams and view reports',
    level: 2
  },
  {
    id: '3',
    name: 'Support Agent',
    description: 'Handle customer tickets and inquiries',
    level: 3
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to system data',
    level: 4
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: mockRoles[0],
    department: 'IT',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-12-20',
    permissions: mockPermissions
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    role: mockRoles[1],
    department: 'Support',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-19',
    permissions: mockPermissions.filter(p => !['users', 'settings'].includes(p.resource))
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    role: mockRoles[2],
    department: 'Support',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-12-20',
    permissions: mockPermissions.filter(p => ['dashboard', 'tickets', 'customers'].includes(p.resource) && p.action !== 'delete')
  },
  {
    id: '4',
    name: 'Carol Brown',
    email: 'carol.brown@company.com',
    role: mockRoles[2],
    department: 'Support',
    status: 'active',
    createdAt: '2024-02-10',
    lastLogin: '2024-12-18',
    permissions: mockPermissions.filter(p => ['dashboard', 'tickets', 'customers'].includes(p.resource) && p.action !== 'delete')
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@company.com',
    role: mockRoles[3],
    department: 'Sales',
    status: 'active',
    createdAt: '2024-03-01',
    lastLogin: '2024-12-17',
    permissions: mockPermissions.filter(p => p.action === 'read')
  }
];