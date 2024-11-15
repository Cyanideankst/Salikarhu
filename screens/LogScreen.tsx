import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Workout Log</Text>
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
