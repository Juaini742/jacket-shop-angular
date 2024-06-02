import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Products } from '../../../../interfaces';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { RouterModule } from '@angular/router';
import { GlobalProductService } from '../../../services/global-product.service';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    FormsModule,
    TruncateNamePipe,
  ],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css',
})
export class BestSellerComponent {
  constructor(private globalProductService: GlobalProductService) {}

  products: Product[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.globalProductService.products$.subscribe((data) => {
      this.products = data.products;
      this.isLoading = false;
    });

    this.globalProductService
      .fetchProducts(1, 10)
      .subscribe(() => (this.isLoading = false));
  }
}
