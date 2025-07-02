import express from 'express';
import { 
  getWasteEntries, 
  addWasteEntry, 
  deleteWasteEntry, 
  updateWasteEntry 
} from '../controllers/wasteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getWasteEntries)
  .post(protect, addWasteEntry);

router.route('/:id')
  .put(protect, updateWasteEntry)
  .delete(protect, deleteWasteEntry);

export default router;
