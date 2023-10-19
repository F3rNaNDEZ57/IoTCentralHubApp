import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function SubscriptionHubScreen({ navigation }) {
  const [sensors, setSensors] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tadhack-readdb.onrender.com/sensors');
        setSensors(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSensorSelect = (sensor) => {
    setSelectedSensors(prev => {
      if (prev.includes(sensor.sensor_id)) {
        return prev.filter(id => id !== sensor.sensor_id);
      } else {
        return [...prev, sensor.sensor_id];
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Hub</Text>
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.sensor_id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.sensorItem,
              selectedSensors.includes(item.sensor_id) && styles.selectedSensorItem
            ]}
            onPress={() => handleSensorSelect(item)}
            activeOpacity={0.6}
          >
            <Text>Name: {item.sensor_id}</Text>
            <Text>Type: {item.sensor_type}</Text>
            <Text>Location: {item.location}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="SUBSCRIBE" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  sensorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f5f5f5',
    marginTop: 10,
    borderRadius: 5,
  },
  selectedSensorItem: {
    backgroundColor: '#a3c9a8', // A green color to indicate selection, you can adjust this
    borderColor: '#389638', // Darker green border for visibility
    borderWidth: 1,
  },
});
