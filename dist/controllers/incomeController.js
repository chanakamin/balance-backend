"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeController = void 0;
const incomeService_1 = require("../services/incomeService");
class IncomeController {
    /**
     * Create income record
     * POST /api/income
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
            const income = await incomeService_1.IncomeService.createIncome(userId, amount, category_id, description, date);
            res.status(201).json({
                success: true,
                data: income,
                message: 'Income record created successfully',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to create income record',
            });
        }
    }
    /**
     * Get all income records with optional filters
     * GET /api/income?date_from=...&date_to=...&category_id=...
     */
    static async list(req, res) {
        try {
            const userId = req.user?.id;
            const { date_from, date_to, category_id } = req.query;
            const income = await incomeService_1.IncomeService.getIncome(userId, date_from, date_to, category_id ? parseInt(category_id) : undefined);
            res.json({
                success: true,
                data: income,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch income records',
            });
        }
    }
    /**
     * Get single income record
     * GET /api/income/:id
     */
    static async get(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            const income = await incomeService_1.IncomeService.getIncomeById(userId, parseInt(id));
            if (!income) {
                res.status(404).json({
                    success: false,
                    error: 'Income record not found',
                });
                return;
            }
            res.json({
                success: true,
                data: income,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch income record',
            });
        }
    }
    /**
     * Update income record
     * PUT /api/income/:id
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
            const income = await incomeService_1.IncomeService.updateIncome(userId, parseInt(id), amount, category_id, description, date);
            res.json({
                success: true,
                data: income,
                message: 'Income record updated successfully',
            });
        }
        catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({
                success: false,
                error: error.message || 'Failed to update income record',
            });
        }
    }
    /**
     * Delete income record
     * DELETE /api/income/:id
     */
    static async delete(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            await incomeService_1.IncomeService.deleteIncome(userId, parseInt(id));
            res.json({
                success: true,
                message: 'Income record deleted successfully',
            });
        }
        catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({
                success: false,
                error: error.message || 'Failed to delete income record',
            });
        }
    }
}
exports.IncomeController = IncomeController;
//# sourceMappingURL=incomeController.js.map