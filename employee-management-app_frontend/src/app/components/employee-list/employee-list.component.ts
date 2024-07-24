import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type SortColumn = 'name' | 'email' | 'department' | 'position' | 'hireDate';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  filterText: string = '';
  sortColumn: SortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.applyFilterAndSort();
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.employees = this.employees.filter(employee => employee.id !== id);
        this.applyFilterAndSort();
      },
      (error) => {
        console.error('Error deleting employee', error);
      }
    );
  }

  applyFilterAndSort(): void {
    const searchTerm = this.filterText.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => 
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm)
    );

    this.filteredEmployees.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (this.sortColumn) {
        case 'name':
          aValue = a.lastName + a.firstName;
          bValue = b.lastName + b.firstName;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'hireDate':
          aValue = new Date(a.hireDate);
          bValue = new Date(b.hireDate);
          break;
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onFilterChange(): void {
    this.applyFilterAndSort();
  }

  toggleSort(column: SortColumn): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }
}