import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { CartType } from '../../../../interfaces';
import { TruncateNamePipe } from '../../../pipes/truncate-name.pipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectItemService } from '../services/select-item.service';
import { CartService } from '../../../services/cart.service';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    CommonModule,
    TruncateNamePipe,
    RadioButtonModule,
    ConfirmPopupModule,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css',
  providers: [ConfirmationService, MessageService],
})
export class StepOneComponent {
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  @Input() carts: CartType[] | null = null;
  @Input() total: number = 0;
  @Input() selectedItems: any[] = [];

  constructor(
    private selectedItemService: SelectItemService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  accept() {
    this.confirmPopup.accept();
  }

  reject() {
    this.confirmPopup.reject();
  }

  onAddQuantity(id: string) {
    const cart = this.carts?.find((i) => i.id === id);
    if (cart) {
      cart.quantity += 1;
      this.cartService.updateCart(cart).subscribe({
        error(err) {
          console.error(err);
        },
      });
    }
  }

  onMinusQuantity(id: string) {
    const cart = this.carts?.find((i) => i.id === id);
    if (cart && cart.quantity > 1) {
      cart.quantity -= 1;
      this.cartService.updateCart(cart).subscribe({
        error(err) {
          console.error(err);
        },
      });
    }
  }

  onCheckboxChange(event: Event, item: CartType) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item);
      console.log(this.selectedItems?.[0]);
    } else {
      const index = this.selectedItems.findIndex((i) => i.id === item.id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    this.selectedItemService.setSelected(this.selectedItems);
  }

  isSelected(item: CartType): boolean {
    let initialValue = false;

    if (this.selectedItems.length > 0) {
      const isSelected = this.selectedItems.some((i) => i.id === item.id);
      initialValue = isSelected;
    }

    return initialValue;
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: 'Do you want to delete this product?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.cartService.deleteCart(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Delete product successfully',
              life: 3000,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Your product is save',
          life: 3000,
        });
      },
    });
  }
}
