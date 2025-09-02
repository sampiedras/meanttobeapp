import {Modal, NativeSyntheticEvent, Platform, StyleSheet} from 'react-native';
import React from 'react';
import {colorsLight} from '@/theme/colorsLight';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {DeleteRedIcon, ReplyIcon} from '@/assets/svg';
import {DefaultStreamChatGenerics, MessageType} from 'stream-chat-react-native';

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
    {emoji: '👍', type: 'thumbsUp'},
    {emoji: '❤️', type: 'heart'},
    {emoji: '😂', type: 'happy'},
    {emoji: '😮', type: 'surprise'},
    {emoji: '😢', type: 'sad'},
    {emoji: '🙏🏻', type: 'hands'},
    {emoji: '😠', type: 'angry'},
  ];
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        onPress={onRequestClose}
        flex-1
        paddingH-16
        style={styles.modalContainer}>
        <View
          height={50}
          backgroundColor={colorsLight.WHITE}
          style={[
            {alignSelf: isMyMessage ? 'flex-end' : 'flex-start'},
            styles.containerReactions,
          ]}
          row>
          {emojiOptions.map(emoji => (
            <TouchableOpacity
              key={emoji.type}
              onPress={() => {
                handleAddReaction(message.id, emoji.type, emoji.emoji);
                setModalVisible(false);
              }}>
              <Text>{emoji.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          row
          centerV
          paddingH-24
          paddingV-16
          backgroundColor={colorsLight.WHITE}
          style={[
            styles.modalContent,
            {
              justifyContent: isMyMessage ? 'space-between' : 'center',
              alignItems: 'flex-end',
            },
          ]}>
          {isMyMessage ? (
            <>
              <TouchableOpacity center row onPress={handleDelete}>
                <DeleteRedIcon />
                <Text
                  style={styles.textDelete}
                  color={colorsLight.PRIMARY_TEXT_COLOR}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity center row onPress={handleReply}>
                <ReplyIcon />
                <Text
                  style={styles.textReply}
                  color={colorsLight.PRIMARY_TEXT_COLOR}>
                  Reply
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity center row onPress={handleReply}>
                <ReplyIcon />
                <Text
                  style={styles.textReply}
                  color={colorsLight.PRIMARY_TEXT_COLOR}>
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
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 34,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 10,
    left: 10,
    right: 10,
  },
  textReply: {
    marginLeft: 6,
    fontFamily: 'Satoshi-Medium',
  },
  textDelete: {
    marginLeft: 6,
    fontFamily: 'Satoshi-Medium',
  },
  containerReactions: {
    borderRadius: 30,
    alignItems: 'center',
    padding: 14,
    gap: 16,
  },
});
