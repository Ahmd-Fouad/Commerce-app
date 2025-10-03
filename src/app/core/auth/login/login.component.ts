import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  errMsg: string = "";
  succMsg:  string = "";
  submit: boolean = false;
  spin: boolean = false;
  showPass: boolean = false;
  subscribe: Subscription = new Subscription();

  logForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  submitForm(): void {
    if (this.logForm.valid) {
      this.subscribe.unsubscribe();
      this.submit = false;
      this.spin = true;
      this.subscribe = this.authService.login(this.logForm.value).subscribe({
        next: (res) => {
          this.spin = false;
          this.submit = false;
          this.succMsg = res.message;
          this.cookieService.set('token', res.token);
          setTimeout(() => {
            this.router.navigate(["/home"])
          }, 1500);
        }, 
        error: (err) => {
          this.spin = false;
          this.submit = true;
          this.errMsg = err.error.message;
        }
      })
    }
}

togglePass():void {
  this.showPass = !this.showPass;
}


}