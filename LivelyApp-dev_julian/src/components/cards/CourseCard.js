// src/components/cards/CourseCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CourseCard = ({ course, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(course)}
    >
      <Image source={course.image} style={styles.image} />
      
      {course.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${course.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{course.progress}%</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>By {course.instructor}</Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.metaContainer}>
            <View style={styles.meta}>
              <Icon name="book-open-variant" size={14} color="#757575" />
              <Text style={styles.metaText}>{course.lessons} lessons</Text>
            </View>
            
            <View style={styles.meta}>
              <Icon name="clock-outline" size={14} color="#757575" />
              <Text style={styles.metaText}>{course.totalMinutes} min</Text>
            </View>
          </View>
          
          <View style={styles.rating}>
            <Icon name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingText}>{course.rating}</Text>
          </View>
        </View>
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
  },
  image: {
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#757575',
    marginLeft: 4,
  },
});

export default CourseCard;