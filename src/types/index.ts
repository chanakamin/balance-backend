// User types
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

// Category types
export interface Category {
  id: number;
  type: 'income' | 'expense';
  name: string;
}

export enum IncomeCategory {
  SALARY = 'Salary',
  BONUS = 'Bonus',
  INVESTMENT = 'Investment'
}

export enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  ENTERTAINMENT = 'Entertainment',
  UTILITIES = 'Utilities',
  OTHER = 'Other'
}

// Transaction types
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

// Balance types
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

// Express user for sessions
export interface ExpressUser {
  id: number;
  username: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
