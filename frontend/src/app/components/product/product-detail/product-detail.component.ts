import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../modules/home/services/product.service';
import { Product } from '../../../../interfaces';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    RatingModule,
    RouterModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent  {
  @ViewChild('contentWrapper') contentWrapper: ElementRef | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}
  productId: string = '';
  URL_API: string = '';
  product: Product | null = null;

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
        console.log(data);
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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
