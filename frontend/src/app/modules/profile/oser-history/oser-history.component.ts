import { Component } from '@angular/core';
import { ProductService } from '../../home/services/product.service';
import { Product, Products } from '../../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { RouterModule } from '@angular/router';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-oser-history',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RatingModule,
    FormsModule,
    TruncateNamePipe,
    PaginatorModule,
  ],
  templateUrl: './oser-history.component.html',
  styleUrl: './oser-history.component.css',
})
export class OserHistoryComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  limit: number = 5;
  page: number = 0;
  totalProduct: number = 0;

  onPageChange(event: any) {
    this.page = event.page;
    this.limit = event.rows;
    this.fetchProducts();
  }

  fetchProducts() {
    const URL_PUBLIC_API: string = `http://localhost:8080/api/public/product?page=${
      this.page + 1
    }&limit=${this.limit}`;

    this.productService.getProducts(URL_PUBLIC_API).subscribe({
      next: (data: Products) => {
        this.products = data.products;
        this.totalProduct = data.totalProducts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }
}
