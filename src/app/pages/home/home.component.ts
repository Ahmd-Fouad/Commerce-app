import { Component } from '@angular/core';
import { CategoryComponent } from "./components/category/category.component";
import { PopularComponent } from "./components/popular/popular.component";
import { SliderComponent } from "./components/slider/slider.component";

@Component({
  selector: 'app-home',
  imports: [PopularComponent, SliderComponent, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
