import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type Workout = {
  id: string;
  exercise: string;
  weight: string;
  reps: string;
};

const LogScreen: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@workouts');
        if (jsonValue !== null) {
          setWorkouts(JSON.parse(jsonValue));
        }
      } catch (e) {
        alert('Failed to load workouts.');
      }
    };
    loadWorkouts();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: workouts.map(workout => new Date(parseInt(workout.id)).toLocaleDateString()),
    datasets: [
      {
        data: workouts.map(workout => parseFloat(workout.weight)),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      }
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Workout Log</Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      {workouts.length ? (
        workouts.map(workout => (
          <View key={workout.id} style={styles.workout}>
            <Text>Exercise: {workout.exercise}</Text>
            <Text>Weight: {workout.weight} kg</Text>
            <Text>Reps: {workout.reps}</Text>
          </View>
        ))
      ) : (
        <Text>No workouts logged.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  workout: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default LogScreen;
