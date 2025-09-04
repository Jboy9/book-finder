

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import booksData from "../assets/books.json";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [booksBySection, setBooksBySection] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    setLoading(true);
    const temp: Record<string, any[]> = {
      Recommended: booksData.slice(0, 10),
      Trending: booksData.slice(10, 20),
      NewReleases: booksData.slice(20, 30),
    };
    setBooksBySection(temp);
    setLoading(false);
  };

  const searchBooks = () => {
    if (!query.trim()) return;
    setLoading(true);
    const results = booksData.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );
    setNoResult(results.length === 0);
    setBooksBySection({ Search: results });
    setLoading(false);
  };

  const bookCard = (book: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/bookDetails", 
          params: {
            id: book.id.toString(),
            title: book.title,
            author: book.author,
            image: book.image,
            pdf: book.pdf,
          },
        })
      }
    >
      {book.image ? (
        <Image source={{ uri: book.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Kids Book Finder</Text>
      <TextInput
        placeholder="Search books..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchBooks}
      />
      {loading && <ActivityIndicator size="large" style={{ margin: 20 }} />}
      {noResult && <Text style={styles.message}>❌ Book not available</Text>}

      {!loading &&
        !noResult &&
        Object.entries(booksBySection).map(([title, books]) => (
          <View key={title} style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
              horizontal
              data={books}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => bookCard(item)}
            />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#f7f7f7" 
  },
  header: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  section: { 
    marginBottom: 24 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  card: { 
    width: 120, 
    marginRight: 12 
  },
  image: { 
    width: 120, 
    height: 160, 
    borderRadius: 6, 
    marginBottom: 6 
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  title: { 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  author: { 
    fontSize: 12, 
    color: "#555" 
  },
  message: { 
    textAlign: "center", 
    marginTop: 20 
  },
});
