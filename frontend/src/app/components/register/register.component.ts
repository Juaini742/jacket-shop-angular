import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    LoginComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Input() isVisible: boolean = true;
  @Output() toggle = new EventEmitter<void>();

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isSubmitted = false;

  errorMessage: { [key: string]: (error?: any) => string } = {
    required: () => 'Field is required',
    email: () => 'Invalid email format',
    minlength: (error: any) =>
      `Minimum length is ${error.requiredLength} characters`,
  };

  constructor(private fb: FormBuilder, private userService: UserService) {}

  toggleComponent() {
    this.toggle.emit();
  }

  isControlValid(controlName: string): boolean | undefined {
    const control = this.registerForm.get(controlName);
    return (
      control?.invalid &&
      (control?.dirty || control?.touched || this.isSubmitted)
    );
  }

  isMessageInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(
      (control?.errors && (control?.dirty || control?.touched)) ||
      (this.isSubmitted && control?.errors)
    );
  }

  hasError(): boolean {
    for (const controlName in this.registerForm.controls) {
      if (this.isMessageInvalid(controlName)) {
        return true;
      }
    }
    return false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
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
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next() {
          alert('success');
        },
        error(err) {
          console.error(err);
        },
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
