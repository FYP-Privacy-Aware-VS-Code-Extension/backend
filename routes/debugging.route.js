import express from "express";
import {
    createDebuggingTimeEntry,
    deleteDebuggingTimeEntry,
    getAllDebuggingTimeEntries,
    getDebuggingTimeEntriesByAssignment,
    getDebuggingTimeEntriesByWeek,
    getDebuggingTimeEntriesByWeekAndAssignment,
    getDebuggingCountByWeekAndAssignment
} from '../controllers/debugging.controller.js';

const router = express.Router();

router.post('', createDebuggingTimeEntry);
router.delete('/:id', deleteDebuggingTimeEntry);
router.get('', getAllDebuggingTimeEntries);
router.get('/assignments', getDebuggingTimeEntriesByAssignment);
router.get('/weeks', getDebuggingTimeEntriesByWeek);
router.get('/assignments/:assignmentId', getDebuggingTimeEntriesByWeekAndAssignment);
router.get('/assignments/:assignmentId/count', getDebuggingCountByWeekAndAssignment); 

export default router;