import { Balance, MonthlyReport, DateRangeReport } from '../types';
export declare class BalanceService {
    /**
     * Get current balance for a user
     */
    static getBalance(userId: number): Promise<Balance>;
    /**
     * Get balance for a specific date range
     */
    static getBalanceByDateRange(userId: number, dateFrom: string, dateTo: string): Promise<DateRangeReport>;
    /**
     * Get monthly breakdown
     */
    static getMonthlyReports(userId: number, year?: number): Promise<MonthlyReport[]>;
    /**
     * Get balance breakdown by category
     */
    static getBalanceByCategory(userId: number): Promise<any[]>;
}
//# sourceMappingURL=balanceService.d.ts.map