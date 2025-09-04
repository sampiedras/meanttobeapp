import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { View } from "react-native-ui-lib";
import {
  ChannelList,
  DefaultStreamChatGenerics,
} from "stream-chat-react-native";
import { PERSONS_IMAGE } from "@/core/assets/images";
import {
  AppContainerSafeArea,
  AppGradientButton,
  SearchBar,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { TabsHomeScreenProps } from "@/core/types/StackRoutes";
import { E_ExplorerStackRoutes } from "@/explorer";
import { CustomListItemFragment, ListEmptyFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const MessageContent =
  ({}: TabsHomeScreenProps<E_ExplorerStackRoutes.MESSAGES>) => {
    const {
      filters,
      searchText,
      isSubscriptionActive,
      setSearchText,
      navigateToChannel,
      handleShowModalPremium,
    } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        {isSubscriptionActive ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <View paddingH-16>
              <Text
                style={styles.titlePrincipal}
                variant="h5"
                color={colorsLight.PRIMARY_TEXT_COLOR}
              >
                Messages
              </Text>
              <SearchBar
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.containerSearchBar}
              />
            </View>
            <View
              backgroundColor={colorsLight.GRAY_LIST_CHAT}
              style={styles.listContainer}
            >
              <View center>
                <View
                  height={6}
                  width={50}
                  marginT-14
                  marginB-19
                  backgroundColor={colorsLight.GRAY_04}
                  style={styles.bottomSheet}
                />
              </View>

              <ChannelList<DefaultStreamChatGenerics>
                filters={filters}
                EmptyStateIndicator={ListEmptyFragment}
                Preview={CustomListItemFragment}
                onSelect={(channel) => navigateToChannel(channel.id)}
              />
            </View>
          </ScrollView>
        ) : (
          <View flex-1 centerV paddingH-16>
            <FastImage source={PERSONS_IMAGE} style={styles.image} />
            <View>
              <Text style={styles.title}>This is a premium feature</Text>
              <Text style={styles.text}>
                Gain access to this and other premium features by purchasing
                premium.
              </Text>
              <AppGradientButton
                width={"100%"}
                label="Get premium"
                style={styles.buttonPremium}
                onPress={handleShowModalPremium}
                height={54}
              />
            </View>
          </View>
        )}
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    paddingBottom: 96,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  titlePrincipal: {
    fontFamily: "Satoshi-Black",
    marginBottom: 24,
    marginTop: 32,
  },
  containerSearchBar: {
    marginBottom: 32,
  },
  listContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheet: {
    borderRadius: 100,
  },
  buttonPremium: {
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    color: colorsLight.GRAY_03,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Satoshi-Black",
    textAlign: "center",
    marginTop: 16,
  },
  image: { alignSelf: "center" },
});

export const MessageScreen = (
  props: TabsHomeScreenProps<E_ExplorerStackRoutes.MESSAGES>,
) => (
  <ViewModelProvider>
    <MessageContent {...props} />
  </ViewModelProvider>
);
