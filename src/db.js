const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const userDataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir, { recursive: true });

const dbPath = path.join(userDataDir, 'config.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS allowed_chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);

db.prepare(`
  CREATE TABLE IF NOT EXISTS app_config (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`).run();

const hasFlag = db.prepare('SELECT value FROM app_config WHERE key = ?').get('show_custom_messages');
if (!hasFlag) {
  db.prepare('INSERT INTO app_config (key, value) VALUES (?, ?)').run('show_custom_messages', 'true');
}

module.exports = db;