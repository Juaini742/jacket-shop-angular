import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { AccountComponent } from '../account/account.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { OserHistoryComponent } from '../oser-history/oser-history.component';

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    SplitterModule,
    RouterModule,
    AccountComponent,
    AddressComponent,
    OserHistoryComponent,
  ],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css',
})
export class MainProfileComponent {}
