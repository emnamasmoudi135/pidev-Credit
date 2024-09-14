import React, { useState } from 'react';
import axios from 'axios';

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const res = await axios.post('/api/upload/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('File upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit">Upload CV</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadCV;
