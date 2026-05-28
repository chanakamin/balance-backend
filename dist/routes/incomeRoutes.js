"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incomeController_1 = require("../controllers/incomeController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * All routes require authentication
 */
router.use(auth_1.requireAuth);
/**
 * POST /api/income
 * Create new income record
 */
router.post('/', incomeController_1.IncomeController.create);
/**
 * GET /api/income
 * Get all income records with optional filters
 */
router.get('/', incomeController_1.IncomeController.list);
/**
 * GET /api/income/:id
 * Get single income record
 */
router.get('/:id', incomeController_1.IncomeController.get);
/**
 * PUT /api/income/:id
 * Update income record
 */
router.put('/:id', incomeController_1.IncomeController.update);
/**
 * DELETE /api/income/:id
 * Delete income record
 */
router.delete('/:id', incomeController_1.IncomeController.delete);
exports.default = router;
//# sourceMappingURL=incomeRoutes.js.map