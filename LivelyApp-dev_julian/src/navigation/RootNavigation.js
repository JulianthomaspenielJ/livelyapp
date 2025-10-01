import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import {useAuth} from '../hooks/useAuth';
import BottomTabNavigator from './BottomTabNavigation';
import JournalingScreen from '../screens/HomeScreens/JournalingScreen';
import NewJournalScreen from '../screens/HomeScreens/NewJournalScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isAuthenticated, hasCompletedOnboarding} = useAuth();
  console.log(
    'isAuthenticated, hasCompletedOnboarding',
    isAuthenticated,
    hasCompletedOnboarding,
  );
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Main'>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="Journaling" component={JournalingScreen} />
      <Stack.Screen name="NewJournaling" component={NewJournalScreen} />


    </Stack.Navigator>
  );
};

export default RootNavigator;
