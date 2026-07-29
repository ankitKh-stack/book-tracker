import { openDatabase } from './client';

export async function addBook(book: {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  total_pages?: number;
}) {
  const db = await openDatabase();
  await db.runAsync(
    `INSERT INTO books (id, title, author, isbn, total_pages) VALUES (?, ?, ?, ?, ?)`,
    [book.id, book.title, book.author ?? null, book.isbn ?? null, book.total_pages ?? null]
  );
}

export async function getAllBooks() {
  const db = await openDatabase();
  return await db.getAllAsync('SELECT * FROM books ORDER BY added_at DESC');
}