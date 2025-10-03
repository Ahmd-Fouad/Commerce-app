import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  errMsg: string = "";
  sumbit: boolean = false;
  spin: boolean = false;
  newAcc: boolean = false;
  showPass: boolean = false;
  subscribe: Subscription = new Subscription();

  regForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)])
  },


{
  validators: this.matchPass
})

  submitForm():void {
    if(this.regForm.valid) {
      this.subscribe.unsubscribe();
      this.spin = true;
      this.sumbit = false;
      this.subscribe = this.authService.register(this.regForm.value).subscribe({
        next: (res) => {
          this.spin = false;
          this.newAcc = true;
          this.sumbit = false;
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.spin = false;
          this.sumbit = true;
        }
      })
    } else {
      this.regForm.markAllAsTouched();
      this.regForm.setErrors({missmatch: true})
    }
  }


  matchPass(group: AbstractControl): null|object  {
    if (group.get('password')?.value == group.get('rePassword')?.value) {
      return null
    } else {
      group.get('rePassword')?.setErrors({missmatch:true});
      return {missmatch: true}
    }
  }

  togglePass():void {
    this.showPass = !this.showPass;
  } 
}
