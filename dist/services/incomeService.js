"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeService = void 0;
const database_1 = require("../config/database");
class IncomeService {
    /**
     * Create a new income record
     */
    static async createIncome(userId, amount, categoryId, description, date) {
        const result = await database_1.database.run(`INSERT INTO transactions (user_id, type, amount, category_id, description, date)
       VALUES (?, ?, ?, ?, ?, ?)`, [userId, 'income', amount, categoryId, description || null, date]);
        const income = await database_1.database.get('SELECT * FROM transactions WHERE id = ?', [result.id]);
        if (!income) {
            throw new Error('Failed to create income record');
        }
        return income;
    }
    /**
     * Get all income records for a user
     */
    static async getIncome(userId, dateFrom, dateTo, categoryId) {
        let query = `
      SELECT t.*, c.name as category_name
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ? AND t.type = 'income'
    `;
        const params = [userId];
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
        return database_1.database.all(query, params);
    }
    /**
     * Get single income record
     */
    static async getIncomeById(userId, transactionId) {
        const income = await database_1.database.get(`SELECT t.*, c.name as category_name
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.id = ? AND t.user_id = ? AND t.type = 'income'`, [transactionId, userId]);
        return income || null;
    }
    /**
     * Update income record
     */
    static async updateIncome(userId, transactionId, amount, categoryId, description, date) {
        // Check if record exists and belongs to user
        const existing = await this.getIncomeById(userId, transactionId);
        if (!existing) {
            throw new Error('Income record not found');
        }
        await database_1.database.run(`UPDATE transactions
       SET amount = ?, category_id = ?, description = ?, date = ?
       WHERE id = ? AND user_id = ?`, [amount, categoryId, description || null, date, transactionId, userId]);
        const updated = await database_1.database.get('SELECT * FROM transactions WHERE id = ?', [transactionId]);
        if (!updated) {
            throw new Error('Failed to update income record');
        }
        return updated;
    }
    /**
     * Delete income record
     */
    static async deleteIncome(userId, transactionId) {
        const existing = await this.getIncomeById(userId, transactionId);
        if (!existing) {
            throw new Error('Income record not found');
        }
        await database_1.database.run('DELETE FROM transactions WHERE id = ? AND user_id = ?', [transactionId, userId]);
    }
    /**
     * Get total income for a user
     */
    static async getTotalIncome(userId, dateFrom, dateTo) {
        let query = 'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND type = ?';
        const params = [userId, 'income'];
        if (dateFrom) {
            query += ' AND date >= ?';
            params.push(dateFrom);
        }
        if (dateTo) {
            query += ' AND date <= ?';
            params.push(dateTo);
        }
        const result = await database_1.database.get(query, params);
        return result?.total || 0;
    }
}
exports.IncomeService = IncomeService;
//# sourceMappingURL=incomeService.js.map