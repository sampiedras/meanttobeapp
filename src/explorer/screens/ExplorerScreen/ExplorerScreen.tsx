import React from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import { useIsFocused } from "@react-navigation/native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import Carousel from "react-native-reanimated-carousel";
import { AppContainerSafeArea, SearchBarButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { TabsHomeScreenProps } from "@/core/types/StackRoutes";
import { E_ExplorerStackRoutes } from "@/explorer";
import { listButtonsNavigationExplorer } from "@/explorer/data/fakeDb/listButtonsNavigationExplorer";
import {
  ButtonNavigationItem,
  IListButtonEntity,
  RenderButtonFragment,
  RenderItemFavoriteFragment,
  RenderItemFragment,
  RenderItemMostFavoriteFragment,
  RenderItemRecentFragment,
} from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

const width = Dimensions.get("window").width;

export const ExplorerContent =
  ({}: TabsHomeScreenProps<E_ExplorerStackRoutes.EXPLORER>) => {
    const isFocused = useIsFocused();
    const {
      data,
      isLoading,
      refreshing,
      dataByLike,
      dataRecent,
      dataFavorite,
      carouselRef,
      currentIndex,
      isLoadingSectionLike,
      isLoadingSectionRecent,
      isLoadingSectionFavorite,
      setCurrentIndex,
      onRefresh,
    } = useViewModelProvider();

    const renderButtons = ({ item }: { item: ButtonNavigationItem }) => (
      <RenderButtonFragment item={item} />
    );

    return (
      <AppContainerSafeArea style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text
            variant="h5"
            style={styles.title}
            color={colorsLight.PRIMARY_TEXT_COLOR}
          >
            Explorer
          </Text>
          <SearchBarButton
            // TODO: onPress={() => navigate(RootStackRoutes.SEARCH)}
            placeholder="Search"
            style={styles.containerSearchBar}
          />

          {isLoading ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={styles.containerSkeleton}
              animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
            >
              <Skeleton colorMode="light" width="90%" height={180} />
            </MotiView>
          ) : (
            <>
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
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => <RenderItemFragment item={item} />}
                onSnapToItem={(index: number) => {
                  setCurrentIndex(index);
                }}
              />
              <View style={styles.center}>
                <FlatList
                  data={data}
                  renderItem={({ item, index }) => (
                    <View
                      key={`${item.sk}-${index}`}
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
                  keyExtractor={(item, index) => `${item.sk}-${index}`}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              </View>
            </>
          )}

          <FlatList
            data={listButtonsNavigationExplorer}
            renderItem={renderButtons}
            keyExtractor={(item: IListButtonEntity) => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <View style={[styles.rowCenter, styles.marginB28, styles.sections]}>
            <Text
              variant="body1"
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.titleSection}
            >
              Trending
            </Text>
          </View>
          {isLoadingSectionLike ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={styles.containerSkeleton}
              animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
            >
              <Skeleton colorMode="light" width="90%" height={180} />
            </MotiView>
          ) : (
            <Carousel
              loop={false}
              style={styles.list}
              width={230}
              height={190}
              data={dataByLike}
              scrollAnimationDuration={1000}
              renderItem={({ item, index }) => (
                <RenderItemMostFavoriteFragment
                  key={`${item}-${item}_${index}`}
                  item={item}
                />
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
          )}

          <View style={[styles.rowCenter, styles.marginV28, styles.sections]}>
            <Text
              variant="body1"
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.titleSection}
            >
              Recently added
            </Text>
          </View>

          {isLoadingSectionRecent ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={styles.containerSkeleton}
              animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
            >
              <Skeleton colorMode="light" width="90%" height={180} />
            </MotiView>
          ) : (
            <Carousel
              loop={false}
              style={styles.list}
              width={230}
              height={190}
              data={dataRecent}
              scrollAnimationDuration={1000}
              renderItem={({ item, index }) => (
                <RenderItemRecentFragment
                  key={`${item.sk}-${index}`}
                  item={item}
                />
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
          )}

          <View style={[styles.rowCenter, styles.marginV28, styles.sections]}>
            <Text
              variant="body1"
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.titleSection}
            >
              Your favorites
            </Text>
          </View>

          {isLoadingSectionFavorite ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={styles.containerSkeleton}
              animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
            >
              <Skeleton colorMode="light" width="90%" height={180} />
            </MotiView>
          ) : (
            <Carousel
              loop={false}
              style={styles.list}
              width={160}
              height={170}
              data={dataFavorite}
              scrollAnimationDuration={1000}
              renderItem={({ item, index }) => (
                <RenderItemFavoriteFragment
                  key={`${item.sk}-${index}`}
                  item={item}
                />
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
          )}
        </ScrollView>
      </AppContainerSafeArea>
    );
  };

export const ExplorerScreen = (
  props: TabsHomeScreenProps<E_ExplorerStackRoutes.EXPLORER>,
) => (
  <ViewModelProvider>
    <ExplorerContent {...props} />
  </ViewModelProvider>
);

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
    fontFamily: "Satoshi-Black",
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
    width: "100%",
  },
  sections: {
    justifyContent: "space-between",
  },
  titleSection: {
    fontFamily: "Satoshi-Black",
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginB28: { marginBottom: 28 },
  marginV28: { marginVertical: 28 },
});
