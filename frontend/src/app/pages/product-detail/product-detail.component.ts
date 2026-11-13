import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { StoreFooterComponent } from '../../components/store-footer/store-footer.component';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, StoreFooterComponent],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = this.productService.getProduct(
    Number(this.route.snapshot.paramMap.get('id')),
  );

  addToCart(): void {
    if (this.product) {
      this.cartService.add(this.product);
    }
  }
}
