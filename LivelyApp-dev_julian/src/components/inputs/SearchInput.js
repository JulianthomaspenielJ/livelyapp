// src/components/inputs/SearchInput.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchInput = ({ 
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="magnify" size={20} color="#757575" style={styles.searchIcon} />
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChangeText}
      />
      
      {value && value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Icon name="close" size={18} color="#757575" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchInput;