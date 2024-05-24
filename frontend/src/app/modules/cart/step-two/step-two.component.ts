import { Component } from '@angular/core';
import { SelectItemService } from '../services/select-item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent {
  constructor(private selectedItemService: SelectItemService) {}
  datas: any[] = [];

  ngOnInit() {
    this.datas = this.selectedItemService.getSelected();
  }
}
