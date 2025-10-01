// src/components/buttons/ActionButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = ({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary', 'secondary', 'outline'
  iconName = null,
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false,
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    size === 'small' && styles.smallButton,
    size === 'large' && styles.largeButton,
    disabled && styles.disabledButton,
  ];

  const textStyles = [
    styles.buttonText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    size === 'small' && styles.smallText,
    size === 'large' && styles.largeText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
    >
      {iconName && (
        <Icon 
          name={iconName} 
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
          color={variant === 'primary' ? '#FFFFFF' : '#5C6BC0'} 
          style={styles.icon}
        />
      )}
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5C6BC0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#EDE7F6',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5C6BC0',
  },
  smallButton: {
    padding: 10,
    borderRadius: 8,
  },
  largeButton: {
    padding: 18,
    borderRadius: 14,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: '#5C6BC0',
  },
  outlineText: {
    color: '#5C6BC0',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: '#9E9E9E',
  },
  icon: {
    marginRight: 8,
  },
});

export default ActionButton;