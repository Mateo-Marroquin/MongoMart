import { Component, computed, inject, signal } from '@angular/core';
import type { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { OffersCarouselComponent } from '../../components/offers-carousel/offers-carousel.component';
import { StoreFooterComponent } from '../../components/store-footer/store-footer.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [OffersCarouselComponent, ProductCardComponent, StoreFooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly productService = inject(ProductService);
  readonly products = signal<Product[]>([]);
  readonly error = signal('');
  readonly techProducts = computed(() =>
    this.products().filter((product) => product.area === 'Electronics'),
  );
  readonly groceryProducts = computed(() =>
    this.products().filter((product) => product.area === 'Grocery'),
  );

  constructor() {
    this.productService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: () => this.error.set('No se pudieron cargar los productos.'),
    });
  }
}
