import {StyleSheet} from 'react-native';
import React from 'react';
import {colorsLight} from '@/theme/colorsLight';
import {View} from 'react-native-ui-lib';
import {useActions} from './useActions';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {FlatListWrap, SearchBar} from '@/components';
import {Text} from '@react-native-material/core';

export const VersesScreen = (
  props: RootStackScreenProps<RootStackRoutes.VERSES>,
) => {
  const {navigation} = props;
  const {
    dataTypeVerse,
    loadingTypeVerse,
    searchText,
    handleSearch,
    handleRefresh,
  } = useActions();

  const handleNavigate = (itemId: number) => {
    navigation.navigate(RootStackRoutes.VERSES_LIST, {
      id: itemId,
    });
  };

  return (
    <View
      flex
      paddingH-16
      paddingB-26
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}>
      <FlatListWrap
        refreshing={handleRefresh}
        isLoading={loadingTypeVerse}
        onPressNavigation={handleNavigate}
        ListHeaderComponent={
          <View paddingH-8>
            <Text style={styles.title}>Verses</Text>
            <SearchBar
              placeholder="Search"
              style={styles.search}
              value={searchText}
              onChangeText={handleSearch}
            />
            <Text style={styles.subtTitleText}>Categories</Text>
          </View>
        }
        dataItem={dataTypeVerse}
        imageProperty={'coverImg'}
      />
      {dataTypeVerse && dataTypeVerse.length === 0 ? (
        <>
          {searchText ? (
            <View flex-1 centerH>
              <Text
                color={colorsLight.PRIMARY_TEXT_COLOR}
                variant="h6"
                style={styles.titleCouldNotFind}>
                Could not find{'\n'}"{searchText}"
              </Text>
              <Text
                color={colorsLight.SECONDARY_TEXT_COLOR}
                variant="body2"
                style={styles.subtitleCouldNotFind}>
                Search again or try a different keyword
              </Text>
            </View>
          ) : (
            <View centerH flex height={200} paddingT-90>
              <Text
                style={styles.textNoFound}
                variant="body1"
                color={colorsLight.SECONDARY_TEXT_COLOR}>
                No verses categories found
              </Text>
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 34,
    fontFamily: 'Satoshi-Bold',
  },
  subtTitleText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Satoshi-Black',
    marginBottom: 20,
  },
  search: {
    marginTop: 28,
    marginBottom: 36,
  },
  titleCouldNotFind: {
    fontFamily: 'Satoshi-Bold',
    textAlign: 'center',
  },
  subtitleCouldNotFind: {
    fontFamily: 'Satoshi-Regular',
    marginTop: 14,
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
