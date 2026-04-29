import { Component, OnInit } from '@angular/core';
import { ProductSerice2 } from '../services/product2.service';
import { Product2 } from '../models/product2.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main4',
  imports: [CommonModule],
  templateUrl: './main4.component.html',
  styleUrl: './main4.component.css'
})
export class Main4Component implements OnInit {
  products: Product2[] = [];

  constructor(private productService: ProductSerice2) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      }) 
  }
}
