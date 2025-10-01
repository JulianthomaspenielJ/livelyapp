// src/components/headers/ScreenHeader.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from '../../../constant/Icons';
import {useNavigation} from '@react-navigation/native';

const ScreenHeader = ({
  title,
  onBackPress,
  showSearch = false,
  onSearchPress,
  rightComponent,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icons.MaterialIcons name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      {rightComponent ? (
        rightComponent
      ) : showSearch ? (
        <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
          <Icon name="magnify" size={24} color="#212121" />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Figtree-Bold',
    color: '#212121',
    textAlign:'left',
    marginLeft:15
  },
  searchButton: {
    padding: 4,
  },
  spacer: {
    width: 32,
  },
});

export default ScreenHeader;
