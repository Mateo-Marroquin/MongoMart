import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { StoreFooterComponent } from '../../components/store-footer/store-footer.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, StoreFooterComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  readonly products = inject(ProductService).getProducts();
}
