const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "todo_db",
  user: process.env.DB_USER || "todo_user",
  password: process.env.DB_PASSWORD || "todo_pass",
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'todo',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = {
  pool,
  initDb,
};