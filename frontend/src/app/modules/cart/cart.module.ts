import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgxStripeModule.forRoot(
      'pk_test_51OpVNxF9OLaL2OugKcpOle4fDph5umpwDO0LKHslP14C81U63nDAX9FsAxzLjGXiK5HwBqQyCmfVeb5W2GFYNzl600jf3I3s1D'
    ),
  ],
})
export class CartModule {}
