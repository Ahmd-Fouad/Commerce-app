import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './product-details.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService= inject(CartService);
  productId: string | null = null;
  productDetails: Product = {} as Product;


  ngOnInit(): void {
    this.getProductParams();
    this.getproductDetailsData();
  }


  getProductParams(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.productId = params.get('id');
      }
    )
  }

  getproductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addProductToCart(id:string): void {
    this.cartService.addProduct(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-circle-left text-2xl text-cyan-900 bg-transparent"></i>', '<i class="fa-regular fa-circle-right text-2xl text-cyan-900"></i>'],
    nav: true,
    items: 1,
    
  }

}
