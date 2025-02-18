import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 

//proxy before backend implementation
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      const user = { username: username, role: 'admin' };
      const token = 'fake-jwt-token';
      const expiresIn = 3600; 
      this.setSession({ user, token, expiresIn });
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  private setSession(authResult: any) {
    const expiresAt = new Date().getTime() + authResult.expiresIn * 1000;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return Date.now() < this.getExpiration();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): number {
    const expiration = localStorage.getItem('expires_at');
    return expiration ? JSON.parse(expiration) : 0;
  }

  refreshToken(): Observable<boolean> {
    // Simulate token refresh
    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();
      const token = 'new-fake-jwt-token';
      const expiresIn = 3600; // 1 hour
      this.setSession({ user, token, expiresIn });
      return of(true);
    }
    return of(false);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of, BehaviorSubject } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://placeholder';
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor(private http: HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   login(username: string, password: string): Observable<boolean> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
//       map(response => {
//         if (response && response.token) {
//           this.setSession(response);
//           this.currentUserSubject.next(response.user);
//           return true;
//         }
//         return false;
//       }),
//       catchError(error => {
//         console.error('Login error', error);
//         return of(false);
//       })
//     );
//   }

//   private setSession(authResult: any) {
//     const expiresAt = new Date().getTime() + authResult.expiresIn * 1000;
//     localStorage.setItem('token', authResult.token);
//     localStorage.setItem('expires_at', JSON.stringify(expiresAt));
//     localStorage.setItem('user', JSON.stringify(authResult.user));
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expires_at');
//     localStorage.removeItem('user');
//     this.currentUserSubject.next(null);
//   }

//   isLoggedIn(): boolean {
//     return Date.now() < this.getExpiration();
//   }

//   isLoggedOut(): boolean {
//     return !this.isLoggedIn();
//   }

//   getExpiration(): number {
//     const expiration = localStorage.getItem('expires_at');
//     return expiration ? JSON.parse(expiration) : 0;
//   }

//   refreshToken(): Observable<boolean> {
//     return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}).pipe(
//       tap(response => {
//         if (response && response.token) {
//           this.setSession(response);
//         }
//       }),
//       map(response => !!response.token),
//       catchError(() => of(false))
//     );
//   }

//   getCurrentUser(): any {
//     return this.currentUserSubject.value;
//   }

//   private getUserFromStorage(): any {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   }
// }