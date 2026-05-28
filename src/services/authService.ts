import { database } from '../config/database';
import { User, UserRegistration, UserLogin } from '../types';
// @ts-ignore
import bcryptjs from 'bcryptjs';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(userData: UserRegistration): Promise<User> {
    // Check if user already exists
    const existingUser = await database.get<User>(
      'SELECT * FROM users WHERE username = ?',
      [userData.username]
    );

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(userData.password, 10);

    // Create user
    const result = await database.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [userData.username, passwordHash]
    );

    // Return created user
    const user = await database.get<User>(
      'SELECT id, username, password_hash, created_at FROM users WHERE id = ?',
      [result.id]
    );

    if (!user) {
      throw new Error('Failed to create user');
    }

    return user;
  }

  /**
   * Authenticate user with username and password
   */
  static async authenticate(loginData: UserLogin): Promise<User | null> {
    const user = await database.get<User>(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?',
      [loginData.username]
    );

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcryptjs.compare(loginData.password, user.password_hash);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: number): Promise<User | null> {
    const user = await database.get<User>(
      'SELECT id, username, password_hash, created_at FROM users WHERE id = ?',
      [userId]
    );

    return user || null;
  }

  /**
   * Get user by username
   */
  static async getUserByUsername(username: string): Promise<User | null> {
    const user = await database.get<User>(
      'SELECT id, username, password_hash, created_at FROM users WHERE username = ?',
      [username]
    );

    return user || null;
  }
}
