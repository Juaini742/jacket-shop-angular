import { Component } from '@angular/core';
import { Gallery } from '../../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  gallery: string[] = [
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201315/samples/balloons.jpg',
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201295/samples/imagecon-group.jpg',
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201295/samples/ecommerce/accessories-bag.jpg',
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201290/samples/people/jazz.jpg',
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201288/samples/bike.jpg',
    'https://res.cloudinary.com/dixdqxpza/image/upload/v1710201286/samples/people/smiling-man.jpg',
  ];
}
