import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../core/services/product.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { SearchPipe } from '../../shared/pipes/search-pipe';


@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private readonly productService = inject(ProductService);
  allProducts: Product[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  keyword: string = "";



  ngOnInit(): void {
      this.getAllProductsData();
  }




  getAllProductsData(pageNum: number = 1) {
    this.productService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
