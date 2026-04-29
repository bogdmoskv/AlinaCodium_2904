import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  submitted = false; //флаг, нажал из пользователь уже кнопку "Зарегистрироваться". Нужен, чтобы
  //показывать ошибки под полями только после попытки отправки, а не сразу при открытии страницы
  showPassword = false; //переключатель "показать/скрыть пароль" для иконки в шаблоне
  submitting = false; //флаг состояния в компоненте: идет ли сейчас отправка формы на сервер
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const g = control as FormGroup;
    const password = g.get('password')?.value;
    const confirm = g.get('confirmPassword')?.value;
    if (!password || !confirm) return null;
    return password === confirm ? null : { mismatch: true };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    //console.log("Register: ", this.form.value);

    const { name, email, password } = this.form.value;
    this.submitting = true;
    this.auth
      .register({ name, email, password })
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: (res) => {
          this.auth.setSession(res);
          this.router.navigate(['/']);
        },
        error: (err: Error) => {
          this.errorMessage = err.message;
        }
      });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
