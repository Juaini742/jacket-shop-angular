import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Products } from '../../interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalProductService {
  private productsSubject = new BehaviorSubject<Products>({
    products: [],
    page: 0,
    totalPage: 0,
    totalProducts: 0,
  });
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchProducts(page?: number, limit?: number): Observable<Products> {
    const URL_PUBLIC_API: string = `${environment.public_api_url}/products?page=${page}&limit=${limit}`;

    return this.http.get<Products>(URL_PUBLIC_API).pipe(
      tap((data: Products) => {
        this.productsSubject.next(data);
      })
    );
  }
}
