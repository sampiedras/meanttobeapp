import React, {useEffect} from 'react';
import {TabsHomeRoutes, TabsHomeScreenProps} from '@/types/tabRoutes';
import {StyleSheet} from 'react-native';
import {CardMatch} from './CardMatch';
import {View} from 'react-native-ui-lib';
import {RootStackRoutes} from '@/types/stackRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectTutorialMatch,
  setShowTutorial,
} from '@/slices/tutorialMatchSlice';
import {colorsLight} from '@/theme/colorsLight';

export const MatchScreen = ({
  navigation,
}: TabsHomeScreenProps<TabsHomeRoutes.MATCH>) => {
  const {showTutorial} = useSelector(selectTutorialMatch);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTutorialStatus = async () => {
      const tutorialShown = await AsyncStorage.getItem('TUTORIAL_MATCH');

      if (!tutorialShown) {
        dispatch(setShowTutorial(true));
        await AsyncStorage.setItem('TUTORIAL_MATCH', 'true');
      } else {
        dispatch(setShowTutorial(false));
      }
    };

    checkTutorialStatus();
  }, [showTutorial]);

  if (showTutorial === true) {
    navigation.navigate(RootStackRoutes.TUTORIAL_SCREEN);
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <CardMatch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
});
