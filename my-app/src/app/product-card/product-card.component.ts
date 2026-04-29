import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  //@Input - получение данных от родительского компонента
  @Input() product!: Product;

  @Input() cartQuantity = 0;

  //@Output - отправка событий родительскому компоненту
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();
  @Output() removeFromCart = new EventEmitter<number>();
  @Output() productSelected = new EventEmitter<Product>();
  @Output() updateQuantity = new EventEmitter<{ productId: number; quantity: number }>();
  //Флаг для обработки ошибок загрузки изображения
  imageError = false;

  quantity = 1;

  readonly maxQuantity = 10;
  readonly quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  get availableMaxQuantity(): number {
    const inCart = this.cartQuantity;
    return Math.max(1, Math.min(this.maxQuantity - inCart, this.maxQuantity))
  }

  //В корзине ли товар
  get isInCart(): boolean {
    return this.cartQuantity > 0;
  }

  decrementQuantity(): void {
    console.log("decrement click");
    const next = this.quantity - 1;
    if (next >= 1) {
      this.quantity = next;
    }
  }

  incrementQuantity(): void {
    console.log("increment click");
    const next = this.quantity + 1;
    if (next <= this.availableMaxQuantity) {
      this.quantity = next;
    }
  }

  onImageError(): void {
    this.imageError = true;
  }

  onAddToCart(): void {
    const qty = this.quantity;
    if (qty > 0 && qty <= this.availableMaxQuantity) {
      this.addToCart.emit({ product: this.product, quantity: qty });
      this.quantity = 1;
    }
  }

  onRemoveFromCart(): void {
    this.removeFromCart.emit(this.product.id);
  }

  onProductClick(): void {
    this.productSelected.emit(this.product);
  }

  onCartQuantityChange(newQuantity: number): void {
    if (newQuantity === 0) {
      this.removeFromCart.emit(this.product.id);
    } else if (newQuantity >= 1 && newQuantity <= this.maxQuantity) {
      this.updateQuantity.emit({ productId: this.product.id, quantity: newQuantity });
    }
  }

  onQuantitySelectChange(value: number): void {
    this.quantity = Math.max(1, Math.min(value, this.availableMaxQuantity));
  }
}
