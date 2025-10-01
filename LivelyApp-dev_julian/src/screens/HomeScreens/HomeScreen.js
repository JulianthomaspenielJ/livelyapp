import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import Icons from '../../../constant/Icons';

const {width, height} = Dimensions.get('window');

// Story Modal Component
const StoryModal = ({visible, onClose, storiesData, initialIndex = 0, onAllStoriesCompleted, currentCategoryKey, allCategories, storyDataSource}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
  const [progress, setProgress] = useState([]);
  const [animation, setAnimation] = useState(null);
  const STORY_DURATION = 15000; // 15 seconds per story

  const handleLeftPress = () => {
    console.log('Left side tapped');
    goToPreviousStory();
  };

  const handleRightPress = () => {
    console.log('Right side tapped');
    goToNextStory();
  };

  const handleSwipeRight = () => {
    console.log('Right swipe detected');
    goToNextCategory();
  };

  const handleShare = async () => {
    try {
      const currentStory = storiesData[currentStoryIndex];
      const categoryName = currentCategoryKey === 'goodMorning' ? 'Good Morning' :
                          currentCategoryKey === 'morningExercise' ? 'Morning Exercise' :
                          currentCategoryKey === 'beautifySoul' ? 'Beautify Your Soul' :
                          currentCategoryKey === 'morningStretches' ? 'Morning Stretches' : 'Story';
      
      const shareOptions = {
        title: `${categoryName} Story`,
        message: `Check out this amazing ${categoryName} story! 🧘‍♀️✨\n\n"${currentStory.title || currentStory.mainText || 'Mindfulness content'}"\n\n${currentStory.description || 'Start your mindfulness journey today!'}`,
        url: 'https://yourapp.com/stories', // Replace with your app's URL
      };

      const result = await Share.open(shareOptions);
      console.log('Share result:', result);
      
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.log('Error sharing:', error);
        Alert.alert('Share Error', 'Unable to share this story. Please try again.');
      }
    }
  };

  // Reset progress when stories data changes (new category)
  React.useEffect(() => {
    if (visible && storiesData && storiesData.length > 0) {
      const initialProgress = storiesData.map(() => new Animated.Value(0));
      setProgress(initialProgress);
      
      // Check if we're navigating to previous category (should start from last story)
      const shouldStartFromLast = initialIndex === -1;
      const startIndex = shouldStartFromLast ? storiesData.length - 1 : 0;
      
      setCurrentStoryIndex(startIndex);
    }
  }, [visible, storiesData, currentCategoryKey]);

  // Start animation for current story
  React.useEffect(() => {
    if (visible && progress.length > 0 && currentStoryIndex < progress.length) {
      startCurrentStoryAnimation();
    }
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [currentStoryIndex, visible, progress]);

  const startCurrentStoryAnimation = () => {
    if (animation) {
      animation.stop();
    }
    
    if (currentStoryIndex >= progress.length || !progress[currentStoryIndex]) return;
    
    const currentProgress = progress[currentStoryIndex];
    
    const newAnimation = Animated.timing(currentProgress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });
    
    setAnimation(newAnimation);
    
    newAnimation.start(({finished}) => {
      if (finished) {
        goToNextStory();
      }
    });
  };

  const goToPreviousStory = () => {
    console.log('Going to previous story. Current index:', currentStoryIndex);
    if (currentStoryIndex > 0) {
      if (progress[currentStoryIndex]) {
        progress[currentStoryIndex].setValue(0);
      }
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // If at first story, go to previous category's last story
      console.log('At first story, trying to go to previous category');
      if (onAllStoriesCompleted) {
        const currentIndex = allCategories.findIndex(cat => cat.key === currentCategoryKey);
        if (currentIndex > 0) {
          const prevCategory = allCategories[currentIndex - 1];
          if (storyDataSource[prevCategory.key]) {
            onAllStoriesCompleted(currentCategoryKey, allCategories, storyDataSource, 'previous', prevCategory.key);
          }
        }
      }
    }
  };

  const goToNextStory = () => {
    console.log('Going to next story. Current index:', currentStoryIndex, 'Total stories:', storiesData.length);
    if (currentStoryIndex < storiesData.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // All stories in current category completed, move to next category
      console.log('At last story, moving to next category');
      if (onAllStoriesCompleted) {
        onAllStoriesCompleted(currentCategoryKey, allCategories, storyDataSource, 'next');
      }
    }
  };

  const goToNextCategory = () => {
    console.log('Swiped right - forcing move to next category');
    // Force move to next category regardless of current story position
    if (onAllStoriesCompleted) {
      onAllStoriesCompleted(currentCategoryKey, allCategories, storyDataSource, 'next');
    }
  };

  // Create PanResponder for swipe gestures
  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20;
    },
    onPanResponderGrant: () => {
      // Stop current animation when user starts interacting
      if (animation) {
        animation.stop();
      }
    },
    onPanResponderMove: () => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      const swipeThreshold = 50;
      const screenWidth = Dimensions.get('window').width;
      
      console.log('Gesture:', {dx, dy, locationX: evt.nativeEvent.locationX, locationY: evt.nativeEvent.locationY});
      
      // Check for swipe down to close
      if (dy > swipeThreshold && Math.abs(dy) > Math.abs(dx)) {
        console.log('Swipe down detected - closing modal');
        onClose();
        return;
      }
      
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > swipeThreshold) {
          // Swipe right - go to next category
          console.log('Detected right swipe');
          handleSwipeRight();
        } else if (dx < -swipeThreshold) {
          // Swipe left - go to previous story
          console.log('Detected left swipe');
          handleLeftPress();
        } else {
          // Small movement - treat as tap
          console.log('Small horizontal movement, treating as tap');
          if (evt.nativeEvent.locationX < screenWidth / 2) {
            console.log('Tap on left side');
            handleLeftPress();
          } else {
            console.log('Tap on right side');
            handleRightPress();
          }
        }
      } else {
        // Treat as tap
        console.log('Vertical movement or tap');
        if (evt.nativeEvent.locationX < screenWidth / 2) {
          console.log('Tap on left side');
          handleLeftPress();
        } else {
          console.log('Tap on right side');
          handleRightPress();
        }
      }
      
      // Restart animation after interaction
      setTimeout(() => {
        startCurrentStoryAnimation();
      }, 100);
    },
  }), [animation, currentStoryIndex, storiesData]);

  if (!visible || !storiesData || storiesData.length === 0) return null;

  const currentStory = storiesData[currentStoryIndex] || storiesData[0];

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={storyStyles.container} {...panResponder.panHandlers}>
        <ImageBackground
          source={currentStory.backgroundImage}
          style={storyStyles.background}
          resizeMode="cover">
          <LinearGradient
            colors={currentStory.gradientColors || ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
            style={storyStyles.overlay}>
            
            {/* Story Header */}
            <View style={storyStyles.header}>
              {/* Multiple Progress Bars */}
              <View style={storyStyles.progressContainer}>
                {storiesData.map((_, index) => (
                  <View key={index} style={storyStyles.progressBarContainer}>
                    <View style={storyStyles.progressBar}>
                      <Animated.View
                        style={[
                          storyStyles.progressFill,
                          {
                            width: index < currentStoryIndex 
                              ? '100%' 
                              : index === currentStoryIndex
                                ? progress[index]?.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                  }) || '0%'
                                : '0%'
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={storyStyles.headerContent}>
                <View style={storyStyles.headerLeft}>
                  <Text style={storyStyles.date}>01 January, 2024</Text>
                </View>
                <View style={storyStyles.headerRight}>
                  <TouchableOpacity onPress={handleShare} style={storyStyles.shareButton}>
                    <Icons.FontAwesome5 name="share" size={24} color="#FFFFFF" style={storyStyles.shareIcon}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Story Content */}
            <View style={storyStyles.content}>
              {currentStory.type === 'text' ? (
                <View style={storyStyles.textStory}>
                  <Text style={storyStyles.mainText}>{currentStory.mainText}</Text>
                  {currentStory.subText && (
                    <Text style={storyStyles.subText}>{currentStory.subText}</Text>
                  )}
                </View>
              ) : (
                <View style={storyStyles.mediaStory}>
                  {/* Bottom content */}
                  <View style={storyStyles.bottomContent}>
                    <View style={storyStyles.bottomtext}>
                      <Text style={storyStyles.title}>{currentStory.title}</Text>
                    <Text style={storyStyles.description}>{currentStory.description}</Text>
                    </View>
                                      <View style={storyStyles.bottombutton}>
                     {currentStory.hasButton && (
                      <TouchableOpacity style={storyStyles.actionButton}>
                        <Text style={storyStyles.buttonText}>Start Now</Text>
                        <View style={storyStyles.buttonIconContainer}>
                          <Text style={storyStyles.buttonArrow}>→</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </Modal>
  );
};

// Enhanced Circle Category Component with story functionality
const CircleCategory = ({image, title, subtitle, onPress, hasStory, isViewed}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
      <View style={[
        styles.categoriesView, 
        hasStory && !isViewed && styles.storyBorder,
        hasStory && isViewed && styles.viewedStoryBorder
      ]}>
        <Image source={image} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
      {subtitle && <Text style={styles.categoryTitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

// Activity Card Component for the grid
const ActivityCard = ({icon, title, subtitle, onPress}) => {
  return (
    <TouchableOpacity style={styles.activityCard} onPress={onPress}>
      <View style={styles.activityIconContainer}>
        <Image source={icon} style={styles.activityIcon} />
      </View>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityTitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

// Progress Card Component for meditation sessions
const ProgressCard = ({title, description, minsLeft, image}) => {
  return (
    <TouchableOpacity style={styles.progressCard}>
      <View style={{borderRadius: 10, height: 80, overflow: 'hidden'}}>
        <Image source={image} style={styles.progressImage} resizeMode="cover" />
      </View>
      <View style={styles.progressContent}>
        <Text style={styles.progressTitle}>{title}</Text>
        <Text style={styles.progressDescription}>{description}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressMins}>{minsLeft} mins left</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Quick Read Card Component
const QuickReadCard = ({title, content, image}) => {
  return (
    <TouchableOpacity style={styles.readCard}>
      <ImageBackground source={image} style={styles.readImage}>
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.readOverlay}>
          <Text style={styles.readTitle}>{title}</Text>
          <Text style={styles.readContent} numberOfLines={4}>
            {content}
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Know more</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showStory, setShowStory] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [viewedCategories, setViewedCategories] = useState(new Set());
  const [currentCategoryKey, setCurrentCategoryKey] = useState(null);

  // Sample text for articles
  const dummyText =
    'Lorem ipsum dolor sit amet, consectetur. Id et egut pulvinar fringilla risus ut elementum. Aenean erat tempor enim facilisis quam. Diam id massa velit at.';

  // Sample image imports for demonstration (these would be actual image files in a real app)
  const images = {
    goodMorning: require('../../assets/images/good-morning.png'),
    morningExercise: require('../../assets/images/morning-exercise.png'),
    beautifySoul: require('../../assets/images/beautify-soul.png'),
    morningStretches: require('../../assets/images/morning-stretches.png'),
    journal: require('../../assets/icons/journal.png'),
    mindfulness: require('../../assets/icons/mindfulness.png'),
    music: require('../../assets/icons/music.png'),
    meditation: require('../../assets/icons/meditation.png'),
    breathing: require('../../assets/icons/breathing.png'),
    yoga: require('../../assets/icons/yoga.png'),
    programBg: require('../../assets/images/program-bg.png'),
    stones: require('../../assets/images/stones.png'),
    meditationBg: require('../../assets/images/meditation-bg.png'),
    archway: require('../../assets/images/archway.png'),
    clouds: require('../../assets/images/clouds-bg.png'),
  };

  // Story data for each category - Multiple stories per category
  const storyData = {
    goodMorning: [
      {
        type: 'text',
        backgroundImage: images.goodMorning,
        mainText: 'YOUR\nTIME\nIS\nNOW',
        gradientColors: ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)'],
      },
      {
        type: 'media',
        backgroundImage: images.morningExercise,
        title: 'Rise and Shine',
        description: 'Every morning is a new beginning. Start your day with positive energy and determination.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)'],
      },
      {
        type: 'media',
        backgroundImage: images.beautifySoul,
        title: 'Morning Motivation',
        description: 'Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)'],
      }
    ],
    morningExercise: [
      {
        type: 'media',
        backgroundImage: images.morningExercise,
        title: 'Morning Exercise',
        description: 'Start your day with energy and positivity. Let your body wake up with gentle movements.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)'],
      },
      {
        type: 'media',
        backgroundImage: images.yoga,
        title: 'Stretching Routine',
        description: 'Gentle stretches to awaken your muscles and prepare your body for the day ahead.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'],
      }
    ],
    beautifySoul: [
      {
        type: 'media',
        backgroundImage: images.beautifySoul,
        title: 'Beautify Your Soul',
        description: 'Inner beauty radiates outward. Take time to nurture your soul and find peace within.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)'],
      },
      {
        type: 'text',
        backgroundImage: images.meditationBg,
        mainText: 'PEACE\nBEGINS\nWITH\nA\nSMILE',
        gradientColors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)'],
      },
      {
        type: 'media',
        backgroundImage: images.clouds,
        title: 'Soul Connection',
        description: 'Connect with your inner self through mindfulness and meditation practices.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)'],
      }
    ],
    morningStretches: [
      {
        type: 'media',
        backgroundImage: images.morningStretches,
        title: 'Morning Stretches',
        description: 'Gentle movements to start your day with flexibility and grace.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'],
      },
      {
        type: 'media',
        backgroundImage: images.meditationBg,
        title: 'Guided Meditation',
        description: 'It can help you focus more and be more motivated throughout your day.',
        hasButton: true,
        gradientColors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'],
      }
    ],
  };

  const handleCategoryPress = (categoryKey) => {
    console.log('Opening category:', categoryKey, 'with stories:', storyData[categoryKey]?.length);
    setCurrentCategoryKey(categoryKey);
    setCurrentStory(storyData[categoryKey]);
    setShowStory(true);
  };

  const closeStory = () => {
    setShowStory(false);
    setCurrentStory(null);
    setCurrentCategoryKey(null);
  };

  const markCategoryAsViewed = (categoryKey) => {
    setViewedCategories(prev => new Set([...prev, categoryKey]));
  };

  const handleAllStoriesCompleted = (completedCategoryKey, allCategories, storyDataSource, direction = 'next', targetCategoryKey = null) => {
    console.log('Navigation direction:', direction, 'from category:', completedCategoryKey);
    
    if (direction === 'previous' && targetCategoryKey) {
      // Go to previous category's last story
      const prevCategoryStories = storyDataSource[targetCategoryKey];
      if (prevCategoryStories && prevCategoryStories.length > 0) {
        setTimeout(() => {
          setCurrentCategoryKey(targetCategoryKey);
          setCurrentStory(prevCategoryStories);
        }, 100);
      }
      return;
    }
    
    // Mark current category as viewed (only for forward navigation)
    if (direction === 'next') {
      const newViewedCategories = new Set([...viewedCategories, completedCategoryKey]);
      setViewedCategories(newViewedCategories);
      
      // Find next unviewed category
      const currentIndex = allCategories.findIndex(cat => cat.key === completedCategoryKey);
      
      // Look for next unviewed category after current one
      let nextUnviewedCategory = null;
      for (let i = currentIndex + 1; i < allCategories.length; i++) {
        if (!newViewedCategories.has(allCategories[i].key) && storyDataSource[allCategories[i].key]) {
          nextUnviewedCategory = allCategories[i];
          break;
        }
      }
      
      console.log('Next unviewed category:', nextUnviewedCategory?.key);
      
      if (nextUnviewedCategory && storyDataSource[nextUnviewedCategory.key]) {
        // Auto-move to next category's stories
        setTimeout(() => {
          console.log('Transitioning to:', nextUnviewedCategory.key, 'with stories:', storyDataSource[nextUnviewedCategory.key]?.length);
          setCurrentCategoryKey(nextUnviewedCategory.key);
          setCurrentStory(storyDataSource[nextUnviewedCategory.key]);
        }, 100);
      } else {
        // No more unviewed categories, close stories
        console.log('All categories viewed, closing stories');
        setTimeout(() => {
          closeStory();
        }, 100);
      }
    }
  };

  // Categories data with keys for ordering
  const categoriesData = [
    {
      key: 'goodMorning',
      image: images.goodMorning,
      title: 'Good',
      subtitle: 'Morning',
    },
    {
      key: 'morningExercise',
      image: images.morningExercise,
      title: 'Morning',
      subtitle: 'Exercise',
    },
    {
      key: 'beautifySoul',
      image: images.beautifySoul,
      title: 'Beautify Your',
      subtitle: 'Soul',
    },
    {
      key: 'morningStretches',
      image: images.morningStretches,
      title: 'Morning',
      subtitle: 'Stretches',
    },
  ];

  // Sort categories: unviewed first, then viewed
  const sortedCategories = [...categoriesData].sort((a, b) => {
    const aViewed = viewedCategories.has(a.key);
    const bViewed = viewedCategories.has(b.key);
    
    if (aViewed === bViewed) return 0; // Keep original order if both viewed or both unviewed
    return aViewed ? 1 : -1; // Unviewed (-1) comes before viewed (1)
  });

  return (
    <SafeAreaView style={styles.container}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Ragavan</Text>
          </View>

          {/* Horizontal Scrollable Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}>
            {sortedCategories.map((category) => (
              <CircleCategory
                key={category.key}
                image={category.image}
                title={category.title}
                subtitle={category.subtitle}
                hasStory={true}
                isViewed={viewedCategories.has(category.key)}
                onPress={() => handleCategoryPress(category.key)}
              />
            ))}
          </ScrollView>

          {/* Activity Cards Grid */}
          <View style={styles.activitiesContainer}>
            <View style={styles.activitiesRow}>
              <ActivityCard
                icon={images.journal}
                title="Personal"
                subtitle="Journaling"
                onPress={() => navigation.navigate('Journaling')}
              />
              <ActivityCard
                icon={images.mindfulness}
                title="Mindfulness"
                subtitle="Activities"
              />
              <ActivityCard
                icon={images.music}
                title="Music"
                subtitle="Library"
              />
            </View>
            <View style={styles.activitiesRow}>
              <ActivityCard
                icon={images.meditation}
                title="Guided"
                subtitle="Meditation"
              />
              <ActivityCard
                icon={images.breathing}
                title="Breathing"
                subtitle="Exercises"
              />
              <ActivityCard
                icon={images.yoga}
                title="Practice"
                subtitle="Yoga"
              />
            </View>
          </View>

          {/* Mood Check-in Section */}
          <View style={styles.moodContainer}>
            <View style={styles.moodTextContainer}>
              <Text style={styles.moodQuestion}>What's your mood like</Text>
              <Text style={styles.moodToday}>Today?</Text>
            </View>

            <TouchableOpacity style={styles.moodButton}>
              <Text style={styles.moodButtonText}>Mood Check-in</Text>
              <Text style={styles.moodButtonPlus}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Program Banner */}
          <View style={styles.programBannerContainer}>
            <ImageBackground
              source={images.programBg}
              style={styles.programBanner}
              imageStyle={styles.programBannerImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
                style={styles.programOverlay}>
                <Image source={images.stones} style={styles.programIcon} />
                <View style={styles.programContent}>
                  <Text style={styles.programTitle}>
                    Start a new program now!
                  </Text>
                  <Text style={styles.programSubtitle}>
                    let's roll program now!
                  </Text>
                  <TouchableOpacity style={styles.programButton}>
                    <Text style={styles.programButtonText}>Choose program</Text>
                    <Text style={styles.programButtonArrow}>→</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* Progress Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Continue with your progress</Text>
            <View style={styles.progressContainer}>
              <ProgressCard
                title="Guided Meditation"
                description="Find your inner peace and practice your meditation"
                minsLeft={4}
                image={images.clouds}
              />
              <ProgressCard
                title="Guided Meditation"
                description="Find your inner peace and practice your meditation"
                minsLeft={4}
                image={images.meditationBg}
              />
            </View>
          </View>

          {/* Quick Reads Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick reads</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.readsContainer}
              contentContainerStyle={styles.readsContent}>
              <QuickReadCard
                title="My happiest day"
                content={dummyText}
                image={images.archway}
              />
              <QuickReadCard
                title="My happiest day"
                content={dummyText}
                image={images.archway}
              />
              <QuickReadCard
                title="My happiest day"
                content={dummyText}
                image={images.archway}
              />
            </ScrollView>
          </View>

          {/* Inspirational Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              Quiet the mind,{'\n'}and the{'\n'}soul will speak.
            </Text>
          </View>

          {/* Bottom padding for scrolling past tab bar */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>

      {/* Story Modal */}
      <StoryModal
        visible={showStory}
        onClose={closeStory}
        storiesData={currentStory}
        initialIndex={0}
        onAllStoriesCompleted={handleAllStoriesCompleted}
        currentCategoryKey={currentCategoryKey}
        allCategories={sortedCategories}
        storyDataSource={storyData}
      />
    </SafeAreaView>
  );
};

// Story Styles
const storyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  progressContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    gap: 4,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1.5,
  },
  progressFill: {
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  shareButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  shareIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStory: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  mainText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 50,
    textAlign: 'left',
  },
  subText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    opacity: 0.9,
  },
  mediaStory: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContent: {
    backgroundColor: 'rgba(0,0,0,1)',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    flexDirection:"row"
  },
  bottombutton:{
width:"50%"
  },
  bottomtext:{
width:"50%",
alignContent:"center",
alignItems:"center",
alignSelf:"center",
verticalAlign:"middle"
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.9,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIconContainer: {
    width: 20,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArrow: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  categoriesContainer: {
    // marginTop: 20,
  },
  categoriesContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    width: 80,
  },
  categoriesView: {
    borderWidth: 2,
    borderColor: '#FFB6C1',
    borderRadius: 35,
    width: 74,
    height: 74,
  },
  storyBorder: {
    borderWidth: 3,
    borderColor: '#E75A94',
  },
  viewedStoryBorder: {
    borderWidth: 3,
    borderColor: '#CCCCCC',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Figtree-Regular',
    // marginTop: 5,
    color: '#333',
    fontWeight: '500',
  },
  categorySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  activitiesContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#FFF5F8',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  activityTitle: {
    fontSize: 12,
    fontFamily: 'Figtree-SemiBold',
    textAlign: 'center',
  },
  activitySubtitle: {
    fontSize: 11,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Figtree-SemiBold',
  },
  moodContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  moodTextContainer: {
    alignItems: 'center',
  },
  moodQuestion: {
    fontSize: 19,
    color: '#333',
    fontFamily: 'Figtree-Bold',
  },
  moodToday: {
    fontSize: 24,
    fontFamily: 'Figtree-Bold',
    color: '#E75A94',
    marginTop: 2,
    textAlign: 'center',
  },
  moodButton: {
    backgroundColor: '#D94982',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '70%',
  },
  moodButtonText: {
    color: '#FFF',
    fontFamily: 'Figtree-Bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  moodButtonPlus: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  programBannerContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  programBanner: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  programBannerImage: {
    borderRadius: 15,
  },
  programOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  programIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  programContent: {
    justifyContent: 'flex-end',
  },
  programTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Figtree-SemiBold',
    textAlign: 'right',
  },
  programSubtitle: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Figtree-Regular',
    textAlign: 'right',
  },
  programButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  programButtonText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Figtree-SemiBold',
  },
  programButtonArrow: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Figtree-Bold',
    marginBottom: 15,
  },
  progressContainer: {
    gap: 15,
  },
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  progressImage: {
    width: 80,
    height: 80,
  },
  progressContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between', // Better distribution of content
  },
  progressTitle: {
    fontSize: 14,
    fontFamily: 'Figtree-SemiBold',
    color: '#333',
  },
  progressDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
    lineHeight: 16,
    fontFamily: 'Figtree-Regular',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  progressMins: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEE',
    borderRadius: 2,
  },
  progressFill: {
    width: '70%',
    height: 4,
    backgroundColor: '#E75A94',
    borderRadius: 2,
  },
  readsContainer: {
    marginBottom: 10,
  },
  readsContent: {
    paddingRight: 20,
  },
  readCard: {
    width: 240,
    height: 340,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
  },
  readImage: {
    width: '100%',
    height: '100%',
  },
  readOverlay: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  readTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Figtree-Bold',
    marginBottom: 10,
  },
  readContent: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
    fontFamily: 'Figtree-Regular',
  },
  readMore: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Figtree-Bold',
  },
  quoteContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 28,
    color: '#FFB6C1',
    lineHeight: 38,
    fontFamily: 'Figtree-Bold',
  },
  bottomPadding: {
    height: 80,
  },
});

export default HomeScreen;