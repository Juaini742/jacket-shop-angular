import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category, Categories } from '../../../../interfaces';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService) {}

  URL_PUBLIC_API: string = `${environment.public_api_url}/category`;
  categories: Category[] = [];

  fetchingData() {
    this.categoryService.getCategory(this.URL_PUBLIC_API).subscribe({
      next: (data: Categories) => {
        this.categories = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.fetchingData();
  }
}
