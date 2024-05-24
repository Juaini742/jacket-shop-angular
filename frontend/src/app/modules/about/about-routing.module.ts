import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAboutComponent } from './main-about/main-about.component';

const routes: Routes = [
  {
    path: '',
    component: MainAboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
