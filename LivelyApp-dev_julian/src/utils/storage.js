// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store data in AsyncStorage
 * @param {string} key - Storage key
 * @param {any} value - Data to store
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param {string} key - Storage key
 * @returns {Promise<any>} - Retrieved data
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - Storage key
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

/**
 * Clear all data in AsyncStorage
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};