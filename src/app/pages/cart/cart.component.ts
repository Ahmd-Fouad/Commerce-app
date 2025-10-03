import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cartItems: Cart = {} as Cart;
  numOfCartItems: number = 0;

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts(): void {
    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateCartProduct(id: string, count: number): void {
    this.cartService.updateProduct(id, count).subscribe({
      next: (res) => {
        this.cartItems = res.data
        this.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeCartProduct(id: string): void {
    this.cartService.removeProduct(id).subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  showWarning() {
    if(this.numOfCartItems == 0) {
      this.toastrService.warning('Please Add Some Products', 'Warning')
    }
  } 
}
