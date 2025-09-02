import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {colorsLight} from '@/theme/colorsLight';
import {useActions} from './useActions';
import {View} from 'react-native-ui-lib';
import {RenderItemsVerses} from './RenderItemsVerses';
import {Text} from '@react-native-material/core';
import {IVerseResponse} from '@/api/verse/entities/VerseEntity';

export const VersesListScreen = (
  props: RootStackScreenProps<RootStackRoutes.VERSES_LIST>,
) => {
  const {
    dataTypeVerse,
    verses,
    loadingVerse,
    handleRefresh,
    handleNextPageVerse,
  } = useActions(props);

  const renderItemsVerses = ({item}: {item: IVerseResponse}) => (
    <RenderItemsVerses item={item} />
  );

  const numberOfVerses = verses?.count || 0;
  const verseText = numberOfVerses === 1 ? 'Verse' : 'Verses';

  return (
    <View
      flex
      paddingH-16
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}>
      <FlatList
        ListHeaderComponent={
          <View row center style={styles.titleAndCounterContainer}>
            <Text style={styles.title}>{dataTypeVerse?.name}</Text>
            <View style={styles.containerCounter}>
              <Text style={styles.textCounter}>
                {`${numberOfVerses} ${verseText}`}
              </Text>
            </View>
          </View>
        }
        data={verses && verses?.data}
        renderItem={renderItemsVerses}
        keyExtractor={item => `${item?.id}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={loadingVerse}
        onRefresh={handleRefresh}
        onEndReached={handleNextPageVerse}
        onEndReachedThreshold={1}
        ListEmptyComponent={
          <View centerH flex height={200} paddingT-90>
            <Text
              style={styles.textNoFound}
              variant="body1"
              color={colorsLight.SECONDARY_TEXT_COLOR}>
              No verses found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 36,
    fontFamily: 'Satoshi-Bold',
    letterSpacing: 0.37,
  },
  containerCounter: {
    borderRadius: 100,
    backgroundColor: colorsLight.ACCENT_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textCounter: {
    fontSize: 14,
    lineHeight: 20,
  },
  titleAndCounterContainer: {
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 24,
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
