import { database } from '../config/database';
import { Transaction, TransactionWithCategory } from '../types';

export class IncomeService {
  /**
   * Create a new income record
   */
  static async createIncome(
    userId: number,
    amount: number,
    categoryId: number,
    description: string | undefined,
    date: string
  ): Promise<Transaction> {
    const result = await database.run(
      `INSERT INTO transactions (user_id, type, amount, category_id, description, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'income', amount, categoryId, description || null, date]
    );

    const income = await database.get<Transaction>(
      'SELECT * FROM transactions WHERE id = ?',
      [result.id]
    );

    if (!income) {
      throw new Error('Failed to create income record');
    }

    return income;
  }

  /**
   * Get all income records for a user
   */
  static async getIncome(
    userId: number,
    dateFrom?: string,
    dateTo?: string,
    categoryId?: number
  ): Promise<TransactionWithCategory[]> {
    let query = `
      SELECT t.*, c.name as category_name
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ? AND t.type = 'income'
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
   * Get single income record
   */
  static async getIncomeById(userId: number, transactionId: number): Promise<TransactionWithCategory | null> {
    const income = await database.get<TransactionWithCategory>(
      `SELECT t.*, c.name as category_name
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.id = ? AND t.user_id = ? AND t.type = 'income'`,
      [transactionId, userId]
    );

    return income || null;
  }

  /**
   * Update income record
   */
  static async updateIncome(
    userId: number,
    transactionId: number,
    amount: number,
    categoryId: number,
    description: string | undefined,
    date: string
  ): Promise<Transaction> {
    // Check if record exists and belongs to user
    const existing = await this.getIncomeById(userId, transactionId);
    if (!existing) {
      throw new Error('Income record not found');
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
      throw new Error('Failed to update income record');
    }

    return updated;
  }

  /**
   * Delete income record
   */
  static async deleteIncome(userId: number, transactionId: number): Promise<void> {
    const existing = await this.getIncomeById(userId, transactionId);
    if (!existing) {
      throw new Error('Income record not found');
    }

    await database.run(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, userId]
    );
  }

  /**
   * Get total income for a user
   */
  static async getTotalIncome(userId: number, dateFrom?: string, dateTo?: string): Promise<number> {
    let query = 'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = ?';
    const params: any[] = [userId, 'income'];

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
