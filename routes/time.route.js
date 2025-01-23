import express from "express";
import {createTimeEntry, deleteTimeEntry, getAllTimeEntries, getTimeEntriesByAssignment, getTimeEntriesByWeek} from '../controllers/time.controller.js'

const router = express.Router();

router.post('', createTimeEntry);
router.delete('/:id', deleteTimeEntry);
router.get('', getAllTimeEntries);
router.get('/assignment', getTimeEntriesByAssignment);
router.get('/week', getTimeEntriesByWeek);

export default router;