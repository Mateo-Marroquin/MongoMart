import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { NewProduct, Product } from '../interfaces/product';

interface CreateProductResponse {
  message: string;
  data: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: NewProduct): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(this.apiUrl, product);
  }
}
