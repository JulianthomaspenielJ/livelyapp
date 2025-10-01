import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/headers/ScreenHeader';
import {COLORS} from '../../../constant/Themes';

const {width} = Dimensions.get('window');

const OTPVerificationScreen = ({navigation}) => {
  // Pre-filled values to match the design (empty for real implementation)
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [resendTimeLeft, setResendTimeLeft] = useState(17); // countdown for resend button
  const [otpTimeLeft, setOtpTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Get status bar height for proper padding
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

  // Main 2-minute OTP timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Alert.alert(
          //   'OTP Expired',
          //   'Your OTP has expired. Please request a new one.',
          // );
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Resend countdown timer effect
  useEffect(() => {
    if (resendTimeLeft > 0) {
      const timerId = setTimeout(() => {
        setResendTimeLeft(resendTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [resendTimeLeft]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    // Take only the last character if multiple characters are entered
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key press events for backspace
  const handleKeyPress = (e, index) => {
    // Check if backspace was pressed
    if (e.nativeEvent.key === 'Backspace') {
      // If current input is empty and not the first input, move focus to previous input
      if (!otp[index] && index > 0) {
        setActiveInput(index - 1);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (canResend) {
      // Reset the timer and OTP
      setResendTimeLeft(60); // Set to 60 seconds for resend cooldown
      setOtpTimeLeft(120); // Reset the 2-minute timer
      setOtp(['', '', '', '']);
      setActiveInput(0);
      setCanResend(false);

      // Add your actual resend OTP logic here
      Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number.');
    }
  };

  // Format time as MM:SS
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
    }`;
  };

  // Check if all OTP fields are filled to enable continue button
  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={['rgba(241, 210, 223, 1)', 'rgba(245, 240, 240, 1)']}
        style={styles.gradientContainer}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.4}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              bounces={false}
              keyboardShouldPersistTaps="handled">
              <ScreenHeader onPress={() => navigation.goBack()} />
              <View style={[styles.container, {paddingTop: STATUSBAR_HEIGHT}]}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                  <Text style={styles.headerText}>Verify your details</Text>
                  <Text style={styles.subHeaderText}>
                    OTP sent to +91 82484 59203
                  </Text>
                </View>

                {/* OTP Timer Section - New addition */}
                <View style={styles.otpTimerContainer}>
                  <Icon
                    name="time-outline"
                    size={18}
                    color="#666"
                    style={styles.timerIcon}
                  />
                  <Text style={styles.otpTimerText}>
                    OTP valid for:{' '}
                    <Text style={styles.timerValue}>
                      {formatTime(otpTimeLeft)}
                    </Text>
                  </Text>
                </View>

                {/* OTP Input Section */}
                <View style={styles.otpSection}>
                  <Text style={styles.otpLabel}>Enter OTP</Text>
                  <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                      <View
                        key={index}
                        style={[
                          styles.otpInput,
                          activeInput === index && styles.otpInputActive,
                        ]}>
                        <TextInput
                          ref={ref => (inputRefs.current[index] = ref)}
                          style={styles.otpText}
                          value={digit}
                          onChangeText={value => handleOtpChange(value, index)}
                          keyboardType="number-pad"
                          maxLength={1}
                          onFocus={() => setActiveInput(index)}
                          onKeyPress={e => handleKeyPress(e, index)}
                        />
                      </View>
                    ))}
                  </View>

                  {canResend ? (
                    <TouchableOpacity onPress={handleResendOTP}>
                      <Text style={styles.resendText}>
                        Having trouble?{' '}
                        <Text style={styles.resendActionText}>
                          Request a new OTP
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.timerText}>
                      Having trouble? Request a new OTP in{' '}
                      {formatTime(resendTimeLeft)}
                    </Text>
                  )}
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    !isOtpComplete && styles.continueButtonDisabled,
                  ]}
                  onPress={() => navigation.navigate('SafeSpace')}
                  disabled={!isOtpComplete}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  headerSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: COLORS.darkPrimary,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Figtree-SemiBold',
  },
  subHeaderText: {
    fontSize: 16,
    color: COLORS.darkPrimary,
    textAlign: 'center',
    fontFamily: 'Figtree-Medium',
  },
  otpTimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(231, 87, 136, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
  },
  timerIcon: {
    marginRight: 5,
  },
  otpTimerText: {
    fontSize: 14,
    color: '#666',
  },
  timerValue: {
    fontWeight: '600',
    color: '#e75788',
  },
  otpSection: {
    marginTop: 40,
  },
  otpLabel: {
    fontSize: 14,
    color: COLORS.darkPrimary,
    marginBottom: 15,
    fontFamily: 'Figtree-Medium',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: width * 0.2,
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  otpInputActive: {
    borderColor: '#e75788',
    borderWidth: 1.5,
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    padding: 0,
  },
  timerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Figtree-Medium',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  resendActionText: {
    color: '#e75788',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#e75788',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    width: '100%',
    alignSelf: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#D9498233',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
