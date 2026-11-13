export type ProductArea = 'Electronics' | 'Grocery';

export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  area: ProductArea;
  imgURL: string;
}

export type NewProduct = Omit<Product, '_id'>;
