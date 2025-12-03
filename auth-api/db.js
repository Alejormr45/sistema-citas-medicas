const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function initDB() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Crear tabla users SI NO EXISTE
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  return db;
}

module.exports = initDB();
