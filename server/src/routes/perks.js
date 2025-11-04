import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  filterPerks,
  getPerk,
  createPerk,
  updatePerk,
  deletePerk,
  getAllPerks,
  getAllPerksPublic
} from '../controllers/perkController.js';

const router = Router();

// 🟢 Public route to get all perks in database (for AllPerks page)
router.get('/all', getAllPerksPublic);

// 🟢 Authenticated routes (require login)
router.get('/', requireAuth, getAllPerks);
router.get('/:id', requireAuth, getPerk);
router.post('/', requireAuth, createPerk);
router.patch('/:id', requireAuth, updatePerk);
router.delete('/:id', requireAuth, deletePerk);

export default router;
