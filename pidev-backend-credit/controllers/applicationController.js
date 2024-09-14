const Application = require('../models/Application');

const User = require('../models/User');

// Get all applications (Admin only)
const getAllApplications = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Fetch all applications and populate job and user data
    const applications = await Application.find()
      .populate('job', 'title') // Populate job details (e.g., title)
      .populate('user', 'name email'); // Populate user details (e.g., name, email)

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications of a user (for normal users)
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('job');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Apply for a job
const applyForJob = async (req, res) => {
  const { jobId, email, name } = req.body;
  const cvUrl = req.file ? `/uploads/cvs/${req.file.filename}` : null; // Get the CV file path

  try {
    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ job: jobId, user: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Check if a CV was uploaded
    if (!cvUrl) {
      return res.status(400).json({ message: 'CV is required' });
    }

    // Create a new application
    const newApplication = new Application({
      job: jobId,
      user: req.user._id,
      appliedDate: new Date(),
      status: 'pending',
      cvPath: cvUrl,  // Save the CV file path
      email,          // Save the user's email
      name            // Save the user's name
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};



// Update application status (Admin only)
const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find the application and update its status
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();
    res.status(200).json({ message: 'Status updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};





const deleteUserApplication = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Assuming you use Mongoose for MongoDB
    const result = await Application.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error });
  }
};

module.exports = {
  getAllApplications,
  getUserApplications,
  applyForJob,
  deleteUserApplication,
  updateApplicationStatus,
};
