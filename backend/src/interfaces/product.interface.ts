export type ProductArea = 'Electronics' | 'Grocery';

export interface ProductInput {
  name: string;
  price: number;
  stock: number;
  area: ProductArea;
  imgURL: string;
}
