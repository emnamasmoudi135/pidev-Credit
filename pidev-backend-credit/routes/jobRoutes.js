// routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const checkAdmin = require('../middleware/checkAdmin');

router.route('/')
  .get(protect, getAllJobs)
  .post(protect, checkAdmin, createJob);

router.route('/:id')
  .get(protect, getJobById)
  .put(protect, checkAdmin, updateJob)
  .delete(protect, checkAdmin, deleteJob);

module.exports = router;
