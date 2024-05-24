import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { NavType } from '../../../interfaces';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from '../../components/auth/auth.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    DialogModule,
    ButtonModule,
    AuthComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navItem: NavType[] = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/about',
      name: 'About',
    },
    {
      path: '/shop',
      name: 'Shop',
    },
    {
      path: '/profile',
      name: 'Profile',
    },
  ];

  visible: boolean = false;
  searchVisible: boolean = false;
  authVisible: boolean = false;

  onVisible() {
    this.visible = !this.visible;
  }
  onSearchVisible() {
    this.searchVisible = !this.searchVisible;
  }
  showDialog() {
    this.authVisible = true;
  }
}
