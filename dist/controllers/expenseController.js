"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const expenseService_1 = require("../services/expenseService");
class ExpenseController {
    /**
     * Create expense record
     * POST /api/expense
     */
    static async create(req, res) {
        try {
            const userId = req.user?.id;
            const { amount, category_id, description, date } = req.body;
            // Validate input
            if (!amount || !category_id || !date) {
                res.status(400).json({
                    success: false,
                    error: 'amount, category_id, and date are required',
                });
                return;
            }
            if (amount <= 0) {
                res.status(400).json({
                    success: false,
                    error: 'amount must be greater than 0',
                });
                return;
            }
            const expense = await expenseService_1.ExpenseService.createExpense(userId, amount, category_id, description, date);
            res.status(201).json({
                success: true,
                data: expense,
                message: 'Expense record created successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to create expense record',
            });
        }
    }
    /**
     * Get all expense records with optional filters
     * GET /api/expense?date_from=...&date_to=...&category_id=...
     */
    static async list(req, res) {
        try {
            const userId = req.user?.id;
            const { date_from, date_to, category_id } = req.query;
            const expense = await expenseService_1.ExpenseService.getExpense(userId, date_from, date_to, category_id ? parseInt(category_id) : undefined);
            res.json({
                success: true,
                data: expense,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch expense records',
            });
        }
    }
    /**
     * Get single expense record
     * GET /api/expense/:id
     */
    static async get(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            const expense = await expenseService_1.ExpenseService.getExpenseById(userId, parseInt(id));
            if (!expense) {
                res.status(404).json({
                    success: false,
                    error: 'Expense record not found',
                });
                return;
            }
            res.json({
                success: true,
                data: expense,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch expense record',
            });
        }
    }
    /**
     * Update expense record
     * PUT /api/expense/:id
     */
    static async update(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            const { amount, category_id, description, date } = req.body;
            // Validate input
            if (!amount || !category_id || !date) {
                res.status(400).json({
                    success: false,
                    error: 'amount, category_id, and date are required',
                });
                return;
            }
            if (amount <= 0) {
                res.status(400).json({
                    success: false,
                    error: 'amount must be greater than 0',
                });
                return;
            }
            const expense = await expenseService_1.ExpenseService.updateExpense(userId, parseInt(id), amount, category_id, description, date);
            res.json({
                success: true,
                data: expense,
                message: 'Expense record updated successfully',
            });
        }
        catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({
                success: false,
                error: error.message || 'Failed to update expense record',
            });
        }
    }
    /**
     * Delete expense record
     * DELETE /api/expense/:id
     */
    static async delete(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            await expenseService_1.ExpenseService.deleteExpense(userId, parseInt(id));
            res.json({
                success: true,
                message: 'Expense record deleted successfully',
            });
        }
        catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({
                success: false,
                error: error.message || 'Failed to delete expense record',
            });
        }
    }
}
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expenseController.js.map