// src/components/auth/MobileInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

const MobileInput= ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  
  const validatePhoneNumber = (number) => {
    // Basic validation - can be enhanced based on requirements
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };
  
  const handleSubmit = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    setError(null);
    onSubmit(phoneNumber);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.inputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (error) setError(null);
          }}
          maxLength={10}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.infoText}>
        We'll send you a verification code to confirm it's you
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});

export default MobileInput;