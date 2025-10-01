// src/components/common/ProgressBar.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar= ({
  progress = 0.5,
  color = '#E84393',
  height = 4,
  animated = true,
  duration = 1000,
}) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnimation, {
        toValue: progress,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnimation.setValue(progress);
    }
  }, [progress, animated, duration, progressAnimation]);
  
  const width = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  
  return (
    <View style={[styles.container, { height }]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            backgroundColor: color,
            width,
            height,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});

export default ProgressBar;