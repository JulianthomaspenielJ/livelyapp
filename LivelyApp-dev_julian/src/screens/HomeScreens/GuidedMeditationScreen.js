// src/screens/HomeScreens/GuidedMeditationScreen.js
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

const GuidedMeditationScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('explore');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMeditation, setCurrentMeditation] = useState(null);
  
  // Static categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'focus', name: 'Focus' },
    { id: 'gratitude', name: 'Gratitude' },
  ];
  
  // Static durations for filtering
  const durations = [
    { id: 'all', name: 'Any Length' },
    { id: 'short', name: '5-10 min' },
    { id: 'medium', name: '15-20 min' },
    { id: 'long', name: '30+ min' },
  ];
  
  // // Static meditation guides/narrators
  // const guides = [
  //   { id: 1, name: 'Sarah Johnson', image: require('../../assets/images/guide1.png') },
  //   { id: 2, name: 'Michael Chen', image: require('../../assets/images/guide2.png') },
  //   { id: 3, name: 'Aisha Patel', image: require('../../assets/images/guide3.png') },
  // ];
    // Static meditation guides/narrators
    const guides = [
      { id: 1, name: 'Sarah Johnson' },
      { id: 2, name: 'Michael Chen' },
      { id: 3, name: 'Aisha Patel'},
    ];
  // Static meditation sessions
  const meditations = [
    {
      id: 1,
      title: 'Mindful Morning',
      guide: 'Sarah Johnson',
      duration: '10 min',
      category: 'beginner',
      durationCategory: 'short',
      // image: require('../../assets/images/morning_meditation.png'),
      plays: 12540,
      isFavorite: true,
    },
    {
      id: 2,
      title: 'Deep Sleep Journey',
      guide: 'Michael Chen',
      duration: '30 min',
      category: 'sleep',
      durationCategory: 'long',
      // image: require('../../assets/images/sleep_meditation.png'),
      plays: 45280,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Anxiety Relief',
      guide: 'Aisha Patel',
      duration: '15 min',
      category: 'anxiety',
      durationCategory: 'medium',
      // image: require('../../assets/images/anxiety_meditation.png'),
      plays: 32150,
      isFavorite: true,
    },
    {
      id: 4,
      title: 'Focused Attention',
      guide: 'Michael Chen',
      duration: '20 min',
      category: 'focus',
      durationCategory: 'medium',
      // image: require('../../assets/images/focus_meditation.png'),
      plays: 18340,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Gratitude Practice',
      guide: 'Sarah Johnson',
      duration: '10 min',
      category: 'gratitude',
      durationCategory: 'short',
      // image: require('../../assets/images/gratitude_meditation.png'),
      plays: 29870,
      isFavorite: true,
    },
    {
      id: 6,
      title: 'Beginner\'s Guide',
      guide: 'Aisha Patel',
      duration: '8 min',
      category: 'beginner',
      durationCategory: 'short',
      // image: require('../../assets/images/beginner_meditation.png'),
      plays: 54320,
      isFavorite: false,
    },
    {
      id: 7,
      title: 'Deep Relaxation',
      guide: 'Michael Chen',
      duration: '25 min',
      category: 'sleep',
      durationCategory: 'medium',
      // image: require('../../assets/images/relaxation_meditation.png'),
      plays: 38760,
      isFavorite: false,
    },
  ];
  
  // Static favorites (for the Favorites tab)
  const favorites = meditations.filter(item => item.isFavorite);
  
  // Filter meditations based on selected category
  const filteredMeditations = activeCategory === 'all' 
    ? meditations 
    : meditations.filter(item => item.category === activeCategory);
  
  // Featured meditations (top 3 by play count)
  const featuredMeditations = [...meditations].sort((a, b) => b.plays - a.plays).slice(0, 3);
  
  const handlePlayPause = (meditation) => {
    if (currentMeditation && currentMeditation.id === meditation.id) {
      // Toggle play/pause for current meditation
      setIsPlaying(!isPlaying);
    } else {
      // Start playing a new meditation
      setCurrentMeditation(meditation);
      setIsPlaying(true);
    }
  };
  
  const handleToggleFavorite = (meditationId) => {
    // In a real app, we would update the state here
    alert(`Toggle favorite for meditation ${meditationId}`);
  };
  
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
  
  const renderGuideItem = ({ item }) => (
    <TouchableOpacity style={styles.guideItem}>
      {/* <Image source={item.image} style={styles.guideImage} /> */}
      <Text style={styles.guideName}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const renderMeditationItem = ({ item }) => (
    <TouchableOpacity style={styles.meditationCard}>
      <Image source={item.image} style={styles.meditationImage} />
      
      <View style={styles.meditationContent}>
        <View style={styles.meditationHeader}>
          <Text style={styles.meditationTitle}>{item.title}</Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite(item.id)}
          >
            <Icon 
              name={item.isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={item.isFavorite ? "#EF5350" : "#9E9E9E"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.meditationMeta}>
          <Text style={styles.meditationGuide}>{item.guide}</Text>
          <View style={styles.durationContainer}>
            <Icon name="clock-outline" size={14} color="#757575" />
            <Text style={styles.meditationDuration}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.meditationFooter}>
          <View style={styles.playsContainer}>
            <Icon name="headphones" size={14} color="#757575" />
            <Text style={styles.playsText}>
              {item.plays > 1000 ? `${(item.plays / 1000).toFixed(1)}k` : item.plays}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => handlePlayPause(item)}
          >
            <Icon 
              name={(currentMeditation && currentMeditation.id === item.id && isPlaying) ? "pause" : "play"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.featuredCard}
      onPress={() => handlePlayPause(item)}
    >
      {/* <Image source={item.image} style={styles.featuredImage} /> */}
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.featuredGuide}>{item.guide}</Text>
          <View style={styles.featuredMeta}>
            <Icon name="clock-outline" size={14} color="#FFFFFF" />
            <Text style={styles.featuredDuration}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.featuredPlayButton}>
          <Icon 
            name={(currentMeditation && currentMeditation.id === item.id && isPlaying) ? "pause" : "play"} 
            size={30} 
            color="#FFFFFF" 
          />
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
          <Text style={styles.headerTitle}>Guided Meditation</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#212121" />
          </TouchableOpacity>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'explore' && styles.activeTab]}
            onPress={() => setActiveTab('explore')}
          >
            <Text style={[styles.tabText, activeTab === 'explore' && styles.activeTabText]}>
              Explore
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => setActiveTab('favorites')}
          >
            <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
              Favorites
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {activeTab === 'explore' ? (
            <>
              {/* Featured Section */}
              <View style={styles.featuredSection}>
                <Text style={styles.sectionTitle}>Featured Meditations</Text>
                <FlatList
                  data={featuredMeditations}
                  renderItem={renderFeaturedItem}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              
              {/* Popular Guides */}
              <View style={styles.guidesSection}>
                <Text style={styles.sectionTitle}>Meditation Guides</Text>
                <FlatList
                  data={guides}
                  renderItem={renderGuideItem}
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
              
              {/* Meditations List */}
              <View style={styles.meditationsContainer}>
                <Text style={styles.sectionTitle}>
                  {activeCategory === 'all' ? 'All Meditations' : `${categories.find(cat => cat.id === activeCategory).name} Meditations`}
                </Text>
                
                {filteredMeditations.map(meditation => (
                  <View key={meditation.id}>
                    {renderMeditationItem({ item: meditation })}
                  </View>
                ))}
              </View>
            </>
          ) : activeTab === 'favorites' ? (
            <View style={styles.favoritesContainer}>
              <Text style={styles.sectionTitle}>Your Favorites</Text>
              
              {favorites.length > 0 ? (
                favorites.map(favorite => (
                  <View key={favorite.id}>
                    {renderMeditationItem({ item: favorite })}
                  </View>
                ))
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Icon name="heart-outline" size={60} color="#E0E0E0" />
                  <Text style={styles.emptyStateText}>No favorites yet</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Add meditations to your favorites for easy access
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.historyContainer}>
              <Text style={styles.sectionTitle}>Recently Played</Text>
              
              <View style={styles.emptyStateContainer}>
                <Icon name="history" size={60} color="#E0E0E0" />
                <Text style={styles.emptyStateText}>No history yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Your recently played meditations will appear here
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        
        {/* Meditation Player Bar (shown when a meditation is selected) */}
        {currentMeditation && (
          <View style={styles.playerBar}>
            <Image source={currentMeditation.image} style={styles.playerImage} />
            
            <View style={styles.playerInfo}>
              <Text style={styles.playerTitle} numberOfLines={1}>
                {currentMeditation.title}
              </Text>
              <Text style={styles.playerGuide} numberOfLines={1}>
                {currentMeditation.guide}
              </Text>
            </View>
            
            <View style={styles.playerControls}>
              <TouchableOpacity style={styles.playerButton}>
                <Icon name="rewind-10" size={24} color="#424242" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playPauseButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Icon 
                  name={isPlaying ? "pause" : "play"} 
                  size={28} 
                  color="#FFFFFF" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playerButton}>
                <Icon name="fast-forward-10" size={24} color="#424242" />
              </TouchableOpacity>
            </View>
          </View>
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
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredGuide: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 6,
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
  featuredPlayButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(92, 107, 192, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guidesSection: {
    padding: 16,
    paddingTop: 0,
  },
  guideItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  guideImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  guideName: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
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
  meditationsContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding for player bar
  },
  meditationCard: {
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
  meditationImage: {
    width: 100,
    height: 100,
  },
  meditationContent: {
    flex: 1,
    padding: 12,
  },
  meditationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  meditationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  meditationGuide: {
    fontSize: 14,
    color: '#757575',
    marginRight: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meditationDuration: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  meditationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playsText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5C6BC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  historyContainer: {
    padding: 16,
    paddingBottom: 80,
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
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  playerImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  playerGuide: {
    fontSize: 12,
    color: '#757575',
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerButton: {
    padding: 8,
  },
  playPauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C6BC0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default GuidedMeditationScreen;