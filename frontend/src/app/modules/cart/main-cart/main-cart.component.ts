import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepThreeComponent } from '../step-three/step-three.component';

@Component({
  selector: 'app-main-cart',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  templateUrl: './main-cart.component.html',
  styleUrl: './main-cart.component.css',
})
export class MainCartComponent {}
