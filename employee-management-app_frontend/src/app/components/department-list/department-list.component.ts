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
}