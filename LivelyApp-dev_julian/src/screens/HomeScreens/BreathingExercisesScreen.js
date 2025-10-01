// src/screens/HomeScreens/BreathingExercisesScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BreathingExercisesScreen = ({ navigation }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [counter, setCounter] = useState(0);
  const [completedRounds, setCompletedRounds] = useState(0);
  
  // Animation values
  const circleSize = useRef(new Animated.Value(100)).current;
  const circleOpacity = useRef(new Animated.Value(0.3)).current;
  
  // Static breathing exercises
  const breathingExercises = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
      benefits: 'Reduces anxiety, helps with sleep, improves stress response',
      difficulty: 'Beginner',
      duration: '5 minutes',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
        { name: 'hold', duration: 7, instruction: 'Hold your breath' },
        { name: 'exhale', duration: 8, instruction: 'Exhale through your mouth' },
      ],
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Inhale, hold, exhale, and hold again, each for 4 seconds',
      benefits: 'Reduces stress, improves concentration, regulates autonomic nervous system',
      difficulty: 'Beginner',
      duration: '5 minutes',
      phases: [
        { name: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
        { name: 'hold', duration: 4, instruction: 'Hold your breath' },
        { name: 'exhale', duration: 4, instruction: 'Exhale through your mouth' },
        { name: 'hold', duration: 4, instruction: 'Hold your breath' },
      ],
    },
    {
      id: 3,
      name: 'Diaphragmatic Breathing',
      description: 'Deep belly breathing that engages the diaphragm fully',
      benefits: 'Strengthens the diaphragm, reduces oxygen demand, slows breathing rate',
      difficulty: 'Intermediate',
      duration: '10 minutes',
      phases: [
        { name: 'inhale', duration: 5, instruction: 'Inhale deeply through your nose into your belly' },
        { name: 'exhale', duration: 7, instruction: 'Exhale slowly through pursed lips' },
      ],
    },
    {
      id: 4,
      name: 'Alternate Nostril Breathing',
      description: 'Alternating breath between left and right nostrils',
      benefits: 'Balances the nervous system, enhances respiratory function, promotes mental clarity',
      difficulty: 'Intermediate',
      duration: '7 minutes',
      phases: [
        { name: 'inhale-right', duration: 4, instruction: 'Close left nostril, inhale through right' },
        { name: 'hold', duration: 2, instruction: 'Close both nostrils, hold breath' },
        { name: 'exhale-left', duration: 6, instruction: 'Release left nostril, exhale' },
        { name: 'inhale-left', duration: 4, instruction: 'Inhale through left nostril' },
        { name: 'hold', duration: 2, instruction: 'Close both nostrils, hold breath' },
        { name: 'exhale-right', duration: 6, instruction: 'Release right nostril, exhale' },
      ],
    },
    {
      id: 5,
      name: 'Resonant Breathing',
      description: 'Breathe at a rate of 5-7 breaths per minute',
      benefits: 'Reduces anxiety, increases heart rate variability, improves mood',
      difficulty: 'Beginner',
      duration: '3 minutes',
      phases: [
        { name: 'inhale', duration: 5, instruction: 'Inhale slowly through your nose' },
        { name: 'exhale', duration: 5, instruction: 'Exhale slowly through your nose' },
      ],
    },
  ];

  // Start breathing exercise
  const startExercise = () => {
    if (!selectedExercise) return;
    
    setIsExerciseActive(true);
    setCurrentPhase(selectedExercise.phases[0].name);
    setCounter(selectedExercise.phases[0].duration);
    setCompletedRounds(0);
    
    // Start with inhale animation
    animateInhale();
  };
  
  // Stop breathing exercise
  const stopExercise = () => {
    setIsExerciseActive(false);
    setCounter(0);
    setCompletedRounds(0);
    
    // Reset animations
    Animated.timing(circleSize).stop();
    Animated.timing(circleOpacity).stop();
    circleSize.setValue(100);
    circleOpacity.setValue(0.3);
  };
  
  // Animation for inhale phase
  const animateInhale = () => {
    Animated.parallel([
      Animated.timing(circleSize, {
        toValue: 220,
        duration: getCurrentPhaseDuration() * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(circleOpacity, {
        toValue: 0.7,
        duration: getCurrentPhaseDuration() * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  // Animation for exhale phase
  const animateExhale = () => {
    Animated.parallel([
      Animated.timing(circleSize, {
        toValue: 100,
        duration: getCurrentPhaseDuration() * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(circleOpacity, {
        toValue: 0.3,
        duration: getCurrentPhaseDuration() * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  // Animation for hold breath phase
  const animateHold = () => {
    // No size/opacity change during hold, but we'll animate a subtle pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleOpacity, {
          toValue: circleOpacity._value + 0.1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(circleOpacity, {
          toValue: circleOpacity._value,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      { iterations: getCurrentPhaseDuration() / 2 }
    ).start();
  };
  
  // Get current phase details
  const getCurrentPhase = () => {
    if (!selectedExercise) return null;
    return selectedExercise.phases.find(phase => 
      phase.name === currentPhase || 
      (currentPhase.includes(phase.name) && !currentPhase.includes('other'))
    );
  };
  
  // Get current phase duration
  const getCurrentPhaseDuration = () => {
    const phase = getCurrentPhase();
    return phase ? phase.duration : 0;
  };
  
  // Get current phase instruction
  const getCurrentInstruction = () => {
    const phase = getCurrentPhase();
    return phase ? phase.instruction : '';
  };
  
  // Get next phase in sequence
  const getNextPhase = () => {
    if (!selectedExercise) return null;
    
    const currentIndex = selectedExercise.phases.findIndex(phase => 
      phase.name === currentPhase || 
      (currentPhase.includes(phase.name) && !currentPhase.includes('other'))
    );
    
    // If this is the last phase, go back to the first
    if (currentIndex === selectedExercise.phases.length - 1) {
      return selectedExercise.phases[0].name;
    }
    
    // Otherwise, go to the next phase
    return selectedExercise.phases[currentIndex + 1].name;
  };
  
  // Timer effect
  useEffect(() => {
    let intervalId;
    
    if (isExerciseActive && counter > 0) {
      intervalId = setInterval(() => {
        setCounter(c => c - 1);
      }, 1000);
    } else if (isExerciseActive && counter === 0) {
      // Move to next phase
      const nextPhase = getNextPhase();
      setCurrentPhase(nextPhase);
      
      // If we've completed a full cycle, increment rounds
      if (nextPhase === selectedExercise.phases[0].name) {
        setCompletedRounds(prev => prev + 1);
      }
      
      // Set counter for the next phase
      const nextPhaseObj = selectedExercise.phases.find(phase => 
        phase.name === nextPhase || 
        (nextPhase.includes(phase.name) && !nextPhase.includes('other'))
      );
      setCounter(nextPhaseObj ? nextPhaseObj.duration : 0);
      
      // Apply appropriate animation for the next phase
      if (nextPhase.includes('inhale')) {
        animateInhale();
      } else if (nextPhase.includes('exhale')) {
        animateExhale();
      } else if (nextPhase.includes('hold')) {
        animateHold();
      }
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isExerciseActive, counter, currentPhase]);
  
  // Render exercise item
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.exerciseCard,
        selectedExercise && selectedExercise.id === item.id && styles.selectedExerciseCard,
      ]}
      onPress={() => setSelectedExercise(item)}
    >
      <View style={styles.exerciseCardHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <View style={styles.exerciseDifficultyContainer}>
          <Text style={styles.exerciseDifficulty}>{item.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.exerciseDescription}>{item.description}</Text>
      
      <View style={styles.exerciseCardFooter}>
        <View style={styles.exerciseDurationContainer}>
          <Icon name="clock-outline" size={14} color="#757575" />
          <Text style={styles.exerciseDuration}>{item.duration}</Text>
        </View>
        
        <Icon 
          name={selectedExercise && selectedExercise.id === item.id ? "check-circle" : "circle-outline"} 
          size={22} 
          color={selectedExercise && selectedExercise.id === item.id ? "#5C6BC0" : "#9E9E9E"} 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Breathing Exercises</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {isExerciseActive ? (
          // Active exercise view
          <View style={styles.activeExerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.activeExerciseName}>
                {selectedExercise ? selectedExercise.name : ''}
              </Text>
              <Text style={styles.roundCounter}>Round {completedRounds + 1}</Text>
            </View>
            
            <View style={styles.breathCircleContainer}>
              <Animated.View 
                style={[
                  styles.breathCircle,
                  {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: Animated.divide(circleSize, 2),
                    opacity: circleOpacity,
                  },
                ]}
              />
              <View style={styles.instructionContainer}>
                <Text style={styles.phaseText}>
                  {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
                </Text>
                <Text style={styles.instructionText}>{getCurrentInstruction()}</Text>
                <Text style={styles.counterText}>{counter}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.stopButton}
              onPress={stopExercise}
            >
              <Text style={styles.stopButtonText}>Stop Exercise</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Exercise selection view
          <ScrollView style={styles.scrollView}>
            <Text style={styles.sectionTitle}>Select a Breathing Exercise</Text>
            
            <FlatList
              data={breathingExercises}
              renderItem={renderExerciseItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
            
            {selectedExercise && (
              <View style={styles.selectedExerciseDetails}>
                <Text style={styles.detailsTitle}>Benefits:</Text>
                <Text style={styles.detailsText}>{selectedExercise.benefits}</Text>
                
                <Text style={styles.detailsTitle}>How it works:</Text>
                <View style={styles.phasesContainer}>
                  {selectedExercise.phases.map((phase, index) => (
                    <View key={index} style={styles.phaseItem}>
                      <View style={styles.phaseNumberContainer}>
                        <Text style={styles.phaseNumber}>{index + 1}</Text>
                      </View>
                      <View style={styles.phaseContentContainer}>
                        <Text style={styles.phaseName}>
                          {phase.name.charAt(0).toUpperCase() + phase.name.slice(1)}
                        </Text>
                        <Text style={styles.phaseDescription}>
                          {phase.instruction} for {phase.duration} seconds
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={startExercise}
                >
                  <Text style={styles.startButtonText}>Start Exercise</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerRightPlaceholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  selectedExerciseCard: {
    borderWidth: 2,
    borderColor: '#5C6BC0',
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  exerciseDifficultyContainer: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  exerciseDifficulty: {
    fontSize: 12,
    color: '#5C6BC0',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
  },
  exerciseCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseDuration: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  selectedExerciseDetails: {
    marginTop: 16,
    marginBottom: 32,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 16,
  },
  phasesContainer: {
    marginBottom: 24,
  },
  phaseItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  phaseNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5C6BC0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  phaseNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  phaseContentContainer: {
    flex: 1,
  },
  phaseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#424242',
  },
  startButton: {
    backgroundColor: '#5C6BC0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activeExerciseContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  exerciseHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  activeExerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  roundCounter: {
    fontSize: 16,
    color: '#5C6BC0',
  },
  breathCircleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathCircle: {
    backgroundColor: '#5C6BC0',
    position: 'absolute',
  },
  instructionContainer: {
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stopButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EF5350',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  stopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF5350',
  },
});

export default BreathingExercisesScreen;