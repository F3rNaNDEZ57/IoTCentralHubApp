import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DashboardScreen({ route }) {
  const { sensorData } = route.params;

  // Grouping data by sensor_id and sensor_type for the chart title
  const groupedData = sensorData.reduce((acc, item) => {
    if (!acc[item.sensor_id]) {
      acc[item.sensor_id] = {
        sensor_type: item.sensor_type,
        timestamps: [item.timestamp],
        values: [item.value]
      };
    } else {
      acc[item.sensor_id].timestamps.push(item.timestamp);
      acc[item.sensor_id].values.push(item.value);
    }
    return acc;
  }, {});

  const chartWidth = Dimensions.get("window").width - 30;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytical Dashboard</Text>
      {Object.keys(groupedData).map(sensorId => {
        const data = {
          labels: groupedData[sensorId].timestamps,
          datasets: [
            {
              data: groupedData[sensorId].values,
            },
          ],
        };
        return (
          <View key={sensorId} style={styles.chartContainer}>
            <Text>{sensorId} - {groupedData[sensorId].sensor_type}</Text>
            <LineChart
              data={data}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
  },
});
