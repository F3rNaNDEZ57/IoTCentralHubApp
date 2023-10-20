import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const sensorData = route.params?.sensorData || [];

  // Group the data by sensor_id
  const groupedData = sensorData.reduce((acc, datum) => {
    if (!acc[datum.sensor_id]) {
      acc[datum.sensor_id] = [];
    }
    acc[datum.sensor_id].push(datum);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Analytical Dashboard</Text>
        {Object.keys(groupedData).map(sensorId => {
          const dataForSensor = groupedData[sensorId];
          const fullLabels = dataForSensor.map(d => new Date(d.timestamp).toLocaleDateString() + ' ' + new Date(d.timestamp).getHours() + ':00');
          const labels = fullLabels.map((label, index) => {
            if (index === 0 || index === fullLabels.length - 1) {
              return label;
            }
            return '';
          });
          const values = dataForSensor.map(d => d.value);

          return (
            <View key={sensorId} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>
                {sensorId} - {dataForSensor[0].sensor_type}
              </Text>
              <LineChart
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: values,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '3',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          );
        })}
      </View>
      <Button 
                title="More Analytics" 
                onPress={() => navigation.navigate('AskAnything')} 
            />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
