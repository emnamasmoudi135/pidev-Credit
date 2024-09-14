import React, { useEffect, useState } from 'react';
import { getAllUsers, approveUser, banUser, deleteUser } from '../../services/adminDashboardService';
import { Button, Table, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // for redirecting to login

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
          navigate('/auth/login'); // Redirect to login if token is not found
          return;
        }

        const data = await getAllUsers(token);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        message.error('Failed to load users.');
      }
    };
    fetchUsers();
  }, [navigate]);

  // Search functionality
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  // Approve user action
  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await approveUser(userId, token);
      message.success('User approved successfully!');
      setUsers(users.map((user) => (user._id === userId ? { ...user, approved: true, role: 'user' } : user)));
    } catch (error) {
      message.error('Failed to approve user.');
    }
  };

  // Ban user action
  const handleBan = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await banUser(userId, token);
      message.success('User banned status updated!');
      setUsers(users.map((user) => (user._id === userId ? { ...user, banned: !user.banned, role: user.banned ? 'user' : 'banned' } : user)));
    } catch (error) {
      message.error('Failed to ban user.');
    }
  };

  // Delete user action
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      await deleteUser(userId, token);
      message.success('User deleted successfully!');
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      message.error('Failed to delete user.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Table dataSource={filteredUsers} rowKey="_id">
        <Table.Column title="First Name" dataIndex="firstname" key="firstname" />
        <Table.Column title="Last Name" dataIndex="lastname" key="lastname" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Role" dataIndex="role" key="role" />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <>
              <Button
                type="primary"
                onClick={() => handleApprove(record._id)}
                disabled={record.approved}
                style={{ marginRight: '10px' }}
              >
                Approve
              </Button>
              <Button
                type="danger"
                onClick={() => handleBan(record._id)}
                disabled={record.banned}
                style={{ marginRight: '10px' }}
              >
                {record.banned ? 'Unban' : 'Ban'}
              </Button>
              <Button type="danger" onClick={() => handleDelete(record._id)}>
                Delete
              </Button>
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default AdminDashboard;
