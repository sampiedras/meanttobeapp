import React from 'react';
import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {GradientBanner} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {RootStackRoutes} from '@/types/stackRoutes';
import {Text} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {LocalSvg} from 'react-native-svg';
import {View} from 'react-native-ui-lib';
import {useActionsUser} from './useActionsUser';
import {useActions} from '../DrivesScreen/useActions';

export const ViewProfileDetail = () => {
  const {navigate} = useNavigation();
  const {user, dataQuestions, totalPercentageProfile} = useActionsUser();
  const {dataUserDriveSection} = useActions();

  return (
    <View marginT-24 style={styles.content}>
      <View row style={styles.container}>
        <Text style={styles.title}>My story</Text>
        <TouchableOpacity onPress={() => navigate(RootStackRoutes.STORY)}>
          <LocalSvg asset={require('../../../assets/svg/Edit.svg')} />
        </TouchableOpacity>
      </View>
      <View marginT-16>
        <Text style={styles.text}>{user?.person.description_story}</Text>
      </View>
      <View center marginT-24>
        {totalPercentageProfile < 100 ? (
          <GradientBanner
            title={`${totalPercentageProfile}% complete`}
            text="Enter to finish completing your profile"
            labelButton="Complete"
            onPress={() => navigate(RootStackRoutes.COMPLETE_PROFILE)}
            width={92}
          />
        ) : (
          ''
        )}
      </View>
      <View marginT-24 paddingT-8 paddingB-8 row style={styles.container}>
        <View row>
          <LocalSvg asset={require('../../../assets/svg/Love.svg')} />
          <Text style={styles.titlePrincipal}>Drives you</Text>
        </View>
        <TouchableOpacity onPress={() => navigate(RootStackRoutes.DRIVES)}>
          <Text style={styles.buttonAdd}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxItem}>
        {dataUserDriveSection?.map((driveSection, index) => (
          <TouchableOpacity
            key={index}
            disabled
            style={[
              styles.item,
              {
                backgroundColor: colorsLight.GRAY_02,
                borderColor: colorsLight.GRAY_02,
              },
            ]}>
            <Text variant="body1" style={styles.itemText}>
              {driveSection.driveSection.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View marginT-24 paddingT-8 paddingB-8 row style={styles.container}>
        <View row>
          <LocalSvg
            color={colorsLight.SECONDARY_TEXT_COLOR}
            asset={require('../../../assets/svg/question_circle.svg')}
          />
          <Text style={styles.titlePrincipal}>Deep questions</Text>
        </View>
        <TouchableOpacity onPress={() => navigate(RootStackRoutes.QUESTIONS)}>
          <Text style={styles.buttonAdd}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={dataQuestions}
          renderItem={({item}) => (
            <View marginV-8>
              <Text style={styles.itemsQuestion}>
                {item?.question?.question}
              </Text>
              <View style={styles.itemsQuestionContainer}>
                <Text style={styles.itemsAnswer}>{item.answer}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 100,
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Black',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
  },
  titlePrincipal: {
    marginLeft: 16,
    fontFamily: 'Satoshi-Medium',
  },
  buttonAdd: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  boxItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sectionListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  itemText: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  itemsQuestion: {
    textAlign: 'left',
    fontFamily: 'Satoshi-Medium',
    marginBottom: 10,
  },
  itemsAnswer: {
    textAlign: 'left',
    fontFamily: 'Satoshi-Light',
  },
  itemsQuestionContainer: {
    backgroundColor: colorsLight.GRAY_02,
    padding: 16,
    borderRadius: 20,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  crossBar: {alignSelf: 'center', borderRadius: 20},
});
