"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../config/database");
// @ts-ignore
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    /**
     * Register a new user
     */
    static async register(userData) {
        // Check if user already exists
        const existingUser = await database_1.database.get('SELECT * FROM users WHERE username = ?', [userData.username]);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(userData.password, 10);
        // Create user
        const result = await database_1.database.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [userData.username, passwordHash]);
        // Return created user
        const user = await database_1.database.get('SELECT id, username, password_hash, created_at FROM users WHERE id = ?', [result.id]);
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    }
    /**
     * Authenticate user with username and password
     */
    static async authenticate(loginData) {
        const user = await database_1.database.get('SELECT id, username, password_hash, created_at FROM users WHERE username = ?', [loginData.username]);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcryptjs_1.default.compare(loginData.password, user.password_hash);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    /**
     * Get user by ID
     */
    static async getUserById(userId) {
        const user = await database_1.database.get('SELECT id, username, password_hash, created_at FROM users WHERE id = ?', [userId]);
        return user || null;
    }
    /**
     * Get user by username
     */
    static async getUserByUsername(username) {
        const user = await database_1.database.get('SELECT id, username, password_hash, created_at FROM users WHERE username = ?', [username]);
        return user || null;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map