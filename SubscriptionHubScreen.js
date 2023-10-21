import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
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

  const fetchDataForSelectedSensors = async () => {
    try {
      const response = await axios.post('https://tadhack-readdb.onrender.com/sensorData', {
        sensorIds: selectedSensors,
      });
      const sensorData = response.data;
      navigation.navigate('Dashboard', { sensorData: sensorData });
    } catch (error) {
      console.error("Error fetching data for selected sensors:", error);
      Alert.alert("Error", "Unable to fetch data for selected sensors.");
    }
  };

  const sendSubscriptionSMS = async () => {
    const selectedSensorDetails = sensors.filter(sensor => selectedSensors.includes(sensor.sensor_id));
    const message = selectedSensorDetails.map(sensor => `Sensor ID: ${sensor.sensor_id}, Type: ${sensor.sensor_type}`).join('; ');
    const fullMessage = `You successfully subscribed to the following sensors: ${message}`;

    try {
      await axios.post('https://api.dialog.lk/sms/send', {
        message: fullMessage,
        destinationAddresses: ["tel:94772726961"], 
        password: "ade49a19b550a168415764f273f49fc5", 
        applicationId: "APP_064990" 
      });
    } catch (error) {
      console.error("Error sending SMS:", error);
      Alert.alert("Error", "Unable to send subscription SMS.");
    }
  };

  const handleSubscribePress = () => {
    if (selectedSensors.length === 0) {
      Alert.alert("Notice", "Please select at least one sensor before subscribing.");
      return;
    }
    fetchDataForSelectedSensors();
    sendSubscriptionSMS();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Hub</Text>
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.sensor_id.toString()}
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
      <Button title="SUBSCRIBE" onPress={handleSubscribePress} />
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
    backgroundColor: '#a3c9a8',
    borderColor: '#389638',
    borderWidth: 1,
  },
});
