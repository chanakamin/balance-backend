"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const database_1 = require("../config/database");
const incomeService_1 = require("./incomeService");
const expenseService_1 = require("./expenseService");
class BalanceService {
    /**
     * Get current balance for a user
     */
    static async getBalance(userId) {
        const totalIncome = await incomeService_1.IncomeService.getTotalIncome(userId);
        const totalExpense = await expenseService_1.ExpenseService.getTotalExpense(userId);
        return {
            total_income: totalIncome,
            total_expense: totalExpense,
            net_balance: totalIncome - totalExpense,
        };
    }
    /**
     * Get balance for a specific date range
     */
    static async getBalanceByDateRange(userId, dateFrom, dateTo) {
        const totalIncome = await incomeService_1.IncomeService.getTotalIncome(userId, dateFrom, dateTo);
        const totalExpense = await expenseService_1.ExpenseService.getTotalExpense(userId, dateFrom, dateTo);
        const transactions = await database_1.database.all(`SELECT COUNT(*) as count FROM transactions 
       WHERE user_id = ? AND date >= ? AND date <= ?`, [userId, dateFrom, dateTo]);
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
    static async getMonthlyReports(userId, year) {
        const yearFilter = year ? year : new Date().getFullYear();
        const results = await database_1.database.all(`SELECT 
        strftime('%Y-%m', date) as month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
       FROM transactions
       WHERE user_id = ? AND strftime('%Y', date) = ?
       GROUP BY strftime('%Y-%m', date)
       ORDER BY month DESC`, [userId, yearFilter.toString()]);
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
    static async getBalanceByCategory(userId) {
        return database_1.database.all(`SELECT 
        c.id,
        c.name,
        c.type,
        SUM(t.amount) as total,
        COUNT(t.id) as count
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = ?
       GROUP BY c.id, c.name, c.type
       ORDER BY c.type, total DESC`, [userId]);
    }
}
exports.BalanceService = BalanceService;
//# sourceMappingURL=balanceService.js.map