import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AddressType, UserType } from '../../../../interfaces';
import { AddressService } from '../../../services/address.service';
import { SelectItemService } from '../services/select-item.service';
import {
  NgxStripeModule,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeService,
} from 'ngx-stripe';
import {
  Stripe,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    ToastModule,
    CommonModule,
    NgxStripeModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
  providers: [MessageService],
})
export class StepTwoComponent {
  @Input() total: number = 0;
  @Input() selectedItems: any[] = [];
  @Input() isEmpty: boolean = true;
  user: UserType | null = null;
  address: AddressType | null = null;
  stripe: Stripe | null = null;
  isUserAndAddress: boolean = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private addressService: AddressService
  ) {}

  // cartOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       iconColor: '#666EE8',
  //       color: '#31325F',
  //       lineHeight: '40px',
  //       fontWeight: 300,
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSize: '18px',
  //       '::placeholder': {
  //         color: '#CFD7E0',
  //       },
  //     },
  //   },
  // };

  // elementOptions: StripeElementsOptions = {
  //   locale: 'en',
  // };

  checkout() {
    if (
      !this.user ||
      !this.address ||
      Object.values(this.user).some((value) => !value) ||
      Object.values(this.address).some((value) => !value)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please update user data and address before checkout.',
      });
      return;
    }

    const products = { products: this.selectedItems };
    this.http
      .post(
        'https://jacketapi.jcraftstudio.my.id//api/secured/checkout',
        products,
        {
          withCredentials: true,
        }
      )
      .pipe(
        switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session?.id,
          });
        })
      )
      .subscribe((result) => {
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

  ngOnInit() {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
    });

    this.addressService.getAddressData().subscribe((data) => {
      this.address = data;
    });

    this.addressService.get().subscribe();
  }
}
