// src/navigation/AppNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Auth Screens
import LoginScreen from '../screens/AuthScreens/LoginScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import JournalingScreen from '../screens/HomeScreens/JournalingScreen';
import MindfulnessScreen from '../screens/HomeScreens/MindfulnessScreen';
import MusicLibraryScreen from '../screens/HomeScreens/MusicLibraryScreen';
import GuidedMeditationScreen from '../screens/HomeScreens/GuidedMeditationScreen';
import BreathingExercisesScreen from '../screens/HomeScreens/BreathingExercisesScreen';
import YogaScreen from '../screens/HomeScreens/YogaScreen';
import GoodMorningClipsScreen from '../screens/HomeScreens/GoodMorningClipsScreen';
import CoursesScreen from '../screens/CoursesScreen';
import SplashScreen from '../screens/onboarding/SplashScreen';
import useAuthStatus from '../hooks/useAuthStatus';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useAuthStatus(); // dynamic now

  return (
    <Stack.Navigator
    initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Mindfulness" component={MindfulnessScreen} />
      <Stack.Screen name="MusicLibrary" component={MusicLibraryScreen} />
      <Stack.Screen
        name="GuidedMeditation"
        component={GuidedMeditationScreen}
      />
      <Stack.Screen
        name="BreathingExercises"
        component={BreathingExercisesScreen}
      />
      <Stack.Screen name="Yoga" component={YogaScreen} />
      <Stack.Screen
        name="GoodMorningClips"
        component={GoodMorningClipsScreen}
      />
      <Stack.Screen name="Courses" component={CoursesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
