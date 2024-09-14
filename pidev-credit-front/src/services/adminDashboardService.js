import axios from 'axios';
import { useHistory } from 'react-router-dom';  // Import useHistory for redirection

const API_URL = 'http://localhost:5000/api/admin';  // Change to your backend URL

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Handle token expiration or banning
const handleResponseError = (error) => {
  if (error.response && error.response.status === 403) {
    // Redirect to login/signup if user is banned
    window.location.href = '/auth/login'; // or '/login'
  }
  throw error; // Re-throw the error for further handling
};

// Get all users
const getAllUsers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.get('/', config);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

// Approve a user
const approveUser = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.put(`/${userId}/approve`, {}, config);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

// Ban a user
const banUser = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.put(`/${userId}/ban`, {}, config);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

// Delete a user
const deleteUser = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.delete(`/${userId}`, config);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export { getAllUsers, approveUser, banUser, deleteUser };
