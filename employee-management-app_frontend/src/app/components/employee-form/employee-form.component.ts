import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
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
      email: ['', [Validators.required, Validators.email]]
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
      (employee: Employee) => {
        this.employeeForm.patchValue(employee);
      },
      (error) => {
        console.error('Error loading employee', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
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