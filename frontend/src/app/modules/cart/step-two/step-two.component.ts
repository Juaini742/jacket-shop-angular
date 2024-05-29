import { Component, Input, ViewChild } from '@angular/core';
import { SelectItemService } from '../services/select-item.service';
import { CommonModule } from '@angular/common';
import { AddressType, UserType } from '../../../../interfaces';
import { UserService } from '../../../services/user.service';
import { AddressService } from '../../../services/address.service';
import { CheckoutService } from '../../../services/checkout.service';
import {
  NgxStripeModule,
  provideNgxStripe,
  StripeCardComponent,
  StripeService,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ''

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, NgxStripeModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  @Input() total: number = 0;
  @Input() selectedItems: any[] = [];
  user: UserType | null = null;
  address: AddressType | null = null;
  @ViewChild(StripeCardComponent) card: StripeCardComponent | any = null;
  constructor(
    private selectedItemService: SelectItemService,
    private userService: UserService,
    private addressService: AddressService,
    private checkoutService: CheckoutService,
    private stripeService: StripeService
  ) {}
  datas: any[] = [];

  cartOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementOptions: StripeElementsOptions = {
    locale: 'en',
  };

  onCheckout() {
    if (this.selectedItems.length > 0) {
      this.stripeService
        .createToken(this.card.element, { name: this.user?.username })
        .subscribe((result) => {
          if (result.token) {
            const products = { products: this.selectedItems?.[0] };
            this.checkoutService.checkout(products).subscribe(
              (response) => {
                console.log('Payment successful', response);
              },
              (error) => {
                console.error('Payment error', error);
              }
            );
          } else if (result.error) {
            console.error('Error creating token', result.error.message);
          }
        });
    }
  }

  ngOnInit() {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
    });

    this.addressService.getAddressData().subscribe((data) => {
      this.address = data;
    });

    this.addressService.get().subscribe();
    this.datas = this.selectedItemService.getSelected();
  }
}
