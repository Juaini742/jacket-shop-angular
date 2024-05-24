import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { SponsorComponent } from '../sponsor/sponsor.component';
import { ForYouComponent } from '../for-you/for-you.component';
import { CategoryComponent } from '../category/category.component';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { PromoComponent } from '../promo/promo.component';
import { ArticleComponent } from '../article/article.component';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [
    HeroComponent,
    SponsorComponent,
    ForYouComponent,
    CategoryComponent,
    BestSellerComponent,
    PromoComponent,
    ArticleComponent,
    GalleryComponent,
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.css',
})
export class MainHomeComponent {}
