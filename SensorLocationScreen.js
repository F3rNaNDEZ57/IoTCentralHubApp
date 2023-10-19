import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorLocationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Location & Health</Text>
      {/* Add your map and sensor health metrics here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
