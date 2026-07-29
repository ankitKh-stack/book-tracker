import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect,useState } from 'react';
import { openDatabase } from '@/db/client';
import { addBook, getAllBooks } from '@/db/books';
import { Button } from 'react-native';


export default function HomeScreen() {

  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
  openDatabase()
    .then(() => getAllBooks())
    .then((result) => setBooks(result))
    .catch((err) => console.log('Database error ❌', err));
}, []);

async function handleAddTestBook() {
  await addBook({
    id: Date.now().toString(),
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    total_pages: 480,
  });
  const updated = await getAllBooks();
  setBooks(updated);
}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#20444f' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hi Ankit!</ThemedText>
        <HelloWave />
      </ThemedView>

      <Button title="Add test book" onPress={handleAddTestBook} />

      {books.map((book: any) => (
  <ThemedView key={book.id} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
    <ThemedText type="defaultSemiBold">{book.title}</ThemedText>
    <ThemedText>{book.author}</ThemedText>
  </ThemedView>
))}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step:1 Kharel</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Canada's wonderland</ThemedText>
        <ThemedText>
          {`The world of wonderful `}
          <ThemedText type="defaultSemiBold">cherry and rasberries</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
