export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
  lastContact: string;
  status: 'active' | 'inactive';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignee: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface SupportAgent {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  permissions: Permission[];
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  level: number; // 1=Admin, 2=Manager, 3=Agent, 4=Viewer
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string; // create, read, update, delete
}