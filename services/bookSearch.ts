const GOOGLE_BOOKS_API_KEY = 'GBooksAPI';

export async function searchBooks(query: string) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log('Raw response:', JSON.stringify(data).slice(0, 500));

  if (data.error) {
    console.log('Google Books API error:', data.error.message);
    return [];
  }

  if (!data.items) return [];

  return data.items.map((item: any) => ({
    googleId: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] ?? 'Unknown',
    isbn: item.volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13')?.identifier ?? null,
    totalPages: item.volumeInfo.pageCount ?? null,
    coverUrl: item.volumeInfo.imageLinks?.thumbnail ?? null,
  }));
}