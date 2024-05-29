import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  URL_SECURED: string = 'http://localhost:8080/api/secured/checkout';
  constructor(private apiService: ApiService) {}

  checkout(products: any): Observable<any> {
    return this.apiService.post(this.URL_SECURED, products, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
