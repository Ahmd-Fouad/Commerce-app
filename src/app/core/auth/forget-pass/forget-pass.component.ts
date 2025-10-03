import { routes } from './../../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css'
})
export class ForgetPassComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  stepper: number =1;
  spin: boolean = false;
  succMsg: string = "";
  sumbitMail!: FormGroup;
  sumbitCode!: FormGroup;
  newPass!: FormGroup;

  ngOnInit(): void {
    this.initForms()
  }

  resetPassEmail(data: object): void{
    if(this.sumbitMail.valid) {
      this.spin = true;
      this.authService.resetPassMail(data).subscribe({
      next: (res) => {
        this.spin = false;
        this.succMsg = "Check Your Email";
        setTimeout(() => {
          this.succMsg = "";
          this.stepper++;
        }, 1500);
      },
      error: (err) => {
        this.spin = false;
        this.succMsg = "false";
      }
    })
    }
  }

  resetPassCode(data: object): void{
    if(this.sumbitCode.valid) {
      this.spin = true;
    this.authService.resetPassCode(data).subscribe({
      next: (res) => {
        this.spin = false;
        this.succMsg = "Successful Varification";
        setTimeout(() => {
          this.succMsg = "";
          this.stepper++;
        }, 1500);
      },
      error: (err) => {
        this.spin = false;
        this.succMsg = "false";
      }
    })
    }
  }

  resetPassNewPass(data: object): void{
    if(this.newPass.valid){
      this.spin = true;
      this.authService.resetPassNewPass(data).subscribe({
      next: (res) => {
        this.spin = false;
        this.succMsg = "Password reset successfully";
        setTimeout(() => {
          this.succMsg = "";
          this.router.navigate(["/login"]);
        }, 2000);
      }
    })
    }
  }

  initForms(): void {
    this.sumbitMail = this.fb.group({
      'email': [null, [Validators.required, Validators.email]]
    })

    this.sumbitCode = this.fb.group({
      'resetCode': [null, [Validators.required]]
    })

    this.newPass = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'newPassword': [null, [Validators.required, Validators.minLength(6)]],
    })
  }
}
