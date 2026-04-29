import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: true
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void{
      this.productService.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;

          this.cd.detectChanges(); 
        },
        error: (err) => {
          this.error = 'Не удалось загрузить товары';
          this.loading = false;
        }
      })

      
  }

  //Корзина (товары, добавленные в корзину)
  cart: CartItem[] = [];

  toastMessage = '';

  selectedProduct: Product | null = null;
  

  private showToast(msg: string): void {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 3000);
  }

  //Очистка корзины
  clearCart(): void {
    this.cart = [];
    this.showToast('Корзина очищена!');
  }

  getCartQuantity(productId: number): number {
    const item = this.cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }

  onAddToCart(payload: { product: Product; quantity: number }): void {
    //деструктуризация
    const { product, quantity } = payload;

    const existing = this.cart.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
      this.showToast(`"${product.name}": добавлено ещё ${quantity} шт`);
    } else {
      this.cart.push({ product, quantity });
      this.showToast(`"${product.name}": добавлен в корзину (${quantity}) шт`);
    }

  }

  //Обработчик события выбора товраа (от дочернего компонента)
  onProductSelected(product: Product): void {
    this.selectedProduct = product;
    this.showToast(`Выбран товар: ${product.name}`);
  }

  onUpdateQuantity(payload: { productId: number; quantity: number }): void {
    const item = this.cart.find(i => i.product.id === payload.productId);
    if (item) {
      if (payload.quantity <= 0) {
        this.cart = this.cart.filter(i => i.product.id !== payload.productId);
        this.showToast(`"${item.product.name}" удалён из корзины`);
      } else {
        item.quantity = payload.quantity;
      }
    }
  }

  onRemoveFromCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    this.cart = this.cart.filter(i => i.product.id !== productId);
    if (product) this.showToast(`"${product.name}" удалён из корзины`);
  }

  get totalItemsCount(): number {
    let total = 0;

    for (const item of this.cart) {
      total += item.quantity;
    }

    return total;
  }

  get totalPrice(): number {
    let total = 0;

    for (const item of this.cart){
      total += item.product.price * item.quantity;
    }

    return total;
  }
}
