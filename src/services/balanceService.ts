import { database } from '../config/database';
import { Balance, MonthlyReport, DateRangeReport } from '../types';
import { IncomeService } from './incomeService';
import { ExpenseService } from './expenseService';

export class BalanceService {
  /**
   * Get current balance for a user
   */
  static async getBalance(userId: number): Promise<Balance> {
    const totalIncome = await IncomeService.getTotalIncome(userId);
    const totalExpense = await ExpenseService.getTotalExpense(userId);

    return {
      total_income: totalIncome,
      total_expense: totalExpense,
      net_balance: totalIncome - totalExpense,
    };
  }

  /**
   * Get balance for a specific date range
   */
  static async getBalanceByDateRange(
    userId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<DateRangeReport> {
    const totalIncome = await IncomeService.getTotalIncome(userId, dateFrom, dateTo);
    const totalExpense = await ExpenseService.getTotalExpense(userId, dateFrom, dateTo);

    const transactions = await database.all<{ count: number }>(
      `SELECT COUNT(*) as count FROM transactions 
       WHERE user_id = ? AND date >= ? AND date <= ?`,
      [userId, dateFrom, dateTo]
    );

    return {
      start_date: dateFrom,
      end_date: dateTo,
      total_income: totalIncome,
      total_expense: totalExpense,
      net_balance: totalIncome - totalExpense,
      transaction_count: transactions[0]?.count || 0,
    };
  }

  /**
   * Get monthly breakdown
   */
  static async getMonthlyReports(userId: number, year?: number): Promise<MonthlyReport[]> {
    const yearFilter = year ? year : new Date().getFullYear();

    const results = await database.all<any>(
      `SELECT 
        strftime('%Y-%m', date) as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
       FROM transactions
       WHERE user_id = ? AND strftime('%Y', date) = ?
       GROUP BY strftime('%Y-%m', date)
       ORDER BY month DESC`,
      [userId, yearFilter.toString()]
    );

    return results.map((row) => ({
      month: row.month,
      income: row.income || 0,
      expense: row.expense || 0,
      balance: (row.income || 0) - (row.expense || 0),
    }));
  }

  /**
   * Get balance breakdown by category
   */
  static async getBalanceByCategory(userId: number): Promise<any[]> {
    return database.all<any>(
      `SELECT 
        c.id,
        c.name,
        c.type,
        SUM(t.amount) as total,
        COUNT(t.id) as count
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = ?
       GROUP BY c.id, c.name, c.type
       ORDER BY c.type, total DESC`,
      [userId]
    );
  }
}
