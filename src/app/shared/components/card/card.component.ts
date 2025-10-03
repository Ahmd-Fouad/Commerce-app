import { CurrencyPipe, DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService)
  @Input({required: true}) product: Product = {} as Product;


  addProductToCart(id: string): void {
    this.cartService.addProduct(id).subscribe({
      next: (res) => {
        this.toastrService.success('Product added to cart', 'Success');
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
