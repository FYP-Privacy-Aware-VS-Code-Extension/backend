import mongoose from 'mongoose';

const timeEntrySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    assignmentId: {
        type: String,
        required: true
    },
    duration_minutes: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to check if assignmentId exists
timeEntrySchema.pre('save', async function (next) {
    const Assignment = mongoose.model('Assignment');
    const assignmentExists = await Assignment.exists({ _id: this.assignmentId });
    if (!assignmentExists) {
      return next(new Error('Assignment ID does not exist'));
    }
    next();
  });
  

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);

export default TimeEntry;