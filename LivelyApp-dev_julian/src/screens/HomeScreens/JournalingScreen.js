import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../../constant/Icons';
import ScreenHeader from '../../components/headers/ScreenHeader';
import { COLORS } from '../../utils/constant';

const {width, height} = Dimensions.get('window');

const JournalingScreen = ({navigation}) => {
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:12');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [animationValue] = useState(new Animated.Value(1));

  // Sample journal content for the detailed view
  const journalContent = {
    title: 'In my life right now, I would like to change...',
    date: 'On 15 November, 2023 | 5:30 P.M',
    mood: 'Mood and Emotion - Happy | Fulfilled',
    content: `In my life right now, there's a profound yearning for change, a desire to redefine my relationship with stress. The constant hustle has left me craving tranquility, and it's time for a metamorphosis. I envision a life where stress is not an adversary but a call to mindfulness.

This transformation involves a commitment to self-care, a deliberate and daily ritual. It's about carving out moments for meditation, embracing the soothing cadence of deep breaths, and finding solace in the simplicity of being present.

The journey to change is rooted in reshaping my response to challenges. Rather than succumbing to the weight of stress, I want to view it as an opportunity for growth and resilience. It's about fostering a mindset that thrives in adversity, finding strength in the midst of chaos.

This shift is a conscious effort to slow down, savoring each moment and creating a sanctuary of serenity within myself. It's about reclaiming the narrative of my life, acknowledging that amidst the chaos, there's an oasis of calm waiting to be discovered.`,
  };

  // Pulse animation for recording
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopPulseAnimation = () => {
    animationValue.stopAnimation();
    animationValue.setValue(1);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      stopPulseAnimation();
    } else {
      setIsRecording(true);
      startPulseAnimation();
    }
  };

  const journalEntries = [
    {
      id: 1,
      type: 'text',
      question: 'What do you want more of in your life?',
      date: 'September 15, 2023',
      colors: ['#ffcc80', '#ffffff'],
    },
    {
      id: 2,
      type: 'voice',
      question: 'What do you want more of in your life?',
      date: 'September 15, 2023',
      colors: ['#fff59d', '#ffffff'],
    },
    {
      id: 3,
      type: 'text',
      question: 'What do you want more of in your life?',
      date: 'September 15, 2023',
      colors: ['#f8bbd0', '#ffffff'],
    },
    {
      id: 4,
      type: 'voice',
      question: 'What do you want more of in your life?',
      date: 'September 15, 2023',
      colors: ['#e1bee7', '#ffffff'],
    },
    {
      id: 5,
      type: 'voice',
      question: 'What do you want more of in your life?',
      date: 'September 15, 2023',
      colors: ['#ffb74d', '#ffffff'],
    },
  ];

  const handleCardPress = (type, entry) => {
    setSelectedEntry(entry);
    if (type === 'text') {
      setTextModalVisible(true);
    } else {
      setRecordingModalVisible(true);
    }
  };

  const renderJournalCard = entry => {
    return (
      <TouchableOpacity
        key={entry.id}
        style={styles.journalCard}
        onPress={() => handleCardPress(entry.type, entry)}
        activeOpacity={0.8}>
        <LinearGradient colors={entry.colors} style={styles.iconContainer}>
          {entry.type === 'text' ? (
            <Image
              source={require('../../assets/images/pen-icon.png')}
              style={styles.penIcon}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../assets/images/mic-icon.png')}
              style={styles.micIcon}
              resizeMode="contain"
            />
          )}
        </LinearGradient>
        <View style={styles.cardContent}>
          <Text style={styles.cardQuestion}>{entry.question}</Text>
          <Text style={styles.cardDate}>{entry.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleShare = () => {
    // Implement share functionality here
    console.log('Sharing entry:', selectedEntry);
  };

  const closeModal = () => {
    setTextModalVisible(false);
    setRecordingModalVisible(false);
    setSelectedEntry(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="rgba(241, 210, 223,1 )"
      />
      <LinearGradient
        colors={['rgba(241, 210, 223, 1)', 'rgba(245, 240, 240, 1)']}
        style={styles.gradientContainer}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}>


        <ScreenHeader title={'Your Journal Entries'} onPress={() => navigation.goBack()} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {journalEntries.map(entry => renderJournalCard(entry))}
          <View style={styles.bottomSpace} />
        </ScrollView>

        <TouchableOpacity style={styles.newJournalButton} activeOpacity={0.9} onPress={()=>navigation.navigate("NewJournaling")}>
          <Text style={styles.newJournalText}>New Journal</Text>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Text Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={textModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['rgba(241, 210, 223, 1)', 'rgba(245, 240, 240, 1)']}
            style={styles.modalContainer}>
            <View style={styles.modalPullBar}></View>

            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.shareButton}>
                <Icons.MaterialCommunityIcons
                  name="share-outline"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.journalTitle}>{journalContent.title}</Text>
            <Text style={styles.journalDate}>{journalContent.date}</Text>
            <Text style={styles.journalMood}>{journalContent.mood}</Text>

            <View style={styles.divider} />

            <ScrollView style={styles.journalContentScrollView}>
              <Text style={styles.journalContentText}>
                {journalContent.content}
              </Text>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* Recording Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={recordingModalVisible}
        onRequestClose={() => {
          setIsRecording(false);
          stopPulseAnimation();
          setRecordingModalVisible(false);
        }}>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['rgba(241, 210, 223, 1)', 'rgba(245, 240, 240, 1)']}
            style={styles.modalAudioContainer}>
            <View style={styles.modalPullBar}></View>

            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  setIsRecording(false);
                  stopPulseAnimation();
                  setRecordingModalVisible(false);
                }}
                style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleShare}
                style={styles.shareButton}>
                <Icons.MaterialCommunityIcons
                  name="share-outline"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.journalTitle}>{journalContent.title}</Text>
            <Text style={styles.journalDate}>{journalContent.date}</Text>
            <Text style={styles.journalMood}>{journalContent.mood}</Text>

            <View style={styles.recordingControlContainer}>
              <TouchableOpacity
                style={styles.recordButton}
                onPress={toggleRecording}>
                <Animated.View
                  style={[
                    styles.recordButtonInner,
                    {
                      transform: [
                        {
                          scale: animationValue,
                        },
                      ],
                    },
                  ]}>
                  {isRecording ? (
                    <Icons.FontAwesome name="pause" size={32} color="#fff" />
                  ) : (
                    <Icons.FontAwesome name="play" size={32} color="#fff" />
                  )}
                </Animated.View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  journalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 4,
    margin: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  penIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  micIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardQuestion: {
    fontSize: 14,
    fontFamily: 'Figtree-Bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDate: {
    color: '#777',
    fontSize: 12,
    fontFamily: 'Figtree-Regular',
  },
  bottomSpace: {
    height: 80,
  },
  newJournalButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 40,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e91e63',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  newJournalText: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Figtree-Bold'
  },
  plusIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // Modal Shared Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: height * 0.97, // Using 97% to match the document
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalAudioContainer: {
    height: height * 0.60, // Using 97% to match the document
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalPullBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 24,
    color: '#000',
  },
  shareButton: {
    padding: 8,
  },
  journalTitle: {
    fontSize: 28,
    fontFamily: 'Figtree-SemiBold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  journalDate: {
    fontSize: 16,
    fontFamily: 'Figtree-Regular',
    color: '#555',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  journalMood: {
    fontSize: 16,
    fontFamily: 'Figtree-Regular',
    color: '#555',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
    marginVertical: 16,
  },

  // Text Modal Styles
  journalContentScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  journalContentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    paddingBottom: 20,
    fontFamily: 'Figtree-Regular',
  },

  // Recording Modal Styles
  recordingControlContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
    // paddingBottom: 40,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: '#f48fb1', // Light pink
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#e91e63', // Darker pink
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JournalingScreen;
