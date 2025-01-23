import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AssignmentEntry = mongoose.model('Assignment', assignmentSchema);

export default AssignmentEntry;