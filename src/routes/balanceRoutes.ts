import { Router } from 'express';
import { BalanceController } from '../controllers/balanceController';
import { requireAuth } from '../middleware/auth';

const router = Router();

/**
 * All routes require authentication
 */
router.use(requireAuth);

/**
 * GET /api/balance
 * Get current balance (total income, total expense, net balance)
 */
router.get('/', BalanceController.getBalance);

/**
 * GET /api/balance/range?date_from=...&date_to=...
 * Get balance for a specific date range
 */
router.get('/range', BalanceController.getBalanceByRange);

/**
 * GET /api/balance/monthly?year=...
 * Get monthly breakdown (default: current year)
 */
router.get('/monthly', BalanceController.getMonthlyBreakdown);

/**
 * GET /api/balance/by-category
 * Get balance breakdown by category
 */
router.get('/by-category', BalanceController.getBalanceByCategory);

export default router;
