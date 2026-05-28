"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', auth_1.redirectIfAuth, authController_1.AuthController.register);
/**
 * POST /auth/login
 * Login user with username and password
 */
router.post('/login', auth_1.redirectIfAuth, passport_1.default.authenticate('local', { failureMessage: true }), authController_1.AuthController.login);
/**
 * POST /auth/logout
 * Logout current user
 */
router.post('/logout', auth_1.requireAuth, authController_1.AuthController.logout);
/**
 * GET /auth/me
 * Get current authenticated user
 */
router.get('/me', authController_1.AuthController.getCurrentUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map