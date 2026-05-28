import { Request, Response } from 'express';
export declare class IncomeController {
    /**
     * Create income record
     * POST /api/income
     */
    static create(req: Request, res: Response): Promise<void>;
    /**
     * Get all income records with optional filters
     * GET /api/income?date_from=...&date_to=...&category_id=...
     */
    static list(req: Request, res: Response): Promise<void>;
    /**
     * Get single income record
     * GET /api/income/:id
     */
    static get(req: Request, res: Response): Promise<void>;
    /**
     * Update income record
     * PUT /api/income/:id
     */
    static update(req: Request, res: Response): Promise<void>;
    /**
     * Delete income record
     * DELETE /api/income/:id
     */
    static delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=incomeController.d.ts.map