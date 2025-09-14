/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Modal,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import {
  DefaultStreamChatGenerics,
  MessageType,
} from "stream-chat-react-native";
import { DeleteRedIcon, ReplyIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface IOptionsModal {
  visible: boolean;
  isMyMessage?: boolean;
  message: MessageType<DefaultStreamChatGenerics>;
  onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined;
  handleDelete?: () => void;
  handleReply?: () => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddReaction: (
    messageID: string,
    type: string,
    emoji: string,
  ) => Promise<void>;
}

export const OptionsModal = ({
  visible,
  isMyMessage,
  message,
  onRequestClose,
  handleDelete,
  handleReply,
  setModalVisible,
  handleAddReaction,
}: IOptionsModal) => {
  interface EmojiData {
    emoji: string;
    type: string;
  }

  const emojiOptions: EmojiData[] = [
    { emoji: "👍", type: "thumbsUp" },
    { emoji: "❤️", type: "heart" },
    { emoji: "😂", type: "happy" },
    { emoji: "😮", type: "surprise" },
    { emoji: "😢", type: "sad" },
    { emoji: "🙏🏻", type: "hands" },
    { emoji: "😠", type: "angry" },
  ];
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        onPress={onRequestClose}
        style={[styles.modalContainer, styles.flex1, styles.paddingH16]}
      >
        <View
          style={[
            styles.height50,
            {
              backgroundColor: colorsLight.WHITE,
              alignSelf: isMyMessage ? "flex-end" : "flex-start",
            },
            styles.containerReactions,
            styles.row,
          ]}
        >
          {emojiOptions.map((emoji) => (
            <TouchableOpacity
              key={emoji.type}
              onPress={() => {
                handleAddReaction(message.id, emoji.type, emoji.emoji);
                setModalVisible(false);
              }}
            >
              <Text>{emoji.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            styles.row,
            styles.centerV,
            styles.paddingH24,
            styles.paddingV16,
            { backgroundColor: colorsLight.WHITE },
            styles.modalContent,
            {
              justifyContent: isMyMessage ? "space-between" : "center",
              alignItems: "flex-end",
            },
          ]}
        >
          {isMyMessage ? (
            <>
              <TouchableOpacity style={styles.rowCenter} onPress={handleDelete}>
                <DeleteRedIcon />
                <Text
                  style={styles.textDelete}
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowCenter} onPress={handleReply}>
                <ReplyIcon />
                <Text
                  style={styles.textReply}
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                >
                  Reply
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.rowCenter} onPress={handleReply}>
                <ReplyIcon />
                <Text
                  style={styles.textReply}
                  color={colorsLight.PRIMARY_TEXT_COLOR}
                >
                  Reply
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  flex1: { flex: 1 },
  paddingH16: { paddingHorizontal: 16 },
  height50: { height: 50 },
  row: { flexDirection: "row" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  centerV: { alignItems: "center" },
  paddingH24: { paddingHorizontal: 24 },
  paddingV16: { paddingVertical: 16 },
  modalContent: {
    borderRadius: 34,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 10,
    left: 10,
    right: 10,
  },
  textReply: {
    marginLeft: 6,
    fontFamily: "Satoshi-Medium",
  },
  textDelete: {
    marginLeft: 6,
    fontFamily: "Satoshi-Medium",
  },
  containerReactions: {
    borderRadius: 30,
    alignItems: "center",
    padding: 14,
    gap: 16,
  },
});
