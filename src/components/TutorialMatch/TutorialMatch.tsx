import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIstMatchTutorial,
  setHiddenItsMatchTutorial,
} from '@/slices/itsMatchTutorialSlice';
import {BlurView} from '@react-native-community/blur';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {ClickLeftIcon} from '@/assets/svg';

type Animations = {
  [key: string]:
    | string
    | Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>
    | undefined;
};

export const TutorialMatch = () => {
  const {hidden} = useSelector(selectIstMatchTutorial);
  const [startAnimation, setStartAnimation] = useState(false);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setHiddenItsMatchTutorial(false));
  };

  const animations: Animations = {
    fadeInUP: 'fadeInUp',
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, 30000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Modal visible={hidden} animationType="slide" transparent>
      <TouchableOpacity onPress={onClose} style={styles.container}>
        <BlurView
          style={styles.container}
          blurType="regular"
          blurAmount={10}
          reducedTransparencyFallbackColor={colorsLight.GRAY_02}
        />
        <View style={styles.modalContainer}>
          <FastImage
            source={require('@/assets/image/animationHeart.png')}
            style={styles.img}
          />
          <Animatable.View
            animation={startAnimation ? animations.fadeInUP : undefined}
            duration={2000}
            iterationCount={'infinite'}
            style={styles.iconContainer}>
            <TouchableOpacity>
              <ClickLeftIcon />
            </TouchableOpacity>
          </Animatable.View>
          <Text style={styles.text}>
            Click the heart to send him/her a touch to notice you.
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    backgroundColor:
      Platform.OS === 'ios'
        ? 'rgba(32, 46, 30, 0.40) 89.34% '
        : 'rgba(30, 39, 20, 0.002) 89.34% ',
  },
  text: {
    color: '#FEFEFF',
    fontFamily: 'Satoshi-Regular',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.8,
    marginTop: 60,
  },
  img: {
    width: 180,
    height: 180,
  },
  touchable: {justifyContent: 'center', alignItems: 'center'},
  iconContainer: {
    marginBottom: 10,
  },
});
