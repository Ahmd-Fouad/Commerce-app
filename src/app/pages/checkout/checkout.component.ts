import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  cartId:string | null = null;
  checkOutForm!: FormGroup;
  spin: boolean = false;

  ngOnInit(): void {
    this.checkOut();
    this.getId();
  }

  checkOut(): void{
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required, Validators.minLength(6)]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]],
        city: [null,[Validators.required]]
      })
    })
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id');
      }
    })
  }

  cashPayment(): void {
    if(this.checkOutForm.valid) {
      this.spin = true;
      this.cartService.cashPayment(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
        this.spin = false;
        this.toastrService.success("Thanks for your trust", 'Success');
        this.router.navigate(['/home']);
        },
        error: (err) => {
        this.spin = false;
        console.log(err);
        this.toastrService.error(err.message, 'Failed');
        }
      })
    } else {
      this.checkOutForm.markAllAsTouched();
    }
  }

  visaPayment(): void {
    if(this.checkOutForm.valid) {
      this.spin = true;
      this.cartService.visaPayment(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          this.spin = false;
          if(res.status == 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => {
          this.spin = false;
          console.log(err);
          this.toastrService.error(err.message, 'Failed');
        }
      })
    } else {
      this.checkOutForm.markAllAsTouched();
    }
  }

}
