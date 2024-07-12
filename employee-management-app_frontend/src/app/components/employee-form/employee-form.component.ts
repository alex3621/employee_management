import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: ['', Validators.required],
      position: ['', Validators.required],
      hireDate: ['', Validators.required],
      address: [''],
      avatar: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe(
      (employee: Employee | undefined) => {
        if (employee) {
          this.employeeForm.patchValue({
            ...employee,
            hireDate: this.formatDate(employee.hireDate)
          });
        } else {
          console.error('Employee not found');
          this.router.navigate(['/employees']);
        }
      },
      (error) => {
        console.error('Error loading employee', error);
      }
    );
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        ...this.employeeForm.value,
        hireDate: new Date(this.employeeForm.value.hireDate)
      };
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, employee).subscribe(
          () => {
            this.router.navigate(['/employees']);
          },
          (error) => {
            console.error('Error updating employee', error);
          }
        );
      } else {
        this.employeeService.createEmployee(employee).subscribe(
          () => {
            this.router.navigate(['/employees']);
          },
          (error) => {
            console.error('Error creating employee', error);
          }
        );
      }
    }
  }
}