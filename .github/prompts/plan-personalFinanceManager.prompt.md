# Plan: Personal Finance Manager - Node.js/Express/TypeScript with SQLite

## TL;DR
Build a multi-user income & expense tracking application using Express, TypeScript, and SQLite. Features include session-based authentication, CRUD operations for transactions, predefined categories, date-range filtering, and balance calculations. Project will follow layered architecture (routes → controllers → services → database) with clean separation of concerns.

## Project Overview

**Technology Stack:**
- Node.js runtime
- Express.js (REST API framework)
- TypeScript (type-safe development)
- SQLite3 (lightweight database)
- express-session + passport.js (session-based authentication)
- dotenv (environment configuration)

**Core Features:**
1. User authentication (login/registration with session management)
2. Income management (CRUD + filtering by date/category)
3. Expense management (CRUD + filtering by date/category)
4. Balance calculation (total income, total expenses, net balance)
5. Monthly/date-range reports
6. Predefined categories per transaction type

## Folder Structure

```
node_example/
├── src/
│   ├── config/
│   │   ├── database.ts          (SQLite connection setup)
│   │   └── passport.ts          (Authentication strategy)
│   ├── controllers/
│   │   ├── authController.ts    (login, register, logout)
│   │   ├── incomeController.ts  (income CRUD & reporting)
│   │   └── expenseController.ts (expense CRUD & reporting)
│   ├── services/
│   │   ├── authService.ts       (user auth logic)
│   │   ├── incomeService.ts     (income business logic)
│   │   ├── expenseService.ts    (expense business logic)
│   │   └── balanceService.ts    (balance calculations)
│   ├── routes/
│   │   ├── authRoutes.ts        (POST /login, /register, /logout)
│   │   ├── incomeRoutes.ts      (CRUD endpoints)
│   │   └── expenseRoutes.ts     (CRUD endpoints)
│   ├── middleware/
│   │   └── auth.ts              (authentication guards)
│   ├── types/
│   │   └── index.ts             (TypeScript interfaces & enums)
│   ├── database/
│   │   └── init.ts              (schema creation & seed data)
│   └── app.ts                   (Express app setup)
├── dist/                        (compiled JavaScript output)
├── .env                         (environment variables)
├── .env.example                 (template for .env)
├── tsconfig.json               (TypeScript configuration)
├── package.json                (dependencies)
└── README.md                   (documentation)
```

## Steps (Implementation Order)

### Phase 1: Project Setup
1. Initialize npm project with `npm init`
2. Install dependencies (see Dependencies section)
3. Create TypeScript configuration (tsconfig.json)
4. Set up folder structure from above
5. Create .env and .env.example files
6. Initialize SQLite database and schema

### Phase 2: Database & Types
1. Create database connection in `config/database.ts`
2. Define TypeScript interfaces in `types/index.ts` (User, Transaction, Category, etc.)
3. Initialize database schema in `database/init.ts` with tables:
   - `users` (id, username, password_hash, created_at)
   - `categories` (id, type, name) — predefined: Income categories (Salary, Bonus, Investment), Expense categories (Food, Transport, Entertainment, Utilities, Other)
   - `transactions` (id, user_id, type, amount, category_id, description, date, created_at)
4. Create seed script for predefined categories

### Phase 3: Authentication
1. Set up express-session middleware
2. Configure passport.js with LocalStrategy
3. Implement `authService.ts` with register/login/logout logic
4. Create `authController.ts` endpoints
5. Add `auth.ts` middleware for protecting routes
6. Create `authRoutes.ts` (POST /auth/register, /auth/login, /auth/logout)

### Phase 4: Business Logic Services
1. Create `incomeService.ts` with methods:
   - Create, Read, Update, Delete income
   - Get income by date range & category
   - Calculate total income
2. Create `expenseService.ts` with same CRUD + filtering
3. Create `balanceService.ts` with:
   - Calculate net balance (income - expenses)
   - Generate monthly report
   - Get balance by date range

### Phase 5: Controllers & Routes
1. Create controllers calling services
2. Define routes with authentication middleware
3. Income endpoints:
   - `POST /api/income` — Create
   - `GET /api/income` — List with filters (date range, category)
   - `GET /api/income/:id` — Get single
   - `PUT /api/income/:id` — Update
   - `DELETE /api/income/:id` — Delete
