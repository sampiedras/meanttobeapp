import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View, TouchableOpacity} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {ContainerSafeArea, Tag} from '@/components';
import {completeProfileScreenCopies} from '@/utils/copies';
import {LocalSvg} from 'react-native-svg';
import {useActions} from './useActions';

const spacing = 16;

export const CompleteProfileScreen = (
  props: RootStackScreenProps<RootStackRoutes.COMPLETE_PROFILE>,
) => {
  const {navigation} = props;
  const {
    numberOfImagesSelected,
    totalPercentageProfile,
    numberDeepQuestionsSelected,
    numberChurchSelected,
    numberDrivesSelected,
  } = useActions();
  return (
    <ContainerSafeArea>
      <View row center paddingH-10 marginT-8>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <LocalSvg asset={require('../../../assets/svg/arrow_back.svg')} />
        </TouchableOpacity>
        <View flex centerH>
          <Text style={styles.textHeader}>
            {totalPercentageProfile < 100
              ? `${totalPercentageProfile}% complete`
              : `Complete`}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View centerH marginT-40>
          <Text style={styles.title}>{completeProfileScreenCopies.title}</Text>
          <Text style={styles.subtitle}>
            {completeProfileScreenCopies.subtitle}
          </Text>
        </View>
        <View marginT-40 style={styles.container}>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() => navigation.navigate(RootStackRoutes.DRIVES)}
              style={styles.itemContainer}>
              <View style={styles.containerItems}>
                <Tag
                  backgroundColor={colorsLight.WHITE}
                  width={40}
                  height={40}
                  iconCenter={
                    <LocalSvg
                      asset={require('../../../assets/svg/heart_green.svg')}
                    />
                  }
                />
                <Text style={styles.titleItem}>
                  {completeProfileScreenCopies.titleDrives}
                </Text>
                <Text style={styles.subtitleItem}>
                  {numberDrivesSelected && numberDrivesSelected >= 9
                    ? `complete`
                    : `${numberDrivesSelected} of 9 added`}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(RootStackRoutes.QUESTIONS)}
              style={styles.itemContainer}>
              <View style={styles.containerItems}>
                <Tag
                  backgroundColor={colorsLight.WHITE}
                  width={40}
                  height={40}
                  iconCenter={
                    <LocalSvg
                      asset={require('../../../assets/svg/user_circle.svg')}
                    />
                  }
                />
                <Text style={styles.titleItem}>
                  {completeProfileScreenCopies.titleDeepQuestions}
                </Text>
                <Text style={styles.subtitleItem}>
                  {numberDeepQuestionsSelected &&
                  numberDeepQuestionsSelected >= 5
                    ? `complete`
                    : `${numberDeepQuestionsSelected} of 5 added`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.column}>
            <TouchableOpacity
              onPress={() => navigation.navigate(RootStackRoutes.ADD_PHOTO)}
              style={styles.itemContainer}>
              <View style={styles.containerItems}>
                <Tag
                  backgroundColor={colorsLight.WHITE}
                  width={40}
                  height={40}
                  iconCenter={
                    <LocalSvg
                      asset={require('../../../assets/svg/image.svg')}
                    />
                  }
                />
                <Text style={styles.titleItem}>
                  {completeProfileScreenCopies.titlePhotos}
                </Text>
                <Text style={styles.subtitleItem}>
                  {numberOfImagesSelected && numberOfImagesSelected >= 6
                    ? 'complete'
                    : `${numberOfImagesSelected} of 6 added`}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate(RootStackRoutes.CHURCH)}
              style={styles.itemContainer}>
              <View style={styles.containerItems}>
                <Tag
                  backgroundColor={colorsLight.WHITE}
                  width={40}
                  height={40}
                  iconCenter={
                    <LocalSvg
                      asset={require('../../../assets/svg/location.svg')}
                    />
                  }
                />
                <Text style={styles.titleItem}>
                  {completeProfileScreenCopies.titleChurch}
                </Text>
                <Text style={styles.subtitleItem}>
                  {numberChurchSelected && numberChurchSelected >= 1
                    ? `complete`
                    : `${numberChurchSelected} of 1 added`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: 'Satoshi-Black',
  },
  subtitle: {
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: 'center',
    marginTop: 20,
    width: '90%',
    fontFamily: 'Satoshi-Medium',
  },
  containerItems: {
    flexDirection: 'column',
    backgroundColor: colorsLight.GRAY_LIGHT,
    width: '100%',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  titleItem: {
    marginTop: 18,
    fontFamily: 'Satoshi-Black',
  },
  subtitleItem: {
    marginTop: 6,
    fontFamily: 'Satoshi-Regular',
  },
  textHeader: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: spacing / 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
