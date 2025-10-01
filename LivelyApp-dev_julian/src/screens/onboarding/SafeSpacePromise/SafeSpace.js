import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../hooks/useAuth';
import {LivelyFullLogo} from '../../../../constant/urls';
import Icons from '../../../../constant/Icons';
import {COLORS} from '../../../../constant/Themes';

const {height} = Dimensions.get('window');

const SafeSpace = () => {
  const navigation = useNavigation();
  const {completeOnboarding, isAuthenticated, hasCompletedOnboarding} =
    useAuth(); // Access context values
  const [containerWidth, setContainerWidth] = React.useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (containerWidth > 0) {
      progress.setValue(0); // Reset before start

      Animated.timing(progress, {
        toValue: 1,
        duration: 10000,
        delay: 100,
        useNativeDriver: false,
      }).start();
      setTimeout(()=>{
        handleGetStarted()
      },10000)
    }
  }, [containerWidth]);
console.log("progress ----",containerWidth)
  const progressColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#D94982', '#D94982', '#D94982'],
  });

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth], // ✅ Based on containerWidth
  });

  const handleGetStarted = async () => {
    navigation.navigate('Main');
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
          <View
            style={{
              paddingHorizontal: 12,
            }}>
            <Icons.Fontisto name="locked" size={24} color={COLORS.primary} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>Safe Space Promise</Text>

            <Text style={styles.descriptionText}>
              Your safety and privacy are our top priorities. We promise to keep
              your personal information secure and confidential.
            </Text>
          </View>

          <View style={[styles.progressLineContainer]}>
          <Text style={styles.label}>We are setting up your profile</Text>
            <View
              style={styles.progressBackground}
              onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, containerWidth],
                    }),
                    backgroundColor: progressColor, // 👈 add dynamic color here
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  progressLineContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily:'Figtree-Medium'
  },
  progressBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#D9498233',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D9498233',
  },
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
    fontFamily: 'Figtree-SemiBold',
  },
  mindfulText: {
    fontSize: 30,
    color: '#e75788',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Figtree-Bold',
  },
  descriptionText: {
    fontSize: 15,
    color: '#302B2C',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 20,
    fontFamily: 'Figtree-Medium',
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
    fontFamily: 'Figtree-SemiBold',
  },
});

export default SafeSpace;
