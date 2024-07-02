import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'employees/:id/edit', component: EmployeeFormComponent },
  { path: 'departments', component: DepartmentListComponent },
];