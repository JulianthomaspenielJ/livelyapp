import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appearance, Platform, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/store';
import NetInfo from '@react-native-community/netinfo';
import AppNavigator from './src/navigation/AppNavigator';
import NoInternet from './src/common/NoInternet';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigation';

function App() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [isConnected, setIsConnected] = useState(true);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });

    // Clean up the listener on unmount
    return () => listener.remove();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <GestureHandlerRootView style={styles.gestureContainer}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
          {isConnected ? <RootNavigator /> : <NoInternet />}
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : undefined,
  },
  gestureContainer: {
    flex: 1,
  },
});
