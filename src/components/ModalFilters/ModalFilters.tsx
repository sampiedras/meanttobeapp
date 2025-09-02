import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-ui-lib';
import {CircleButton} from '../CircleButton';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import CheckBox from '@react-native-community/checkbox';
import {RangeSlider, Slider} from '@react-native-assets/slider';
import {CloseDisableIcon} from '@/assets/svg';
import {ContainerSafeArea} from '../ContainerSafeArea';
import {useAppDispatch, useAppSelector} from '@/hooks/useRedux';
import {selectFilters, setFilters} from '@/slices/filtersSlice';
import {useAuthProvider} from '@/context/AuthContext';
import {
  useUpdateSearchingMutation,
  useUpdateUserSearchRangeMutation,
} from '@/api/user/userApi';
import {EPreferenceLocation} from '@/api/match/entities/matchEntity';
import {CheckBoxFragment} from './CheckBoxFragment';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: () => void;
  title: string;
}

export const ModalFilters = ({visible, onClose, title, onDone}: Props) => {
  const dispatch = useAppDispatch();
  const [handleUpdateSearchRange] = useUpdateUserSearchRangeMutation();
  const [handleUpdateSearching] = useUpdateSearchingMutation();
  const dataFormFilters = useAppSelector(selectFilters);
  const {user} = useAuthProvider();

  const [filterAge, setFilterAge] = useState<[number, number]>([18, 80]);
  const [ageCheckBox, setAgeCheckBox] = useState<boolean>(false);
  const [distanceCheckBox, setDistanceCheckBox] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(5);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [isNearMe, setIsNearMe] = useState<boolean>(false);
  const [searchingId, setSearchingId] = useState<string>('');

  const toggleDistanceCheckBox = () => setDistanceCheckBox(!distanceCheckBox);
  const toggleAgeCheckBox = () => setAgeCheckBox(!ageCheckBox);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  const handleSetNerMe = () => {
    setIsNearMe(!isNearMe);
  };

  const sendFilters = () => {
    dispatch(
      setFilters({
        filterAge,
        ageChecked: ageCheckBox,
        isNearMe,
        distanceChecked: distanceCheckBox,
        distance,
        searchingId,
      }),
    );

    handleUpdateSearchRange({
      searchRange: isNearMe
        ? EPreferenceLocation.GLOBALLY
        : EPreferenceLocation.NEAR_ME,
    });

    handleUpdateSearching({
      idSearching: searchingId,
    });

    onDone();
  };

  useEffect(() => {
    dispatch(
      setFilters({
        filterAge,
        ageChecked: ageCheckBox,
        isNearMe: user?.person?.search_range === EPreferenceLocation.NEAR_ME,
        distanceChecked: distanceCheckBox,
        distance,
        searchingId: `${user?.searching?.id}`,
      }),
    );
  }, []);

  useEffect(() => {
    if (dataFormFilters) {
      setFilterAge(dataFormFilters.filterAge);
      setAgeCheckBox(dataFormFilters.ageChecked);
      setDistanceCheckBox(dataFormFilters.distanceChecked);
      setDistance(dataFormFilters.distance);
      setSearchingId(dataFormFilters.searchingId);
      setIsNearMe(dataFormFilters.isNearMe);
    }
  }, [dataFormFilters]);

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <ContainerSafeArea>
        <View flex>
          <View row centerV paddingH-16 paddingV-8 spread>
            <CircleButton
              onPress={onClose}
              backgroundColor="#74748014"
              height={30}
              width={30}
              icon={<CloseDisableIcon />}
            />
            <Text color={colorsLight.BLACK} style={styles.title}>
              {title}
            </Text>
            <TouchableOpacity onPress={sendFilters}>
              <Text
                style={styles.textButtonDone}
                color={colorsLight.PRIMARY_COLOR}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <View
            height={2}
            width="100%"
            marginB-8
            backgroundColor={colorsLight.GRAY_02}
          />

          <ScrollView scrollEnabled={scrollEnabled}>
            <View flex-1 paddingH-16>
              <Text color={colorsLight.GRAY_03} style={styles.textAge}>
                Age
              </Text>
              <View marginT-8 padding-16 style={styles.containerItems}>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={
                    styles.itemAge
                  }>{`Between ${filterAge[0]} and ${filterAge[1]}`}</Text>
                <RangeSlider
                  range={filterAge}
                  minimumValue={18}
                  maximumValue={80}
                  step={1}
                  minimumRange={4}
                  outboundColor={colorsLight.UNFILLED_COLOR}
                  inboundColor={colorsLight.PRIMARY_COLOR}
                  thumbTintColor={colorsLight.PRIMARY_COLOR}
                  trackHeight={4}
                  thumbSize={20}
                  onValueChange={value => {
                    setFilterAge(value);
                  }}
                  onSlidingStart={disableScroll}
                  onSlidingComplete={enableScroll}
                />
                <View row centerV>
                  <CheckBox
                    disabled={false}
                    value={ageCheckBox}
                    style={styles.checkbox}
                    boxType="square"
                    tintColors={{
                      true: colorsLight.PRIMARY_COLOR,
                      false: colorsLight.PRIMARY_COLOR,
                    }}
                    tintColor={colorsLight.PRIMARY_COLOR}
                    onFillColor={colorsLight.PRIMARY_COLOR}
                    onTintColor={colorsLight.PRIMARY_COLOR}
                    onCheckColor={colorsLight.WHITE}
                    onValueChange={toggleAgeCheckBox}
                  />
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textSliderCheckbox}>
                    See people 2 years either side if I run out
                  </Text>
                </View>
              </View>

              <Text
                color={colorsLight.SECONDARY_TEXT_COLOR}
                style={styles.titleItem}>
                Distance
              </Text>
              <View padding-16 marginT-8 style={styles.containerItems}>
                <CheckBoxFragment
                  label="Locally"
                  value={isNearMe}
                  onChange={handleSetNerMe}
                />

                <CheckBoxFragment
                  label="Globally"
                  value={!isNearMe}
                  onChange={handleSetNerMe}
                />

                <View marginV-16 style={styles.separator} />
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={
                    styles.titleSlideDistance
                  }>{`Up to ${distance} kilometers away`}</Text>
                <Slider
                  value={distance}
                  step={1}
                  thumbTintColor={colorsLight.PRIMARY_COLOR}
                  maximumTrackTintColor={colorsLight.UNFILLED_COLOR}
                  minimumTrackTintColor={colorsLight.PRIMARY_COLOR}
                  onValueChange={value => {
                    setDistance(value);
                  }}
                  maximumValue={50}
                  minimumValue={5}
                  trackHeight={4}
                  thumbSize={20}
                  onSlidingStart={disableScroll}
                  onSlidingComplete={enableScroll}
                />
                <View row centerV>
                  <CheckBox
                    disabled={false}
                    value={distanceCheckBox}
                    style={styles.checkbox}
                    boxType="square"
                    tintColors={{
                      true: colorsLight.PRIMARY_COLOR,
                      false: colorsLight.PRIMARY_COLOR,
                    }}
                    tintColor={colorsLight.PRIMARY_COLOR}
                    onFillColor={colorsLight.PRIMARY_COLOR}
                    onTintColor={colorsLight.PRIMARY_COLOR}
                    onCheckColor={colorsLight.WHITE}
                    onValueChange={toggleDistanceCheckBox}
                  />
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.textSliderCheckbox}>
                    See people slightly further away if I run out
                  </Text>
                </View>
              </View>
              <Text
                color={colorsLight.SECONDARY_TEXT_COLOR}
                style={styles.titleItem}>
                What are you looking for?
              </Text>
              <View padding-16 marginT-8 style={styles.containerItems}>
                <CheckBoxFragment
                  label="Friendships"
                  value={searchingId === '21'}
                  onChange={() => setSearchingId('21')}
                />

                <CheckBoxFragment
                  label="Love"
                  value={searchingId === '22'}
                  onChange={() => setSearchingId('22')}
                />

                <CheckBoxFragment
                  label="Don't know yet"
                  value={searchingId === '20'}
                  onChange={() => setSearchingId('20')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ContainerSafeArea>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
  },
  textButtonDone: {
    fontSize: 17,
    fontFamily: 'Satoshi-Medium',
  },
  textAge: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  containerItems: {
    display: 'flex',
    gap: 12,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
    borderRadius: 16,
    justifyContent: 'center',
  },
  itemAge: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  textSliderCheckbox: {
    fontSize: 12,
    marginLeft: 16,
    fontFamily: 'Satoshi-Regular',
  },
  titleItem: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Satoshi-Medium',
  },

  checkbox: {
    width: 20,
    height: 20,
  },
  separator: {
    borderColor: colorsLight.GRAY_02,
    borderTopWidth: 1,
  },
  titleSlideDistance: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
});
