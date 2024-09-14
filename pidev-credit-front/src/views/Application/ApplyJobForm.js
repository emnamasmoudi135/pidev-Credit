import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyForJob } from '../../services/ApplicationService';

const ApplyJobForm = () => {
  const location = useLocation();
  const jobId = location.state?.jobId;  // Get the jobId from the location state
  const [cv, setCv] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleCvChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('jobId', jobId);  // Include the jobId in the form data
  
    // Get the token from localStorage (or wherever you're storing it)
    const token = localStorage.getItem('authToken');
  
    try {
      const response = await applyForJob(formData, token); // Pass the token here
      setMessage(response.message || 'Application submitted successfully!');
    } catch (error) {
      setMessage(error.response.data.message || 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CV:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleCvChange}
          required
        />
      </div>
      <button type="submit">Apply</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ApplyJobForm;
