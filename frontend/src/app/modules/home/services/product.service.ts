import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { Products } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts = (url: string): Observable<Products> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };
}
