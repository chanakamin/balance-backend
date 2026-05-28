"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./config/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const init_1 = require("./database/init");
Object.defineProperty(exports, "initializeDatabase", { enumerable: true, get: function () { return init_1.initializeDatabase; } });
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const incomeRoutes_1 = __importDefault(require("./routes/incomeRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const balanceRoutes_1 = __importDefault(require("./routes/balanceRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// Middleware: Body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware: Session configuration
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));
// Middleware: Passport authentication
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Middleware: Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Personal Finance Manager API is running' });
});
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/api/income', incomeRoutes_1.default);
app.use('/api/expense', expenseRoutes_1.default);
app.use('/api/balance', balanceRoutes_1.default);
// Middleware: 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
    });
});
// Middleware: Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
});
//# sourceMappingURL=app.js.map