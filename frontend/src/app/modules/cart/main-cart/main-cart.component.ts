import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepThreeComponent } from '../step-three/step-three.component';
import { CartType } from '../../../../interfaces';
import { SelectItemService } from '../services/select-item.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  templateUrl: './main-cart.component.html',
  styleUrl: './main-cart.component.css',
})
export class MainCartComponent {
  carts: CartType[] | null = null;
  selectedItems: any[] = [];

  get total(): number {
    let totalPrice = 0;
    this.selectedItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  }
  constructor(
    private selectedItemService: SelectItemService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.selectedItemService.selectedItem$.subscribe((items) => {
      this.selectedItems = items;
    });

    this.cartService.getCart().subscribe();

    this.cartService.getCartData().subscribe((data: any) => {
      this.carts = data;
    });
  }
}
