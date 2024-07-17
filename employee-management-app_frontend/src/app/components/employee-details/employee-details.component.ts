import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null | undefined = null;
  loading: boolean = true;
  error: string | null = null;
  showDeleteConfirmation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployee(+id);
    } else {
      this.error = 'Employee ID not provided';
      this.loading = false;
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.error = null;
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.employee = data || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employee details', error);
        this.error = 'Failed to load employee details. Please try again later.';
        this.loading = false;
      }
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  editEmployee(): void {
    if (this.employee) {
      this.router.navigate(['/employees', this.employee.id, 'edit']);
    }
  }

  confirmDelete(): void {
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  deleteEmployee(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error deleting employee', error);
          this.error = 'Failed to delete employee. Please try again later.';
        }
      });
    }
  }

  retry(): void {
    if (this.employee) {
      this.loadEmployee(this.employee.id);
    } else {
      this.loadEmployeeDetails();
    }
  }
}