import express from "express";
import {createTimeEntry, deleteTimeEntry, getAllTimeEntries, getTimeEntriesByAssignment, getTimeEntriesByWeek, getTimeEntriesByWeekAndAssignment} from '../controllers/time.controller.js'

const router = express.Router();

router.post('', createTimeEntry);
router.delete('/:id', deleteTimeEntry);
router.get('', getAllTimeEntries);
router.get('/assignments', getTimeEntriesByAssignment);
router.get('/weeks', getTimeEntriesByWeek);
router.get("/assignments/:assignmentId", getTimeEntriesByWeekAndAssignment);

export default router;