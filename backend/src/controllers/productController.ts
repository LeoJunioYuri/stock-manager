import { Request, Response } from 'express';
import Product from '../models/Product';

// export const createProduct = async (req: Request, res: Response) => {
//   const { name, description, price, imageUrl } = req.body;
//   const product = await Product.create({ name, description, price, imageUrl });
//   res.status(201).json(product);
// };

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    // Converta o preço para número e valide
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: 'Invalid price' });
    }

    const product = await Product.create({
      name,
      description,
      price: numericPrice,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};



export const getProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const { count, rows } = await Product.findAndCountAll({ limit: Number(limit), offset });
  res.json({ count, rows });
};

