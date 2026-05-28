import { Request, Response } from 'express';
import { ExpenseService } from '../services/expenseService';
import { ApiResponse } from '../types';

export class ExpenseController {
  /**
   * Create expense record
   * POST /api/expense
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

      const expense = await ExpenseService.createExpense(
        userId,
        amount,
        category_id,
        description,
        date
      );

      res.status(201).json({
        success: true,
        data: expense,
        message: 'Expense record created successfully',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to create expense record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get all expense records with optional filters
   * GET /api/expense?date_from=...&date_to=...&category_id=...
   */
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { date_from, date_to, category_id } = req.query;

      const expense = await ExpenseService.getExpense(
        userId,
        date_from as string,
        date_to as string,
        category_id ? parseInt(category_id as string) : undefined
      );

      res.json({
        success: true,
        data: expense,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch expense records',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get single expense record
   * GET /api/expense/:id
   */
  static async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { id } = req.params;

      const expense = await ExpenseService.getExpenseById(userId, parseInt(id));

      if (!expense) {
        res.status(404).json({
          success: false,
          error: 'Expense record not found',
        } as ApiResponse<null>);
        return;
      }

      res.json({
        success: true,
        data: expense,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch expense record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Update expense record
   * PUT /api/expense/:id
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

      const expense = await ExpenseService.updateExpense(
        userId,
        parseInt(id),
        amount,
        category_id,
        description,
        date
      );

      res.json({
        success: true,
        data: expense,
        message: 'Expense record updated successfully',
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: error.message || 'Failed to update expense record',
      } as ApiResponse<null>);
    }
  }

  /**
   * Delete expense record
   * DELETE /api/expense/:id
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { id } = req.params;

      await ExpenseService.deleteExpense(userId, parseInt(id));

      res.json({
        success: true,
        message: 'Expense record deleted successfully',
      } as ApiResponse<null>);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: error.message || 'Failed to delete expense record',
      } as ApiResponse<null>);
    }
  }
}
