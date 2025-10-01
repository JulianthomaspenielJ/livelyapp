import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    user: null,
    login: async () => {},
    verifyOTP: async () => {},
    logout: () => {},
    completeOnboarding: () => {},
  });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);

  // Check local storage for authentication & onboarding state on load
  useEffect(() => {
    // In a real app, you would check AsyncStorage here
    const checkAuth = async () => {
      try {
        // Simulate checking storage
        // const storedUser = await AsyncStorage.getItem('user');
        // const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
        
        // For demo purposes:
        const storedUser = null;
        const onboardingComplete = null;
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
        
        if (onboardingComplete === 'true') {
          setHasCompletedOnboarding(true);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (phoneNumber) => {
    try {
      // In a real app, this would call an API
      // For demo, just save the phone number for OTP verification
      setCurrentPhoneNumber(phoneNumber);
      
      // The actual login happens after OTP verification
      console.log(`Login initiated for: ${phoneNumber}`);
      
      // Mock API call to send OTP
      return Promise.resolve();
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error);
    }
  };

  const verifyOTP = async (otp) => {
    try {
      // In a real app, call API to verify OTP
      // For demo, just consider any 4-digit OTP valid
      if (otp.length === 4 && currentPhoneNumber) {
        // Mock successful verification
        const mockUser = {
          id: 'user123',
          phoneNumber: currentPhoneNumber,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // In a real app, save to AsyncStorage:
        // await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('Invalid OTP'));
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return Promise.reject(error);
    }
  };

  const logout = () => {
    // Clear state
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPhoneNumber(null);
    
    // In a real app, clear from storage:
    // AsyncStorage.removeItem('user');
    
    console.log('User logged out');
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      const storedValue = await AsyncStorage.getItem('onboardingComplete');
      console.log('Stored onboardingComplete:', storedValue);
      setHasCompletedOnboarding(true);
      console.log('Onboarding completed');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        user,
        login,
        verifyOTP,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};