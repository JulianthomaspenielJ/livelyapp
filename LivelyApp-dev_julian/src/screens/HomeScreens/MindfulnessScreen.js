// src/screens/HomeScreens/MindfulnessScreen.js
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

const MindfulnessScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Static categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'focus', name: 'Focus' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'sleep', name: 'Sleep' },
  ];
  
  // Static mindfulness activities
  const mindfulnessActivities = [
    {
      id: 1,
      title: 'Body Scan',
      description: 'Bring awareness to each part of your body, noticing sensations without judgment.',
      duration: '10 min',
      level: 'Beginner',
      category: 'beginner',
      image: require('../../../assets/images/bodyscan.jpg'),
      progress: 0,
    },
    {
      id: 2,
      title: 'Mindful Listening',
      description: 'Focus fully on sounds around you, observing without labeling or judgment.',
      duration: '5 min',
      level: 'Beginner',
      category: 'beginner',
      image: require('../../../assets/images/listening.jpg'),
      progress: 0,
    },
    {
      id: 3,
      title: 'Thought Observation',
      description: 'Watch thoughts arise and pass without getting caught up in them.',
      duration: '15 min',
      level: 'Intermediate',
      category: 'focus',
      image: require('../../../assets/images/thoughts.jpg'),
      progress: 30,
    },
    {
      id: 4,
      title: 'Anxiety Relief',
      description: 'Practice grounding techniques to manage anxious feelings.',
      duration: '8 min',
      level: 'All Levels',
      category: 'anxiety',
      image: require('../../../assets/images/anxiety.jpg'),
      progress: 75,
    },
    {
      id: 5,
      title: 'Sleep Preparation',
      description: 'Calm your mind and prepare your body for restful sleep.',
      duration: '20 min',
      level: 'All Levels',
      category: 'sleep',
      image: require('../../../assets/images/sleep.jpg'),
      progress: 0,
    },
    {
      id: 6,
      title: '5-4-3-2-1 Technique',
      description: 'Use your senses to ground yourself in the present moment.',
      duration: '5 min',
      level: 'Beginner',
      category: 'anxiety',
      image: require('../../../assets/images/grounding.jpg'),
      progress: 50,
    },
    {
      id: 7,
      title: 'Work Focus',
      description: 'Improve concentration and productivity through mindful awareness.',
      duration: '12 min',
      level: 'Intermediate',
      category: 'focus',
      image: require('../../../assets/images/work.jpg'),
      progress: 0,
    },
  ];
  
  // Filter activities based on selected category
  const filteredActivities = activeCategory === 'all' 
    ? mindfulnessActivities 
    : mindfulnessActivities.filter(activity => activity.category === activeCategory);
  
  // Featured activities (first 3 for simplicity)
  const featuredActivities = mindfulnessActivities.slice(0, 3);
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.id && styles.activeCategoryItem,
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  const renderActivityItem = ({ item }) => (
    <TouchableOpacity style={styles.activityCard}>
      <Image source={item.image} style={styles.activityImage} />
      
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <View style={styles.activityMeta}>
            <Icon name="clock-outline" size={14} color="#757575" />
            <Text style={styles.activityDuration}>{item.duration}</Text>
          </View>
        </View>
        
        <Text style={styles.activityDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.activityFooter}>
          <Text style={styles.activityLevel}>{item.level}</Text>
          
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
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <Image source={item.image} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <View style={styles.featuredMeta}>
          <Icon name="clock-outline" size={14} color="#FFFFFF" />
          <Text style={styles.featuredDuration}>{item.duration}</Text>
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
          <Text style={styles.headerTitle}>Mindfulness Activities</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Featured Section */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Activities</Text>
            <FlatList
              data={featuredActivities}
              renderItem={renderFeaturedItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          
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
          
          {/* Activities List */}
          <View style={styles.activitiesContainer}>
            <Text style={styles.sectionTitle}>
              {activeCategory === 'all' ? 'All Activities' : `${categories.find(cat => cat.id === activeCategory).name} Activities`}
            </Text>
            
            {filteredActivities.map(activity => (
              <View key={activity.id}>
                {renderActivityItem({ item: activity })}
              </View>
            ))}
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  featuredCard: {
    width: 280,
    height: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredDuration: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  categoriesContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryItem: {
    backgroundColor: '#5C6BC0',
  },
  categoryText: {
    fontSize: 14,
    color: '#424242',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activitiesContainer: {
    padding: 16,
  },
  activityCard: {
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
  activityImage: {
    width: 100,
    height: '100%',
  },
  activityContent: {
    flex: 1,
    padding: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  activityDuration: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 10,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityLevel: {
    fontSize: 12,
    color: '#5C6BC0',
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 6,
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
});

export default MindfulnessScreen;