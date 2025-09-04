/* eslint-disable react-native/no-inline-styles */
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import { TouchableOpacity, View } from "react-native-ui-lib";
import {
  FileAttachment,
  Gallery,
  Reaction,
  ReactionData,
} from "stream-chat-react-native";
import { MicrophoneBlackIcon } from "@/core/assets/svg";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";
import { CustomVoiceMessageAttachment } from "./CustomVoiceMessageAttachment";
import { ModalReaction } from "./ModalReaction";
import { OptionsModal } from "./OptionsModal";
import { useActionsCustomMessageContent } from "./useActionsCustomMessageContent";

export const CustomMessageFragment = () => {
  const { userProfile } = useAuthProvider();
  const { channel } = useViewModelProvider();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1%", "30%"], []);

  const {
    message,
    isMyMessage,
    formattedDate,
    images,
    videos,
    voiceMessage,
    voiceMessageReply,
    files,
    filesReply,
    imagesReply,
    videosReply,
    isModalVisible,
    formatTime,
    handleFileClick,
    showModal,
    hideModal,
    handleDelete,
    handleReply,
    setModalVisible,
  } = useActionsCustomMessageContent();

  const [reactions, setReactions] = useState<Reaction[]>([]);

  const handleAddReaction = useCallback(
    async (messageID: string, type: string, emoji: string) => {
      try {
        await channel.sendReaction(
          messageID,
          {
            type,
            myCustomField: emoji,
          },
          { enforce_unique: true },
        );
      } catch (error) {
        Toast.show({
          text1: "Error adding reaction",
        });
      }
    },
    [channel],
  );

  const handleDeleteMessage = useCallback(
    async (messageID: string, type: string) => {
      try {
        await channel.deleteReaction(messageID, type);
      } catch (error) {
        Toast.show({
          text1: "Error deleting message",
        });
      }
    },
    [channel],
  );

  const handleGetReactionsAndOpenModal = useCallback(
    async (
      messageID: string,
      ref: React.RefObject<BottomSheetModalMethods>,
    ) => {
      try {
        const result: ReactionData = await channel.getReactions(messageID, {
          limit: 10,
        });
        await ref.current?.present();
        return result;
      } catch (error) {
        Toast.show({
          text1: "Error to get reaction data",
        });
      }
    },
    [channel],
  );

  const uniqueTypes = new Set();
  const duplicateTypes = new Set();

  message.latest_reactions?.map((e) => {
    if (uniqueTypes.has(e.type)) {
      duplicateTypes.add(e.type);
    } else {
      uniqueTypes.add(e.type);
    }

    return null;
  });

  const deleteReactionByIndex = (id: number, userId: string) => {
    if (userId === userProfile?.userId) {
      const newReactions = reactions.filter((e, index) => index !== id);
      setReactions(newReactions);
    }
  };

  if (message.type === "deleted") {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.containerText,
            {
              backgroundColor: isMyMessage
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_04,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: isMyMessage
                  ? colorsLight.WHITE
                  : colorsLight.PRIMARY_TEXT_COLOR,
                fontStyle: "italic",
              },
            ]}
          >
            This message was delete
          </Text>
        </View>
        <View
          style={{
            marginRight: isMyMessage ? 5 : 0,
            marginLeft: isMyMessage ? 0 : 5,
          }}
          marginT-2
          marginB-2
        >
          <Text
            style={[
              styles.textCreatedAt,
              { textAlign: isMyMessage ? "right" : "left" },
            ]}
            color={colorsLight.SECONDARY_TEXT_COLOR}
          >
            {formattedDate}
          </Text>
        </View>
      </View>
    );
  }

  if (message.text && message.text.trim() !== "") {
    return (
      <>
        {message.quoted_message ? (
          <>
            <TouchableOpacity
              onLongPress={showModal}
              style={[
                styles.containerTextReply,
                {
                  backgroundColor: isMyMessage
                    ? colorsLight.PRIMARY_COLOR
                    : colorsLight.GRAY_04,
                },
              ]}
            >
              <View
                padding-12
                backgroundColor={colorsLight.WHITE}
                style={styles.containerQuotedMessage}
              >
                <TouchableOpacity>
                  <Text
                    color={
                      isMyMessage
                        ? colorsLight.PRIMARY_COLOR
                        : colorsLight.PRIMARY_TEXT_COLOR
                    }
                    style={styles.textNameQuotedMessage}
                  >
                    {message.quoted_message.user?.name}
                  </Text>
                  {message.quoted_message.text ? (
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      color={colorsLight.PRIMARY_TEXT_COLOR}
                      style={styles.textQuotedMessage}
                    >
                      {message.quoted_message.text?.trim()}
                    </Text>
                  ) : voiceMessageReply[0]?.audio_length ? (
                    <View centerV row height={30}>
                      <View marginT-4>
                        <MicrophoneBlackIcon width={12} height={12} />
                      </View>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        color={colorsLight.PRIMARY_TEXT_COLOR}
                        style={[
                          styles.textQuotedMessage,
                          { marginHorizontal: 2 },
                        ]}
                      >
                        Voice message
                      </Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        color={colorsLight.PRIMARY_TEXT_COLOR}
                        style={styles.textQuotedMessage}
                      >
                        ({formatTime(voiceMessageReply[0]?.audio_length)})
                      </Text>
                    </View>
                  ) : filesReply[0]?.title ? (
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      color={colorsLight.PRIMARY_TEXT_COLOR}
                      style={styles.textQuotedMessage}
                    >
                      {filesReply[0]?.title}
                    </Text>
                  ) : images ? (
                    <View style={styles.containerImageReply}>
                      <FastImage
                        source={{ uri: imagesReply[0]?.image_url }}
                        style={styles.imageReply}
                      />
                    </View>
                  ) : videos ? (
                    <View style={styles.containerImageReply}>
                      <FastImage
                        source={{ uri: videosReply[0]?.thumb_url }}
                        style={styles.imageReply}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.textReply,
                  {
                    color: isMyMessage
                      ? colorsLight.WHITE
                      : colorsLight.PRIMARY_TEXT_COLOR,
                  },
                ]}
              >
                {message.text.trim()}
              </Text>
              <View
                style={{
                  marginRight: isMyMessage ? 5 : 0,
                  marginLeft: isMyMessage ? 0 : 5,
                }}
              >
                <Text
                  style={[
                    styles.textCreatedAt,
                    { textAlign: isMyMessage ? "right" : "left" },
                  ]}
                  color={
                    isMyMessage
                      ? colorsLight.WHITE
                      : colorsLight.SECONDARY_TEXT_COLOR
                  }
                >
                  {formattedDate}
                </Text>
              </View>
            </TouchableOpacity>
            {message.latest_reactions &&
              message.latest_reactions.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    const result: any = await handleGetReactionsAndOpenModal(
                      message?.id,
                      bottomSheetRef,
                    );
                    setReactions(result?.reactions || []);
                  }}
                  row
                  backgroundColor={colorsLight.WHITE}
                  paddingV-4
                  paddingH-10
                  style={[
                    styles.containerMessageReplyReaction,
                    isMyMessage ? { right: 19 } : { left: 19 },
                  ]}
                >
                  {message.latest_reactions?.map((e) => (
                    <View key={Math.random()}>
                      <Text variant="caption" key={Math.random()}>
                        {e.myCustomField as ReactNode}
                      </Text>
                    </View>
                  ))}
                  {duplicateTypes.size > 0 && (
                    <Text
                      style={styles.textDuplicateReaction}
                      variant="caption"
                    >
                      2
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            <OptionsModal
              visible={isModalVisible}
              onRequestClose={hideModal}
              isMyMessage={isMyMessage}
              handleReply={handleReply}
              handleDelete={handleDelete}
              message={message}
              setModalVisible={setModalVisible}
              handleAddReaction={handleAddReaction}
            />
            <ModalReaction
              handleDeleteMessage={handleDeleteMessage}
              deleteReactionByIndex={deleteReactionByIndex}
              reactions={reactions}
              snapPoints={snapPoints}
              bottomSheetRef={bottomSheetRef}
            />
          </>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity
              onLongPress={showModal}
              style={[
                styles.containerText,
                {
                  backgroundColor: isMyMessage
                    ? colorsLight.PRIMARY_COLOR
                    : colorsLight.GRAY_04,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: isMyMessage
                      ? colorsLight.WHITE
                      : colorsLight.PRIMARY_TEXT_COLOR,
                  },
                ]}
              >
                {message.text.trim()}
              </Text>
            </TouchableOpacity>
            {message.latest_reactions &&
              message.latest_reactions.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    const result: any = await handleGetReactionsAndOpenModal(
                      message?.id,
                      bottomSheetRef,
                    );
                    setReactions(result?.reactions || []);
                  }}
                  row
                  backgroundColor={colorsLight.WHITE}
                  paddingV-4
                  paddingH-10
                  style={[
                    styles.containerMessageReaction,
                    isMyMessage ? { right: 19 } : { left: 19 },
                  ]}
                >
                  {message.latest_reactions?.map((e) => (
                    <View key={Math.random()}>
                      <Text variant="caption" key={Math.random()}>
                        {e.myCustomField as ReactNode}
                      </Text>
                    </View>
                  ))}
                  {duplicateTypes.size > 0 && (
                    <Text
                      style={styles.textDuplicateReaction}
                      variant="caption"
                    >
                      2
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            <OptionsModal
              visible={isModalVisible}
              onRequestClose={hideModal}
              isMyMessage={isMyMessage}
              handleReply={handleReply}
              handleDelete={handleDelete}
              message={message}
              setModalVisible={setModalVisible}
              handleAddReaction={handleAddReaction}
            />
            <ModalReaction
              handleDeleteMessage={handleDeleteMessage}
              deleteReactionByIndex={deleteReactionByIndex}
              reactions={reactions}
              snapPoints={snapPoints}
              bottomSheetRef={bottomSheetRef}
            />
            <View
              style={[
                {
                  marginRight: isMyMessage ? 5 : 0,
                  marginLeft: isMyMessage ? 0 : 5,
                },
                message.latest_reactions && message.latest_reactions.length > 0
                  ? { marginTop: Platform.OS === "ios" ? 18 : 20 }
                  : { marginTop: 2 },
              ]}
              marginB-10
            >
              <Text
                style={[
                  styles.textCreatedAt,
                  { textAlign: isMyMessage ? "right" : "left" },
                ]}
                color={colorsLight.SECONDARY_TEXT_COLOR}
              >
                {formattedDate}
              </Text>
            </View>
          </View>
        )}
      </>
    );
  } else if (images && voiceMessage) {
    return (
      <View style={styles.container}>
        {voiceMessage && voiceMessage.length > 0 ? (
          <>
            <TouchableOpacity onLongPress={showModal}>
              <CustomVoiceMessageAttachment
                audio_length={voiceMessage[0].audio_length}
                asset_url={voiceMessage[0].asset_url}
                type={voiceMessage[0].type}
              />
            </TouchableOpacity>
            {message.latest_reactions &&
              message.latest_reactions.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    const result: any = await handleGetReactionsAndOpenModal(
                      message?.id,
                      bottomSheetRef,
                    );
                    setReactions(result?.reactions || []);
                  }}
                  row
                  backgroundColor={colorsLight.WHITE}
                  paddingV-4
                  paddingH-10
                  style={[
                    styles.containerAttachmentReaction,
                    isMyMessage ? { right: 19 } : { left: 19 },
                  ]}
                >
                  {message.latest_reactions?.map((e) => (
                    <View key={Math.random()}>
                      <Text variant="caption" key={Math.random()}>
                        {e.myCustomField as ReactNode}
                      </Text>
                    </View>
                  ))}
                  {duplicateTypes.size > 0 && (
                    <Text
                      style={styles.textDuplicateReaction}
                      variant="caption"
                    >
                      2
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            <OptionsModal
              visible={isModalVisible}
              onRequestClose={hideModal}
              isMyMessage={isMyMessage}
              handleReply={handleReply}
              handleDelete={handleDelete}
              message={message}
              setModalVisible={setModalVisible}
              handleAddReaction={handleAddReaction}
            />
            <ModalReaction
              handleDeleteMessage={handleDeleteMessage}
              deleteReactionByIndex={deleteReactionByIndex}
              reactions={reactions}
              snapPoints={snapPoints}
              bottomSheetRef={bottomSheetRef}
            />
          </>
        ) : files && files.length > 0 ? (
          <>
            <FileAttachment
              attachment={files[0]}
              onLongPress={showModal}
              attachmentSize={40}
              onPress={() => handleFileClick(files[0]?.asset_url)}
              styles={{
                container: {
                  backgroundColor: isMyMessage
                    ? colorsLight.PRIMARY_COLOR
                    : colorsLight.GRAY_04,
                },
                title: {
                  color: isMyMessage
                    ? colorsLight.WHITE
                    : colorsLight.PRIMARY_TEXT_COLOR,
                },
                size: {
                  color: isMyMessage
                    ? colorsLight.WHITE
                    : colorsLight.PRIMARY_TEXT_COLOR,
                },
              }}
            />
            {message.latest_reactions &&
              message.latest_reactions.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    const result: any = await handleGetReactionsAndOpenModal(
                      message?.id,
                      bottomSheetRef,
                    );
                    setReactions(result?.reactions || []);
                  }}
                  row
                  backgroundColor={colorsLight.WHITE}
                  paddingV-4
                  paddingH-10
                  style={[
                    styles.containerAttachmentReaction,
                    isMyMessage ? { right: 19 } : { left: 19 },
                  ]}
                >
                  {message.latest_reactions?.map((e) => (
                    <View key={Math.random()}>
                      <Text variant="caption" key={Math.random()}>
                        {e.myCustomField as ReactNode}
                      </Text>
                    </View>
                  ))}
                  {duplicateTypes.size > 0 && (
                    <Text
                      style={styles.textDuplicateReaction}
                      variant="caption"
                    >
                      2
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            <OptionsModal
              visible={isModalVisible}
              message={message}
              onRequestClose={hideModal}
              isMyMessage={isMyMessage}
              handleReply={handleReply}
              handleDelete={handleDelete}
              setModalVisible={setModalVisible}
              handleAddReaction={handleAddReaction}
            />
            <ModalReaction
              handleDeleteMessage={handleDeleteMessage}
              deleteReactionByIndex={deleteReactionByIndex}
              reactions={reactions}
              snapPoints={snapPoints}
              bottomSheetRef={bottomSheetRef}
            />
          </>
        ) : (
          <>
            <Gallery onLongPress={showModal} images={images} videos={videos} />
            {message.latest_reactions &&
              message.latest_reactions.length > 0 && (
                <TouchableOpacity
                  onPress={async () => {
                    const result: any = await handleGetReactionsAndOpenModal(
                      message?.id,
                      bottomSheetRef,
                    );
                    setReactions(result?.reactions || []);
                  }}
                  row
                  backgroundColor={colorsLight.WHITE}
                  paddingV-4
                  paddingH-10
                  style={[
                    styles.containerAttachmentReaction,
                    isMyMessage ? { right: 19 } : { left: 19 },
                  ]}
                >
                  {message.latest_reactions?.map((e) => (
                    <View key={Math.random()}>
                      <Text variant="caption" key={Math.random()}>
                        {e.myCustomField as ReactNode}
                      </Text>
                    </View>
                  ))}
                  {duplicateTypes.size > 0 && (
                    <Text
                      style={styles.textDuplicateReaction}
                      variant="caption"
                    >
                      2
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            <OptionsModal
              visible={isModalVisible}
              onRequestClose={hideModal}
              isMyMessage={isMyMessage}
              handleReply={handleReply}
              handleDelete={handleDelete}
              message={message}
              setModalVisible={setModalVisible}
              handleAddReaction={handleAddReaction}
            />
            <ModalReaction
              handleDeleteMessage={handleDeleteMessage}
              deleteReactionByIndex={deleteReactionByIndex}
              reactions={reactions}
              snapPoints={snapPoints}
              bottomSheetRef={bottomSheetRef}
            />
          </>
        )}
        <View
          style={[
            {
              marginRight: isMyMessage ? 5 : 0,
              marginLeft: isMyMessage ? 0 : 5,
            },
            message.latest_reactions && message.latest_reactions.length > 0
              ? { marginTop: 20 }
              : { marginTop: 2 },
          ]}
          marginB-10
        >
          <Text
            style={[
              styles.textCreatedAt,
              { textAlign: isMyMessage ? "right" : "left" },
            ]}
            color={colorsLight.SECONDARY_TEXT_COLOR}
          >
            {formattedDate}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  containerMessageReaction: {
    gap: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 20,
    position: "absolute",
    bottom: 28,
  },
  containerMessageReplyReaction: {
    gap: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 20,
    position: "absolute",
    bottom: 4,
  },
  containerAttachmentReaction: {
    gap: 2,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 20,
    position: "absolute",
    bottom: 28,
  },
  containerText: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: undefined,
    height: undefined,
    marginVertical: 2,
  },
  text: {
    fontFamily: "Satoshi-Medium",
    fontSize: 15,
    maxWidth: 250,
  },
  containerTextReply: {
    borderRadius: 20,
    padding: 12,
    width: undefined,
    height: undefined,
    marginVertical: 2,
    marginBottom: 18,
  },
  textReply: {
    fontFamily: "Satoshi-Medium",
    fontSize: 15,
    maxWidth: 250,
    paddingVertical: 14,
  },
  containerQuotedMessage: {
    width: undefined,
    height: undefined,
    borderRadius: 15,
  },
  textQuotedMessage: {
    fontFamily: "Satoshi-Medium",
    fontSize: 12,
    maxWidth: 250,
    marginTop: 4,
  },
  textNameQuotedMessage: {
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
  },
  textCreatedAt: {
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
  containerImageReply: {
    width: 50,
    height: 50,
  },
  imageReply: {
    borderRadius: 10,
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  textDuplicateReaction: {
    fontFamily: "Satoshi-Medium",
    color: colorsLight.GRAY_03,
    fontWeight: "600",
  },
});
