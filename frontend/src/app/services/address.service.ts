import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AddressType } from '../../interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  URL_SECURED: string = `${environment.secured_api_url}/address`;
  private addressSubject = new BehaviorSubject<AddressType | null>(null);
  address$: Observable<AddressType | null> = this.addressSubject.asObservable();
  constructor(private apiService: ApiService) {}

  get(): Observable<any> {
    return this.apiService.get(this.URL_SECURED, {}).pipe(
      tap((data: any) => {
        this.setAddress(data);
      }),
      catchError((err) => {
        this.setAddress(null);
        console.error('something is wrong', err);
        return throwError(err);
      })
    );
  }

  update(data: any, id: string | undefined): Observable<any> {
    return this.apiService.put(`${this.URL_SECURED}/${id}`, data, {}).pipe(
      tap((updatedData) => {
        this.setAddress(updatedData);
        this.get().subscribe({
          next: () => {
            this.get().subscribe();
          },
        }),
          catchError((err) => {
            this.setAddress(null);
            console.error('something is wrong', err);
            return throwError(err);
          });
      })
    );
  }

  private setAddress(address: AddressType | null) {
    this.addressSubject.next(address);
  }

  getAddressData(): Observable<AddressType | null> {
    return this.address$;
  }
}
