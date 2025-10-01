// src/screens/HomeScreens/YogaScreen.js
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const YogaScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [selectedPose, setSelectedPose] = useState(null);
  
  // Static categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'morning', name: 'Morning' },
    { id: 'bedtime', name: 'Bedtime' },
    { id: 'strength', name: 'Strength' },
    { id: 'flexibility', name: 'Flexibility' },
    { id: 'balance', name: 'Balance' },
  ];
  
  // Static difficulty levels
  const difficultyLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];
  
  // Static yoga sessions
  const yogaSessions = [
    {
      id: 1,
      title: 'Sunrise Flow',
      description: 'Start your day with energy and intention',
      duration: '15 min',
      category: 'morning',
      difficulty: 'beginner',
      instructor: 'Emily Chen',
      // image: require('../../../../assets/images/session/morningSession.jpg'),
      poses: 8,
    },
    {
      id: 2,
      title: 'Evening Unwind',
      description: 'Release tension and prepare for restful sleep',
      duration: '20 min',
      category: 'bedtime',
      difficulty: 'beginner',
      instructor: 'Michael Brooks',
      // image: require('../../../assets/images/session/bedtime_yoga.jpg'),
      poses: 6,
    },
    {
      id: 3,
      title: 'Power Vinyasa',
      description: 'Build strength through flowing sequences',
      duration: '30 min',
      category: 'strength',
      difficulty: 'intermediate',
      instructor: 'Sarah Johnson',
      // image: require('../../../assets/images/session/power_yoga.jpg'),
      poses: 15,
    },
    {
      id: 4,
      title: 'Deep Stretch',
      description: 'Improve flexibility and release muscle tension',
      duration: '25 min',
      category: 'flexibility',
      difficulty: 'beginner',
      instructor: 'David Kim',
      // image: require('../../../assets/images/session/stretch_yoga.jpg'),
      poses: 10,
    },
    {
      id: 5,
      title: 'Balance Practice',
      description: 'Enhance focus and stability through balancing poses',
      duration: '20 min',
      category: 'balance',
      difficulty: 'intermediate',
      instructor: 'Lisa Patel',
      // image: require('../../../assets/images/session/balance_yoga.jpg'),
      poses: 8,
    },
    {
      id: 6,
      title: 'Advanced Flow',
      description: 'Challenge yourself with complex sequences',
      duration: '45 min',
      category: 'strength',
      difficulty: 'advanced',
      instructor: 'Ryan Martinez',
      // image: require('../../../assets/images/session/advanced_yoga.jpg'),
      poses: 20,
    },
  ];
  
  // Static yoga poses
  const yogaPoses = [
    {
      id: 1,
      name: 'Downward-Facing Dog',
      sanskritName: 'Adho Mukha Svanasana',
      description: 'Creates length throughout the entire body, particularly in the back body, including the hamstrings, calves, and spine.',
      benefits: 'Strengthens arms and legs, stretches hamstrings, calves, and spine, relieves headaches, insomnia, and fatigue.',
      difficulty: 'beginner',
      categories: ['strength', 'flexibility'],
      // image: require('../../assets/images/downward_dog.png'),
    },
    {
      id: 2,
      name: 'Tree Pose',
      sanskritName: 'Vrksasana',
      description: 'Balance on one leg with the sole of the opposite foot pressed into the inner thigh and hands in prayer position.',
      benefits: 'Improves balance and focus, strengthens thighs, calves, and ankles, stretches the groins and inner thighs.',
      difficulty: 'beginner',
      categories: ['balance'],
      // image: require('../../assets/images/tree_pose.png'),
    },
    {
      id: 3,
      name: 'Child\'s Pose',
      sanskritName: 'Balasana',
      description: 'A restful pose where you kneel on the floor and drape your torso over your thighs with arms extended or alongside the body.',
      benefits: 'Gently stretches hips, thighs, and ankles, calms the mind, relieves back and neck pain.',
      difficulty: 'beginner',
      categories: ['flexibility', 'bedtime'],
      // image: require('../../assets/images/childs_pose.png'),
    },
    {
      id: 4,
      name: 'Warrior II',
      sanskritName: 'Virabhadrasana II',
      description: 'A standing pose with legs wide apart, one knee bent and arms extended parallel to the floor.',
      benefits: 'Strengthens legs, opens hips and chest, builds stamina and concentration.',
      difficulty: 'beginner',
      categories: ['strength', 'morning'],
      // image: require('../../assets/images/warrior_2.png'),
    },
    {
      id: 5,
      name: 'Crow Pose',
      sanskritName: 'Bakasana',
      description: 'An arm balance where you place your knees on your upper arms and lift your feet off the floor.',
      benefits: 'Strengthens arms and wrists, improves balance, tones abdominal organs.',
      difficulty: 'intermediate',
      categories: ['balance', 'strength'],
      // image: require('../../assets/images/crow_pose.png'),
    },
    {
      id: 6,
      name: 'Corpse Pose',
      sanskritName: 'Savasana',
      description: 'Lie flat on your back with arms at your sides, palms facing up, and legs relaxed.',
      benefits: 'Relaxes the body, calms the mind, reduces blood pressure and anxiety.',
      difficulty: 'beginner',
      categories: ['bedtime'],
      // image: require('../../assets/images/corpse_pose.png'),
    },
  ];
  
  // Filter yoga sessions based on selected category and difficulty
  const filteredSessions = yogaSessions.filter(session => {
    const categoryMatch = activeCategory === 'all' || session.category === activeCategory;
    const difficultyMatch = activeDifficulty === 'all' || session.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });
  
  // Filter yoga poses based on selected category and difficulty
  const filteredPoses = yogaPoses.filter(pose => {
    const categoryMatch = activeCategory === 'all' || pose.categories.includes(activeCategory);
    const difficultyMatch = activeDifficulty === 'all' || pose.difficulty === activeDifficulty;
    return categoryMatch && difficultyMatch;
  });
  
  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        activeCategory === item.id && styles.activeFilterItem,
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Text
        style={[
          styles.filterText,
          activeCategory === item.id && styles.activeFilterText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  // Render difficulty item
  const renderDifficultyItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        activeDifficulty === item.id && styles.activeFilterItem,
      ]}
      onPress={() => setActiveDifficulty(item.id)}
    >
      <Text
        style={[
          styles.filterText,
          activeDifficulty === item.id && styles.activeFilterText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  // Render yoga session item
  const renderSessionItem = ({ item }) => (
    <TouchableOpacity style={styles.sessionCard}>
      {/* <Image source={item.image} style={styles.sessionImage} /> */}
      <View style={styles.sessionContent}>
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionTitle}>{item.title}</Text>
          <View style={styles.sessionMeta}>
            <Icon name="clock-outline" size={14} color="#757575" />
            <Text style={styles.sessionDuration}>{item.duration}</Text>
          </View>
        </View>
        
        <Text style={styles.sessionDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.sessionFooter}>
          <Text style={styles.instructorName}>With {item.instructor}</Text>
          
          <View style={styles.sessionStats}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>
                {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
              </Text>
            </View>
            
            <View style={styles.posesContainer}>
              <Icon name="yoga" size={14} color="#757575" />
              <Text style={styles.posesText}>{item.poses} poses</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render yoga pose item
  const renderPoseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.poseCard}
      onPress={() => setSelectedPose(item)}
    >
      {/* <Image source={item.image} style={styles.poseImage} /> */}
      <View style={styles.poseInfo}>
        <Text style={styles.poseName}>{item.name}</Text>
        <Text style={styles.poseSanskritName}>{item.sanskritName}</Text>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </Text>
        </View>
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
          <Text style={styles.headerTitle}>Practice Yoga</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        {selectedPose ? (
          // Pose detail view
          <ScrollView style={styles.poseDetailContainer}>
            <Image source={selectedPose.image} style={styles.poseDetailImage} />
            
            <View style={styles.poseDetailContent}>
              <View style={styles.poseDetailHeader}>
                <View>
                  <Text style={styles.poseDetailName}>{selectedPose.name}</Text>
                  <Text style={styles.poseDetailSanskrit}>{selectedPose.sanskritName}</Text>
                </View>
                
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>
                    {selectedPose.difficulty.charAt(0).toUpperCase() + selectedPose.difficulty.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.poseDetailSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.sectionText}>{selectedPose.description}</Text>
              </View>
              
              <View style={styles.poseDetailSection}>
                <Text style={styles.sectionTitle}>Benefits</Text>
                <Text style={styles.sectionText}>{selectedPose.benefits}</Text>
              </View>
              
              <View style={styles.poseDetailSection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoriesContainer}>
                  {selectedPose.categories.map((category, index) => (
                    <View key={index} style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.backToListButton}
                onPress={() => setSelectedPose(null)}
              >
                <Text style={styles.backToListText}>Back to List</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <>
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, styles.activeTab]}
                onPress={() => {}}
              >
                <Text style={styles.activeTabText}>Yoga</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.navigate('Courses')}
              >
                <Text style={styles.tabText}>Courses</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
              {/* Filters */}
              <View style={styles.filtersContainer}>
                <Text style={styles.filterLabel}>Category:</Text>
                <FlatList
                  data={categories}
                  renderItem={renderCategoryItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              
              <View style={styles.filtersContainer}>
                <Text style={styles.filterLabel}>Difficulty:</Text>
                <FlatList
                  data={difficultyLevels}
                  renderItem={renderDifficultyItem}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              
              {/* Yoga Sessions */}
              <View style={styles.sessionsContainer}>
                <Text style={styles.sectionTitle}>Guided Sessions</Text>
                
                {filteredSessions.length > 0 ? (
                  filteredSessions.map(session => (
                    <View key={session.id}>
                      {renderSessionItem({ item: session })}
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No sessions match your filters</Text>
                )}
              </View>
              
              {/* Yoga Poses */}
              <View style={styles.posesContainer}>
                <Text style={styles.sectionTitle}>Yoga Poses</Text>
                
                {filteredPoses.length > 0 ? (
                  <View style={styles.posesGrid}>
                    {filteredPoses.map(pose => (
                      <View key={pose.id} style={styles.poseItemContainer}>
                        {renderPoseItem({ item: pose })}
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No poses match your filters</Text>
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
  filtersContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  activeFilterItem: {
    backgroundColor: '#5C6BC0',
  },
  filterText: {
    fontSize: 14,
    color: '#424242',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sessionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  sessionCard: {
    flexDirection: 'row',
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
  sessionImage: {
    width: 100,
    height: 100,
  },
  sessionContent: {
    flex: 1,
    padding: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDuration: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructorName: {
    fontSize: 12,
    color: '#757575',
  },
  sessionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: '#5C6BC0',
  },
  posesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
  },
  posesText: {
    fontSize: 10,
    color: '#757575',
    marginLeft: 4,
  },
  posesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poseItemContainer: {
    width: '48%',
    marginBottom: 16,
  },
  poseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  poseImage: {
    width: '100%',
    height: 120,
  },
  poseInfo: {
    padding: 12,
  },
  poseName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  poseSanskritName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#424242',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 24,
  },
  poseDetailContainer: {
    flex: 1,
  },
  poseDetailImage: {
    width: '100%',
    height: 250,
  },
  poseDetailContent: {
    padding: 16,
  },
  poseDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  poseDetailName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  poseDetailSanskrit: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#424242',
  },
  poseDetailSection: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryBadge: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#5C6BC0',
  },
  backToListButton: {
    backgroundColor: '#5C6BC0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  backToListText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default YogaScreen;