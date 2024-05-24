import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { Categories } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getCategory = (url: string): Observable<Categories> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };
}
