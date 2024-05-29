import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { ProductService } from '../../../modules/home/services/product.service';
import { CartsType, Product } from '../../../../interfaces';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { filter } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    RatingModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [MessageService],
})
export class ProductDetailComponent {
  @ViewChild('contentWrapper') contentWrapper: ElementRef | undefined;

  comments = [
    {
      name: 'Muhammad Arahman',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
    {
      name: 'John Doe',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
    {
      name: 'Arif Ahmad',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
    {
      name: 'Jonson',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
    {
      name: 'People Good',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
    {
      name: 'Muhammad Arsyad',
      img: 'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/smile.jpg',
    },
  ];

  productId: string = '';
  URL_API: string = '';
  product: Product | null = null;

  selectedSize: string = '';
  selectedColor: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router,
    private messageService: MessageService,
    private cartService: CartService
  ) {}

  onSaveProduct() {
    if (!this.selectedSize) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select one size',
      });
      return;
    }
    if (!this.selectedColor) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'please select a color',
      });
      return;
    }

    const productId = this.product?.id;

    const data = {
      productId,
      quantity: this.quantity,
      size: this.selectedSize,
      color: this.selectedColor,
    };

    this.cartService.addCart(data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product saved Successfully!',
        });
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please login if you want to save this product',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'The product has been saved in your cart.',
          });
        }
      },
    });
  }

  onAddQuantity() {
    this.quantity += 1;
  }
  onMinusQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  onSizeChange(size: string) {
    this.selectedSize = size;
  }

  onColorChange(color: string) {
    this.selectedColor = color;
  }

  ngAfterViewInit() {
    if (this.contentWrapper) {
      this.contentWrapper.nativeElement.scrollTop = 0;
    }
  }

  goBack() {
    if (this.location) {
      this.location.back();
    }
  }

  fetchProduct() {
    this.URL_API = `http://localhost:8080/api/public/product/${this.productId}`;
    this.productService.getProducts(this.URL_API).subscribe({
      next: (data: any) => {
        this.product = data;
      },
      error(err) {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') ?? '';
      this.fetchProduct();
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
