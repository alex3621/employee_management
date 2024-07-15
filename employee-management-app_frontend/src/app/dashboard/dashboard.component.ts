import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getTotalEmployees();
    this.getTotalDepartments();
  }

  getTotalEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      employees => this.totalEmployees = employees.length
    );
  }

  getTotalDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      departments => this.totalDepartments = departments.length
    );
  }
}