import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import {
  ChannelPreviewMessenger,
  ChannelPreviewMessengerProps,
  DefaultStreamChatGenerics,
} from "stream-chat-react-native";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";

export const CustomListItemFragment = (
  props: ChannelPreviewMessengerProps<DefaultStreamChatGenerics>,
) => {
  const { userProfile } = useAuthProvider();

  const customPreviewTitle = ({ channel }: { channel: any }) => {
    let userChat = Object.keys(channel?.state?.members).find(
      (key) => key !== userProfile?.userId,
    );

    let userOwn = channel?.state?.members[userChat || ""];

    return (
      <Text
        variant="body1"
        style={styles.textName}
        color={colorsLight.PRIMARY_TEXT_COLOR}
      >
        {userOwn?.user?.name}
      </Text>
    );
  };

  const customPreviewAvatar = ({ channel }: { channel: any }) => {
    let userChat = Object.keys(channel?.state?.members).find(
      (key) => key !== userProfile?.userId,
    );
    let userOwn = channel?.state?.members[userChat || ""];

    return (
      <FastImage style={styles.avatar} source={{ uri: userOwn?.user?.image }} />
    );
  };

  return (
    <ChannelPreviewMessenger
      PreviewTitle={customPreviewTitle}
      PreviewAvatar={customPreviewAvatar}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textName: {
    fontFamily: "Satoshi-Bold",
    marginBottom: 2,
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 100,
    marginRight: 20,
  },
});
