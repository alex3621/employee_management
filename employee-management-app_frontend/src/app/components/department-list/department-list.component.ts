import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = []; 
  filteredDepartments: Department[] = [];
  loading: boolean = false;
  error: string | null = null;
  sortField: 'name' | 'employeeCount' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  filterText: string = '';
  editingDepartment: Department | null = null;
  editingName: string = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.error = null;
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.applyFilterAndSort();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching departments', error);
        this.error = 'Failed to load departments. Please try again later.';
        this.loading = false;
      }
    });
  }

  addDepartment(): void {
    this.departmentService.getNewestId().subscribe(newestId => {
      const newDepartment: Department = {
        id: newestId,
        name: `New Department ${newestId}`,
        employeeCount: 0
      };
  
      this.departmentService.createDepartment(newDepartment).subscribe({
        next: (createdDepartment) => {
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error creating department', error);
          this.error = 'Failed to create department. Please try again later.';
        }
      });
    });
  }

  deleteDepartment(department: Department): void {
    if (confirm(`Are you sure you want to delete ${department.name}?`)) {
      this.departmentService.deleteDepartment(department.id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (error) => {
          console.error('Error deleting department', error);
          this.error = 'Failed to delete department. Please try again later.';
        }
      });
    }
  }

  startEdit(department: Department): void {
    this.editingDepartment = { ...department };
    this.editingName = department.name;
  }

  saveEdit(): void {
    if (this.editingDepartment) {
      const updatedDepartment = { ...this.editingDepartment, name: this.editingName };
      this.departmentService.updateDepartment(updatedDepartment.id, updatedDepartment).subscribe({
        next: (updatedDept) => {
          if (updatedDept) {
            const index = this.departments.findIndex(d => d.id === updatedDept.id);
            if (index !== -1) {
              this.departments[index] = updatedDept;
            }
            this.applyFilterAndSort();
          }
          this.editingDepartment = null;
          this.editingName = '';
        },
        error: (error) => {
          console.error('Error updating department', error);
          this.error = 'Failed to update department. Please try again later.';
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingDepartment = null;
    this.editingName = '';
  }

  applyFilterAndSort(): void {
    this.filteredDepartments = this.departments.filter(dept => 
      dept.name.toLowerCase().includes(this.filterText.toLowerCase())
    );

    this.filteredDepartments.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  toggleSort(field: 'name' | 'employeeCount'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }

  onFilterChange(): void {
    this.applyFilterAndSort();
  }
}