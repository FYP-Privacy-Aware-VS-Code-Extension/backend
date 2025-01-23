import AssignmentEntry from "../models/assignment.model.js";
import { errorHandler } from "../utils/error.js";

export const createAssignmentEntry = async (req, res, next) => {
    try {
        const assignmentEntry = await AssignmentEntry.create(req.body);
        return res.status(201).json(assignmentEntry)
    } catch (error) {
        next(error);
    }
}

export const deleteAssignmentEntry = async (req, res, next) => {
    const assignmentEntry = await AssignmentEntry.findById(req.params.id);

    if(!assignmentEntry){
        return next(errorHandler(404, 'Assignment Entry not found'));
    }

    try {
        await AssignmentEntry.findByIdAndDelete(req.params.id);
        res.status(200).json("Assignment Entry has been deleted");
    } catch (error) {
        next(error);
    }
}


export const getAllAssignmentEntries = async (req, res, next) => {
    try {
        const assignmentEntries = await AssignmentEntry.find().sort({ createdAt: 1 }); // Sort by createdAt in ascending order

        res.status(200).json(assignmentEntries);
    } catch (error) {
        next(error);
    }
};


