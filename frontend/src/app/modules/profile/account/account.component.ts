import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { UserService } from '../../../services/user.service';
import { UserType } from '../../../../interfaces';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [MessageService],
})
export class AccountComponent {
  user: UserType | null = null;
  userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    born: ['', Validators.required],
    job: ['', Validators.required],
    phone: ['', Validators.required],
  });
  isLoading: boolean = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (this.userForm?.invalid) {
      return;
    }

    this.isLoading = true;

    const updateUser: UserType = {
      ...this.user,
      ...this.userForm?.value,
    } as UserType;

    this.userService.update(updateUser).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User updated successfully',
        });
      },
      (err) => {
        console.error('Error updating user:', err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error when updating user',
        });
      }
    );
  }

  ngOnInit() {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
      if (user) {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          gender: user.gender,
          born: user.born,
          job: user.job,
          phone: user.phone,
        });
      }
    });
  }
}
