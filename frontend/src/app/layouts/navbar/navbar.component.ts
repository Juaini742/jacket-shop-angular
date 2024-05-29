import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { CartsType, CartType, NavType, UserType } from '../../../interfaces';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from '../../components/auth/auth.component';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';

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
    ToastModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [MessageService],
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
      requiresAuth: true,
    },
  ];

  visible: boolean = false;
  searchVisible: boolean = false;
  authVisible: boolean = false;

  user: UserType | any = null;
  carts: CartType[] | null = null;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private cartService: CartService
  ) {}

  onVisible() {
    this.visible = !this.visible;
  }
  onSearchVisible() {
    this.searchVisible = !this.searchVisible;
  }
  showDialog() {
    this.authVisible = true;
  }

  onLogout() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logout was Successfully',
    });
    this.userService.logout();
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
      this.updateNavItems(user);
    });
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
      this.updateNavItems(user);
    });

    this.cartService.getCart().subscribe();

    this.cartService.getCartData().subscribe((data: any) => {
      this.carts = data;
    });
  }

  private updateNavItems(user: UserType | null) {
    const initialNavItems: NavType[] = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/shop', name: 'Shop' },
      { path: '/profile', name: 'Profile', requiresAuth: true },
    ];

    this.navItem = initialNavItems.filter((item) => {
      return !item.requiresAuth || (item.requiresAuth && user);
    });
  }
}
