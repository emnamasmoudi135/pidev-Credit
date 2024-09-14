import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserApplications, deleteUserApplication } from '../../services/ApplicationService';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
          navigate('/auth/login'); // Redirect to login if token is not found
          return;
        }

        const data = await getUserApplications(token); // Fetch user applications
        setApplications(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        if (error.response && error.response.status === 401) {
          navigate('/auth/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchApplications();
  }, [navigate]); // Include navigate in the dependency array

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token for the delete request
      await deleteUserApplication(id, token); // Call delete function
      setApplications(applications.filter(app => app._id !== id)); // Update the state to remove deleted application
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  return (
    <div>
      <h1>Your Applications</h1>
      <ul>
        {applications.map((application) => (
          <li key={application._id}>
            {application.job.title} - {application.status}
            <button onClick={() => handleDelete(application._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
