import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const FeatureCarousel = ({carouselData}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  // Auto-scroll functionality
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (activeIndex < carouselData.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(scrollInterval);
  }, [activeIndex, carouselData.length]);

  const renderCarouselItem = ({ item }) => {
    return (
      <View
        style={[styles.carouselItem, { backgroundColor: "rgba(255,255,255,0.7)" }]}
      >
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={carouselData}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  carouselContainer: {
    height: 190,
  },
  flatListContent: {
    alignItems: 'center',
  },
  carouselItem: {
    width:150,
    // height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginHorizontal: 5,
    borderColor:"#D94982",
    borderWidth:1.5
  },
  carouselImage: {
    borderRadius: 8,
    width: "100%",
    height: "70%",
    resizeMode: 'contain',
    // marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 14,
    color: '#191314',
    textAlign: 'center',
    width:"100%",
    fontFamily:'Figtree-Medium',
    marginTop:10,
  },
  carouselSubtitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontFamily:'Figtree-Medium'
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default FeatureCarousel;