import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { StoreFooterComponent } from '../../components/store-footer/store-footer.component';
import type { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, StoreFooterComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = signal<Product | undefined>(undefined);
  readonly isLoading = signal(true);
  readonly error = signal('');

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.product.set(products.find((item) => item._id === productId));
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el producto.');
        this.isLoading.set(false);
      },
    });
  }

  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.add(product);
    }
  }
}
