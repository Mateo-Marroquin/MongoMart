import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Audífonos inalámbricos',
      price: 1299,
      stock: 18,
      area: 'Electronics',
      imgURL: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      name: 'Cámara digital',
      price: 8499,
      stock: 7,
      area: 'Electronics',
      imgURL: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      name: 'Reloj inteligente',
      price: 2199,
      stock: 12,
      area: 'Electronics',
      imgURL: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 4,
      name: 'Manzanas',
      price: 48,
      stock: 35,
      area: 'Grocery',
      imgURL: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      name: 'Naranjas',
      price: 36,
      stock: 28,
      area: 'Grocery',
      imgURL: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      name: 'Aguacates',
      price: 62,
      stock: 21,
      area: 'Grocery',
      imgURL: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 7,
      name: 'Fresas',
      price: 75,
      stock: 16,
      area: 'Grocery',
      imgURL: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  getProducts(area?: string): Product[] {
    return area
      ? this.products.filter((product) => product.area === area)
      : [...this.products];
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
