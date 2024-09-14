const express = require('express');
const { getAllUsers, approveUser, banUser, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');  // Import the 'admin' middleware

const router = express.Router();

// Admin routes
router.route('/').get(protect, admin, getAllUsers); // Get all users
router.route('/:id/approve').put(protect, admin, approveUser); // Approve user
router.route('/:id/ban').put(protect, admin, banUser); // Ban user
router.route('/:id').delete(protect, admin, deleteUser); // Delete user

module.exports = router;
