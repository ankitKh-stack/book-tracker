export const SCHEMA = `
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  total_pages INTEGER,
  current_page INTEGER DEFAULT 0,
  status TEXT DEFAULT 'want_to_read',
  added_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reading_sessions (
  id TEXT PRIMARY KEY,
  book_id TEXT NOT NULL,
  date TEXT NOT NULL,
  pages_read INTEGER NOT NULL,
  minutes_spent INTEGER,
  source TEXT DEFAULT 'manual'
);
`;