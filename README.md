# Personal Finance Manager

A multi-user REST API for managing incomes, expenses, and tracking financial balance with session-based authentication and SQLite database.

## Features

- **User Authentication**: Session-based login/registration with password hashing
- **Income Management**: Create, read, update, and delete income records
- **Expense Management**: Create, read, update, and delete expense records
- **Balance Tracking**: View current balance, monthly reports, and custom date ranges
- **Category Management**: Predefined income and expense categories
- **Date Filtering**: Filter transactions by date range and category
- **Multi-user Support**: Each user sees only their own data
- **Type Safety**: Built with TypeScript for type-safe development
- **SQLite Database**: Lightweight file-based database

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **SQLite3** - Lightweight database
- **Passport.js** - Authentication middleware
- **express-session** - Session management
- **bcryptjs** - Password hashing

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── database.ts      # SQLite connection & utilities
│   └── passport.ts      # Passport authentication strategy
├── controllers/         # Route handlers
│   ├── authController.ts
│   ├── incomeController.ts
│   ├── expenseController.ts
│   └── balanceController.ts
├── services/            # Business logic
│   ├── authService.ts
│   ├── incomeService.ts
│   ├── expenseService.ts
│   └── balanceService.ts
├── routes/              # Route definitions
│   ├── authRoutes.ts
│   ├── incomeRoutes.ts
│   ├── expenseRoutes.ts
│   └── balanceRoutes.ts
├── middleware/          # Express middleware
│   └── auth.ts          # Authentication guards
├── types/               # TypeScript interfaces
│   └── index.ts
├── database/            # Database initialization
│   └── init.ts
├── app.ts               # Express app setup
└── index.ts             # Entry point
```

## Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd node_example
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and update values if needed:

   ```bash
   cp .env.example .env
   ```

4. **Initialize the database**

   ```bash
   npm run db:init
   ```

## Running the Application

### Development Mode

Run with automatic reloading:

```bash
npm run dev
```

### Production Mode

1. Build the TypeScript:

   ```bash
   npm run build
   ```

2. Start the server:

   ```bash
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

#### Logout
```
POST /auth/logout
```

#### Get Current User
```
GET /auth/me
```

### Income Endpoints

#### Create Income
```
POST /api/income
Content-Type: application/json

{
  "amount": 5000,
  "category_id": 1,
  "description": "Monthly salary",
  "date": "2024-05-29"
}
```

#### Get All Income (with optional filters)
```
GET /api/income?date_from=2024-01-01&date_to=2024-05-31&category_id=1
```

#### Get Single Income
```
GET /api/income/:id
```

#### Update Income
```
PUT /api/income/:id
Content-Type: application/json

{
  "amount": 5000,
  "category_id": 1,
  "description": "Updated salary",
  "date": "2024-05-29"
}
```

#### Delete Income
```
DELETE /api/income/:id
```

### Expense Endpoints

Same as income endpoints, replace `/api/income` with `/api/expense`

### Balance Endpoints

#### Get Current Balance
```
GET /api/balance

Response:
{
  "success": true,
  "data": {
    "total_income": 15000,
    "total_expense": 3500,
    "net_balance": 11500
  }
}
```

#### Get Balance by Date Range
```
GET /api/balance/range?date_from=2024-01-01&date_to=2024-05-31
```

#### Get Monthly Breakdown
```
GET /api/balance/monthly?year=2024
```

#### Get Balance by Category
```
GET /api/balance/by-category
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL, -- 'income' or 'expense'
  name TEXT NOT NULL,
  UNIQUE(type, name)
)
```

### Transactions Table
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

## Predefined Categories

### Income Categories
- Salary
- Bonus
- Investment

### Expense Categories
- Food
- Transport
- Entertainment
- Utilities
- Other

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development or production)
- `SESSION_SECRET` - Secret key for session encryption
- `DB_PATH` - Path to SQLite database file (default: ./finance.db)

## Example Usage

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username": "testuser", "password": "password123"}'
```

### 3. Create an income record
```bash
curl -X POST http://localhost:3000/api/income \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "amount": 5000,
    "category_id": 1,
    "description": "Monthly salary",
    "date": "2024-05-29"
  }'
```

### 4. Get balance
```bash
curl -X GET http://localhost:3000/api/balance \
  -b cookies.txt
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common error responses:
- `401 Unauthorized` - User is not authenticated
- `400 Bad Request` - Invalid input or missing required fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Security Features

- Passwords are hashed using bcryptjs with salt rounds of 10
- Sessions are HTTP-only and secure (in production)
- User data isolation - users can only access their own transactions
- Input validation on all endpoints
- CSRF protection via session management

## Future Enhancements

- Password reset functionality
- User profile management
- Budget limits and alerts
- Email notifications
- Data export (CSV, PDF)
- API documentation (Swagger/OpenAPI)
- Unit and integration tests
- Advanced reporting and analytics
- Transaction search and filtering improvements

## License

MIT

## Support

For issues or questions, please check the documentation or create an issue in the repository.
