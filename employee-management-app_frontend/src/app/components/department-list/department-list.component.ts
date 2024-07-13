import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = []; 
  loading: boolean = false;
  error: string | null = null;

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
}