// src/components/cards/Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Card = ({ 
  title,
  subtitle,
  description,
  image,
  duration,
  iconName,
  rightComponent,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, style]}
      onPress={onPress}
    >
      {image && <Image source={image} style={styles.image} />}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {rightComponent}
        </View>
        
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        
        {(duration || iconName) && (
          <View style={styles.footer}>
            {duration && (
              <View style={styles.metaContainer}>
                <Icon name="clock-outline" size={14} color="#757575" />
                <Text style={styles.metaText}>{duration}</Text>
              </View>
            )}
            
            {iconName && (
              <View style={styles.metaContainer}>
                <Icon name={iconName} size={14} color="#757575" />
                <Text style={styles.metaText}></Text>
              </View>
            )}
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
  },
  image: {
    width: 100,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
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
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
});

export default Card;