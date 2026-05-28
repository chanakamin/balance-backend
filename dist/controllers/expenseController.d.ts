import { Request, Response } from 'express';
export declare class ExpenseController {
    /**
     * Create expense record
     * POST /api/expense
     */
    static create(req: Request, res: Response): Promise<void>;
    /**
     * Get all expense records with optional filters
     * GET /api/expense?date_from=...&date_to=...&category_id=...
     */
    static list(req: Request, res: Response): Promise<void>;
    /**
     * Get single expense record
     * GET /api/expense/:id
     */
    static get(req: Request, res: Response): Promise<void>;
    /**
     * Update expense record
     * PUT /api/expense/:id
     */
    static update(req: Request, res: Response): Promise<void>;
    /**
     * Delete expense record
     * DELETE /api/expense/:id
     */
    static delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=expenseController.d.ts.map