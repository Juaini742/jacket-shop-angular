import { Component } from '@angular/core';
import { ProductService } from '../../home/services/product.service';
import { Product, Products } from '../../../../interfaces';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { GlobalProductService } from '../../../services/global-product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RatingModule,
    FormsModule,
    TruncateNamePipe,
    PaginatorModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private globalProductService: GlobalProductService) {}

  products: Product[] = [];
  limit: number = 10;
  page: number = 0;
  totalProduct: number = 0;

  onPageChange(event: any) {
    this.page = event.page;
    this.limit = event.rows;
    this.globalProductService.fetchProducts(this.page, this.limit).subscribe();
  }

  ngOnInit() {
    this.globalProductService.products$.subscribe((data) => {
      this.products = data.products;
      this.totalProduct = data.totalProducts;
    });

    this.globalProductService.fetchProducts(this.page, this.limit).subscribe();
  }
}
