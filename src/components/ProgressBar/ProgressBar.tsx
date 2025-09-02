import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ViewProps, Animated} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';

interface Props extends ViewProps {
  progress: {
    position: number;
    offset: number;
  };
  numberOfPages: number;
}

export const ProgressBar: React.FC<Props> = ({progress, numberOfPages}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fractionalPosition = progress.position + progress.offset;
    const size = fractionalPosition / (numberOfPages - 1);
    const clampedSize = Math.max(0, Math.min(1, size));

    Animated.timing(animatedValue, {
      toValue: clampedSize * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, numberOfPages, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, {width}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
    height: 4,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#EBF1ED',
  },
  progressBar: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
});
