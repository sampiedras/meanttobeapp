import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
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
      <View
        flex
        paddingH-16
        paddingB-26
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
      >
        <FlatListWrap
          refreshing={handleRefresh}
          isLoading={isFetching}
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
              <Text style={styles.subTitleText}>Categories</Text>
            </View>
          }
          dataItem={data}
          imageProperty={"coverImg"}
        />
        {data && data.length === 0 ? (
          <>
            {searchText ? (
              <View flex-1 centerH>
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
              <View centerH flex height={200} paddingT-90>
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
});

export const VersesScreen = (
  props: RootStackScreenProps<E_VerseStackRoutes.VERSES>,
) => (
  <ViewModelProvider>
    <VersesContent {...props} />
  </ViewModelProvider>
);
