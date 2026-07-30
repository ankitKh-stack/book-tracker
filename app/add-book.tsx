import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Pressable } from 'react-native';
import { searchBooks } from '@/services/bookSearch';
import { addBook } from '@/db/books';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AddBookScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const isDark = useColorScheme() === 'dark';

  async function handleSearch() {
    try {
    console.log('Searching for:', query);
    const found = await searchBooks(query);
    console.log('Results:', found);
    setResults(found);
  } catch (err) {
    console.log('Search error ❌', err);
  }
  }

  async function handleSelectBook(book: any) {
    await addBook({
      id: Date.now().toString(),
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      total_pages: book.totalPages,
    });
    router.back();
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
   <TextInput
  placeholder="Search by title or ISBN"
  placeholderTextColor={isDark ? '#888' : '#999'}
  value={query}
  onChangeText={setQuery}
  onSubmitEditing={handleSearch}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: isDark ? '#fff' : '#000',
  }}
/>
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.googleId}
        renderItem={({ item }) => (
           <Pressable onPress={() => handleSelectBook(item)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
           <Text style={{ fontWeight: '600', color: isDark ? '#fff' : '#000' }}>{item.title}</Text>
          <Text style={{ color: isDark ? '#fff' : '#000' }}>{item.author}</Text>
         </Pressable>
        )}
      />
    </View>
  );
}