declare class Database {
    private db;
    constructor();
    /**
     * Run a single INSERT, UPDATE, or DELETE query
     */
    run(sql: string, params?: any[]): Promise<{
        id: number;
        changes: number;
    }>;
    /**
     * Get a single row
     */
    get<T>(sql: string, params?: any[]): Promise<T | undefined>;
    /**
     * Get all rows
     */
    all<T>(sql: string, params?: any[]): Promise<T[]>;
    /**
     * Execute multiple statements (for schema creation)
     */
    exec(sql: string): Promise<void>;
    /**
     * Close the database connection
     */
    close(): Promise<void>;
}
export declare const database: Database;
export {};
//# sourceMappingURL=database.d.ts.map