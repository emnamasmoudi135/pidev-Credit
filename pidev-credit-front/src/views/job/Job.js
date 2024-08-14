import React, { useState, useEffect } from 'react';
import { Container, Button, Card, CardContent, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, InputBase, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getAllJobs, createJob, updateJob, deleteJob } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editJobData, setEditJobData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        type: 'full-time',
        salary: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentJobId, setCurrentJobId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigate('/auth/login');
            } else {
                try {
                    const jobList = await getAllJobs(token);
                    setJobs(jobList);
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                    navigate('/auth/login');
                }
            }
        };
        fetchJobs();
    }, [navigate]);

    const handleInputChange = (e) => {
        setEditJobData({
            ...editJobData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateJob = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await createJob(editJobData, token);
            setEditDialogOpen(false);
            setEditJobData({
                title: '',
                description: '',
                company: '',
                location: '',
                type: 'full-time',
                salary: ''
            });
            const jobList = await getAllJobs(token);
            setJobs(jobList);
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const handleEditClick = (job) => {
        setIsEditing(true);
        setCurrentJobId(job._id);
        setEditJobData(job);
        setEditDialogOpen(true);
    };

    const handleUpdateJob = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await updateJob(currentJobId, editJobData, token);
            setIsEditing(false);
            setEditDialogOpen(false);
            setEditJobData({
                title: '',
                description: '',
                company: '',
                location: '',
                type: 'full-time',
                salary: ''
            });
            const jobList = await getAllJobs(token);
            setJobs(jobList);
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await deleteJob(id, token);
            const jobList = await getAllJobs(token);
            setJobs(jobList);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Paper component="form" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <InputBase
                    style={{ marginLeft: 8, flex: 1 }}
                    placeholder="Search Jobs"
                    inputProps={{ 'aria-label': 'search jobs' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#709CA7', color: '#fff', marginLeft: '8px' }}
                    onClick={() => setEditDialogOpen(true)}
                >
                    Create New Job
                </Button>
            </Paper>
            <Grid container spacing={3}>
                {filteredJobs.map((job) => (
                    <Grid item xs={12} sm={4} key={job._id}>
                        <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{job.title}</Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    {job.company} - {job.location}
                                </Typography>
                                <Typography variant="body2" style={{ marginBottom: '15px' }}>
                                    {job.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Type: {job.type}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Salary: {job.salary ? `$${job.salary}` : 'N/A'}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditClick(job)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        style={{ color: '#f44336' }}
                                        onClick={() => handleDeleteJob(job._id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit/Create Job Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>{isEditing ? 'Edit Job' : 'Create New Job'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Job Title"
                        type="text"
                        fullWidth
                        value={editJobData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Job Description"
                        type="text"
                        fullWidth
                        value={editJobData.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="company"
                        label="Company"
                        type="text"
                        fullWidth
                        value={editJobData.company}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        value={editJobData.location}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Job Type"
                        select
                        SelectProps={{
                            native: true,
                        }}
                        fullWidth
                        value={editJobData.type}
                        onChange={handleInputChange}
                    >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                    </TextField>
                    <TextField
                        margin="dense"
                        name="salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        value={editJobData.salary}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={isEditing ? handleUpdateJob : handleCreateJob} style={{ backgroundColor: '#709CA7', color: '#fff' }}>
                        {isEditing ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Job;
