
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true , enum: ['full-time', 'part-time', 'internship'],
  }, // Full-time, Part-time, etc.
  postedDate: { type: Date, default: Date.now },
  salary: { type: Number },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;



