'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" className="mb-4">Login</Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { color: 'white' } }}  // Adjust text color for input
          InputLabelProps={{ style: { color: '#aaa' } }}  // Adjust label color
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { color: 'white' } }}  // Adjust text color for input
          InputLabelProps={{ style: { color: '#aaa' } }}  // Adjust label color
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogin} 
          fullWidth
          className="mt-4"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
