import { database } from '../config/database';
import { Transaction, TransactionWithCategory } from '../types';

export class ExpenseService {
  /**
   * Create a new expense record
   */
  static async createExpense(
    userId: number,
    amount: number,
    categoryId: number,
    description: string | undefined,
    date: string
  ): Promise<Transaction> {
    const result = await database.run(
      `INSERT INTO transactions (user_id, type, amount, category_id, description, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'expense', amount, categoryId, description || null, date]
    );

    const expense = await database.get<Transaction>(
      'SELECT * FROM transactions WHERE id = ?',
      [result.id]
    );

    if (!expense) {
      throw new Error('Failed to create expense record');
    }

    return expense;
  }

  /**
   * Get all expense records for a user
   */
  static async getExpense(
    userId: number,
    dateFrom?: string,
    dateTo?: string,
    categoryId?: number
  ): Promise<TransactionWithCategory[]> {
    let query = `
      SELECT t.*, c.name as category_name
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ? AND t.type = 'expense'
    `;

    const params: any[] = [userId];

    if (dateFrom) {
      query += ' AND t.date >= ?';
      params.push(dateFrom);
    }

    if (dateTo) {
      query += ' AND t.date <= ?';
      params.push(dateTo);
    }

    if (categoryId) {
      query += ' AND t.category_id = ?';
      params.push(categoryId);
    }

    query += ' ORDER BY t.date DESC';

    return database.all<TransactionWithCategory>(query, params);
  }

  /**
   * Get single expense record
   */
  static async getExpenseById(userId: number, transactionId: number): Promise<TransactionWithCategory | null> {
    const expense = await database.get<TransactionWithCategory>(
      `SELECT t.*, c.name as category_name
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.id = ? AND t.user_id = ? AND t.type = 'expense'`,
      [transactionId, userId]
    );

    return expense || null;
  }

  /**
   * Update expense record
   */
  static async updateExpense(
    userId: number,
    transactionId: number,
    amount: number,
    categoryId: number,
    description: string | undefined,
    date: string
  ): Promise<Transaction> {
    // Check if record exists and belongs to user
    const existing = await this.getExpenseById(userId, transactionId);
    if (!existing) {
      throw new Error('Expense record not found');
    }

    await database.run(
      `UPDATE transactions
       SET amount = ?, category_id = ?, description = ?, date = ?
       WHERE id = ? AND user_id = ?`,
      [amount, categoryId, description || null, date, transactionId, userId]
    );

    const updated = await database.get<Transaction>(
      'SELECT * FROM transactions WHERE id = ?',
      [transactionId]
    );

    if (!updated) {
      throw new Error('Failed to update expense record');
    }

    return updated;
  }

  /**
   * Delete expense record
   */
  static async deleteExpense(userId: number, transactionId: number): Promise<void> {
    const existing = await this.getExpenseById(userId, transactionId);
    if (!existing) {
      throw new Error('Expense record not found');
    }

    await database.run(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, userId]
    );
  }

  /**
   * Get total expense for a user
   */
  static async getTotalExpense(userId: number, dateFrom?: string, dateTo?: string): Promise<number> {
    let query = 'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = ?';
    const params: any[] = [userId, 'expense'];

    if (dateFrom) {
      query += ' AND date >= ?';
      params.push(dateFrom);
    }

    if (dateTo) {
      query += ' AND date <= ?';
      params.push(dateTo);
    }

    const result = await database.get<{ total: number | null }>(query, params);
    return result?.total || 0;
  }
}
