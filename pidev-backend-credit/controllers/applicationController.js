// controllers/applicationController.js
const Application = require('../models/Application');

// Get all applications of a user
const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('job');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user's application by ID
const deleteUserApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.remove();
    res.status(200).json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserApplications,
  deleteUserApplication,
};
