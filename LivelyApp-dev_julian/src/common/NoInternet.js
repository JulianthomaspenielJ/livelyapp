import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {IMAGES} from '../../constant/common';

const NoInternet = () => {
  const openInternetSettings = useCallback(() => {
    if (Platform.OS === 'android') {
      // Opens the Wi-Fi settings
      Linking.openURL('app-settings:'); // Android: Opens app settings
    } else if (Platform.OS === 'ios') {
      // iOS does not allow direct navigation to Wi-Fi settings anymore (from iOS 11+)
      Linking.openURL('App-Prefs:root=WIFI'); // Might not work on all iOS versions
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.NO_INTERNATE} style={styles.image} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your internet connection and try again.
      </Text>
      <TouchableOpacity style={styles.button} onPress={openInternetSettings}>
        <Text style={styles.buttonText}>Turn On Internet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
