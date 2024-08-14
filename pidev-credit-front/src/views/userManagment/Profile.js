import React, { useState, useEffect } from 'react';
import { Container, Avatar, Typography, Box, Button, TextField, Card, CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../../services/userManagmentService';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../assets/images/defaultProfilePic.jpg';
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [postContent, setPostContent] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editUserData, setEditUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/auth/login');
            } else {
                try {
                    const userProfile = await getUserProfile(token);
                    setUser(userProfile);
                    setEditUserData({
                        firstname: userProfile.firstname,
                        lastname: userProfile.lastname,
                        email: userProfile.email,
                        phone: userProfile.phone || ''
                    });
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    navigate('/auth/login');
                }
            }
        };
        fetchUserProfile();
    }, [navigate]);

    const handlePostSubmit = () => {
        console.log('Post content:', postContent);
        setPostContent('');
    };

    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    const handleDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleInputChange = (e) => {
        setEditUserData({
            ...editUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileUpdate = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await updateUserProfile(editUserData, token);
            setUser({ ...user, ...editUserData });
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Box style={{ textAlign: 'center' }}>
                            <Avatar
                                alt="Profile Picture"
                                src={defaultProfilePic}
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                style={{ marginTop: '-30px', marginLeft: '120px' }}
                            >
                                <AddAPhotoIcon />
                            </IconButton>
                            <Typography variant="h5" style={{ marginTop: '10px' }}>
                                {user?.firstname} {user?.lastname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user?.email}
                            </Typography>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#709CA7',
                                    color: '#FFFFFF',
                                    marginTop: '15px'
                                }}
                                startIcon={<EditIcon />}
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h6" gutterBottom>
                            About
                        </Typography>
                        <Paper elevation={1} style={{ padding: '15px', marginBottom: '20px' }}>
                            <Typography variant="body1">
                                First Name: {user?.firstname}
                            </Typography>
                            <Typography variant="body1">
                                Last Name: {user?.lastname}
                            </Typography>
                            <Typography variant="body1">
                                Email: {user?.email}
                            </Typography>
                            <Typography variant="body1">
                                Phone: {user?.phone || 'N/A'}
                            </Typography>
                        </Paper>
                        <Typography variant="h6" gutterBottom>
                            What's on your mind?
                        </Typography>
                        <Paper elevation={1} style={{ padding: '15px', marginBottom: '20px' }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Share your thoughts..."
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    backgroundColor: '#709CA7',
                                    color: '#FFFFFF',
                                    marginTop: '15px'
                                }}
                                onClick={handlePostSubmit}
                            >
                                Post
                            </Button>
                        </Paper>
                        <Typography variant="h6" gutterBottom>
                            Recent Posts
                        </Typography>
                        <Paper elevation={1} style={{ padding: '15px', marginBottom: '15px' }}>
                            <Typography variant="body1">
                                User post content goes here...
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                2 hours ago
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            {/* Edit Profile Dialog */}
            <Dialog open={editDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={editUserData.firstname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={editUserData.lastname}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={editUserData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        value={editUserData.phone}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}  style={{
                        backgroundColor: '#709CA7',
                        color: '#FFFFFF',
                    }} 
                    color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleProfileUpdate} 
                    style={{
                        backgroundColor: '#709CA7',
                        color: '#FFFFFF',
                    }} 
                    color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
