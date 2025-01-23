import express from "express";
import {createAssignmentEntry, deleteAssignmentEntry, getAllAssignmentEntries } from '../controllers/assignment.controller.js'

const router = express.Router();

router.post('', createAssignmentEntry);
router.delete('/:id', deleteAssignmentEntry);
router.get('', getAllAssignmentEntries);

export default router;