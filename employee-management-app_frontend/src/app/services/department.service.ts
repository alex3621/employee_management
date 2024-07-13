import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/api/departments';
  
  //mock data array
  private departments: Department[] = [
    { id: 1, name: 'Human Resources', employeeCount: 15 },
    { id: 2, name: 'Marketing', employeeCount: 25 },
    { id: 3, name: 'Engineering', employeeCount: 40 },
    { id: 4, name: 'Finance', employeeCount: 10 },
    { id: 5, name: 'Sales', employeeCount: 30 }
  ];

  // constructor(private http: HttpClient) { }
  constructor() { }


  getDepartments(): Observable<Department[]> {
    return of(this.departments);
  }

  getDepartment(id: number): Observable<Department | undefined> {
    const department = this.departments.find(d => d.id === id);
    return of(department);
  }

  createDepartment(department: Department): Observable<Department> {
    const newId = Math.max(...this.departments.map(d => d.id)) + 1;
    const newDepartment = { ...department, id: newId };
    this.departments.push(newDepartment);
    return of(newDepartment);
  }

  updateDepartment(id: number, department: Department): Observable<Department | undefined> {
    const index = this.departments.findIndex(d => d.id === id);
    if (index !== -1) {
      this.departments[index] = { ...department, id };
      return of(this.departments[index]);
    }
    return of(undefined);
  }

  deleteDepartment(id: number): Observable<boolean> {
    const index = this.departments.findIndex(d => d.id === id);
    if (index !== -1) {
      this.departments.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  getNewestId(): Observable<number> {
    const maxId = this.departments.length > 0 
      ? Math.max(...this.departments.map(d => d.id)) 
      : 0;
    return of(maxId + 1);
  }

  // getDepartments(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // getDepartment(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // createDepartment(department: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, department);
  // }

  // updateDepartment(id: number, department: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, department);
  // }

  // deleteDepartment(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${id}`);
  // }
}