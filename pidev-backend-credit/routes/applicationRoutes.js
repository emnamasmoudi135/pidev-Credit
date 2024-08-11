// routes/applicationRoutes.js
const express = require('express');
const { getUserApplications, deleteUserApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getUserApplications);

router.route('/:id')
  .delete(protect, deleteUserApplication);

module.exports = router;
