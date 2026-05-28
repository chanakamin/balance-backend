"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const balanceController_1 = require("../controllers/balanceController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.use(auth_1.requireAuth);
/**
 * GET /api/balance
 * Get current balance (total income, total expense, net balance)
 */
router.get('/', balanceController_1.BalanceController.getBalance);
/**
 * GET /api/balance/range?date_from=...&date_to=...
 * Get balance for a specific date range
 */
router.get('/range', balanceController_1.BalanceController.getBalanceByRange);
/**
 * GET /api/balance/monthly?year=...
 * Get monthly breakdown (default: current year)
 */
router.get('/monthly', balanceController_1.BalanceController.getMonthlyBreakdown);
/**
 * GET /api/balance/by-category
 * Get balance breakdown by category
 */
router.get('/by-category', balanceController_1.BalanceController.getBalanceByCategory);
exports.default = router;
//# sourceMappingURL=balanceRoutes.js.map