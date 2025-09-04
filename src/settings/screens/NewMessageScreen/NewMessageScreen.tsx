import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { optionsNotifications } from "@/core/fakeDb/optionsNotifications";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { generalNotificationsCopies } from "@/core/utils/copies";
import { S_SettingsStackRoutes } from "@/settings/routes";
import { OptionSwitchFragment } from "./fragments";
import { ViewModelProvider } from "./ViewModelContext";

export const NewMessageContent =
  ({}: RootStackScreenProps<S_SettingsStackRoutes.NEW_MESSAGE_SCREEN>) => {
    return (
      <View
        paddingH-20
        centerH
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        flex
      >
        <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.subtitle}>
          {generalNotificationsCopies.subtitle}
        </Text>
        <View width="100%">
          <FlatList
            style={styles.flatLisOptionsNotifications}
            data={optionsNotifications}
            renderItem={({ item }) => (
              <OptionSwitchFragment title={item.title} />
            )}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
          />
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  subtitle: {
    width: "80%",
    fontSize: 14,
    textAlign: "center",
    marginTop: 36,
    marginBottom: 36,
    fontFamily: "Satoshi-Regular",
  },
  flatLisOptionsNotifications: {
    paddingTop: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
});

export const NewMessageScreen = (
  props: RootStackScreenProps<S_SettingsStackRoutes.NEW_MESSAGE_SCREEN>,
) => (
  <ViewModelProvider>
    <NewMessageContent {...props} />
  </ViewModelProvider>
);
