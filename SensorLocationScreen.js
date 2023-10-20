import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function SensorLocationScreen() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Fetch sensor location data from your backend when the component mounts
    fetch('https://tadhack-readdb.onrender.com/location')
      .then((response) => response.json())
      .then((data) => setSensorData(data))
      .catch((error) => console.error('Error fetching sensor data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Location & Health</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.79065,
          longitude: 79.88634,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {sensorData.map((sensor) => (
          <Marker
            key={sensor.sensor_id}
            coordinate={{
              latitude: sensor.latitude,
              longitude: sensor.longitude,
            }}
            title={sensor.sensor_id}
          />
        ))}
      </MapView>
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
  map: {
    width: '100%',
    height: '80%',
  },
});
