import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { LivelyFullLogo, SPLASH_SCREEN_BG } from '../../../../constant/urls';
import { useNavigation } from '@react-navigation/native';
import useAuthStatus from '../../../hooks/useAuthStatus';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const isLogin = useAuthStatus();

  // Animated values for logo
  const logoTranslateY = useSharedValue(-300); // Start off-screen
  const logoScale = useSharedValue(0.2); // Start smaller for dramatic effect
  const logoOpacity = useSharedValue(0); // Start invisible
  const logoRotate = useSharedValue(0); // Rotation for dynamic effect

  // Animated values for name (unchanged)
  const nameTranslateX = useSharedValue(300);
  const nameOpacity = useSharedValue(0);

  useEffect(() => {
    // Logo animations
    logoOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });

    logoTranslateY.value = withSequence(
      withSpring(0, { damping: 15, stiffness: 120, mass: 0.8 }), // Smooth bounce to center
      withSpring(20, { damping: 10, stiffness: 100 }), // Small overshoot
      withSpring(0, { damping: 12, stiffness: 110 }) // Settle back
    );

    logoScale.value = withSequence(
      withTiming(1.2, { duration: 600, easing: Easing.elastic(1.2) }), // Overscale slightly
      withTiming(0.9, { duration: 300, easing: Easing.out(Easing.quad) }), // Shrink a bit
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }) // Settle at normal size
    );

    logoRotate.value = withTiming(360, { duration: 1000, easing: Easing.out(Easing.cubic) }); // Full rotation

    // Name animations (unchanged)
    nameOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) });
    nameTranslateX.value = withTiming(0, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });

    const navigationTimer = setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 1500);

    return () => clearTimeout(navigationTimer);
  }, [isLogin, navigation, logoOpacity, logoScale, logoTranslateY, logoRotate, nameOpacity, nameTranslateX]);

  // Animated styles for logo
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: logoTranslateY.value },
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
    opacity: logoOpacity.value,
  }));

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="rgba(241, 210, 223, 0.7)"
      />
      <ImageBackground
        source={SPLASH_SCREEN_BG}
        style={styles.background}
        resizeMode="cover">
        <Animated.View
          style={[styles.overlay]}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(500)}>
          <View style={styles.logoContainer}>
            <Animated.Image
              source={LivelyFullLogo}
              style={[styles.logo, animatedLogoStyle]} // Apply logo animations
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    maxWidth: 300,
    maxHeight: 300,
    marginBottom: -10,
  },
  name: {
    width: width * 0.8,
    height: width * 0.9,
    maxWidth: 300,
    maxHeight: 150,
    marginTop: -10,
  },
});

export default SplashScreen;