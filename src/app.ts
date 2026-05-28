import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from './config/passport';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/init';

// Routes
import authRoutes from './routes/authRoutes';
import incomeRoutes from './routes/incomeRoutes';
import expenseRoutes from './routes/expenseRoutes';
import balanceRoutes from './routes/balanceRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware: Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Middleware: Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware: Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Personal Finance Manager API is running' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/balance', balanceRoutes);

// Middleware: 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// Middleware: Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

export { app, initializeDatabase };
