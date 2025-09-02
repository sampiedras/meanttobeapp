import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {useActionsSermons} from './useActions';
// import {RenderItemTopSermons} from './RenderItemTopSermons';
import {TypeFragment} from './TypeFragment';
import {RenderItem} from './RenderItem';
import {Tag} from '@/components';
// import Carousel from 'react-native-reanimated-carousel';

export const SermonsScreen = (
  props: RootStackScreenProps<RootStackRoutes.SERMONS>,
) => {
  const {
    sermonItems,
    dataSermon,
    dataTypeSermon,
    isLoading,
    loadingTypeSermon,
    typeSelect,
    handleSelectType,
    handleRefetchSermon,
    handleNextPage,
    handleNavigateDetail,
  } = useActionsSermons(props);

  const numberOfSermons = dataSermon?.count ?? 0;
  const sermonText = numberOfSermons === 1 ? 'Sermon' : 'Sermons';

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && loadingTypeSermon ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={30} color={colorsLight.PRIMARY_COLOR} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.containerListSermons}
          style={styles.listSermons}
          ListHeaderComponent={
            <>
              <View
                row
                center
                marginT-10
                marginB-30
                style={styles.containerTitle}>
                <Text
                  variant="h4"
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.title}>
                  Sermons
                </Text>
                <Tag
                  title={`${numberOfSermons} ${sermonText}`}
                  backgroundColor={colorsLight.BLUE_MAGENTA_LIGHT}
                  width={104}
                  height={32}
                  fontSize={12}
                  fontFamily="Satoshi-Medium"
                />
              </View>
              <View row center marginB-20 paddingH-2 style={styles.sections}>
                <Text
                  variant="body1"
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.titleTopSermons}>
                  Top sermons
                </Text>
              </View>
              {/* <Carousel
                loop={false}
                style={styles.listTopSermons}
                width={230}
                height={190}
                data={dataTopSermon || []}
                scrollAnimationDuration={1000}
                renderItem={({item}) => (
                  <RenderItemTopSermons
                    item={item}
                    handleNavigateDetail={handleNavigateDetail}
                  />
                )}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
              /> */}
              <Text
                variant="body1"
                color={colorsLight.PRIMARY_TEXT_COLOR}
                style={styles.titleAllSermons}>
                All sermons
              </Text>
              <View marginB-16>
                <FlatList
                  horizontal
                  renderItem={({item}) => (
                    <TypeFragment
                      name={item.name}
                      item={item.id}
                      isActive={typeSelect === item.id}
                      handleSelect={handleSelectType}
                    />
                  )}
                  data={dataTypeSermon}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => `${item?.id}`}
                />
              </View>
            </>
          }
          refreshing={isLoading || loadingTypeSermon}
          onRefresh={handleRefetchSermon}
          renderItem={({item}) => (
            <RenderItem
              item={item}
              handleNavigateDetail={handleNavigateDetail}
            />
          )}
          data={sermonItems || []}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item?.id}`}
          onEndReached={
            dataSermon && dataSermon?.count > 20 ? handleNextPage : null
          }
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <>
              {dataSermon?.count === 0 && (
                <View centerH flex height={200} paddingT-90>
                  <Text
                    style={styles.textNoFound}
                    variant="body1"
                    color={colorsLight.SECONDARY_TEXT_COLOR}>
                    No sermons found
                  </Text>
                </View>
              )}
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerScroll: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 16,
  },
  containerTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Satoshi-Bold',
  },
  sections: {
    justifyContent: 'space-between',
  },
  titleTopSermons: {
    fontFamily: 'Satoshi-Black',
  },
  titleAllSermons: {
    fontFamily: 'Satoshi-Black',
    marginVertical: 30,
  },
  containerListSermons: {
    paddingBottom: 16,
  },
  listSermons: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 16,
  },
  listTopSermons: {
    flex: 1,
    width: '100%',
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
