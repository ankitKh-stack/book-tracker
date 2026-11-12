# Book Tracker

A reading tracker for Android and iPhone, built with React Native and Expo.

> **Status:** early work in progress. Searching for books and saving them to your library work today; reading progress is next.

## What it does now

- **Search for books.** Type a title or ISBN and the app searches the [Google Books API](https://developers.google.com/books), showing the title and author of each result.
- **Save books to your library.** Tap a result to save it on the phone with its title, author, ISBN-13 and page count.
- **See your library.** The home screen lists the books you've saved, newest first.

Everything is stored on the phone in SQLite. There is no account and no server.

## Planned

- Reading sessions: log pages read and minutes spent per day (the `reading_sessions` table already exists in the schema).
- Reading status (want to read, reading, finished) and current-page progress for each book.
- Book covers in search results and the library (the search service already returns the cover URL).

## Tech stack

- **Expo SDK 54** with **Expo Router** (file-based navigation, bottom tabs)
- **expo-sqlite** for local storage
- **TypeScript**
- **Google Books API** for search

## Project structure

```
app/
  (tabs)/index.tsx   Home: your library and the "Add a book" button
  add-book.tsx       Search Google Books and save a result
db/
  schema.ts          Tables: books, reading_sessions
  client.ts          Opens the database and creates the tables
  books.ts           addBook, getAllBooks
services/
  bookSearch.ts      Google Books search, mapped to the fields the app uses
```

## Getting started

```bash
npm install
```

```bash
npx expo start
```

Then scan the QR code with **Expo Go** on your phone, or press `a` for an Android emulator or `w` for the browser.

Search needs a Google Books API key. Create one in the [Google Cloud console](https://console.cloud.google.com/apis/library/books.googleapis.com) and put it in `services/bookSearch.ts`. Don't commit a real key.
