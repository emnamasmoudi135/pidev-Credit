const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Approve user (set approved to true and role to 'user')
const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.approved = true;
      user.role = 'user';
      await user.save();
      res.json({ message: 'User approved', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error approving user' });
  }
};

// Ban user (toggle banned status)
const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.banned = !user.banned;
      await user.save();
      res.json({ message: 'User banned status updated', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error banning user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  approveUser,
  banUser,
  deleteUser,
};
