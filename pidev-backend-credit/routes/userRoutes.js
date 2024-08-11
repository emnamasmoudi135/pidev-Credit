const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userManagementController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

module.exports = router;
