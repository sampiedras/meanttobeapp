import React from 'react';
import {View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {FlatList, StyleSheet} from 'react-native';
import {CardFragment} from './CardFragment';
import {useActionsNews} from './useActions';
import {CategoryFragment} from './CategoryFragment';
import {ContainerSafeArea} from '@/components';

export const NewsScreen = () => {
  const {
    news,
    isLoading,
    newsCategories,
    newsItems,
    typeSelect,
    isLoadingTypes,
    handleRefetchNews,
    handleSelectType,
    handleNextPage,
  } = useActionsNews();

  return (
    <ContainerSafeArea>
      <View
        flex
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        paddingH-20>
        <View row spread centerV width={'100%'}>
          <Text style={styles.title}>News</Text>

          <View
            backgroundColor={colorsLight.FILL_COUNTER}
            paddingV-4
            paddingH-15
            br100>
            <Text style={styles.counterText}>{news?.count || 0} News</Text>
          </View>
        </View>

        <View style={styles.listTypes} marginT-16 paddingB-4>
          <FlatList
            horizontal
            renderItem={({item}) => (
              <CategoryFragment
                name={item.name}
                item={item.id}
                isActive={typeSelect === item.id}
                handleSelect={handleSelectType}
              />
            )}
            data={newsCategories}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <FlatList
          style={styles.listNews}
          refreshing={isLoading || isLoadingTypes}
          onRefresh={handleRefetchNews}
          horizontal={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CardFragment newData={item} />}
          data={newsItems || []}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={handleNextPage}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <>
              {news?.count === 0 && (
                <View centerH flex height={200} paddingT-90>
                  <Text
                    style={styles.textNoFound}
                    variant="body1"
                    color={colorsLight.SECONDARY_TEXT_COLOR}>
                    No news found
                  </Text>
                </View>
              )}
            </>
          }
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 34,
  },
  listTypes: {
    overflow: 'hidden',
  },
  listNews: {
    flex: 1,
  },
  counterText: {
    padding: 4,
    fontFamily: 'Satoshi-Bold',
    fontSize: 12,
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
