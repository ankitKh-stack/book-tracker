import * as SQLite from 'expo-sqlite';
import { SCHEMA } from './schema';

export async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('booktracker.db');
  await db.execAsync(SCHEMA);
  return db;
}