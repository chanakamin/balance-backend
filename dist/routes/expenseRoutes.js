"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.use(auth_1.requireAuth);
/**
 * POST /api/expense
 * Create new expense record
 */
router.post('/', expenseController_1.ExpenseController.create);
/**
 * GET /api/expense
 * Get all expense records with optional filters
 */
router.get('/', expenseController_1.ExpenseController.list);
/**
 * GET /api/expense/:id
 * Get single expense record
 */
router.get('/:id', expenseController_1.ExpenseController.get);
/**
 * PUT /api/expense/:id
 * Update expense record
 */
router.put('/:id', expenseController_1.ExpenseController.update);
/**
 * DELETE /api/expense/:id
 * Delete expense record
 */
router.delete('/:id', expenseController_1.ExpenseController.delete);
exports.default = router;
//# sourceMappingURL=expenseRoutes.js.map