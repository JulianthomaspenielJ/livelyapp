import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStatus = () => {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenInfo');
        setIsLogin(!!token); // Convert token to boolean
      } catch (error) {
        setIsLogin(false); // Handle error case
      }
    };

    checkLoginStatus();
  }, []);

  return isLogin;
};

export default useAuthStatus;
