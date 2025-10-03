import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category',
  imports: [CarouselModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  private readonly categoryService = inject(CategoryService);
  allCat: Category[] = [];

  ngOnInit(): void {
      this.getAllCatData();
  }





  getAllCatData() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.allCat = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


    catOptions: OwlOptions = {
    margin: 20,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: true
  }
}
