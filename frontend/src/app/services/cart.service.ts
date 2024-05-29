import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { CartsType, CartType } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  URL_PRIVATE: string = 'http://localhost:8080/api/secured/cart';
  private cartSubject = new BehaviorSubject<CartType | null>(null);
  cart$: Observable<CartType | null> = this.cartSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getCart(): Observable<any> {
    return this.apiService.get(this.URL_PRIVATE, {}).pipe(
      tap((data: any) => this.setCart(data)),
      catchError((err) => {
        console.error('Error fetching cart data:', err);
        return throwError(err);
      })
    );
  }

  addCart(data: any): Observable<any> {
    return this.apiService.post(this.URL_PRIVATE, data, {}).pipe(
      tap(() => this.getCart().subscribe()),
      catchError((err) => {
        console.error('something is wrong', err);
        return throwError(err);
      })
    );
  }

  updateCart(data: any): Observable<any> {
    return this.apiService.put(
      `${this.URL_PRIVATE}/${data.id}`,
      { quantity: data.quantity },
      {}
    );
  }

  deleteCart(id: string): Observable<any> {
    return this.apiService.delete(`${this.URL_PRIVATE}/${id}`, {}).pipe(
      tap(() => this.getCart().subscribe()),
      catchError((err) => {
        console.error('something is wrong', err);
        return throwError(err);
      })
    );
  }

  private setCart(cart: CartType | null) {
    this.cartSubject.next(cart);
  }

  getCartData(): Observable<CartType | null> {
    return this.cart$;
  }
}
