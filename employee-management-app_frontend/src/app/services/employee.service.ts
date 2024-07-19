import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      department: 'IT',
      position: 'Software Developer',
      hireDate: new Date('2020-01-15'),
      address: '123 Main St, Anytown, USA',
      avatar: 'https://example.com/avatars/john.jpg',
      gender: 'Male',
      birthDate: new Date('1990-05-15'),
      salary: 75000,
      currency: 'USD',
      payFrequency: 'Biweekly',
      lastPayRaise: new Date('2023-01-01')
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      department: 'HR',
      position: 'HR Manager',
      hireDate: new Date('2019-05-20'),
      address: '456 Oak Rd, Somewhere, USA',
      avatar: 'https://example.com/avatars/jane.jpg',
      gender: 'Female',
      birthDate: new Date('1985-09-22'),
      salary: 85000,
      currency: 'USD',
      payFrequency: 'Monthly',
      lastPayRaise: new Date('2022-11-15')
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      department: 'Finance',
      position: 'Accountant',
      hireDate: new Date('2021-03-10'),
      avatar: 'https://example.com/avatars/bob.jpg',
      gender: 'Male',
      birthDate: new Date('1992-11-30'),
      salary: 65000,
      currency: 'USD',
      payFrequency: 'Biweekly'
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@example.com',
      phone: '555-123-4567',
      department: 'Marketing',
      position: 'Marketing Specialist',
      hireDate: new Date('2018-11-05'),
      address: '789 Pine Lane, Elsewhere, USA',
      gender: 'Female',
      birthDate: new Date('1988-07-14'),
      salary: 70000,
      currency: 'USD',
      payFrequency: 'Biweekly',
      lastPayRaise: new Date('2023-03-01')
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie.davis@example.com',
      department: 'Operations',
      position: 'Operations Manager',
      hireDate: new Date('2017-08-22'),
      gender: 'Male',
      birthDate: new Date('1980-03-08'),
      salary: 90000,
      currency: 'USD',
      payFrequency: 'Monthly',
      lastPayRaise: new Date('2022-12-01')
    }
  ];

  private apiUrl = 'http://localhost:8080/api/employees'; 
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {

    //using mock data for now
    return of(this.mockEmployees)
    // return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee | undefined> {
    const employee = this.mockEmployees.find(emp => emp.id === id);
    return of(employee);
  }
  // getEmployee(id: number): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  // }

  createEmployee(employee: Employee): Observable<Employee> {
    const newId = Math.max(...this.mockEmployees.map(emp => emp.id)) + 1;
    const newEmployee = { ...employee, id: newId };
    this.mockEmployees.push(newEmployee);
    return of(newEmployee);
  }
  // createEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(this.apiUrl, employee);
  // }


  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { ...employee, id };
      return of(this.mockEmployees[index]);
    }
    return of(employee);
  }
  // updateEmployee(id: number, employee: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  // }


  deleteEmployee(id: number): Observable<void> {
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees.splice(index, 1);
    }
    return of(undefined);
  }
  // deleteEmployee(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}