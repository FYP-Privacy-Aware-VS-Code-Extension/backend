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

const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);

export default TimeEntry;