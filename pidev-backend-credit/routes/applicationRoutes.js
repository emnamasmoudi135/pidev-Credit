const express = require('express');
const { getUserApplications, deleteUserApplication, applyForJob , getAllApplications,updateApplicationStatus} = require('../controllers/applicationController');
const { protect ,admin} = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();


const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = 'uploads/cvs/';

    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// Check file type
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('PDFs only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Routes
router.route('/')
  .get(protect, getUserApplications)
  .post(protect, upload.single('cv'), applyForJob); // Add file upload middleware here

  router.route('/admin').get(protect, admin, getAllApplications); // Add the admin route
  router.route('/:id/status').patch(protect, admin, updateApplicationStatus);

router.route('/:id')
  .delete(protect, deleteUserApplication);

module.exports = router;
