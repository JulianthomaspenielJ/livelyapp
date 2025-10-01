// src/navigation/AuthNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Auth Screens
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import OTPVerificationScreen from '../screens/AuthScreens/OtpScreen';
import SafeSpace from '../screens/onboarding/SafeSpacePromise/SafeSpace';
import TellUsScreen from '../screens/onboarding/TellUsScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPVarification" component={OTPVerificationScreen} />
      <Stack.Screen name="SafeSpace" component={SafeSpace} />
      <Stack.Screen name="TellUsScreen" component={TellUsScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
