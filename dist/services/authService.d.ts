import { User, UserRegistration, UserLogin } from '../types';
export declare class AuthService {
    /**
     * Register a new user
     */
    static register(userData: UserRegistration): Promise<User>;
    /**
     * Authenticate user with username and password
     */
    static authenticate(loginData: UserLogin): Promise<User | null>;
    /**
     * Get user by ID
     */
    static getUserById(userId: number): Promise<User | null>;
    /**
     * Get user by username
     */
    static getUserByUsername(username: string): Promise<User | null>;
}
//# sourceMappingURL=authService.d.ts.map