"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const database_1 = require("../config/database");
const types_1 = require("../types");
async function initializeDatabase() {
    try {
        console.log('Initializing database...');
        // Create tables
        await database_1.database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        UNIQUE(type, name)
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        category_id INTEGER NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(category_id) REFERENCES categories(id)
      );

      CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
    `);
        console.log('✓ Tables created successfully');
        // Seed predefined categories
        const incomeCategories = Object.values(types_1.IncomeCategory);
        const expenseCategories = Object.values(types_1.ExpenseCategory);
        for (const category of incomeCategories) {
            try {
                await database_1.database.run('INSERT INTO categories (type, name) VALUES (?, ?)', ['income', category]);
            }
            catch (err) {
                // Category might already exist, ignore
            }
        }
        for (const category of expenseCategories) {
            try {
                await database_1.database.run('INSERT INTO categories (type, name) VALUES (?, ?)', ['expense', category]);
            }
            catch (err) {
                // Category might already exist, ignore
            }
        }
        console.log('✓ Predefined categories seeded successfully');
        // Verify categories were created
        const categories = await database_1.database.all('SELECT * FROM categories ORDER BY type, name');
        console.log(`✓ Database initialized with ${categories.length} categories`);
        console.log('\nCategories:');
        categories.forEach((cat) => {
            console.log(`  - ${cat.type}: ${cat.name}`);
        });
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}
// Run if this file is executed directly
if (require.main === module) {
    initializeDatabase()
        .then(() => {
        console.log('\n✓ Database initialization complete!');
        process.exit(0);
    })
        .catch((error) => {
        console.error('✗ Database initialization failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=init.js.map