import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, {
      withCredentials: true,
      ...options,
    }) as Observable<T>;
  }

  post<T>(url: string, body: any, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, {
      withCredentials: true,
      ...options,
    }) as Observable<T>;
  }

  put<T>(url: string, body: any, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, {
      withCredentials: true,
      ...options,
    }) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, {
      withCredentials: true,
      ...options,
    }) as Observable<T>;
  }
}
