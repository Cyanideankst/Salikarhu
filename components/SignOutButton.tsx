import React from 'react';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <Button title="Sign Out" onPress={handleSignOut} />;
};

export default SignOutButton;