4. Expense endpoints: Same as above under `/api/expense`
5. Balance endpoints:
   - `GET /api/balance` — Current balance
   - `GET /api/balance/monthly` — Monthly report
   - `GET /api/balance/range` — Custom date range report

### Phase 6: Main Application Setup
1. Create `app.ts` Express application
2. Configure middleware (session, body parsing, static files)
3. Register routes
4. Add error handling middleware
5. Create `index.ts` or start script

## Relevant Files to Create

### Core Files:
- `src/app.ts` — Main Express application
- `src/config/database.ts` — SQLite connection management
- `src/config/passport.ts` — Authentication strategy
- `src/database/init.ts` — Schema initialization
- `src/types/index.ts` — All TypeScript interfaces
- `src/middleware/auth.ts` — Authentication middleware
- `src/services/authService.ts` — Authentication logic
- `src/services/incomeService.ts` — Income business logic
- `src/services/expenseService.ts` — Expense business logic
- `src/services/balanceService.ts` — Balance calculations
- `src/controllers/authController.ts` — Auth endpoints
- `src/controllers/incomeController.ts` — Income endpoints
- `src/controllers/expenseController.ts` — Expense endpoints
- `src/routes/authRoutes.ts` — Auth route definitions
- `src/routes/incomeRoutes.ts` — Income route definitions
- `src/routes/expenseRoutes.ts` — Expense route definitions

### Config Files:
- `tsconfig.json` — TypeScript compiler options
- `package.json` — Dependencies and scripts
- `.env` — Runtime environment variables (not committed)
- `.env.example` — Template for .env
- `README.md` — Project documentation

## NPM Dependencies

**Production:**
```json
{
  "express": "^4.18.2",
  "typescript": "^5.0.0",
  "sqlite3": "^5.1.6",
  "express-session": "^1.17.3",
  "passport": "^0.6.0",
  "passport-local": "^1.0.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.0.3"
}
```

**Development:**
```json
{
  "@types/express": "^4.17.17",
  "@types/node": "^18.15.0",
  "@types/passport-local": "^1.0.34",
  "ts-node": "^10.9.1",
  "nodemon": "^2.0.20"
}
```

**Package.json scripts:**
- `dev`: Run with nodemon and ts-node (development)
- `build`: Compile TypeScript to JavaScript
- `start`: Run compiled application (production)
- `db:init`: Initialize database schema

## Database Schema

**users**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**categories**
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL, -- 'income' or 'expense'
  name TEXT NOT NULL,
  UNIQUE(type, name)
)
```

**transactions**
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'income' or 'expense'
  amount REAL NOT NULL,
  category_id INTEGER NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(category_id) REFERENCES categories(id)
)
```

## Key Design Patterns

1. **Layered Architecture**: Routes → Controllers → Services → Database
2. **Service Layer**: All business logic isolated in services for reusability & testability
3. **Error Handling**: Consistent error handling in controllers with appropriate HTTP status codes
4. **Type Safety**: Full TypeScript typing across all layers
5. **Database Abstraction**: Queries wrapped in services to prevent SQL duplication
6. **Session Security**: Passwords hashed with bcryptjs, sessions managed server-side

## Verification Steps

1. **Project Setup**: Verify folder structure created and npm dependencies installed
2. **Database**: Test that SQLite db initializes with correct schema and predefined categories
3. **Authentication**: Test registration, login, logout flow; verify sessions persist
4. **CRUD Operations**: Test create/read/update/delete for income and expenses
5. **Filtering**: Test date-range and category filtering
6. **Balance Calculations**: Verify balance endpoint returns correct calculations
7. **Authorization**: Verify users only see their own data; other users' data not accessible
8. **Build**: Run `npm run build` and verify TypeScript compiles without errors

## Decisions

- **Session-based Auth**: Using express-session + passport for stateful authentication (user requested)
- **Predefined Categories**: Fixed categories per transaction type (not user-defined per requirement)
- **SQLite**: Chosen for simplicity and file-based storage (no external DB setup needed)
- **Layered Architecture**: Services layer for business logic separation and future testability
- **No Frontend**: API-only backend; can be consumed by any frontend client
- **Date Filtering**: Query parameters for flexible reporting (date_from, date_to, category)

## Out of Scope

- User password reset/recovery
- Email notifications
- Advanced analytics/charts
- Budget limits/alerts
- Data export (CSV, PDF)
- Frontend UI
- API documentation (Swagger/OpenAPI)
- Automated tests
