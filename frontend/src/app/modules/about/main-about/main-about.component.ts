import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-main-about',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './main-about.component.html',
  styleUrl: './main-about.component.css',
})
export class MainAboutComponent {}
