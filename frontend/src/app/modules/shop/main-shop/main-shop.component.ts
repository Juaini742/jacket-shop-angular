import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-main-shop',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './main-shop.component.html',
  styleUrl: './main-shop.component.css',
})
export class MainShopComponent {}
