"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const balanceService_1 = require("../services/balanceService");
class BalanceController {
    /**
     * Get current balance
     * GET /api/balance
     */
    static async getBalance(req, res) {
        try {
            const userId = req.user?.id;
            const balance = await balanceService_1.BalanceService.getBalance(userId);
            res.json({
                success: true,
                data: balance,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch balance',
            });
        }
    }
    /**
     * Get balance by date range
     * GET /api/balance/range?date_from=...&date_to=...
     */
    static async getBalanceByRange(req, res) {
        try {
            const userId = req.user?.id;
            const { date_from, date_to } = req.query;
            if (!date_from || !date_to) {
                res.status(400).json({
                    success: false,
                    error: 'date_from and date_to are required',
                });
                return;
            }
            const report = await balanceService_1.BalanceService.getBalanceByDateRange(userId, date_from, date_to);
            res.json({
                success: true,
                data: report,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch balance report',
            });
        }
    }
    /**
     * Get monthly breakdown
     * GET /api/balance/monthly?year=...
     */
    static async getMonthlyBreakdown(req, res) {
        try {
            const userId = req.user?.id;
            const { year } = req.query;
            const reports = await balanceService_1.BalanceService.getMonthlyReports(userId, year ? parseInt(year) : undefined);
            res.json({
                success: true,
                data: reports,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch monthly reports',
            });
        }
    }
    /**
     * Get balance by category
     * GET /api/balance/by-category
     */
    static async getBalanceByCategory(req, res) {
        try {
            const userId = req.user?.id;
            const data = await balanceService_1.BalanceService.getBalanceByCategory(userId);
            res.json({
                success: true,
                data,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to fetch balance by category',
            });
        }
    }
}
exports.BalanceController = BalanceController;
//# sourceMappingURL=balanceController.js.map