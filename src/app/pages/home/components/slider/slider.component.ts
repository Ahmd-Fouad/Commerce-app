import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {


  sliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause:true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
}
