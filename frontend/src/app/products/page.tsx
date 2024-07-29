"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchProducts = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3001/api/products?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data.rows);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/api/products",
        { name, description, price, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl || "");
    setOpenEditModal(true);
  };

  const handleEditProduct = async () => {
    if (selectedProduct) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:3001/api/products/${selectedProduct.id}`,
          { name, description, price, imageUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOpenEditModal(false);
        fetchProducts();
      } catch (error) {
        console.error("Error editing product:", error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Box display="flex" flexDirection="column" mb={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProduct}
          fullWidth
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box border={1} borderRadius={4} p={2}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>${product.price}</Typography>
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%" }}
                />
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenEditModal(product)}
              >
                Edit
              </Button>
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

      {/* Modal de Edição */}
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        PaperProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button onClick={handleEditProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsPage;
