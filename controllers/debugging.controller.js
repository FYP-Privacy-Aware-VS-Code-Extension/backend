import DebuggingTimeEntry from "../models/debugging.model.js";
import { errorHandler } from "../utils/error.js";

export const createDebuggingTimeEntry = async (req, res, next) => {
    try {
        const debuggingTimeEntry = await DebuggingTimeEntry.create(req.body);
        return res.status(201).json(debuggingTimeEntry);
    } catch (error) {
        next(error);
    }
};

export const deleteDebuggingTimeEntry = async (req, res, next) => {
    const debuggingTimeEntry = await DebuggingTimeEntry.findById(req.params.id);

    if (!debuggingTimeEntry) {
        return next(errorHandler(404, "Debugging Time Entry not found"));
    }

    try {
        await DebuggingTimeEntry.findByIdAndDelete(req.params.id);
        res.status(200).json("Debugging Time Entry has been deleted");
    } catch (error) {
        next(error);
    }
};

export const getAllDebuggingTimeEntries = async (req, res, next) => {
    try {
        const debuggingTimeEntries = await DebuggingTimeEntry.find().sort({ createdAt: 1 });

        res.status(200).json(debuggingTimeEntries);
    } catch (error) {
        next(error);
    }
};

export const getDebuggingTimeEntriesByAssignment = async (req, res, next) => {
    try {
        const debuggingTimeEntries = await DebuggingTimeEntry.aggregate([
            {
                $group: {
                    _id: "$assignmentId",
                    totalDuration: { $sum: "$duration_minutes" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const formattedEntries = debuggingTimeEntries.map(entry => ({
            assignment: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};

export const getDebuggingTimeEntriesByWeek = async (req, res, next) => {
    try {
        const debuggingTimeEntries = await DebuggingTimeEntry.aggregate([
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
                $sort: { _id: 1 }
            }
        ]);

        const formattedEntries = debuggingTimeEntries.map(entry => ({
            week: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};

export const getDebuggingTimeEntriesByWeekAndAssignment = async (req, res, next) => {
    try {
        const debuggingTimeEntries = await DebuggingTimeEntry.aggregate([
            {
                $match: {
                    assignmentId: req.params.assignmentId
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
                $sort: { _id: 1 }
            }
        ]);

        const formattedEntries = debuggingTimeEntries.map(entry => ({
            week: entry._id,
            duration_minutes: entry.totalDuration
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};

export const getDebuggingCountByWeekAndAssignment = async (req, res, next) => {
    try {
        const debuggingCounts = await DebuggingTimeEntry.aggregate([
            {
                $match: { assignmentId: req.params.assignmentId } // Match assignmentId
            },
            {
                $addFields: {
                    week: { $isoWeek: "$createdAt" } // Extract ISO week from createdAt
                }
            },
            {
                $group: {
                    _id: "$week",
                    count: { $sum: 1 } // Count the number of debugging entries per week
                }
            },
            {
                $sort: { _id: 1 } // Sort weeks in ascending order
            }
        ]);

        const formattedEntries = debuggingCounts.map(entry => ({
            week: entry._id,
            count: entry.count
        }));

        res.status(200).json(formattedEntries);
    } catch (error) {
        next(error);
    }
};