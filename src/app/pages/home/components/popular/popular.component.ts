import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-popular',
  imports: [CardComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {
  private readonly productService = inject(ProductService);

  allProducts: Product[] = [];

  ngOnInit(): void {
      this.getAllProductsData();
  }


  getAllProductsData() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
