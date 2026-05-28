"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectIfAuth = exports.requireAuth = void 0;
/**
 * Middleware to check if user is authenticated
 */
const requireAuth = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized - Please log in',
        });
        return;
    }
    next();
};
exports.requireAuth = requireAuth;
/**
 * Middleware to redirect authenticated users away from auth pages
 */
const redirectIfAuth = (req, res, next) => {
    if (req.user) {
        res.status(400).json({
            success: false,
            message: 'Already authenticated',
        });
        return;
    }
    next();
};
exports.redirectIfAuth = redirectIfAuth;
//# sourceMappingURL=auth.js.map