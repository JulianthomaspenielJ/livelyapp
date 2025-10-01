// src/components/navigation/TabBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabBar = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TabBar;