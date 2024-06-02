import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RegisterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() isVisible: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isSubmitted = false;
  messageVisible: boolean = false;
  rootErrorMessage: string = '';
  isLoading: boolean = false;

  errorMessage: { [key: string]: (error?: any) => string } = {
    required: () => 'Field is required',
    email: () => 'Invalid email format',
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cartService: CartService
  ) {}

  toggleComponent() {
    this.toggle.emit();
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return (
      control?.invalid &&
      (control?.dirty || control?.touched || this.isSubmitted)
    );
  }

  isMessageInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(
      (control?.errors && (control?.dirty || control?.touched)) ||
      (this.isSubmitted && control?.errors)
    );
  }

  hasError(): boolean {
    for (const controlName in this.loginForm.controls) {
      if (this.isMessageInvalid(controlName)) {
        return true;
      }
    }
    return false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control && control.errors) {
      for (const errorKey in control.errors) {
        if (errorKey in this.errorMessage) {
          return this.errorMessage[errorKey](control.errors[errorKey]);
        }
      }
    }
    return '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (value) => {
          alert('Login was successfully');
          this.cartService.getCart().subscribe();
        },
        error: (err) => {
          this.rootErrorMessage = 'Something wrong, try again';
          console.error(err.error.message);
        },
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
