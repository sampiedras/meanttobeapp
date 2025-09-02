import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Modal,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {View} from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';
import {GradientButton} from '../GradientButton';
import {useDispatch, useSelector} from 'react-redux';
import {selectIstMatch, setHiddenItsMatch} from '@/slices/itsMatchSlice';
import {useAuthProvider} from '@/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import {CongratulationIcon} from '@/assets/svg';
import {colorsLight} from '@/theme/colorsLight';
import {setVisible} from '@/slices/alertPremiumSlice';

export const ItsMatch = () => {
  const {width} = useWindowDimensions();
  const {hidden, imgUserTwo, channelId} = useSelector(selectIstMatch);
  const {isSubscriptionActive, user, client} = useAuthProvider();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const imgWidth = 120;
  const imgHeight = imgWidth * 1.5;

  const animations = {
    _slideDown: {
      from: {
        marginTop: 0,
      },
      to: {
        marginTop: 100,
      },
    },
    _rotateViewLeft: {
      from: {
        top: 100,
        transform: [{rotate: '0deg'}],
        left: 24,
        backgroundColor: '#CFD8CE',
      },
      to: {
        top: 52,
        transform: [{rotate: '-40deg'}],
        left: width / 3.3,
        backgroundColor: '#B5C1B6',
      },
    },
    _rotateViewRight: {
      from: {
        top: 100,
        transform: [{rotate: '0deg'}],
        right: 24,
        backgroundColor: '#B5C1B6',
      },
      to: {
        top: 52,
        transform: [{rotate: '40deg'}],
        right: width / 3.3,
        backgroundColor: '#CFD8CE',
      },
    },
    _rotatePhotoLeft: {
      from: {
        top: 100,
        transform: [{rotate: '0deg'}],
        left: 40,
      },
      to: {
        top: 64,
        transform: [{rotate: '-40deg'}],
        left: width / 3,
      },
    },
    _rotatePhotoRight: {
      from: {
        top: 100,
        transform: [{rotate: '0deg'}],
        right: 80,
      },
      to: {
        top: 64,
        transform: [{rotate: '40deg'}],
        right: width / 3,
      },
    },
    _fadeInCenter: {
      from: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
      },
      to: {
        width: 300,
        height: 300,
        backgroundColor: '#F1F3F4',
      },
    },
    _fadeInMiddle: {
      from: {
        width: 300,
        height: 300,
        backgroundColor: 'transparent',
      },
      to: {
        height: 420,
        width: 420,
        backgroundColor: '#C6CFC7',
      },
    },
    _fadeInExternal: {
      from: {
        width: 420,
        height: 420,
        backgroundColor: 'transparent',
      },
      to: {
        height: 530,
        width: 530,
        backgroundColor: '#DBE1E0',
      },
    },
  };

  const [leftViewAnimation, setLeftViewAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >(animations._slideDown);
  const [rightViewAnimation, setRightViewAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [leftPhotoAnimation, setLeftPhotoAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >(animations._slideDown);
  const [rightPhotoAnimation, setRightPhotoAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [circleCenterAnimation, setCircleCenterAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [circleMiddleAnimation, setCircleMiddleAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [circleExternalAnimation, setCircleExternalAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [showCircle, setShowCircle] = useState<boolean>(false);
  const [heartDisabled, setHeartDisabled] = useState<boolean>(true);

  const onFirstAnimationEnd = () => {
    setLeftViewAnimation(animations._rotateViewLeft);
    setRightViewAnimation(animations._rotateViewRight);
    setLeftPhotoAnimation(animations._rotatePhotoLeft);
    setRightPhotoAnimation(animations._rotatePhotoRight);
  };

  const onSecondAnimationEnd = () => {
    setShowCircle(true);
    setCircleCenterAnimation(animations._fadeInCenter);
    setCircleMiddleAnimation(animations._fadeInMiddle);
    setCircleExternalAnimation(animations._fadeInExternal);
  };

  const onClose = () => {
    dispatch(setHiddenItsMatch(false));
  };

  const onGoToChat = () => {
    if (isSubscriptionActive) {
      navigation.navigate(RootStackRoutes.CHAT, {
        channelId: channelId && channelId,
      });
      onClose();
    } else {
      dispatch(setHiddenItsMatch(false));
      dispatch(setVisible(true));
    }
  };
  const sendPokeMessage = async () => {
    const channel = client.channel('messaging', channelId);

    if (isSubscriptionActive) {
      await channel.sendMessage({
        text: '👋',
        type: 'regular',
      });
      await channel.sendMessage({
        text: `Hey, it's great to be able to talk`,
      });
    } else {
      dispatch(setHiddenItsMatch(false));
      dispatch(setVisible(true));
    }
  };

  return (
    <Modal
      visible={hidden}
      animationType="slide"
      transparent={true}
      style={styles.heartContainer}>
      <View style={styles.modalContainer} backgroundColor="red" flex>
        <View marginT-120>
          {showCircle && (
            <View style={styles.beatViewContainer}>
              <Animatable.View
                style={styles.vibeOne}
                animation={circleExternalAnimation}
                iterationCount={2}>
                <Animatable.View
                  style={styles.vibeTwo}
                  animation={circleMiddleAnimation}
                  iterationCount={2}>
                  <Animatable.View
                    style={{borderRadius: 200}}
                    animation={circleCenterAnimation}
                    onAnimationEnd={() => {
                      setShowCircle(false);
                      setHeartDisabled(false);
                    }}
                    iterationCount={2}
                  />
                </Animatable.View>
              </Animatable.View>
            </View>
          )}
          <TouchableOpacity
            disabled={heartDisabled}
            onPress={() => sendPokeMessage()}>
            <Animatable.View
              style={[styles.matchingPhoto, {right: 40, top: 30, backgroundColor: '#B5C1B6'}]}
              animation={rightViewAnimation}
              onAnimationEnd={onSecondAnimationEnd}
            />

            <Animatable.View
              animation={leftViewAnimation}
              style={[
                styles.matchingPhoto,
                {
                  left: 40,
                  top: 1,
                  backgroundColor: '#B5C1B6',
                },
              ]}
              onAnimationEnd={onFirstAnimationEnd}
            />

            <Animatable.Image
              animation={rightPhotoAnimation}
              source={{
                uri: (user && user.avatar) || '' || undefined,
              }}
              style={[styles.photo, {right: 52, top: 43}]}
              onAnimationEnd={onSecondAnimationEnd}
            />
            <Animatable.Image
              animation={leftPhotoAnimation}
              source={{
                uri: 'https://media.admagazine.com/photos/650a96a14e52ff077a4d305d/16:9/w_2560%2Cc_limit/flor-de-maga.jpg',
              }}
              style={[styles.photo, {left: 52, top: 13}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTexts}>
          <CongratulationIcon height={40} width={168} />
          <Text style={styles.textMatch}>
            It's a<Text style={{color: '#4E6B51'}}> Match!</Text>
          </Text>
          <Text style={styles.somethingText}>
            This is the start of something new.
          </Text>
          <Text style={styles.startText}>Start a conversation now.</Text>
          <GradientButton
            width="90%"
            label="Start a Conversation"
            onPress={onGoToChat}
          />
          <TouchableOpacity onPress={onClose}>
            <View row center paddingT-24>
              <Text style={styles.notNowText}>Not now,</Text>
              <Text style={styles.continueText}>continue searching</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  matchingPhoto: {
    position: 'absolute',
    height: 178,
    width: 112,
    borderRadius: 80,
  },
  photo: {
    position: 'absolute',
    height: 152,
    width: 86,
    borderRadius: 80,
  },
  beatViewContainer: {
    position: 'absolute',
    top: 150,
    right: 0,
    left: 0,
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  heartContainer: {
    backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
  },
  notNowText: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontSize: 14,
    fontFamily: 'Satoshi-Bold',
  },
  startText: {
    color: '#727084',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    marginBottom: 30,
  },
  somethingText: {
    color: '#727084',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    paddingTop: 20,
  },
  textMatch: {
    color: '#1C1C21',
    fontSize: 32,
    fontFamily: 'Satoshi-Black',
    paddingTop: 24,
  },
  textCongratulations: {
    color: '#4E6B51',
    fontSize: 32,
    fontFamily: 'Authentic',
  },
  containerTexts: {
    position: 'absolute',
    top: '55%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontFamily: 'Satoshi-Regular',
    marginHorizontal: 4,
    color: colorsLight.PRIMARY_TEXT_COLOR,
  },
  vibeOne: {
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vibeTwo: {
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
