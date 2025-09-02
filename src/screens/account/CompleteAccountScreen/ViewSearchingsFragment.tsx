import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {IFormLoginEmail} from './useActions';
import {UseFormSetValue} from 'react-hook-form';
import _ from '@/@lodash/@lodash';
import {
  useGetAllSearchingQuery,
  useGetAllSearchingsQuery,
} from '@/api/searching/searchingApi';
import {
  ISearchingEntity,
  SearchingEntity,
  SearchingEntityResponse,
} from '@/api/searching/entities/searchingEntity';
import {LocalSvg} from 'react-native-svg';

interface IViewSearchingsFragment {
  setValue: UseFormSetValue<IFormLoginEmail>;
}

export const ViewSearchingsFragment = ({setValue}: IViewSearchingsFragment) => {
  const {data: dataSearching = []} = useGetAllSearchingQuery();
  const {data: dataSearchingsTwo} = useGetAllSearchingsQuery();
  const [dataSearch, setDataSearch] = useState<SearchingEntityResponse[]>([]);

  useEffect(() => {
    if (dataSearchingsTwo && dataSearchingsTwo?.length > 0) {
      const sortedData = _.orderBy(dataSearchingsTwo, ['id'], ['desc']);
      setDataSearch(
        sortedData.map((e: SearchingEntityResponse) => ({
          ...e,
          selected: false,
        })),
      );
    }
  }, [dataSearchingsTwo]);

  const handleSelect = (item: SearchingEntityResponse) => () => {
    setValue('searching', item, {shouldDirty: true});
    setDataSearch(
      dataSearch.map((e: SearchingEntityResponse) =>
        e.id === item.id ? {...e, selected: true} : {...e, selected: false},
      ),
    );
  };

  const renderItem = ({item}: {item: SearchingEntityResponse}) => (
    <TouchableOpacity
      row
      centerV
      style={[
        styles.radioButton,
        {
          borderColor: item.selected
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_02,
        },
      ]}
      onPress={handleSelect(item)}>
      <Text variant="body1" style={styles.textRadio}>
        {item.name}
      </Text>
      {item.selected ? (
        <LocalSvg
          asset={require('../../../assets/svg/radio_button_check_icon.svg')}
        />
      ) : (
        <LocalSvg
          asset={require('../../../assets/svg/radio_button_icon.svg')}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        Tell us, what are you looking for?
      </Text>

      <FlatList
        data={dataSearch}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
        ListFooterComponent={
          <View marginT-33 center>
            {dataSearch &&
            dataSearch.some(item => item.selected && item.name === 'Love') ? (
              <Text variant="h6" style={styles.helperText}>
                This will only show you people of the opposite gender.
              </Text>
            ) : dataSearch &&
              dataSearch.some(
                item => item.selected && item.name === 'Friendships',
              ) ? (
              <Text variant="h6" style={styles.helperText}>
                This will show you both men and women that fit your criteria.
              </Text>
            ) : dataSearch &&
              dataSearch.some(
                item => item.selected && item.name === `I don't know yet`,
              ) ? (
              <Text variant="h6" style={styles.helperText}>
                This will show you both men and women that fit your criteria.
              </Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  input: {
    fontSize: 32,
    marginTop: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    width: '80%',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 24,
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
  helperText: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Bold',
    fontSize: 12,
    maxWidth: 300,
    textAlign: 'center',
  },
});
