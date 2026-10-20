import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsState = signal<Product[]>([]);

  readonly items = this.itemsState.asReadonly();
  readonly itemCount = computed(() => this.itemsState().length);
  readonly subtotal = computed(() =>
    this.itemsState().reduce((total, product) => total + product.price, 0),
  );

  add(product: Product): void {
    this.itemsState.update((items) => {
      if (
        product.stock < 1 ||
        items.some((item) => item.id === product.id)
      ) {
        return items;
      }

      return [...items, product];
    });
  }

  remove(productId: number): void {
    this.itemsState.update((items) =>
      items.filter((product) => product.id !== productId),
    );
  }
}
