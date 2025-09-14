import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
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
            <View style={styles.paddingH16}>
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
              style={[
                styles.listContainer,
                { backgroundColor: colorsLight.GRAY_LIST_CHAT },
              ]}
            >
              <View style={styles.center}>
                <View
                  style={[
                    styles.bottomSheet,
                    styles.height6,
                    styles.width50,
                    styles.marginT14,
                    styles.marginB19,
                    { backgroundColor: colorsLight.GRAY_04 },
                  ]}
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
          <View style={[styles.flex1, styles.centerV, styles.paddingH16]}>
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
  paddingH16: { paddingHorizontal: 16 },
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
  center: { alignItems: "center", justifyContent: "center" },
  height6: { height: 6 },
  width50: { width: 50 },
  marginT14: { marginTop: 14 },
  marginB19: { marginBottom: 19 },
  flex1: { flex: 1 },
  centerV: { alignItems: "center" },
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
