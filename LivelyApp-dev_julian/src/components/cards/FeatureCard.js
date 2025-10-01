// src/components/cards/FeatureCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FeatureCard = ({ 
  title, 
  iconName, 
  backgroundColor,
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.featureCard, { backgroundColor }]} 
      onPress={onPress}
    >
      <Icon name={iconName} size={30} color="#FFFFFF" />
      <Text style={styles.featureText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 5,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default FeatureCard;