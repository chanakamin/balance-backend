import { Request, Response } from 'express';
import { IncomeService } from '../services/incomeService';
import { ApiResponse, TransactionRequest } from '../types';

export class IncomeController {
  /**
   * Create income record
   * POST /api/income
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { amount, category_id, description, date } = req.body;

      // Validate input
      if (!amount || !category_id || !date) {
        res.status(400).json({
          success: false,
          error: 'amount, category_id, and date are required',
        } as ApiResponse<null>);
        return;
      }

      if (amount <= 0) {
        res.status(400).json({
          success: false,
          error: 'amount must be greater than 0',
        } as ApiResponse<null>);
        return;
      }

      const income = await IncomeService.createIncome(
        userId,
        amount,
        category_id,
        description,
        date
      );

      res.status(201).json({
        success: true,
        data: income,
        message: 'Income record created successfully',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create income record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get all income records with optional filters
   * GET /api/income?date_from=...&date_to=...&category_id=...
   */
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { date_from, date_to, category_id } = req.query;

      const income = await IncomeService.getIncome(
        userId,
        date_from as string,
        date_to as string,
        category_id ? parseInt(category_id as string) : undefined
      );

      res.json({
        success: true,
        data: income,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch income records',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get single income record
   * GET /api/income/:id
   */
  static async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { id } = req.params;

      const income = await IncomeService.getIncomeById(userId, parseInt(id));

      if (!income) {
        res.status(404).json({
          success: false,
          error: 'Income record not found',
        } as ApiResponse<null>);
        return;
      }

      res.json({
        success: true,
        data: income,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch income record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Update income record
   * PUT /api/income/:id
   */
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { id } = req.params;
      const { amount, category_id, description, date } = req.body;

      // Validate input
      if (!amount || !category_id || !date) {
        res.status(400).json({
          success: false,
          error: 'amount, category_id, and date are required',
        } as ApiResponse<null>);
        return;
      }

      if (amount <= 0) {
        res.status(400).json({
          success: false,
          error: 'amount must be greater than 0',
        } as ApiResponse<null>);
        return;
      }

      const income = await IncomeService.updateIncome(
        userId,
        parseInt(id),
        amount,
        category_id,
        description,
        date
      );

      res.json({
        success: true,
        data: income,
        message: 'Income record updated successfully',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: error.message || 'Failed to update income record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Delete income record
   * DELETE /api/income/:id
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { id } = req.params;

      await IncomeService.deleteIncome(userId, parseInt(id));

      res.json({
        success: true,
        message: 'Income record deleted successfully',
      } as ApiResponse<null>);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: error.message || 'Failed to delete income record',
      } as ApiResponse<null>);
    }
  }
}
