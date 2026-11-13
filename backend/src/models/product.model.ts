import { model, Schema } from 'mongoose';
import type { ProductInput } from '../interfaces/product.interface.ts';

const productSchema = new Schema<ProductInput>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
    area: { type: String, required: true, enum: ['Electronics', 'Grocery'] },
    imgURL: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'products' },
);

export const ProductModel = model<ProductInput>('Product', productSchema);
