import { Component } from '@angular/core';
import { Product } from '../../../../interfaces';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { GlobalProductService } from '../../../services/global-product.service';

@Component({
  selector: 'app-for-you',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    TruncateNamePipe,
    CarouselModule,
    RouterModule,
  ],
  providers: [],
  templateUrl: './for-you.component.html',
  styleUrl: './for-you.component.css',
})
export class ForYouComponent {
  constructor(private globalProductService: GlobalProductService) {}

  products: Product[] = [];
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.globalProductService.products$.subscribe((data) => {
      this.products = data.products;
    });

    this.globalProductService.fetchProducts().subscribe();

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
