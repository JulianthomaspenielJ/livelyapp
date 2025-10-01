// src/navigation/BottomTabNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import AppNavigator from './AppNavigator';

// Placeholder screens
const InsightsScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Insights Screen</Text>
  </View>
);

const CommunityScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Community Screen</Text>
  </View>
);

const GuidesScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Guides Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

// Custom tab bar component to create the floating effect
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Get the icon
          let iconName;
          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Insights') {
            iconName = isFocused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Community') {
            iconName = isFocused ? 'people' : 'people-outline';
          } else if (route.name === 'Guides') {
            iconName = isFocused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = isFocused ? 'person' : 'person-outline';
          }

          return (
            <View key={index} style={styles.tabItem}>
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? '#E75A94' : 'gray'}
                onPress={onPress}
              />
              <Text
                style={{
                  color: isFocused ? '#E75A94' : 'gray',
                  fontSize: 10,
                  marginTop: 2,
                }}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={AppNavigator} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Guides" component={GuidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

export default BottomTabNavigator;