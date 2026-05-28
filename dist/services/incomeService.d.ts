import { Transaction, TransactionWithCategory } from '../types';
export declare class IncomeService {
    /**
     * Create a new income record
     */
    static createIncome(userId: number, amount: number, categoryId: number, description: string | undefined, date: string): Promise<Transaction>;
    /**
     * Get all income records for a user
     */
    static getIncome(userId: number, dateFrom?: string, dateTo?: string, categoryId?: number): Promise<TransactionWithCategory[]>;
    /**
     * Get single income record
     */
    static getIncomeById(userId: number, transactionId: number): Promise<TransactionWithCategory | null>;
    /**
     * Update income record
     */
    static updateIncome(userId: number, transactionId: number, amount: number, categoryId: number, description: string | undefined, date: string): Promise<Transaction>;
    /**
     * Delete income record
     */
    static deleteIncome(userId: number, transactionId: number): Promise<void>;
    /**
     * Get total income for a user
     */
    static getTotalIncome(userId: number, dateFrom?: string, dateTo?: string): Promise<number>;
}
//# sourceMappingURL=incomeService.d.ts.map