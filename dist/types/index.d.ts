export interface User {
    id: number;
    username: string;
    password_hash: string;
    created_at: string;
}
export interface UserRegistration {
    username: string;
    password: string;
}
export interface UserLogin {
    username: string;
    password: string;
}
export interface Category {
    id: number;
    type: 'income' | 'expense';
    name: string;
}
export declare enum IncomeCategory {
    SALARY = "Salary",
    BONUS = "Bonus",
    INVESTMENT = "Investment"
}
export declare enum ExpenseCategory {
    FOOD = "Food",
    TRANSPORT = "Transport",
    ENTERTAINMENT = "Entertainment",
    UTILITIES = "Utilities",
    OTHER = "Other"
}
export interface Transaction {
    id: number;
    user_id: number;
    type: 'income' | 'expense';
    amount: number;
    category_id: number;
    description?: string;
    date: string;
    created_at: string;
}
export interface TransactionRequest {
    type: 'income' | 'expense';
    amount: number;
    category_id: number;
    description?: string;
    date: string;
}
export interface TransactionWithCategory extends Transaction {
    category_name: string;
}
export interface Balance {
    total_income: number;
    total_expense: number;
    net_balance: number;
}
export interface MonthlyReport {
    month: string;
    income: number;
    expense: number;
    balance: number;
}
export interface DateRangeReport {
    start_date: string;
    end_date: string;
    total_income: number;
    total_expense: number;
    net_balance: number;
    transaction_count: number;
}
export interface ExpressUser {
    id: number;
    username: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map