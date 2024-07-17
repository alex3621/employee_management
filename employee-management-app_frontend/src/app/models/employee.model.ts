export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department: string;
    position: string;
    hireDate: Date;
    address?: string;
    avatar?: string;
    gender: 'Male' | 'Female';
    birthDate: Date;
  }