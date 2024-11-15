import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const saveWorkout = async () => {
    const workout = { id: Date.now().toString(), exercise, weight, reps };
    try {
      const existingWorkouts = await AsyncStorage.getItem('@workouts');
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(workout);
      await AsyncStorage.setItem('@workouts', JSON.stringify(workouts));
      alert('Workout saved!');
      setExercise('');
      setWeight('');
      setReps('');
    } catch (e) {
      alert('Failed to save workout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercise"
        value={exercise}
        onChangeText={setExercise}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      <Button title="Save Workout" onPress={saveWorkout} />
      <Button title="View Log" onPress={() => navigation.navigate('Log')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default HomeScreen;
