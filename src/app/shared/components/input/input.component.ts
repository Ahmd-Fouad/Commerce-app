import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input({required: true}) control: any;
  @Input({required: true}) label!: string;
  @Input({required: true}) type!: string;
  @Input({required: true}) id!: string;
  flag: boolean = false;
  showPass() {
    this.flag = !this.flag
  }
}
