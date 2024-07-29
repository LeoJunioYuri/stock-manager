"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import "./globals.css"; // Importando o arquivo de estilos

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      console.log('Login Successful', response.data);
      router.push('/products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login Error', error.response ? error.response.data : error.message);
      } else if (error instanceof Error) {
        console.error('Login Error', error.message);
      } else {
        console.error('Unexpected Error', error);
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', { email: newEmail, password: newPassword });
      console.log('Register Successful', response.data);
      setShowRegister(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Register Error', error.response ? error.response.data : error.message);
      } else if (error instanceof Error) {
        console.error('Register Error', error.message);
      } else {
        console.error('Unexpected Error', error);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="container p-6 rounded-lg shadow-lg"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" className="mb-4">
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          className="text-field"
          InputLabelProps={{ className: "text-field-label" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          className="text-field"
          InputLabelProps={{ className: "text-field-label" }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          className="button-primary mt-4"
        >
          Login
        </Button>

        <Button
          variant="text"
          onClick={() => setShowRegister(!showRegister)}
          fullWidth
          className="button-text mt-4"
        >
          {showRegister ? "Cancel Registration" : "Create an Account"}
        </Button>

        {showRegister && (
          <Box mt={4}>
            <Typography variant="h6">Register</Typography>
            <TextField
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              InputLabelProps={{ className: "text-field-label" }}
            />
            <TextField
              label="Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              InputLabelProps={{ className: "text-field-label" }}
            />
            <Button
              variant="contained"
              onClick={handleRegister}
              fullWidth
              className="button-secondary mt-4"
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
