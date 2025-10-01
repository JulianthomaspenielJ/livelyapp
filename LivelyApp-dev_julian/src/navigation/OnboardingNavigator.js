// src/navigation/OnboardingNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;