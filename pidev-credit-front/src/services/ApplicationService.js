import axios from 'axios';

const API_URL = 'http://localhost:5000/api/applications';

// Get all applications of the logged-in user
const getUserApplications = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Apply for a job
const applyForJob = async (applicationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL, applicationData, config);
  return response.data;
};

// Delete a user's application by ID
const deleteUserApplication = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
// Update application status
const updateApplicationStatus = async (id, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    { status },
    config
  );
  return response.data;
};

export { getUserApplications, applyForJob, deleteUserApplication,updateApplicationStatus };
