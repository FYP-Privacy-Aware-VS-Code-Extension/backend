import TimeEntry from "../models/time.model.js";
import { errorHandler } from "../utils/error.js";

export const createTimeEntry = async (req, res, next) => {
    try {
        const timeEntry = await TimeEntry.create(req.body);
        return res.status(201).json(timeEntry)
    } catch (error) {
        next(error);
    }
}

export const deleteTimeEntry = async (req, res, next) => {
    const timeEntry = await TimeEntry.findById(req.params.id);

    if(!timeEntry){
        return next(errorHandler(404, 'Time Entry not found'));
    }

    try {
        await TimeEntry.findByIdAndDelete(req.params.id);
        res.status(200).json("Time Entry has been deleted");
    } catch (error) {
        next(error);
    }
}


export const getAllTimeEntries = async (req, res, next) => {
    try {
        const timeEntries = await TimeEntry.find().sort({ createdAt: 1 }); // Sort by createdAt in ascending order

        res.status(200).json(timeEntries);
    } catch (error) {
        next(error);
    }
};

export const getTimeEntriesByAssignment = async (req, res, next) => {
    try {
        const timeEntries = await TimeEntry.aggregate([
            {
                $group: {
                    _id: "$assignmentId",
                    totalDuration: { $sum: "$duration_minutes" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by assignmentId in ascending order
            }
        ]);

        // Format the response to be in {assignment: duration} format
        const formattedEntries = timeEntries.map(entry => ({
            assignment: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};


export const getTimeEntriesByWeek = async (req, res, next) => {
    try {
        const timeEntries = await TimeEntry.aggregate([
            {
                $addFields: {
                    week: { $isoWeek: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$week",
                    totalDuration: { $sum: "$duration_minutes" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by week in ascending order
            }
        ]);

        // Format the response to be in {week: duration} format
        const formattedEntries = timeEntries.map(entry => ({
            week: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};


export const getTimeEntriesByWeekAndAssignment = async (req, res, next) => {
 
    try {
        const timeEntries = await TimeEntry.aggregate([
            {
                $match: {
                    assignmentId: req.params.assignmentId, // Match assignmentId field with request parameter
                }
            },
            {
                $addFields: {
                    week: { $isoWeek: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$week",
                    totalDuration: { $sum: "$duration_minutes" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by week in ascending order
            }
        ]);

        // Format the response to be in {week: duration} format
        const formattedEntries = timeEntries.map(entry => ({
            week: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};