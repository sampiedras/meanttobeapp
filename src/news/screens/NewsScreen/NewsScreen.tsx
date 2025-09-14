import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_NewsStackRoutes } from "@/news";
import { CardFragment, CategoryFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const NewsContent =
  ({}: RootStackScreenProps<E_NewsStackRoutes.NEWS>) => {
    const {
      news,
      newsItems,
      isLoading,
      typeSelect,
      isLoadingTypes,
      newsCategories,
      handleNextPage,
      handleRefetchNews,
      handleSelectType,
    } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>News</Text>

            <View style={styles.counter}>
              <Text style={styles.counterText}>{news?.count || 0} News</Text>
            </View>
          </View>

          <View style={[styles.listTypes, styles.marginT16, styles.paddingB4]}>
            <FlatList
              horizontal
              renderItem={({ item }) => (
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardFragment newData={item} />}
            data={newsItems || []}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={handleNextPage}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              <>
                {news?.count === 0 && (
                  <View style={styles.emptyContainer}>
                    <Text
                      style={styles.textNoFound}
                      variant="body1"
                      color={colorsLight.SECONDARY_TEXT_COLOR}
                    >
                      No news found
                    </Text>
                  </View>
                )}
              </>
            }
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  counter: {
    backgroundColor: colorsLight.FILL_COUNTER,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 34,
  },
  listTypes: {
    overflow: "hidden",
  },
  marginT16: { marginTop: 16 },
  paddingB4: { paddingBottom: 4 },
  listNews: {
    flex: 1,
  },
  counterText: {
    padding: 4,
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 90,
    flex: 1,
  },
});

export const NewsScreen = (
  props: RootStackScreenProps<E_NewsStackRoutes.NEWS>,
) => (
  <ViewModelProvider>
    <NewsContent {...props} />
  </ViewModelProvider>
);
