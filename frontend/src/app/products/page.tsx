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
  const [openModal, setOpenModal] = useState(false); // Controla a abertura do modal
  const [isEditing, setIsEditing] = useState(false); // Controla se o modal é para edição
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Controla a abertura do modal de exclusão

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
      setOpenModal(false); // Fecha o modal após adicionar o produto
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
        setOpenModal(false); // Fecha o modal após editar o produto
        fetchProducts();
      } catch (error) {
        console.error("Error editing product:", error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `http://localhost:3001/api/products/${selectedProduct.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOpenDeleteModal(false); // Fecha o modal de exclusão após excluir o produto
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl || "");
    setIsEditing(true); // Define o modal como edição
    setOpenModal(true);
  };

  const handleOpenCreateModal = () => {
    setSelectedProduct(null);
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setIsEditing(false); // Define o modal como criação
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom color="textPrimary">
        Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateModal}
        style={{ marginBottom: '16px' }} // Espaçamento abaixo do botão
      >
        Add Product
      </Button>
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
              <Box display="flex" gap={1} mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenEditModal(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDeleteModal(product)}
                >
                  Delete
                </Button>
              </Box>
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

      {/* Modal de Criação/Edição */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
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
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={isEditing ? handleEditProduct : handleCreateProduct} color="primary">
            {isEditing ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Exclusão */}
      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        PaperProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button onClick={handleDeleteProduct} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsPage;
