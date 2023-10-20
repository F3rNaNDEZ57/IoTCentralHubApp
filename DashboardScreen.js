import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function DashboardScreen({ route }) {
  const { sensorData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytical Dashboard</Text>
      <FlatList
        data={sensorData}
        keyExtractor={(item) => item.sensor_id + item.timestamp}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text>Sensor ID: {item.sensor_id}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
            <Text>Data: {item.data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dataItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
});
