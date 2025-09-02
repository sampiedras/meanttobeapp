import {
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {TabsHomeRoutes, TabsHomeScreenProps} from '@/types/tabRoutes';
import {colorsLight} from '@/theme/colorsLight';
import {ContainerSafeArea, SearchBarButton} from '@/components';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {useActionsExplorer} from './useActions';
import {RenderItem} from './RenderItem';
import {RenderItemMostFavorited} from './RenderItemMostFavorited';
import {RenderItemRecentedAdded} from './RenderItemRecentedAdded';
import {RenderItemFavorites} from './RenderItemFavorites';
import Carousel from 'react-native-reanimated-carousel';
import {listButtonsNavigationExplorer} from '@/fakeDb/listButtonsNavigationExplorer';
import {ButtonNavigationItem, RenderButtons} from './RenderButtons';
import {RootStackRoutes} from '@/types/stackRoutes';
import {IListButtonEntity} from '@/interfaces/listButtonEntity';
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;

export const ExplorerScreen = ({
  navigation: {navigate},
}: TabsHomeScreenProps<TabsHomeRoutes.EXPLORER>) => {
  const {
    dataRandom,
    dataRecentAdded,
    dataFavorite,
    refetchRandom,
    refetchRecentAdded,
    refetchFavorite,
  } = useActionsExplorer();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetchRandom(),
      refetchRecentAdded(),
      refetchFavorite(),
      setRefreshing(false);
  };

  const carouselRef = useRef(null);

  const renderButtons = ({item}: {item: ButtonNavigationItem}) => (
    <RenderButtons item={item} />
  );

  const isFocused = useIsFocused();

  return (
    <ContainerSafeArea style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          variant="h5"
          style={styles.title}
          color={colorsLight.PRIMARY_TEXT_COLOR}>
          Explorer
        </Text>
        <SearchBarButton
          onPress={() => navigate(RootStackRoutes.SEARCH)}
          placeholder="Search"
          style={styles.containerSearchBar}
        />
        <Carousel
          ref={carouselRef}
          loop
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          mode="parallax"
          width={width}
          height={180}
          autoPlay={isFocused}
          data={dataRandom?.items || []}
          scrollAnimationDuration={1000}
          renderItem={({item, index}) => (
            <RenderItem
              key={`${item.title}-${item.name}-${item.id}-${index}`}
              item={item}
            />
          )}
          onSnapToItem={(index: number) => {
            setCurrentIndex(index);
          }}
        />
        <View center>
          <FlatList
            data={dataRandom?.items}
            renderItem={({item, index}) => (
              <View
                key={`${item.id}-${index}`}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex
                        ? colorsLight.PRIMARY_COLOR
                        : colorsLight.GRAY_02,
                  },
                ]}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
        <FlatList
          data={listButtonsNavigationExplorer}
          renderItem={renderButtons}
          keyExtractor={(item: IListButtonEntity) => `${item?.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        <View row center marginB-28 style={styles.sections}>
          <Text
            variant="body1"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.titleSection}>
            Trending
          </Text>
        </View>
        <Carousel
          loop={false}
          style={styles.list}
          width={230}
          height={190}
          data={dataFavorite || []}
          scrollAnimationDuration={1000}
          renderItem={({item, index}) => (
            <RenderItemMostFavorited
              key={`${item}-${item}_${index}`}
              item={item}
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
        <View row center marginV-28 style={styles.sections}>
          <Text
            variant="body1"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.titleSection}>
            Recently added
          </Text>
        </View>
        <Carousel
          loop={false}
          style={styles.list}
          width={230}
          height={190}
          data={dataRecentAdded?.items || []}
          scrollAnimationDuration={1000}
          renderItem={({item, index}) => (
            <RenderItemRecentedAdded
              key={`${item.name}-${item.title}-${item.id}_${index}`}
              item={item}
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
        <View row center marginV-28 style={styles.sections}>
          <Text
            variant="body1"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.titleSection}>
            Your favorites
          </Text>
        </View>
        <Carousel
          loop={false}
          style={styles.list}
          width={160}
          height={170}
          data={dataFavorite?.slice().sort((a, b) => b.id - a.id) || []}
          scrollAnimationDuration={1000}
          renderItem={({item, index}) => (
            <RenderItemFavorites
              key={`${item.title}-${item.id}_${index}`}
              item={item}
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
      </ScrollView>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    paddingHorizontal: 16,
    paddingBottom: 96,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerSearchBar: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Satoshi-Black',
    marginBottom: 30,
    marginTop: 40,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  sections: {
    justifyContent: 'space-between',
  },
  titleSection: {
    fontFamily: 'Satoshi-Black',
  },
});
