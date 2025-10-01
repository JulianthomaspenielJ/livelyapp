import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/headers/ScreenHeader';

const TellUsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  // Get status bar height for proper padding
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="rgba(241, 210, 223, 1)"
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
                  <Text style={styles.welcomeText}>Tell us more about you</Text>
                  <Text style={styles.subtitleText}>
                    Enter a nickname and your Email ID
                  </Text>
                </View>

                {/* Input Section */}
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Nickname</Text>
                  <View
                    style={[
                      styles.phoneInputContainer,
                      isFocused ? styles.phoneInputContainerFocused : null,
                      {marginBottom: 16},
                    ]}>
                    <TextInput
                      style={styles.phoneInput}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholderTextColor="#999"
                    />
                  </View>

                  <Text style={styles.inputLabel}>Email address</Text>
                  <View
                    style={[
                      styles.phoneInputContainer,
                      isFocused ? styles.phoneInputContainerFocused : null,
                    ]}>
                    <TextInput
                      style={styles.phoneInput}
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.verificationContainer}>
                    <Icon
                      name="information-circle-outline"
                      size={20}
                      color="#888"
                      style={styles.infoIcon}
                    />
                    <Text style={styles.verificationText}>
                      We'll send you a verification code to confirm its you
                    </Text>
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    phoneNumber.length == 0 || emailAddress.length == 0
                      ? styles.loginButtonInactive
                      : null,
                  ]}
                  onPress={() => navigation.navigate('OTPVarification')}>
                  <Text style={styles.loginButtonText}>Submit</Text>
                </TouchableOpacity>

                {/* Add some extra space at bottom for keyboard */}
                <View style={styles.bottomPadding} />
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
    paddingHorizontal: 20,
  },
  headerSection: {
    marginTop: 50,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Figtree-SemiBold',
  },
  subtitleText: {
    fontSize: 16,
    color: '#302B2C',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Figtree-Medium',
  },
  inputSection: {
    marginTop: 20,
    marginBottom: 120,
  },
  inputLabel: {
    fontSize: 14,
    color: '#302B2C',
    marginBottom: 10,
    fontFamily: 'Figtree-Medium',
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInputContainerFocused: {
    borderColor: '#e75788',
  },
  prefixContainer: {
    paddingLeft: 20,
  },
  prefixText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 20,
    fontSize: 18,
    color: '#333',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  infoIcon: {
    marginRight: 8,
  },
  verificationText: {
    fontSize: 12,
    color: '#888',
  },
  termsSection: {
    flexDirection: 'row',
    marginTop: 60,
    paddingHorizontal: 5,
  },
  checkboxContainer: {
    marginRight: 10,
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#e75788',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#e75788',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 11,
    color: '#302B2C',
    lineHeight: 20,
    fontFamily: 'Figtree-Medium',
  },
  loginButton: {
    backgroundColor: '#e75788',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonInactive: {
    backgroundColor: '#D9498233',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Figtree-Medium',
  },
  bottomPadding: {
    height: 50,
  },
});

export default TellUsScreen;
