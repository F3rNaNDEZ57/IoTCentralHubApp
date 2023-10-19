import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IoTCentral Hub</Text>
      <Button title="Subscription Hub" onPress={() => navigation.navigate('SubscriptionHub')} />
      <Button title="Analytical Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      <Button title="Sensor Location & Health" onPress={() => navigation.navigate('SensorLocation')} />
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
