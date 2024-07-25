import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função para registro de novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar o usuário
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Função para login do usuário
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Encontrar o usuário pelo email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
