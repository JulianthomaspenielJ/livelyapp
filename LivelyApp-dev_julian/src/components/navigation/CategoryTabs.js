// src/components/navigation/CategoryTabs.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CategoryTabs = ({ categories, activeCategory, onCategoryPress }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.id && styles.activeCategoryItem,
      ]}
      onPress={() => onCategoryPress(item.id)}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
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
});

export default CategoryTabs;