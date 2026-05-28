import { Transaction, TransactionWithCategory } from '../types';
export declare class ExpenseService {
    /**
     * Create a new expense record
     */
    static createExpense(userId: number, amount: number, categoryId: number, description: string | undefined, date: string): Promise<Transaction>;
    /**
     * Get all expense records for a user
     */
    static getExpense(userId: number, dateFrom?: string, dateTo?: string, categoryId?: number): Promise<TransactionWithCategory[]>;
    /**
     * Get single expense record
     */
    static getExpenseById(userId: number, transactionId: number): Promise<TransactionWithCategory | null>;
    /**
     * Update expense record
     */
    static updateExpense(userId: number, transactionId: number, amount: number, categoryId: number, description: string | undefined, date: string): Promise<Transaction>;
    /**
     * Delete expense record
     */
    static deleteExpense(userId: number, transactionId: number): Promise<void>;
    /**
     * Get total expense for a user
     */
    static getTotalExpense(userId: number, dateFrom?: string, dateTo?: string): Promise<number>;
}
//# sourceMappingURL=expenseService.d.ts.map