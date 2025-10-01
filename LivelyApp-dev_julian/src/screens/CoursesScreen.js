// src/screens/CoursesScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  // ProgressBarAndroid,
  // Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Use ProgressViewIOS for iOS devices
// const ProgressBar = Platform.select({
//   ios: () => require('@react-native-community/progress-view').default,
//   android: () => ProgressBarAndroid,
// })();

const CoursesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('featured');
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Static categories for filtering
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'stress', name: 'Stress' },
  ];
  
  // Static courses data
  const courses = [
    {
      id: 1,
      title: '7 Days of Mindfulness',
      instructor: 'Sarah Johnson',
      description: 'A week-long introduction to mindfulness practices for beginners.',
      fullDescription: 'This 7-day program introduces the fundamentals of mindfulness meditation. Each day focuses on a different aspect of mindfulness practice, from breath awareness to body scanning and mindful movement. Perfect for beginners or those looking to refresh their practice.',
      duration: '7 days',
      lessons: 7,
      totalMinutes: 85,
      category: 'mindfulness',
      level: 'Beginner',
      // image: require('../../assets/images/mindfulness_course.png'),
      rating: 4.8,
      reviews: 1245,
      progress: 0,
      modules: [
        { id: 1, title: 'Introduction to Mindfulness', duration: '10 min', isCompleted: false },
        { id: 2, title: 'Breath Awareness', duration: '12 min', isCompleted: false },
        { id: 3, title: 'Body Scan Meditation', duration: '15 min', isCompleted: false },
        { id: 4, title: 'Mindful Listening', duration: '10 min', isCompleted: false },
        { id: 5, title: 'Mindful Movement', duration: '15 min', isCompleted: false },
        { id: 6, title: 'Loving-Kindness Practice', duration: '13 min', isCompleted: false },
        { id: 7, title: 'Integrating Mindfulness', duration: '10 min', isCompleted: false },
      ],
    },
    {
      id: 2,
      title: 'Sleep Better Program',
      instructor: 'Michael Chen',
      description: 'Improve your sleep quality with techniques for relaxation and better sleep habits.',
      fullDescription: 'This comprehensive program addresses common sleep issues and provides practical techniques to improve sleep quality. Learn about sleep hygiene, relaxation methods, and guided meditations specifically designed to help you fall asleep faster and enjoy more restful sleep.',
      duration: '14 days',
      lessons: 14,
      totalMinutes: 210,
      category: 'sleep',
      level: 'All Levels',
      // image: require('../../assets/images/sleep_course.png'),
      rating: 4.9,
      reviews: 2100,
      progress: 35,
      modules: [
        { id: 1, title: 'Understanding Sleep', duration: '15 min', isCompleted: true },
        { id: 2, title: 'Creating a Sleep Sanctuary', duration: '12 min', isCompleted: true },
        { id: 3, title: 'Evening Wind-Down Routine', duration: '18 min', isCompleted: true },
        { id: 4, title: 'Progressive Muscle Relaxation', duration: '15 min', isCompleted: true },
        { id: 5, title: 'Breath Work for Sleep', duration: '10 min', isCompleted: true },
        { id: 6, title: 'Body Scan for Sleep', duration: '20 min', isCompleted: false },
        { id: 7, title: 'Guided Sleep Meditation 1', duration: '25 min', isCompleted: false },
        { id: 8, title: 'Managing Sleep Anxiety', duration: '15 min', isCompleted: false },
        { id: 9, title: 'Daytime Habits for Better Sleep', duration: '12 min', isCompleted: false },
        { id: 10, title: 'Guided Sleep Meditation 2', duration: '20 min', isCompleted: false },
        { id: 11, title: 'Dealing with Insomnia', duration: '15 min', isCompleted: false },
        { id: 12, title: 'Mindful Eating for Better Sleep', duration: '12 min', isCompleted: false },
        { id: 13, title: 'Guided Sleep Meditation 3', duration: '25 min', isCompleted: false },
        { id: 14, title: 'Maintaining Healthy Sleep Habits', duration: '15 min', isCompleted: false },
      ],
    },
    {
      id: 3,
      title: 'Anxiety Relief Toolkit',
      instructor: 'Aisha Patel',
      description: 'Learn practical techniques to manage anxiety and promote calm.',
      fullDescription: 'This course provides a comprehensive toolkit for managing anxiety in daily life. You\'ll learn evidence-based techniques drawn from mindfulness, cognitive behavioral therapy, and somatic practices to reduce anxiety symptoms and build resilience to stress.',
      duration: '10 days',
      lessons: 10,
      totalMinutes: 150,
      category: 'anxiety',
      level: 'Intermediate',
      // image: require('../../assets/images/anxiety_course.png'),
      rating: 4.7,
      reviews: 980,
      progress: 70,
      modules: [
        { id: 1, title: 'Understanding Anxiety', duration: '15 min', isCompleted: true },
        { id: 2, title: 'Breath Techniques for Anxiety', duration: '12 min', isCompleted: true },
        { id: 3, title: 'Grounding Practices', duration: '15 min', isCompleted: true },
        { id: 4, title: 'Progressive Relaxation', duration: '18 min', isCompleted: true },
        { id: 5, title: 'Thought Awareness', duration: '15 min', isCompleted: true },
        { id: 6, title: 'Cognitive Reframing', duration: '20 min', isCompleted: true },
        { id: 7, title: 'Working with Worry', duration: '15 min', isCompleted: true },
        { id: 8, title: 'Somatic Release Techniques', duration: '18 min', isCompleted: false },
        { id: 9, title: 'Guided Visualization', duration: '12 min', isCompleted: false },
        { id: 10, title: 'Creating an Anxiety Management Plan', duration: '10 min', isCompleted: false },
      ],
    },
    {
      id: 4,
      title: 'Advanced Meditation',
      instructor: 'David Kim',
      description: 'Deepen your meditation practice with advanced techniques and longer sessions.',
      fullDescription: 'This advanced course is designed for experienced meditators looking to deepen their practice. Explore subtle aspects of awareness, longer meditation periods, and advanced concentration techniques to take your practice to the next level.',
      duration: '21 days',
      lessons: 12,
      totalMinutes: 300,
      category: 'meditation',
      level: 'Advanced',
      // image: require('../../assets/images/advanced_meditation_course.png'),
      rating: 4.9,
      reviews: 560,
      progress: 0,
      modules: [
        { id: 1, title: 'The Subtleties of Awareness', duration: '25 min', isCompleted: false },
        { id: 2, title: 'Working with Difficult Emotions', duration: '30 min', isCompleted: false },
        { id: 3, title: 'Open Awareness Practice', duration: '25 min', isCompleted: false },
        { id: 4, title: 'Advanced Concentration Techniques', duration: '30 min', isCompleted: false },
        { id: 5, title: 'Extending Your Meditation Time', duration: '40 min', isCompleted: false },
        { id: 6, title: 'The Observer Perspective', duration: '20 min', isCompleted: false },
        { id: 7, title: 'Working with Energy', duration: '25 min', isCompleted: false },
        { id: 8, title: 'Non-Dual Awareness', duration: '30 min', isCompleted: false },
        { id: 9, title: 'Self-Inquiry Meditation', duration: '25 min', isCompleted: false },
        { id: 10, title: 'Insight Practice', duration: '25 min', isCompleted: false },
        { id: 11, title: 'Compassion Meditation', duration: '20 min', isCompleted: false },
        { id: 12, title: 'Integrating Practice into Life', duration: '25 min', isCompleted: false },
      ],
    },
    {
      id: 5,
      title: 'Stress Management Essentials',
      instructor: 'Lisa Martinez',
      description: 'Essential tools and practices to manage stress in your daily life.',
      fullDescription: 'This practical course provides essential tools for managing stress in everyday life. You\'ll learn to identify stress triggers, understand your personal stress response, and develop a personalized toolkit of practices to reduce and prevent stress.',
      duration: '14 days',
      lessons: 8,
      totalMinutes: 120,
      category: 'stress',
      level: 'Beginner',
      // image: require('../../assets/images/stress_course.png'),
      rating: 4.6,
      reviews: 1050,
      progress: 25,
      modules: [
        { id: 1, title: 'Understanding Your Stress Response', duration: '15 min', isCompleted: true },
        { id: 2, title: 'Identifying Stress Triggers', duration: '12 min', isCompleted: true },
        { id: 3, title: 'Quick Relaxation Techniques', duration: '15 min', isCompleted: false },
        { id: 4, title: 'Mindful Breathing for Stress', duration: '18 min', isCompleted: false },
        { id: 5, title: 'Physical Exercise and Stress', duration: '15 min', isCompleted: false },
        { id: 6, title: 'Time Management Skills', duration: '15 min', isCompleted: false },
        { id: 7, title: 'Setting Boundaries', duration: '15 min', isCompleted: false },
        { id: 8, title: 'Creating a Stress Management Plan', duration: '15 min', isCompleted: false },
      ],
    },
  ];
  
  // Get my courses (ones with progress)
  const myCourses = courses.filter(course => course.progress > 0);
  
  // Filter courses based on active tab
  const getDisplayedCourses = () => {
    switch (activeTab) {
      case 'my':
        return myCourses;
      case 'featured':
      default:
        return courses;
    }
  };
  
  // Calculate completion percentage for a course
  const getCompletionPercentage = (course) => {
    const completedModules = course.modules.filter(module => module.isCompleted).length;
    return (completedModules / course.modules.length) * 100;
  };
  
  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  // Render course item
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.courseCard}
      onPress={() => setSelectedCourse(item)}
    >
      {/* <Image source={item.image} style={styles.courseImage} /> */}
      
      {item.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${item.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>
      )}
      
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>By {item.instructor}</Text>
        
        <Text style={styles.courseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.courseFooter}>
          <View style={styles.courseMetaContainer}>
            <View style={styles.courseMeta}>
              <Icon name="book-open-variant" size={14} color="#757575" />
              <Text style={styles.courseMetaText}>{item.lessons} lessons</Text>
            </View>
            
            <View style={styles.courseMeta}>
              <Icon name="clock-outline" size={14} color="#757575" />
              <Text style={styles.courseMetaText}>{item.totalMinutes} min</Text>
            </View>
          </View>
          
          <View style={styles.courseRating}>
            <Icon name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render module item for course detail
  const renderModuleItem = ({ item }) => (
    <TouchableOpacity style={styles.moduleItem}>
      <View style={styles.moduleContent}>
        <View style={styles.moduleTitleContainer}>
          <Icon 
            name={item.isCompleted ? "check-circle" : "circle-outline"} 
            size={20} 
            color={item.isCompleted ? "#4CAF50" : "#BDBDBD"} 
            style={styles.moduleIcon}
          />
          <Text style={styles.moduleTitle}>{item.title}</Text>
        </View>
        <Text style={styles.moduleDuration}>{item.duration}</Text>
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
          <Text style={styles.headerTitle}>Courses</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        {selectedCourse ? (
          // Course Detail View
          <ScrollView style={styles.courseDetailContainer}>
            <Image source={selectedCourse.image} style={styles.courseDetailImage} />
            
            {selectedCourse.progress > 0 && (
              <View style={styles.detailProgressContainer}>
                <View style={styles.detailProgressBar}>
                  <View 
                    style={[
                      styles.detailProgressFill, 
                      { width: `${selectedCourse.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.detailProgressText}>{selectedCourse.progress}% Complete</Text>
              </View>
            )}
            
            <View style={styles.courseDetailContent}>
              <Text style={styles.courseDetailTitle}>{selectedCourse.title}</Text>
              <Text style={styles.courseDetailInstructor}>By {selectedCourse.instructor}</Text>
              
              <View style={styles.courseDetailMeta}>
                <View style={styles.metaItem}>
                  <Icon name="clock-outline" size={16} color="#757575" />
                  <Text style={styles.metaText}>{selectedCourse.duration}</Text>
                </View>
                
                <View style={styles.metaItem}>
                  <Icon name="book-open-variant" size={16} color="#757575" />
                  <Text style={styles.metaText}>{selectedCourse.lessons} lessons</Text>
                </View>
                
                <View style={styles.metaItem}>
                  <Icon name="account-group" size={16} color="#757575" />
                  <Text style={styles.metaText}>{selectedCourse.reviews} reviews</Text>
                </View>
                
                <View style={styles.ratingItem}>
                  <Icon name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingValue}>{selectedCourse.rating}</Text>
                </View>
              </View>
              
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{selectedCourse.level}</Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>About This Course</Text>
                <Text style={styles.sectionText}>{selectedCourse.fullDescription}</Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Course Content</Text>
                
                <FlatList
                  data={selectedCourse.modules}
                  renderItem={renderModuleItem}
                  keyExtractor={item => item.id.toString()}
                  scrollEnabled={false}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => {
                  // In a real app, this would navigate to the course content
                  alert('This would start or continue the course');
                }}
              >
                <Text style={styles.continueButtonText}>
                  {selectedCourse.progress > 0 ? 'Continue Course' : 'Start Course'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backToListButton}
                onPress={() => setSelectedCourse(null)}
              >
                <Text style={styles.backToListText}>Back to Courses</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <>
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'featured' && styles.activeTab]}
                onPress={() => setActiveTab('featured')}
              >
                <Text style={[styles.tabText, activeTab === 'featured' && styles.activeTabText]}>
                  Featured
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tab, activeTab === 'my' && styles.activeTab]}
                onPress={() => setActiveTab('my')}
              >
                <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
                  My Courses
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
              {/* Categories */}
              <View style={styles.categoriesContainer}>
                <FlatList
                  data={categories}
                  renderItem={renderCategoryItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              
              {/* Course List */}
              <View style={styles.coursesContainer}>
                {getDisplayedCourses().length > 0 ? (
                  getDisplayedCourses().map(course => (
                    <View key={course.id}>
                      {renderCourseItem({ item: course })}
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyStateContainer}>
                    <Icon name="book-open-variant" size={60} color="#E0E0E0" />
                    <Text style={styles.emptyStateText}>No courses yet</Text>
                    <Text style={styles.emptyStateSubtext}>
                      Explore our featured courses to get started
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </>
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
  searchButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5C6BC0',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    color: '#5C6BC0',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  categoryText: {
    fontSize: 14,
    color: '#424242',
  },
  coursesContainer: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  courseImage: {
    width: '100%',
    height: 160,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5C6BC0',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#757575',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 20,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseMetaContainer: {
    flexDirection: 'row',
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  courseMetaText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#757575',
    marginLeft: 4,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  courseDetailContainer: {
    flex: 1,
  },
  courseDetailImage: {
    width: '100%',
    height: 200,
  },
  detailProgressContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  detailProgressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
  },
  detailProgressFill: {
    height: '100%',
    backgroundColor: '#5C6BC0',
    borderRadius: 3,
  },
  detailProgressText: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '600',
  },
  courseDetailContent: {
    padding: 16,
  },
  courseDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  courseDetailInstructor: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  courseDetailMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 6,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
    marginLeft: 6,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  levelText: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  moduleItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  moduleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moduleIcon: {
    marginRight: 12,
  },
  moduleTitle: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
  },
  moduleDuration: {
    fontSize: 12,
    color: '#757575',
  },
  continueButton: {
    backgroundColor: '#5C6BC0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backToListButton: {
    borderWidth: 1,
    borderColor: '#5C6BC0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  backToListText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5C6BC0',
  },
});

export default CoursesScreen;