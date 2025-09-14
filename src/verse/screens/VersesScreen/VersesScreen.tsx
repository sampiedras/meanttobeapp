import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { FlatListWrap, SearchBar } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_VerseStackRoutes } from "@/verse";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const VersesContent =
  ({}: RootStackScreenProps<E_VerseStackRoutes.VERSES>) => {
    const {
      data,
      searchText,
      isFetching,
      handleRefresh,
      handleSearch,
      handleNavigate,
    } = useViewModelProvider();
    return (
      <View style={styles.container}>
        <FlatListWrap
          refreshing={handleRefresh}
          isLoading={isFetching}
          onPressNavigation={handleNavigate}
          ListHeaderComponent={
            <View style={styles.paddingH8}>
              <Text style={styles.title}>Verses</Text>
              <SearchBar
                placeholder="Search"
                style={styles.search}
                value={searchText}
                onChangeText={handleSearch}
              />
              <Text style={styles.subTitleText}>Categories</Text>
            </View>
          }
          dataItem={data}
          imageProperty={"coverImg"}
        />
        {data && data.length === 0 ? (
          <>
            {searchText ? (
              <View style={[styles.flex1, styles.centerH]}>
                <Text
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  variant="h6"
                  style={styles.titleCouldNotFind}
                >
                  Could not find{"\n"}"{searchText}"
                </Text>
                <Text
                  color={colorsLight.SECONDARY_TEXT_COLOR}
                  variant="body2"
                  style={styles.subtitleCouldNotFind}
                >
                  Search again or try a different keyword
                </Text>
              </View>
            ) : (
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 26,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  paddingH8: { paddingHorizontal: 8 },
  title: {
    color: "black",
    fontSize: 34,
    fontFamily: "Satoshi-Bold",
  },
  subTitleText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Satoshi-Black",
    marginBottom: 20,
  },
  search: {
    marginTop: 28,
    marginBottom: 36,
  },
  titleCouldNotFind: {
    fontFamily: "Satoshi-Bold",
    textAlign: "center",
  },
  subtitleCouldNotFind: {
    fontFamily: "Satoshi-Regular",
    marginTop: 14,
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
  centerH: { alignItems: "center" },
  flex: { flex: 1 },
  flex1: { flex: 1 },
  height200: { height: 200 },
  paddingT90: { paddingTop: 90 },
});

export const VersesScreen = (
  props: RootStackScreenProps<E_VerseStackRoutes.VERSES>,
) => (
  <ViewModelProvider>
    <VersesContent {...props} />
  </ViewModelProvider>
);
