// src/components/cards/SessionCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SessionCard = ({
  title,
  instructor,
  duration,
  category,
  image,
  isFavorite,
  onPress,
  onFavoritePress,
  progress = 0,
}) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={image} style={styles.thumbnail} />
        <View style={styles.playIconOverlay}>
          <Icon name="play" size={30} color="#FFFFFF" />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={isFavorite ? "#EF5350" : "#9E9E9E"} 
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.instructor}>{instructor}</Text>
        
        {progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
        
        {category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: 'row',
    minHeight: 100,
  },
  thumbnailContainer: {
    width: 100,
    position: 'relative',
  },
  thumbnail: {
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
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE7F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 10,
    color: '#5C6BC0',
  },
});

export default SessionCard;