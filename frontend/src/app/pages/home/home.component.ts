import { Component, inject } from '@angular/core';
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
  readonly techProducts = this.productService.getProducts('Electronics');
  readonly groceryProducts = this.productService.getProducts('Grocery');
}
