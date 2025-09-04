import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { Tag } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_SermonStackRoutes } from "@/sermon";
import { RenderItemFragment, TypeFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const SermonsContent =
  ({}: RootStackScreenProps<E_SermonStackRoutes.SERMONS>) => {
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
    } = useViewModelProvider();

    const numberOfSermons = dataSermon?.count ?? 0;
    const sermonText = numberOfSermons === 1 ? "Sermon" : "Sermons";

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
                  style={styles.containerTitle}
                >
                  <Text
                    variant="h4"
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    style={styles.title}
                  >
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
                    style={styles.titleTopSermons}
                  >
                    Top sermons
                  </Text>
                </View>
                <Text
                  variant="body1"
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                  style={styles.titleAllSermons}
                >
                  All sermons
                </Text>
                <View marginB-16>
                  <FlatList
                    horizontal
                    renderItem={({ item }) => (
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
                    keyExtractor={(item) => `${item?.id}`}
                  />
                </View>
              </>
            }
            refreshing={isLoading || loadingTypeSermon}
            onRefresh={handleRefetchSermon}
            renderItem={({ item }) => (
              <RenderItemFragment
                item={item}
                handleNavigateDetail={handleNavigateDetail}
              />
            )}
            data={sermonItems || []}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
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
                      color={colorsLight.SECONDARY_TEXT_COLOR}
                    >
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerTitle: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Satoshi-Bold",
  },
  sections: {
    justifyContent: "space-between",
  },
  titleTopSermons: {
    fontFamily: "Satoshi-Black",
  },
  titleAllSermons: {
    fontFamily: "Satoshi-Black",
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
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
});

export const SermonsScreen = (
  props: RootStackScreenProps<E_SermonStackRoutes.SERMONS>,
) => (
  <ViewModelProvider>
    <SermonsContent {...props} />
  </ViewModelProvider>
);
