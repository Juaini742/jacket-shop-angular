import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalProductService } from '../../../services/global-product.service';
import { Product } from '../../../../interfaces';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectItemService } from '../services/select-item.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, TruncateNamePipe, RadioButtonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css',
})
export class StepOneComponent {
  products: Product[] = [];
  selectedItems: any[] = [];
  quantity: number = 1;

  get total(): number {
    let totalPrice = 0;
    this.selectedItems.forEach((item) => {
      totalPrice += item.price * this.quantity;
    });
    return totalPrice;
  }

  constructor(
    private globalProductService: GlobalProductService,
    private selectedItemService: SelectItemService
  ) {}

  onAddQuantity(id: string) {
    if (this.products.find((i) => i.id === id)) {
      this.quantity += 1;
    }
  }
  onMinusQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  onCheckboxChange(event: Event, item: Product) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item);
    } else {
      const index = this.selectedItems.findIndex((i) => i.id === item.id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    this.selectedItemService.setSelected(this.selectedItems);
  }

  isSelected(item: Product): boolean {
    let initialValue = false;

    if (this.selectedItems.length > 0) {
      const isSelected = this.selectedItems.some((i) => i.id === item.id);
      initialValue = isSelected;
    }

    return initialValue;
  }

  ngOnInit() {
    this.globalProductService.products$.subscribe((data) => {
      this.products = data.products.slice(0, 5);
    });

    this.globalProductService.fetchProducts().subscribe();

    this.selectedItemService.selectedItem$.subscribe((items) => {
      this.selectedItems = items;
    });
  }
}
