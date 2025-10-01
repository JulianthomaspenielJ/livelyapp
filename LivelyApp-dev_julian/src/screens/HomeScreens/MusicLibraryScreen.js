// src/screens/HomeScreens/MusicLibraryScreen.js
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

const MusicLibraryScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  // Static categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'nature', name: 'Nature' },
    { id: 'ambient', name: 'Ambient' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'focus', name: 'Focus' },
    { id: 'piano', name: 'Piano' },
  ];
  
  // Static music tracks
  const musicTracks = [
    {
      id: 1,
      title: 'Ocean Waves',
      artist: 'Nature Sounds',
      duration: '45:00',
      category: 'nature',
      image: require('../../../assets/images/ocean.jpg'),
      isFavorite: true,
    },
    {
      id: 2,
      title: 'Gentle Rain',
      artist: 'Nature Sounds',
      duration: '60:00',
      category: 'nature',
      image: require('../../../assets/images/rain.jpg'),
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Forest Ambience',
      artist: 'Nature Sounds',
      duration: '30:00',
      category: 'nature',
      image: require('../../../assets/images/forest.jpg'),
      isFavorite: true,
    },
    {
      id: 4,
      title: 'Deep Focus',
      artist: 'Ambient Works',
      duration: '120:00',
      category: 'focus',
      image: require('../../../assets/images/focus.jpg'),
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Dreamscape',
      artist: 'Sleep Sounds',
      duration: '480:00',
      category: 'sleep',
      image: require('../../../assets/images/dreamscape.jpg'),
      isFavorite: true,
    },
    {
      id: 6,
      title: 'Gentle Piano',
      artist: 'Piano Masters',
      duration: '35:00',
      category: 'piano',
      image: require('../../../assets/images/piano.jpg'),
      isFavorite: false,
    },
    {
      id: 7,
      title: 'Space Ambient',
      artist: 'Ambient Works',
      duration: '90:00',
      category: 'ambient',
      image: require('../../../assets/images/space.jpg'),
      isFavorite: false,
    },
    {
      id: 8,
      title: 'Relaxing Bells',
      artist: 'Meditation Music',
      duration: '45:00',
      category: 'ambient',
      image: require('../../../assets/images/bells.jpg'),
      isFavorite: true,
    },
  ];
  
  // Static playlists
  const playlists = [
    { 
      id: 1, 
      title: 'My Favorites', 
      tracks: 12, 
      // image: require('../../assets/images/favorite_playlist.png'),
    },
    { 
      id: 2, 
      title: 'Evening Relaxation', 
      tracks: 8, 
      // image: require('../../assets/images/evening_playlist.png'),
    },
    { 
      id: 3, 
      title: 'Morning Meditation', 
      tracks: 5, 
      // image: require('../../assets/images/morning_playlist.png'),
    },
  ];
  
  // Filter tracks based on selected category
  const filteredTracks = activeCategory === 'all' 
    ? musicTracks 
    : musicTracks.filter(track => track.category === activeCategory);
  
  const handlePlayPause = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      // Toggle play/pause for current track
      setIsPlaying(!isPlaying);
    } else {
      // Start playing a new track
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };
  
  const handleToggleFavorite = (trackId) => {
    // In a real app, we would update the state here
    alert(`Toggle favorite for track ${trackId}`);
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
  
  const renderTrackItem = ({ item }) => (
    <TouchableOpacity style={styles.trackCard}>
      <Image source={item.image} style={styles.trackImage} />
      
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <Text style={styles.trackDuration}>{item.duration}</Text>
      </View>
      
      <View style={styles.trackControls}>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(item.id)}
        >
          <Icon 
            name={item.isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={item.isFavorite ? "#EF5350" : "#9E9E9E"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => handlePlayPause(item)}
        >
          <Icon 
            name={(currentTrack && currentTrack.id === item.id && isPlaying) ? "pause" : "play"} 
            size={28} 
            color="#5C6BC0" 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistCard}>
      {/* <Image source={item.image} style={styles.playlistImage} /> */}
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Text style={styles.playlistTracks}>{item.tracks} tracks</Text>
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
          <Text style={styles.headerTitle}>Music Library</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Playlists Section */}
          <View style={styles.playlistsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Playlists</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={playlists}
              renderItem={renderPlaylistItem}
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
          
          {/* Tracks List */}
          <View style={styles.tracksContainer}>
            <Text style={styles.sectionTitle}>
              {activeCategory === 'all' ? 'All Tracks' : `${categories.find(cat => cat.id === activeCategory).name} Sounds`}
            </Text>
            
            {filteredTracks.map(track => (
              <View key={track.id}>
                {renderTrackItem({ item: track })}
              </View>
            ))}
          </View>
        </ScrollView>
        
        {/* Music Player Bar (shown when a track is selected) */}
        {currentTrack && (
          <View style={styles.playerBar}>
            <Image source={currentTrack.image} style={styles.playerImage} />
            
            <View style={styles.playerInfo}>
              <Text style={styles.playerTitle} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.playerArtist} numberOfLines={1}>
                {currentTrack.artist}
              </Text>
            </View>
            
            <View style={styles.playerControls}>
              <TouchableOpacity style={styles.playerButton}>
                <Icon name="skip-previous" size={24} color="#424242" />
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
                <Icon name="skip-next" size={24} color="#424242" />
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
  scrollView: {
    flex: 1,
  },
  playlistsSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  seeAllText: {
    fontSize: 14,
    color: '#5C6BC0',
    fontWeight: '600',
  },
  playlistCard: {
    width: 150,
    marginRight: 16,
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  playlistInfo: {
    paddingHorizontal: 4,
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  playlistTracks: {
    fontSize: 12,
    color: '#757575',
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
  tracksContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding for player bar
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    padding: 12,
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  trackDuration: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  trackControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 8,
  },
  playButton: {
    padding: 8,
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
  playerArtist: {
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

export default MusicLibraryScreen;