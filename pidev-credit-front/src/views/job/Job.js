import React, { useState, useEffect } from 'react';
import { Container, Button, Card, CardContent, Grid, Typography, IconButton, InputBase, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getAllJobs, createJob, updateJob, deleteJob } from '../../services/jobService';
import { useNavigate } from 'react-router-dom';

const Job = () => {
    const [jobs, setJobs] = useState([]);
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

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // New function to handle "Apply" button click
    const handleApplyClick = (jobId) => {
        navigate(`/apply`, { state: { jobId } });
    };

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

                                {/* Add the Apply button */}
                                <Button
                                    variant="contained"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleApplyClick(job._id)}
                                >
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Job;
