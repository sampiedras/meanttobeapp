import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_VerseStackRoutes } from "@/verse";
import { IVerseResponse } from "@/verse/data/remote/entities/verseEntity";
import { RenderItemsVerseFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const VerseListContent =
  ({}: RootStackScreenProps<E_VerseStackRoutes.VERSES_LIST>) => {
    const {
      dataTypeVerse,
      loadingVerse,
      verses,
      handleRefresh,
      handleNextPageVerse,
    } = useViewModelProvider();

    const renderItemsVerses = ({ item }: { item: IVerseResponse }) => (
      <RenderItemsVerseFragment item={item} />
    );

    const numberOfVerses = verses?.count || 0;
    const verseText = numberOfVerses === 1 ? "Verse" : "Verses";

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={[styles.rowCenter, styles.titleAndCounterContainer]}>
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
          keyExtractor={(item) => `${item?.id}`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={loadingVerse}
          onRefresh={handleRefresh}
          onEndReached={handleNextPageVerse}
          onEndReachedThreshold={1}
          ListEmptyComponent={
            <View
              style={[
                styles.centerH,
                styles.flex,
                styles.height200,
                styles.paddingT90,
              ]}
            >
              <Text
                style={styles.textNoFound}
                variant="body1"
                color={colorsLight.SECONDARY_TEXT_COLOR}
              >
                No verses found
              </Text>
            </View>
          }
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "black",
    fontSize: 36,
    fontFamily: "Satoshi-Bold",
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
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 24,
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
  centerH: { alignItems: "center" },
  flex: { flex: 1 },
  height200: { height: 200 },
  paddingT90: { paddingTop: 90 },
});

export const VerseListScreen = (
  props: RootStackScreenProps<E_VerseStackRoutes.VERSES_LIST>,
) => (
  <ViewModelProvider id={props.route.params.id}>
    <VerseListContent {...props} />
  </ViewModelProvider>
);
