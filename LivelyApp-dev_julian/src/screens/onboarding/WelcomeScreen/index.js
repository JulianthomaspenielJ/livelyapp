import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {LivelyFullLogo} from '../../../../constant/urls';
import FeatureCarousel from '../../../components/FeatureCarousel';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../hooks/useAuth'; // Import useAuth hook
import {carouselData} from '../../../staticData/data';

const {height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {completeOnboarding, isAuthenticated, hasCompletedOnboarding} =
    useAuth(); // Access context values

  const handleGetStarted = async () => {
    try {
      await completeOnboarding(); // Update onboarding status
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  // Example: Conditionally render based on context values
  const renderStatusText = () => {
    return (
      <Text style={styles.statusText}>
        {hasCompletedOnboarding
          ? 'Onboarding already completed'
          : 'Onboarding not yet completed'}
        {' | '}
        {isAuthenticated ? 'User is logged in' : 'User is not logged in'}
      </Text>
    );
  };

  // Get status bar height for proper padding
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="rgba(241, 210, 223, 0.9)"
      />
      <LinearGradient
        colors={['rgba(241, 210, 223, 1)', 'rgba(245, 240, 240, 1)']}
        style={styles.gradientContainer}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}>
        <View style={[styles.container, {paddingTop: STATUSBAR_HEIGHT}]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoOuterCircle}>
              <View style={styles.logoInnerCircle}>
                <Image
                  source={LivelyFullLogo}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>Welcome To The World Of</Text>
            <Text style={styles.mindfulText}>Mindful Living</Text>
          </View>

          <Text style={styles.descriptionText}>
            Lively brings the art of conscious living from offline to online
            with the sole purpose of helping YOU live to the fullest.
          </Text>

          <FeatureCarousel carouselData={carouselData} />

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoOuterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInnerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Figtree-SemiBold'
  },
  mindfulText: {
    fontSize: 30,
    color: '#e75788',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Figtree-Bold'
  },
  descriptionText: {
    fontSize: 15,
    color: '#302B2C',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: 'Figtree-Regular'
  },
  statusText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: '#D94982',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Figtree-SemiBold'
  },
});

export default WelcomeScreen;
