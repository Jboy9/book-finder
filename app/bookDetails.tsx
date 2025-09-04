

import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";

export default function BookDetails() {
  const { title, author, image, pdf } = useLocalSearchParams();
  const [showRead, setShowRead] = useState(false);

  if (showRead && pdf) {
    return (
      <WebView
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
            String(pdf)
          )}`,
        }}
        style={{ flex: 1 }}
        cacheEnabled={true}
        incognito={false}
        startInLoadingState
        renderLoading={() => (
          <View style={{flex: 1}}>
            <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading book… 📖
          </Text>
          </View>
        )}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      {image && (
        <Image source={{ uri: image as string }} style={styles.cover} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>by {author}</Text>
      {pdf ? (
        <TouchableOpacity onPress={() => setShowRead(true)} style={styles.fullBookButton}>
          <Text style={styles.fullBookText}>📖 Read Full Book</Text>
        </TouchableOpacity>
      ) : (
        <Text>No readable version available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  cover: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "cover",
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 6 
  },
  author: { 
    fontSize: 16, 
    color: "#666", 
    marginBottom: 12 
  },
  fullBookButton:{
    backgroundColor: '#1B3E52',
    padding: 12,
    borderRadius: 8,
  },
  fullBookText:{
    textAlign: "center",
    color: "#FFFFFF"
  }
});
