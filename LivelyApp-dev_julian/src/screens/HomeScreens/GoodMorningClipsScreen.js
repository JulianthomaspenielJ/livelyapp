// src/screens/HomeScreens/GoodMorningClipsScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const GoodMorningClipsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('today');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentClip, setCurrentClip] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  
  // Static clips data
  const todayClip = {
    id: 1,
    title: 'Embrace the Day',
    date: 'April 25, 2025',
    duration: '3:45',
    // thumbnail: require('../../assets/images/today_clip.png'),
    instructor: 'Sarah Johnson',
    description: 'Start your day with gratitude and intention. This morning clip guides you through a short mindfulness practice to set a positive tone for the day ahead.',
    tags: ['Gratitude', 'Motivation', 'Mindfulness'],
    views: 12540,
    isFavorite: false,
  };
  
  // Static archive clips
  const archiveClips = [
    {
      id: 2,
      title: 'Energy Boost',
      date: 'April 24, 2025',
      duration: '4:20',
      // thumbnail: require('../../assets/images/energy_clip.png'),
      instructor: 'Michael Chen',
      description: 'Energize your morning with this uplifting practice. Focus on breathwork and gentle movement to awaken your body and mind.',
      tags: ['Energy', 'Breathwork', 'Movement'],
      views: 9870,
      isFavorite: true,
    },
    {
      id: 3,
      title: 'Calm Clarity',
      date: 'April 23, 2025',
      duration: '3:10',
      // thumbnail: require('../../assets/images/calm_clip.png'),
      instructor: 'Aisha Patel',
      description: 'Find mental clarity and emotional balance to start your day. This practice helps you center yourself before diving into daily responsibilities.',
      tags: ['Focus', 'Calm', 'Clarity'],
      views: 11230,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Gratitude Practice',
      date: 'April 22, 2025',
      duration: '5:15',
      // thumbnail: require('../../assets/images/gratitude_clip.png'),
      instructor: 'Sarah Johnson',
      description: 'Cultivate an attitude of gratitude to start your day. This practice helps you recognize the positive aspects of your life and set an appreciative tone.',
      tags: ['Gratitude', 'Positivity', 'Mindfulness'],
      views: 15680,
      isFavorite: true,
    },
    {
      id: 5,
      title: 'Morning Intention',
      date: 'April 21, 2025',
      duration: '4:05',
      // thumbnail: require('../../assets/images/intention_clip.png'),
      instructor: 'David Kim',
      description: 'Set powerful intentions for your day. This practice guides you to connect with your values and focus your energy on what matters most.',
      tags: ['Intention', 'Purpose', 'Focus'],
      views: 8450,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Gentle Awakening',
      date: 'April 20, 2025',
      duration: '3:30',
      // thumbnail: require('../../assets/images/gentle_clip.png'),
      instructor: 'Lisa Martinez',
      description: 'Ease into your day with this gentle practice. Perfect for those mornings when you need a soft, nurturing start.',
      tags: ['Gentle', 'Relaxation', 'Self-care'],
      views: 7920,
      isFavorite: false,
    },
  ];
  
  // Static favorite clips
  const favoriteClips = [
    ...archiveClips.filter(clip => clip.isFavorite),
    ...(todayClip.isFavorite ? [todayClip] : []),
  ];
  
  const handlePlayPause = (clip) => {
    if (currentClip && currentClip.id === clip.id) {
      // Toggle play/pause for current clip
      setIsPlaying(!isPlaying);
    } else {
      // Start playing a new clip
      setCurrentClip(clip);
      setIsPlaying(true);
    }
  };
  
  const handleToggleFavorite = (clipId) => {
    // In a real app, we would update the state here
    alert(`Toggle favorite for clip ${clipId}`);
  };
  
  const handleShare = (clipId) => {
    // In a real app, we would open a share dialog
    alert(`Share clip ${clipId}`);
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Render tag item
  const renderTagItem = ({ item }) => (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{item}</Text>
    </View>
  );
  
  // Render archive clip item
  const renderArchiveClipItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.archiveClipCard}
      onPress={() => handlePlayPause(item)}
    >
      <View style={styles.thumbnailContainer}>
        {/* <Image source={item.thumbnail} style={styles.clipThumbnail} /> */}
        <View style={styles.playIconOverlay}>
          <Icon 
            name={(currentClip && currentClip.id === item.id && isPlaying) ? "pause" : "play"} 
            size={30} 
            color="#FFFFFF" 
          />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.clipContent}>
        <View style={styles.clipHeader}>
          <Text style={styles.clipTitle} numberOfLines={1}>{item.title}</Text>
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
        
        <Text style={styles.clipDate}>{item.date} • {item.instructor}</Text>
        
        <View style={styles.clipStats}>
          <View style={styles.viewsContainer}>
            <Icon name="eye-outline" size={14} color="#757575" />
            <Text style={styles.viewsText}>
              {item.views > 1000 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => handleShare(item.id)}
          >
            <Icon name="share-variant" size={18} color="#757575" />
          </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Good Morning Clips</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'today' && styles.activeTab]}
            onPress={() => setActiveTab('today')}
          >
            <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
              Today
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'archive' && styles.activeTab]}
            onPress={() => setActiveTab('archive')}
          >
            <Text style={[styles.tabText, activeTab === 'archive' && styles.activeTabText]}>
              Archive
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
        </View>

        <ScrollView style={styles.scrollView}>
          {activeTab === 'today' ? (
            // Today's clip
            <View style={styles.todayClipContainer}>
              <View style={styles.featuredVideoContainer}>
                {/* <Image source={todayClip.thumbnail} style={styles.featuredThumbnail} /> */}
                
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => handlePlayPause(todayClip)}
                >
                  <Icon 
                    name={(currentClip && currentClip.id === todayClip.id && isPlaying) ? "pause" : "play"} 
                    size={40} 
                    color="#FFFFFF" 
                  />
                </TouchableOpacity>
                
                <View style={styles.videoControls}>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: '35%' }]} />
                    </View>
                    <Text style={styles.durationText}>{todayClip.duration}</Text>
                  </View>
                  
                  <View style={styles.videoButtonsContainer}>
                    <TouchableOpacity 
                      style={styles.videoControlButton}
                      onPress={handleToggleMute}
                    >
                      <Icon 
                        name={isMuted ? "volume-off" : "volume-high"} 
                        size={22} 
                        color="#FFFFFF" 
                      />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.videoControlButton}
                      onPress={() => handleToggleFavorite(todayClip.id)}
                    >
                      <Icon 
                        name={todayClip.isFavorite ? "heart" : "heart-outline"} 
                        size={22} 
                        color={todayClip.isFavorite ? "#EF5350" : "#FFFFFF"} 
                      />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.videoControlButton}
                      onPress={() => handleShare(todayClip.id)}
                    >
                      <Icon name="share-variant" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={styles.clipDetailsContainer}>
                <Text style={styles.todayClipTitle}>{todayClip.title}</Text>
                <Text style={styles.todayClipDate}>{todayClip.date} • {todayClip.instructor}</Text>
                
                <View style={styles.viewsRow}>
                  <View style={styles.viewsContainer}>
                    <Icon name="eye-outline" size={14} color="#757575" />
                    <Text style={styles.viewsText}>
                      {todayClip.views > 1000 ? `${(todayClip.views / 1000).toFixed(1)}k` : todayClip.views} views
                    </Text>
                  </View>
                </View>
                
                <View style={styles.tagsRow}>
                  <FlatList
                    data={todayClip.tags}
                    renderItem={renderTagItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                
                <Text style={styles.sectionTitle}>About This Clip</Text>
                <Text style={styles.clipDescription}>{todayClip.description}</Text>
              </View>
            </View>
          ) : activeTab === 'archive' ? (
            // Archive clips
            <View style={styles.archiveContainer}>
              <Text style={styles.sectionTitle}>Past Morning Clips</Text>
              
              {archiveClips.map(clip => (
                <View key={clip.id}>
                  {renderArchiveClipItem({ item: clip })}
                </View>
              ))}
            </View>
          ) : (
            // Favorites
            <View style={styles.favoritesContainer}>
              <Text style={styles.sectionTitle}>Your Favorite Clips</Text>
              
              {favoriteClips.length > 0 ? (
                favoriteClips.map(clip => (
                  <View key={clip.id}>
                    {renderArchiveClipItem({ item: clip })}
                  </View>
                ))
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Icon name="heart-outline" size={60} color="#E0E0E0" />
                  <Text style={styles.emptyStateText}>No favorites yet</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Add clips to your favorites for easy access
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
        
        {/* Mini Player (shown when playing a clip from Archive or Favorites) */}
        {currentClip && activeTab !== 'today' && (
          <View style={styles.miniPlayerBar}>
            <Image source={currentClip.thumbnail} style={styles.miniPlayerImage} />
            
            <View style={styles.miniPlayerInfo}>
              <Text style={styles.miniPlayerTitle} numberOfLines={1}>
                {currentClip.title}
              </Text>
              <Text style={styles.miniPlayerInstructor} numberOfLines={1}>
                {currentClip.instructor}
              </Text>
            </View>
            
            <View style={styles.miniPlayerControls}>
              <TouchableOpacity 
                style={styles.miniPlayerButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Icon 
                  name={isPlaying ? "pause" : "play"} 
                  size={28} 
                  color="#5C6BC0" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.miniPlayerCloseButton}
                onPress={() => setCurrentClip(null)}
              >
                <Icon name="close" size={20} color="#757575" />
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
  headerRightPlaceholder: {
    width: 32,
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
  todayClipContainer: {
    flex: 1,
  },
  featuredVideoContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  featuredThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -35 }, { translateY: -35 }],
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
  durationText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  videoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  videoControlButton: {
    padding: 8,
    marginLeft: 8,
  },
  clipDetailsContainer: {
    padding: 16,
  },
  todayClipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  todayClipDate: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  viewsRow: {
    marginBottom: 12,
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  tagsRow: {
    marginBottom: 16,
  },
  tagContainer: {
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#5C6BC0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  clipDescription: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
  },
  archiveContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding for mini player
  },
  archiveClipCard: {
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
  thumbnailContainer: {
    width: 120,
    height: 90,
    position: 'relative',
  },
  clipThumbnail: {
    width: '100%',
    height: '100%',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  clipContent: {
    flex: 1,
    padding: 10,
  },
  clipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  clipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  clipDate: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  clipStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareButton: {
    padding: 4,
  },
  favoritesContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding for mini player
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
  miniPlayerBar: {
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
  miniPlayerImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  miniPlayerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  miniPlayerInstructor: {
    fontSize: 12,
    color: '#757575',
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPlayerButton: {
    padding: 8,
    marginRight: 4,
  },
  miniPlayerCloseButton: {
    padding: 8,
  },
});

export default GoodMorningClipsScreen;