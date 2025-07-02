import express from 'express';
import { getDynamicStats } from '../controllers/statsController.js';

const router = express.Router();

router.get('/dynamic', getDynamicStats);

export default router;
