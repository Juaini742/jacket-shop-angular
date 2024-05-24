import { Component } from '@angular/core';
import { Article } from '../../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  articles: Article[] = [
    {
      img: 'assets/images/article.jpg',
      title: 'Close-up of Blue Fabric',
    },
    {
      img: 'assets/images/article2.jpg',
      title: 'Organic sackcloth with thin fibers and crumpled surface',
    },
    {
      img: 'assets/images/article3.jpg',
      title: 'Retro Fabric with Bird Print',
    },
    {
      img: 'assets/images/article4.jpg',
      title: 'Close-Up Shot of Dark Blue Knit Textile',
    },
    {
      img: 'assets/images/article5.jpg',
      title: 'Ripples on a Red Silk Fabric',
    },
    {
      img: 'assets/images/article6.jpg',
      title: 'Colorful Textiles',
    },
  ];
}
