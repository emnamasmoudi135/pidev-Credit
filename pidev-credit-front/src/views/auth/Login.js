// src/views/auth/Login.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Logo from '../../layouts/full/shared/logo/Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#709CA7';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            setMessage(response.message);
            setError('');
            // Redirect to the dashboard or home page after successful login
            navigate('/dashboard'); // Replace with your actual dashboard route
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <Container maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <Logo />
                    </Box>
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        {message && <Typography color="primary" variant="body2">{message}</Typography>}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            style={{ backgroundColor: '#709CA7', color: '#fff', marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Don't have an Account? <span style={{ color: '#709CA7', cursor: 'pointer' }} onClick={() => navigate('/auth/signup')}>Sign Up</span>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default Login;
