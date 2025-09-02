import {ActivityIndicator, Alert, Keyboard, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {useActionsChurch} from './useActions';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useLazyGetAllChurchQuery} from '@/api/church/churchApi';
import {ChurchEntity} from '@/api/church/entities/ChurchEntity';
import useDebounce from '@/hooks/useDebounce';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {ContainerSafeArea, GradientButton} from '@/components';

export const ChurchScreen = (
  props: RootStackScreenProps<RootStackRoutes.CHURCH>,
) => {
  const {
    isValid,
    dirtyFields,
    addChurch,
    loading,
    getValues,
    setValue,
    trigger,
    handleSaveInfo,
    setAddChurch,
    user,
    field,
  } = useActionsChurch(props);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['01%', '90%'], []);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [triggerGetAllChurch, {data = []}] = useLazyGetAllChurchQuery();

  useEffect(() => {
    async function getAsyncData() {
      await triggerGetAllChurch(searchText);
    }
    getAsyncData();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, []);

  const onChangeTextSearch = (text: string) => {
    setLoadingSearch(true);
    setSearchText(text);
    handleSearch(text);
  };

  const handleSearch = useDebounce(async (text: string) => {
    Keyboard.dismiss();
    try {
      await triggerGetAllChurch(text);
    } catch (error) {
      Alert.alert('Error', 'Not found');
    }
    setLoadingSearch(false);
  }, 1000);

  const handleSave = (church: ChurchEntity) => {
    bottomSheetRef?.current?.snapToIndex(0);
    setValue('church', church, {shouldDirty: true});
    trigger('church');
  };

  const renderItem = ({item}: {item: ChurchEntity}) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSave(item)}>
      <Text style={styles.textItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    (propsBottom: any) => (
      <BottomSheetBackdrop
        {...propsBottom}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    [],
  );

  return (
    <ContainerSafeArea style={styles.container}>
      <View style={styles.boxContainer}>
        <Text variant="h6" style={styles.title}>
          Do you want to change your church?
        </Text>
        <TouchableOpacity
          centerV
          style={[
            styles.radioButton,
            {
              borderColor: addChurch
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
            },
          ]}
          onPress={() => setAddChurch(true)}>
          <View row centerV spread>
            <Text variant="body1" style={styles.textRadio}>
              Yes
            </Text>
            {addChurch ? (
              <LocalSvg
                asset={require('../../../assets/svg/radio_button_check_icon.svg')}
              />
            ) : (
              <LocalSvg
                asset={require('../../../assets/svg/radio_button_icon.svg')}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.buttonFind}
            marginT-16
            disabled={!addChurch}
            onPress={() => bottomSheetRef?.current?.snapToIndex(1)}>
            <Text style={styles.textFind} variant="body2">
              {user?.church.name
                ? field.value
                  ? getValues('church.name')
                  : user.church.name
                : 'Find you church'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <View style={styles.boxTextInput} centerV row spread>
          <LocalSvg
            asset={require('../../../assets/svg/search_icon.svg')}
            width={18}
            height={18}
          />
          <BottomSheetTextInput
            value={searchText}
            onChangeText={onChangeTextSearch}
            style={styles.textInput}
            placeholder="Search church"
            placeholderTextColor={colorsLight.GRAY_03}
          />
          {loadingSearch && <ActivityIndicator color="black" size={24} />}
        </View>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item: ChurchEntity) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
      <View marginH-16 marginB-10>
        <GradientButton
          label="Save changes"
          loading={loading}
          height={54}
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onPress={handleSaveInfo}
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 12,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  input: {
    fontSize: 32,
    marginTop: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    width: '80%',
    textAlign: 'center',
  },
  radioButton: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  textRadio: {
    fontFamily: 'Satoshi-Black',
  },
  buttonFind: {
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
  },
  textFind: {
    fontFamily: 'Satoshi-Regular',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boxTextInput: {
    backgroundColor: colorsLight.GRAY_LIGHT,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colorsLight.GRAY_02,
    paddingVertical: 16,
  },
  textItem: {
    fontFamily: 'Satoshi-Regular',
  },
});
