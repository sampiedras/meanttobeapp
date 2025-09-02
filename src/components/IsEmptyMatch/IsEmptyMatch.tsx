import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {useDispatch} from 'react-redux';
import {setShowTabBar} from '@/slices/tabBarSlice';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {GradientButton} from '@/components';
import {LocalSvg} from 'react-native-svg';

interface Props {
  toggleModalFilters: () => void;
}

export const IsEmptyMatch = ({toggleModalFilters}: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowTabBar(false));
  }, []);

  return (
    <View style={styles.container}>
      <LocalSvg asset={require('@/assets/svg/empty_match.svg')} />
      <Text style={styles.title}>That’s all we’ve got for now</Text>
      <Text style={styles.subTitle}>
        Update your filters to find more people.
      </Text>
      <GradientButton
        onPress={toggleModalFilters}
        label="Update filters"
        height={54}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: colorsLight.BLACK,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Satoshi-Black',
  },
  subTitle: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 16,
    fontFamily: 'Satoshi-Black',
    marginBottom: 47,
  },
});
