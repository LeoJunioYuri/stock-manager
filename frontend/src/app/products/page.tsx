'use client'

import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box, TextField, Grid } from '@mui/material';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/products?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.rows);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3001/api/products',
        { name, description, price, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts(); // Atualizar a lista de produtos após adicionar um novo produto
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Box display="flex" flexDirection="column" mb={2}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" />
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateProduct} fullWidth>
          Add Product
        </Button>
      </Box>
      <Grid container spacing={2}>
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box border={1} borderRadius={4} p={2}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>${product.price}</Typography>
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Typography>
          Page {page} of {totalPages}
        </Typography>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ProductsPage;
