import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { Table, Input, notification ,Button, Select} from 'antd';
import {
    getUserApplications,
    deleteUserApplication,
    updateApplicationStatus,
  } from '../../services/ApplicationService';
  const { Option } = Select;

const AdminApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5000/api/applications/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (error) {
        notification.error({ message: 'Error fetching applications' });
      }
    };

    fetchApplications();
  }, []);


  useEffect(() => {
    const results = applications.filter(application => {
      const name = application.user?.name?.toLowerCase() || '';
      const email = application.user?.email?.toLowerCase() || '';
      const title = application.job?.title?.toLowerCase() || '';
      const term = searchTerm.toLowerCase();
      return name.includes(term) || email.includes(term) || title.includes(term);
    });
    setFilteredApplications(results);
  }, [searchTerm, applications]);

  const handleStatusChange = async (applicationId, status) => {
    const token = localStorage.getItem('authToken');
    try {
      await updateApplicationStatus(applicationId, status, token);
      notification.success({ message: 'Status updated successfully' });
      // Refetch applications to update the table
      const data = await getUserApplications(token);
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      notification.error({ message: 'Error updating status' });
    }
  };
  const handleDelete = async (applicationId) => {
    const token = localStorage.getItem('authToken');
    try {
      await deleteUserApplication(applicationId, token);
      notification.success({ message: 'Application deleted successfully' });
      // Refetch applications to update the table
      const data = await getUserApplications(token);
      setApplications(data);
      setFilteredApplications(data);
    } catch (error) {
      notification.error({ message: 'Error deleting application' });
    }
  };
  const columns = [
    {
      title: 'Applicant Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Job Title',
      dataIndex: ['job', 'title'],
      key: 'title',
    },
    {
      title: 'CV',
      key: 'cv',
      render: (text, record) => (
        <a href={`http://localhost:5000${record.cvPath}`} target="_blank" rel="noopener noreferrer">
          View CV
        </a>
      ),
    },
    {
        title: 'Status',
        key: 'status',
        render: (text, record) => (
          <Select
            defaultValue={record.status}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Option value="pending">Pending</Option>
            <Option value="reviewed">Reviewed</Option>
            <Option value="accepted">Accepted</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        ),
      },
  ];

  return (
    <div>
      <h1>Applications</h1>
      <Input
        placeholder="Search applications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Table
        dataSource={filteredApplications}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminApplicationsTable;
