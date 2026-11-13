import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { StoreFooterComponent } from '../../components/store-footer/store-footer.component';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, StoreFooterComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  readonly cart = inject(CartService);
}
