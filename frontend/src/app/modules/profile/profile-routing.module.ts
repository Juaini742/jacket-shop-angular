import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { OserHistoryComponent } from './oser-history/oser-history.component';

const routes: Routes = [
  {
    path: '',
    component: MainProfileComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'order-history',
        component: OserHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
