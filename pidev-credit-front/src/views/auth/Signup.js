// src/views/auth/Signup.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Card } from '@mui/material';
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Logo from '../../layouts/full/shared/logo/Logo';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#709CA7';
        return () => {
            document.body.style.backgroundColor = null; // Reset background color on cleanup
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(formData);
            setMessage(response.message);
            setError('');
            // Redirect to login after successful signup
            navigate('/auth/login');
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
                    <form onSubmit={handleSignup} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstname"
                            margin="normal"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastname"
                            margin="normal"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            margin="normal"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            margin="normal"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            margin="normal"
                            value={formData.phone}
                            onChange={handleChange}
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
                            Sign Up
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                        Already have an Account? <span style={{ color: '#3664AD', cursor: 'pointer' }} onClick={() => navigate('/auth/login')}>Sign In</span>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default Signup;
