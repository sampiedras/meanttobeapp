import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { Channel, MessageInput, MessageList } from "stream-chat-react-native";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_ChatStackRoutes } from "../../";
import {
  CustomDateHeaderFragment,
  CustomHeaderFragment,
  CustomInputFragment,
  CustomMessageFragment,
} from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const ChatContent =
  ({}: RootStackScreenProps<E_ChatStackRoutes.CHAT>) => {
    const { userOwn, loading, channel } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <CustomHeaderFragment
          name={userOwn?.user?.name}
          avatar={userOwn?.user?.image}
        />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator
              style={styles.loading}
              color={colorsLight.PRIMARY_COLOR}
              size="large"
            />
          ) : channel ? (
            <Channel
              messageActions={({ deleteMessage, quotedReply, isMyMessage }) =>
                isMyMessage ? [deleteMessage, quotedReply] : [quotedReply]
              }
              channel={channel}
              DateHeader={CustomDateHeaderFragment}
              MessageContent={CustomMessageFragment}
              Input={CustomInputFragment}
              MessageAvatar={() => null}
              disableTypingIndicator
              MessageStatus={() => null}
              keyboardVerticalOffset={80}
            >
              <MessageList />
              <MessageInput />
            </Channel>
          ) : (
            <View style={[styles.center, styles.marginT20]}>
              <Text
                variant="body1"
                color={colorsLight.SECONDARY_TEXT_COLOR}
                style={styles.textNotFound}
              >
                No channel found
              </Text>
            </View>
          )}
        </View>
      </AppContainerSafeArea>
    );
  };

export const ChatScreen = (
  props: RootStackScreenProps<E_ChatStackRoutes.CHAT>,
) => (
  <ViewModelProvider channelId={props.route.params.channelId}>
    <ChatContent {...props} />
  </ViewModelProvider>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 6,
    flex: 1,
  },
  loading: {
    marginTop: 20,
  },
  textNotFound: {
    fontFamily: "Satoshi-Regular",
  },
});
