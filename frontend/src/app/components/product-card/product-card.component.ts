import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
}
