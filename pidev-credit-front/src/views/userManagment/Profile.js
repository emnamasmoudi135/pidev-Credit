import React, { useState, useEffect } from 'react';
import { Container, Avatar, Typography, Box, Button, TextField, Card, CardContent, Grid, Table, TableBody, TableCell, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../../services/userManagmentService';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../../assets/images/defaultProfilePic.jpg';

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
            await updateUserProfile(token, editUserData);
            setUser({ ...user, ...editUserData });
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent style={{ textAlign: 'center' }}>
                            <Avatar
                                alt="Profile Picture"
                                src={defaultProfilePic}
                                sx={{ width: 150, height: 150, margin: 'auto' }}
                            />
                            <Typography variant="h5" style={{ marginTop: '10px' }}>
                                {user?.firstname} {user?.lastname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user?.email}
                            </Typography>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head">First Name</TableCell>
                                        <TableCell>{user?.firstname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Last Name</TableCell>
                                        <TableCell>{user?.lastname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Email</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head">Phone</TableCell>
                                        <TableCell>{user?.phone || 'N/A'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '15px' }}
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                What's on your mind?
                            </Typography>
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
                                style={{ marginTop: '10px' }}
                                onClick={handlePostSubmit}
                            >
                                Post
                            </Button>
                        </CardContent>
                    </Card>
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Recent Posts
                        </Typography>
                        <Card style={{ marginBottom: '15px' }}>
                            <CardContent>
                                <Typography variant="body1">
                                    User post content goes here...
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    2 hours ago
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>

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
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleProfileUpdate} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
