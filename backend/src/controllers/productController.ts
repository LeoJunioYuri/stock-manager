import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, imageUrl } = req.body;
  const product = await Product.create({ name, description, price, imageUrl });
  res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const { count, rows } = await Product.findAndCountAll({ limit: Number(limit), offset });
  res.json({ count, rows });
};

