import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { AddressService } from '../../../services/address.service';
import { AddressType } from '../../../../interfaces';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    CommonModule,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
  providers: [MessageService],
})
export class AddressComponent {
  address: AddressType | null = null;
  addressForm = this.fb.group({
    prov: ['', Validators.required],
    regency: ['', Validators.required],
    subdistrict: ['', Validators.required],
    district: ['', Validators.required],
    completeAddress: ['', Validators.required],
  });
  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  update() {
    if (this.addressForm.invalid) {
      return;
    }

    const updatedAddress = {
      ...this.address,
      ...this.addressForm.value,
    } as AddressType;

    this.addressService.update(updatedAddress, this.address?.id).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Address updated successfully',
        });
      },
      (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error when updating address',
        });
      }
    );
  }

  ngOnInit() {
    this.addressService.getAddressData().subscribe((data) => {
      this.address = data;
      if (data) {
        this.addressForm.patchValue({
          prov: data.prov,
          regency: data.regency,
          subdistrict: data.subdistrict,
          district: data.district,
          completeAddress: data.completeAddress,
        });
      }
    });

    this.addressService.get().subscribe();
  }
}
