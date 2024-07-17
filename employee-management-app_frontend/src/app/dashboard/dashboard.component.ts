import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,  
  imports: [CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  genderDistribution: { male: number, female: number } = { male: 0, female: 0 };
  ageDistribution: { '20-30': number, '31-40': number, '41-50': number, '51+': number } = { '20-30': 0, '31-40': 0, '41-50': 0, '51+': 0 };
  averageTenure: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeeStats();
  }

  getEmployeeStats(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.totalEmployees = employees.length;
      this.calculateGenderDistribution(employees);
      this.calculateAgeDistribution(employees);
      this.calculateAverageTenure(employees);
      this.totalDepartments = new Set(employees.map(e => e.department)).size;
    });
  }

  calculateGenderDistribution(employees: Employee[]): void {
    this.genderDistribution.male = employees.filter(e => e.gender === 'Male').length;
    this.genderDistribution.female = employees.filter(e => e.gender === 'Female').length;
  }

  calculateAgeDistribution(employees: Employee[]): void {
    const currentYear = new Date().getFullYear();
    employees.forEach(e => {
      const age = currentYear - e.birthDate.getFullYear();
      if (age <= 30) this.ageDistribution['20-30']++;
      else if (age <= 40) this.ageDistribution['31-40']++;
      else if (age <= 50) this.ageDistribution['41-50']++;
      else this.ageDistribution['51+']++;
    });
  }

  calculateAverageTenure(employees: Employee[]): void {
    const currentDate = new Date();
    const totalTenure = employees.reduce((sum, e) => {
      const tenure = (currentDate.getTime() - e.hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return sum + tenure;
    }, 0);
    this.averageTenure = totalTenure / employees.length;
  }
}