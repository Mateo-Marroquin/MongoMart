import type { Request, Response } from 'express';
import type { ProductInput } from '../interfaces/product.interface.ts';
import { ProductModel } from '../models/product.model.ts';

const isProductInput = (value: unknown): value is ProductInput => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.name === 'string' &&
    product.name.trim().length > 0 &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    typeof product.stock === 'number' &&
    Number.isInteger(product.stock) &&
    product.stock >= 0 &&
    (product.area === 'Electronics' || product.area === 'Grocery') &&
    typeof product.imgURL === 'string' &&
    product.imgURL.trim().length > 0
  );
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'No se pudieron cargar los productos.' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const input: unknown = req.body;

  if (!isProductInput(input)) {
    res.status(400).json({ message: 'Los datos del producto no son válidos.' });
    return;
  }

  try {
    const newProduct = new ProductModel(input);
    await newProduct.save();
    res.status(201).json({
      message: 'Producto creado correctamente.',
      data: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'No se pudo crear el producto.' });
  }
};
