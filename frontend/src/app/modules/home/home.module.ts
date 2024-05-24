import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainHomeComponent } from './main-home/main-home.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, MainHomeComponent],
})
export class HomeModule {}
