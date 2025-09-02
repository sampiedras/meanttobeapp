import React from 'react';
import {Alert, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-ui-lib';
import {TinderCard} from 'rn-tinder-card';
import {MatchUserEntity} from '@/api/match/entities/matchEntity';
import {useCardFragment} from './useCardFragment';
import FastImage from 'react-native-fast-image';
import {Text} from '@react-native-material/core';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {colorsLight} from '@/theme/colorsLight';
import {InterestSection} from './sections/InterestSection';
import {BasicSection} from './sections/BasicSection';
import {BtnDiscardBlackIcon, BtnDiscardIcon, BtnYesIcon} from '@/assets/svg';
import {MediaSection} from './sections/MediaSection';
import {LocalSvg} from 'react-native-svg';

interface Props {
  item: MatchUserEntity;
  index: number;
  deleteCard: (id: number) => void;
}

export const CardFragment = React.memo(({item, index, deleteCard}: Props) => {
  const {
    distanceOfUsers,
    address,
    avatar,
    tinderCardsRef,
    imgUser,
    personAge,
    handleBlockUser,
    handleScroll,
    swipeLeft,
    swipeRight,
    createMatch,
  } = useCardFragment(item);

  const OverlayRight = () => (
    <View style={styles.overlayLabelRightContainer}>
      <BtnYesIcon width={70} height={70} />
    </View>
  );

  const OverlayLeft = () => (
    <View style={styles.overlayLabelLeftContainer}>
      <BtnDiscardBlackIcon width={70} height={70} />
    </View>
  );

  return (
    <View style={styles.cardContainer} pointerEvents="box-none">
      <TinderCard
        ref={el => (tinderCardsRef.current[index] = el)}
        disableTopSwipe
        onSwipedRight={() => {
          deleteCard(item.id);
          createMatch(item.id);
        }}
        onSwipedLeft={() => {
          deleteCard(item.id);
        }}
        onSwipedBottom={() => {
          // this is for the case when the user swipes down for error
          deleteCard(item.id);
        }}
        onSwipedTop={() => {
          // this is for the case when the user swipes top for error
          deleteCard(item.id);
        }}
        cardWidth={Dimensions.get('window').width / 1.1}
        cardHeight={Dimensions.get('screen').height}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        cardStyle={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          scrollEventThrottle={32}
          onScroll={handleScroll}>
          <View style={styles.containerCard}>
            <View marginB-12 height={500}>
              <FastImage
                source={{
                  uri: avatar.toString(),
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
              <LinearGradient
                style={styles.shadowOverlay}
                colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0.6}}
              />
              <View style={styles.textContainer}>
                <Text variant="h6" style={styles.textName}>
                  {item.person?.name && personAge
                    ? `${item.person?.name}, ${personAge}`
                    : `Don't have info yet `}
                </Text>
                <View row centerV marginT-8>
                  <LocalSvg
                    asset={require('../../../assets/svg/ubication.svg')}
                  />
                  <Text variant="h6" style={styles.textDistance}>
                    {distanceOfUsers !== 0
                      ? distanceOfUsers < 1
                        ? `Distance (- 1 km)`
                        : `Distance (${distanceOfUsers} km)`
                      : 'No distance'}
                  </Text>
                </View>
              </View>
              <View style={styles.textTopContainer}>
                <View style={styles.contentTextTop}>
                  <Text variant="h6" style={styles.textCategory}>
                    {item?.searching?.name || 'No searching '}
                  </Text>
                </View>
              </View>
            </View>
            <View paddingH-16 paddingB-20>
              <Text style={styles.tite}>My story</Text>
              <Text style={styles.textStory}>
                {item.person?.description_story || `Don't have a story yet`}
              </Text>
              <Text style={styles.tite}>Basics</Text>
              <BasicSection data={item} address={address} />
              <Text style={styles.tite}>Interests</Text>
              <InterestSection data={item?.userDriveSection} />
            </View>
            <MediaSection
              userImages={imgUser}
              dataQuestions={item.userQuestion}
            />
            <View marginV-20 row style={styles.containerButtons}>
              <TouchableOpacity onPress={() => swipeLeft(index)}>
                <BtnDiscardIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => swipeRight(index)}>
                <BtnYesIcon />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleBlockUser(item.id, index)}>
              <Text style={styles.blockText}>Block and report this person</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TinderCard>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  card: {
    borderRadius: 30,
    flex: 1,
  },
  image: {
    height: 500,
    borderRadius: 30,
    marginBottom: 10,
  },
  overlayLabelRightContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 40,
    left: 10,
  },
  overlayLabelLeftContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 40,
  },
  overlayLabelText: {color: 'white', fontSize: 32, fontWeight: 'bold'},
  scroll: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  textStory: {
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'Satoshi-Black',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#203936',
  },
  tite: {
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 18.2,
    fontFamily: 'Satoshi-Regular',
    marginVertical: 10,
    color: '#607270',
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 30,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  textTopContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 10,
    paddingHorizontal: 16,
  },
  textName: {
    color: colorsLight.WHITE,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '900',
    fontFamily: 'Satoshi-Medium',
  },
  basicIcons: {
    marginRight: 10,
  },
  containerCard: {
    backgroundColor: '#DDE8E3',
    borderRadius: 30,
  },
  blockText: {
    marginVertical: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Satoshi-Regular',
    color: '#4E6B51',
  },
  containerButtons: {
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
  },
  textCategory: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    lineHeight: 18.2,
  },
  contentTextTop: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: undefined,
    backgroundColor: '#203936',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textDistance: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    lineHeight: 18.2,
  },
});
