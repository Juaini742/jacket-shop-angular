import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgxStripeModule.forRoot(environment.stripe_publishable_key),
  ],
})
export class CartModule {}
