import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions,
  Platform,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../../constant/Icons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

// Create an instance of AudioRecorderPlayer with debug mode enabled
const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1); // Update UI more frequently (100ms)

// Helper function to format time (mm:ss)
const formatTime = (milliseconds) => {
  if (!milliseconds) return '00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Static data to store recordings
let journalRecordings = [];

const NewJournalScreen = ({navigation}) => {
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'voice'
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const [scaleValue] = useState(new Animated.Value(1));
  const [recordingAmplitude, setRecordingAmplitude] = useState(0);
  const amplitudeAnim = useRef(new Animated.Value(0)).current;
  const [recordingPath, setRecordingPath] = useState('');
  const [recording, setRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingUri, setCurrentPlayingUri] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState([]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Simulated amplitude animation for voice recording visualization
  useEffect(() => {
    if (isRecording) {
      // Simulate changing voice amplitude
      const amplitudeInterval = setInterval(() => {
        const newAmplitude = Math.random() * 50 + 10; // Random value between 10 and 60
        setRecordingAmplitude(newAmplitude);
        
        Animated.timing(amplitudeAnim, {
          toValue: newAmplitude,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }, 200);
      
      return () => clearInterval(amplitudeInterval);
    }
  }, [isRecording, amplitudeAnim]);

  // Swipe indicator animation
  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isRecording) {
        pulseAnimation();
      }
    });
  };

  // Request microphone and storage permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);        
        // Check if RECORD_AUDIO permission is granted
        if (grants[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
          return true;
        } else {
          Alert.alert(
            'Permission Required',
            'Recording audio requires microphone permission',
            [{ text: 'OK' }]
          );
          return false;
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    // iOS permissions are handled through Info.plist
    return true;
  };

  const onStartRecord = async () => {
    if (isRecording) {
      Alert.alert('Recording is already in progress');
      return;
    }
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permissions Denied', 'Please grant microphone permission.');
      return;
    }
  
    // Create directory if it doesn't exist (for Android)
    if (Platform.OS === 'android') {
      try {
        const dirExists = await RNFS.exists(RNFS.ExternalDirectoryPath);
        if (!dirExists) {
          await RNFS.mkdir(RNFS.ExternalDirectoryPath);
        }
      } catch (error) {
        console.error('Error creating directory:', error);
      }
    }
  
    // Define path for recording
    const filename = `recording_${Date.now()}`;
    const path = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/${filename}.m4a`,
      android: `${RNFS.ExternalDirectoryPath}/${filename}.m4a`,
    });
  
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: 2, // MediaRecorder.OutputFormat.MPEG_4
      AudioSamplingRateAndroid: 44100,
      AudioBitRateAndroid: 128000,
    };
  
    try {
      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      setRecordingPath(uri);
  
      audioRecorderPlayer.addRecordBackListener(e => {
        if (typeof e.currentPosition === 'number') {
          setRecordSecs(e.currentPosition);
          setRecordTime(formatTime(e.currentPosition));
        }
      });
  
      setIsRecording(true);
      pulseAnimation();
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording: ' + error.message);
    }
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      
      // Verify the file exists
      const fileExists = await RNFS.exists(result);
      
      if (!fileExists) {
        Alert.alert('Error', 'Recording file not found after saving');
        setIsRecording(false);
        return null;
      }
      
      // Save recording to list
      const newRecording = {
        id: Date.now().toString(),
        uri: result,
        name: `Recording ${savedRecordings.length + 1}`,
        duration: recordSecs,
        timestamp: new Date().toISOString(),
      };
      
      setRecording(newRecording);
      setSavedRecordings([...savedRecordings, newRecording]);
      journalRecordings.push(newRecording); // Add to static data
      
      // Reset recording state but keep duration for display
      setIsRecording(false);
      return newRecording;
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording: ' + error.message);
      setIsRecording(false);
      return null;
    }
  };

  const onStartPlay = async (uri) => {
    try {
      // Stop any currently playing audio
      if (isPlaying) {
        await onStopPlay();
      }
      
      // Verify file exists before playing
      const fileExists = await RNFS.exists(uri);
      if (!fileExists) {
        Alert.alert('Error', 'Audio file not found');
        return;
      }      
      // Start playing the selected recording
      await audioRecorderPlayer.startPlayer(uri);
      
      audioRecorderPlayer.addPlayBackListener(e => {
        setPlaybackPosition(e.currentPosition);
        setPlaybackDuration(e.duration);
        
        // If playback complete
        if (e.currentPosition >= e.duration) {
          onStopPlay();
        }
      });
      
      setIsPlaying(true);
      setCurrentPlayingUri(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to play recording: ' + error.message);
    }
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Pause error:', error);
    }
  };

  const onResumePlay = async () => {
    try {
      await audioRecorderPlayer.resumePlayer();
      setIsPlaying(true);
    } catch (error) {
      console.error('Resume error:', error);
    }
  };

  const onStopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
      setCurrentPlayingUri(null);
      setPlaybackPosition(0);
    } catch (error) {
      console.error('Stop playback error:', error);
    }
  };

  // Handle recording toggle
  const toggleRecording = () => {
    if (isRecording) {
      onStopRecord();
    } else {
      onStartRecord();
    }
  };

  // Handle playback toggle
  const togglePlayback = (uri) => {
    if (isPlaying && currentPlayingUri === uri) {
      onPausePlay();
    } else if (!isPlaying && currentPlayingUri === uri) {
      onResumePlay();
    } else {
      onStartPlay(uri);
    }
  };

  // Journal prompts
  const journalPrompts = [
    'In my life right now, I would like to change...',
    'Today I feel grateful for...',
    `A challenge I'm currently facing is...`,
    `Something I'm proud of accomplishing is...`,
    'My biggest goal for this month is...',
  ];

  // Handle swipe to change prompt
  const handlePrevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
    }
  };

  const handleNextPrompt = () => {
    if (currentPromptIndex < journalPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  // Handle dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    if (isRecording && tab === 'write') {
      onStopRecord(); // Stop recording if switching away from voice tab
    }
    setActiveTab(tab);
  };

  // Voice recording wave bars
  const renderWaveBars = () => {
    const bars = [];
    const numBars = 7;
    
    for (let i = 0; i < numBars; i++) {
      const randomHeight = isRecording 
        ? 10 + Math.abs(Math.sin((i / numBars) * Math.PI) * recordingAmplitude)
        : 10;
        
      bars.push(
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            {
              height: isRecording ? amplitudeAnim.interpolate({
                inputRange: [0, 60],
                outputRange: [5, randomHeight],
              }) : 5,
              backgroundColor: isRecording ? '#e91e63' : '#aaa',
            },
          ]}
        />
      );
    }
    
    return bars;
  };

  // Handle journal save
  const handleSaveJournal = () => {
    // Here you would implement saving the journal entry
    // For voice recordings, you can use the recordingPath
    
    // Example implementation:
    if (journalTitle.trim() === '') {
      Alert.alert('Missing Title', 'Please enter a title for your journal entry');
      return;
    }
    
    const journalData = {
      title: journalTitle,
      content: activeTab === 'write' ? journalContent : '',
      audioPath: activeTab === 'voice' && recording ? recording.uri : '',
      recordingDuration: activeTab === 'voice' && recording ? recording.duration : 0,
      timestamp: new Date().toISOString(),
      prompt: journalPrompts[currentPromptIndex],
    };
        
    // Here you would save to AsyncStorage, database, or API
    Alert.alert('Success', 'Journal saved successfully!');
    
    // Navigate back
    navigation.goBack();
  };

  // Render recordings list
  const renderRecordings = () => {
    if (!recording) return null;
    
    return (
      <View style={styles.recordingItem}>
        <Text style={styles.recordingText}>
          {recording.name}
          {currentPlayingUri === recording.uri
            ? ` (${formatTime(playbackPosition)} / ${formatTime(recording.duration)})`
            : ` (${formatTime(recording.duration)})`}
        </Text>
        <View style={styles.recordingControls}>
          <TouchableOpacity
            style={styles.recordingButton}
            onPress={() => togglePlayback(recording.uri)}>
            <Icons.MaterialIcons
              name={
                currentPlayingUri === recording.uri && isPlaying
                  ? 'pause-circle-outline'
                  : 'play-circle-outline'
              }
              size={28}
              color="#e91e63"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Ensure we clean up all resources when component unmounts
      if (isRecording) {
        audioRecorderPlayer.stopRecorder().catch(err => 
          console.error('Error stopping recorder on unmount:', err)
        );
        audioRecorderPlayer.removeRecordBackListener();
      }
      
      if (isPlaying) {
        audioRecorderPlayer.stopPlayer().catch(err => 
          console.error('Error stopping player on unmount:', err)
        );
        audioRecorderPlayer.removePlayBackListener();
      }
    };
  }, [isRecording, isPlaying]);

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
        end={{x: 0, y: 0.5}}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.innerContainer}>
                {/* Header */}
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Icons.MaterialIcons
                      name="arrow-back-ios"
                      size={24}
                      color="#333"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.checkButton}
                    onPress={handleSaveJournal}>
                    <Icons.MaterialIcons name="check" size={28} color="#333" />
                  </TouchableOpacity>
                </View>
                <View style={styles.headerCenter}>
                  <Text style={styles.promptText}>Swipe to change prompt</Text>
                  <View style={styles.indicatorContainer}>
                    {journalPrompts.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.indicator,
                          index === currentPromptIndex &&
                            styles.activeIndicator,
                        ]}
                      />
                    ))}
                  </View>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                  {/* Journal Prompt with Swipe Gestures */}
                  <View style={styles.promptContainer}>
                    <TouchableOpacity 
                      style={styles.promptArrow}
                      onPress={handlePrevPrompt}
                      disabled={currentPromptIndex === 0}>
                      <Icons.MaterialIcons
                        name="chevron-left"
                        size={28}
                        color={currentPromptIndex === 0 ? '#ccc' : '#333'}
                      />
                    </TouchableOpacity>
                    
                    <Text style={styles.promptTitle}>
                      {journalPrompts[currentPromptIndex]}
                    </Text>
                    
                    <TouchableOpacity 
                      style={styles.promptArrow}
                      onPress={handleNextPrompt}
                      disabled={currentPromptIndex === journalPrompts.length - 1}>
                      <Icons.MaterialIcons
                        name="chevron-right"
                        size={28}
                        color={currentPromptIndex === journalPrompts.length - 1 ? '#ccc' : '#333'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Title Input */}
                  <TextInput
                    style={styles.titleInput}
                    placeholder="Title for Your Journal"
                    placeholderTextColor="#a9a9a9"
                    value={journalTitle}
                    onChangeText={setJournalTitle}
                  />

                  {activeTab === 'write' ? (
                    // Write Tab Content
                    <TextInput
                      style={styles.contentInput}
                      placeholder="Start typing your journal..."
                      placeholderTextColor="#a9a9a9"
                      multiline={true}
                      textAlignVertical="top"
                      value={journalContent}
                      onChangeText={setJournalContent}
                    />
                  ) : (
                    // Voice Tab Content
                    <View style={styles.voiceContainer}>
                      <View style={styles.waveContainer}>
                        {renderWaveBars()}
                      </View>
                      
                      <Animated.View
                        style={[
                          styles.micButtonContainer,
                          {transform: [{scale: isRecording ? scaleValue : 1}]},
                        ]}>
                        <TouchableOpacity
                          style={[
                            styles.micButton,
                            isRecording && styles.micButtonRecording,
                          ]}
                          onPress={toggleRecording}
                          activeOpacity={0.7}>
                          <Icons.MaterialIcons
                            name={isRecording ? "stop" : "mic"}
                            size={36}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </Animated.View>
                      
                      {isRecording && (
                        <View style={styles.recordingInfo}>
                          <Text style={styles.recordingTime}>{recordTime}</Text>
                          <Text style={styles.recordingStatus}>
                            Recording...
                          </Text>
                        </View>
                      )}
                      
                      {!isRecording && recording && renderRecordings()}
                      
                      {!isRecording && !recording && (
                        <Text style={styles.recordingHint}>
                          Tap the microphone to start recording
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Bottom Tab Buttons */}
                  <View style={styles.tabsContainer}>
                    <TouchableOpacity
                      style={[
                        styles.tabButton,
                        activeTab === 'write'
                          ? styles.activeTabButton
                          : styles.inactiveTabButton,
                      ]}
                      onPress={() => handleTabChange('write')}>
                      <View style={styles.tabButtonContent}>
                        <Icons.FontAwesome
                          name="pencil"
                          size={20}
                          color={activeTab === 'write' ? '#fff' : '#e91e63'}
                        />
                        <Text
                          style={[
                            styles.tabText,
                            activeTab === 'write'
                              ? styles.activeTabText
                              : styles.inactiveTabText,
                          ]}>
                          Write
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.tabButton,
                        activeTab === 'voice'
                          ? styles.activeTabButton
                          : styles.inactiveTabButton,
                      ]}
                      onPress={() => handleTabChange('voice')}>
                      <View style={styles.tabButtonContent}>
                        <Icons.MaterialIcons
                          name="mic"
                          size={20}
                          color={activeTab === 'voice' ? '#fff' : '#e91e63'}
                        />
                        <Text
                          style={[
                            styles.tabText,
                            activeTab === 'voice'
                              ? styles.activeTabText
                              : styles.inactiveTabText,
                          ]}>
                          Voice
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  promptText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 16,
    backgroundColor: '#fff',
  },
  checkButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  promptArrow: {
    padding: 8,
  },
  promptTitle: {
    fontFamily: 'Figtree-Bold',
    fontSize: 28,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  titleInput: {
    fontFamily: 'Figtree-Regular',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#e91e63',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  contentInput: {
    fontFamily: 'Figtree-Regular',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  voiceContainer: {
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '80%',
    marginBottom: 20,
  },
  waveBar: {
    width: 4,
    marginHorizontal: 4,
    borderRadius: 2,
    backgroundColor: '#aaa',
  },
  micButtonContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f48fb1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonRecording: {
    backgroundColor: '#c2185b', // Darker shade when recording
  },
  recordingInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  recordingTime: {
    fontFamily: 'Figtree-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  recordingStatus: {
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: '#666',
  },
  recordingHint: {
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  recordingItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  recordingText: {
    fontFamily: 'Figtree-Regular',
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "#FFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e91e63',
  },
  tabButton: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#e91e63',
  },
  inactiveTabButton: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontFamily: 'Figtree-Bold',
    fontSize: 18,
    marginLeft: 10,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#e91e63',
  },
});

export default NewJournalScreen;