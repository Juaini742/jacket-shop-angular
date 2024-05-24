import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sponsor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsor.component.html',
  styleUrl: './sponsor.component.css',
})
export class SponsorComponent {
  sponsors = [
    'assets/images/logo.png',
    'assets/images/logo2.png',
    'assets/images/logo3.png',
    'assets/images/logo4.png',
    'assets/images/logo5.png',
    'assets/images/logo6.png',
  ];
}
