import { Router } from 'express';
import { IncomeController } from '../controllers/incomeController';
import { requireAuth } from '../middleware/auth';

const router = Router();

/**
 * All routes require authentication
 */
router.use(requireAuth);

/**
 * POST /api/income
 * Create new income record
 */
router.post('/', IncomeController.create);

/**
 * GET /api/income
 * Get all income records with optional filters
 */
router.get('/', IncomeController.list);

/**
 * GET /api/income/:id
 * Get single income record
 */
router.get('/:id', IncomeController.get);

/**
 * PUT /api/income/:id
 * Update income record
 */
router.put('/:id', IncomeController.update);

/**
 * DELETE /api/income/:id
 * Delete income record
 */
router.delete('/:id', IncomeController.delete);

export default router;
