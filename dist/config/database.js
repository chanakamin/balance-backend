"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbPath = process.env.DB_PATH || './finance.db';
class Database {
    constructor() {
        this.db = new sqlite3_1.default.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
            }
            else {
                console.log(`Connected to SQLite database at ${dbPath}`);
            }
        });
        // Enable foreign keys
        this.db.run('PRAGMA foreign_keys = ON');
    }
    /**
     * Run a single INSERT, UPDATE, or DELETE query
     */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }
    /**
     * Get a single row
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    /**
     * Get all rows
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve((rows || []));
                }
            });
        });
    }
    /**
     * Execute multiple statements (for schema creation)
     */
    exec(sql) {
        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     * Close the database connection
     */
    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }
}
exports.database = new Database();
//# sourceMappingURL=database.js.map