import { Router } from 'express';
import { ExpenseController } from '../controllers/expenseController';
import { requireAuth } from '../middleware/auth';

const router = Router();

/**
 * All routes require authentication
 */
router.use(requireAuth);

/**
 * POST /api/expense
 * Create new expense record
 */
router.post('/', ExpenseController.create);

/**
 * GET /api/expense
 * Get all expense records with optional filters
 */
router.get('/', ExpenseController.list);

/**
 * GET /api/expense/:id
 * Get single expense record
 */
router.get('/:id', ExpenseController.get);

/**
 * PUT /api/expense/:id
 * Update expense record
 */
router.put('/:id', ExpenseController.update);

/**
 * DELETE /api/expense/:id
 * Delete expense record
 */
router.delete('/:id', ExpenseController.delete);

export default router;
