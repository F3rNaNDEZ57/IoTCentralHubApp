import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

export default function AskAnythingScreen() {
  const [query, setQuery] = useState('');

  const handleAsk = () => {
    // Handle the AI part here using the `query`
    console.log('User asked:', query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholder="ask anything about your data"
          onChangeText={setQuery}
          value={query}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleAsk}>
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
});
