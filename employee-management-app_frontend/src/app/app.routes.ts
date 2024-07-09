import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'employees', 
    component: EmployeeListComponent, 
    canActivate: [authGuard]
  },
  { 
    path: 'employees/new', 
    component: EmployeeFormComponent, 
    canActivate: [authGuard]
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailsComponent, 
    canActivate: [authGuard]
  },
  { 
    path: 'employees/:id/edit', 
    component: EmployeeFormComponent, 
    canActivate: [authGuard]
  },
  { 
    path: 'departments', 
    component: DepartmentListComponent, 
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }