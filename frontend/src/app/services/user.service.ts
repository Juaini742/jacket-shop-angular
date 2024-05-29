import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserType } from '../../interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL_PUBLIC: string = environment.public_api_url;
  URL_SECURED: string = environment.secured_api_url;

  private userIdSubject = new BehaviorSubject<UserType | null>(null);
  user$: Observable<UserType | null> = this.userIdSubject.asObservable();

  constructor(private apiService: ApiService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getUser().subscribe();
      }
    });
  }

  getUser(): Observable<any> {
    return this.apiService
      .get(`${this.URL_SECURED}/user`, { withCredentials: true })
      .pipe(
        tap((user: any) => {
          if (user && user.id) {
            this.setUser(user);
          } else {
            this.setUser(null);
          }
        }),
        catchError((err) => {
          this.setUser(null);
          console.error('something is wrong', err);
          return throwError(err);
        })
      );
  }

  register(user: any): Observable<any> {
    return this.apiService
      .post(`${this.URL_PUBLIC}/user/register`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((data: any) => {
          this.getUser().subscribe({
            next: () => {
              this.getUser().subscribe();
            },
            error: (err) => {
              console.error('Error fetching user after login:', err);
            },
          });
        })
      );
  }

  login(user: any): Observable<any> {
    return this.apiService
      .post(`${this.URL_PUBLIC}/user/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((data: any) => {
          this.getUser().subscribe({
            next: () => {
              this.getUser().subscribe();
            },
            error: (err) => {
              console.error('Error fetching user after login:', err);
            },
          });
        })
      );
  }

  update(user: any): Observable<any> {
    return this.apiService.put(`${this.URL_SECURED}/user`, user, {}).pipe(
      tap((updatedUser: any) => {
        this.setUser(updatedUser);
        this.getUser().subscribe({
          next: (value) => {
            this.getUser().subscribe();
          },
        });
      }),
      catchError((err) => {
        console.error('something is wrong', err);
        return throwError(err);
      })
    );
  }

  logout(): any {
    return this.apiService
      .post(`${this.URL_SECURED}/user`, null, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.getUser().subscribe();
          this.setUser(null);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  private setUser(user: UserType | null) {
    this.userIdSubject.next(user);
  }

  getUserData(): Observable<UserType | null> {
    return this.user$;
  }
}
