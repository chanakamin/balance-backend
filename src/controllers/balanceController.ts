import { Request, Response } from 'express';
import { BalanceService } from '../services/balanceService';
import { ApiResponse } from '../types';

export class BalanceController {
  /**
   * Get current balance
   * GET /api/balance
   */
  static async getBalance(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;

      const balance = await BalanceService.getBalance(userId);

      res.json({
        success: true,
        data: balance,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch balance',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get balance by date range
   * GET /api/balance/range?date_from=...&date_to=...
   */
  static async getBalanceByRange(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { date_from, date_to } = req.query;

      if (!date_from || !date_to) {
        res.status(400).json({
          success: false,
          error: 'date_from and date_to are required',
        } as ApiResponse<null>);
        return;
      }

      const report = await BalanceService.getBalanceByDateRange(
        userId,
        date_from as string,
        date_to as string
      );

      res.json({
        success: true,
        data: report,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch balance report',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get monthly breakdown
   * GET /api/balance/monthly?year=...
   */
  static async getMonthlyBreakdown(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;
      const { year } = req.query;

      const reports = await BalanceService.getMonthlyReports(
        userId,
        year ? parseInt(year as string) : undefined
      );

      res.json({
        success: true,
        data: reports,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch monthly reports',
      } as ApiResponse<null>);
    }
  }

  /**
   * Get balance by category
   * GET /api/balance/by-category
   */
  static async getBalanceByCategory(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.user as any)?.id;

      const data = await BalanceService.getBalanceByCategory(userId);

      res.json({
        success: true,
        data,
      } as ApiResponse<any>);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch balance by category',
      } as ApiResponse<null>);
    }
  }
}
