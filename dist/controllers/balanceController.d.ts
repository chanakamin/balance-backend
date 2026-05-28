import { Request, Response } from 'express';
export declare class BalanceController {
    /**
     * Get current balance
     * GET /api/balance
     */
    static getBalance(req: Request, res: Response): Promise<void>;
    /**
     * Get balance by date range
     * GET /api/balance/range?date_from=...&date_to=...
     */
    static getBalanceByRange(req: Request, res: Response): Promise<void>;
    /**
     * Get monthly breakdown
     * GET /api/balance/monthly?year=...
     */
    static getMonthlyBreakdown(req: Request, res: Response): Promise<void>;
    /**
     * Get balance by category
     * GET /api/balance/by-category
     */
    static getBalanceByCategory(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=balanceController.d.ts.map