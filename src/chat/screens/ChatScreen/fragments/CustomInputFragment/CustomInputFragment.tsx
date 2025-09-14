/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import {
  AutoCompleteInput,
  FileUploadPreview,
  ImageUploadPreview,
  useChannelContext,
  useMessageInputContext,
  useMessagesContext,
} from "stream-chat-react-native";
import {
  AttachIcon,
  CloseAudioIcon,
  MicrophoneIcon,
  SendAudioIcon,
  SendIcon,
} from "@/core/assets/svg";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { formatTime } from "@/core/utils/formatTime";

const audioRecorderPlayer = new AudioRecorderPlayer();

export const CustomInputFragment = () => {
  const { client } = useAuthProvider();
  const {
    sendMessage,
    text,
    toggleAttachmentPicker,
    imageUploads,
    fileUploads,
  } = useMessageInputContext();

  const { updateMessage } = useMessagesContext();
  const { channel } = useChannelContext();

  const [recordingActive, setRecordingActive] = useState(false);
  const [_recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSendVoiceMessage = useCallback(
    async (uri: string) => {
      const message: any = {
        created_at: new Date(),
        attachments: [
          {
            asset_url: uri,
            file_size: 200,
            mime_type: "audio/mp4",
            title: "test.mp4",
            type: "voice-message",
            audio_length: recordTime,
          },
        ],
        mentioned_users: [],
        id: `random-id-${new Date().toTimeString()}`,
        status: "sending",
        type: "regular",
        user: client.user,
      };

      updateMessage(message);

      const res = await channel.sendFile(uri, "test.mp4", "audio/mp4");
      const {
        created_at,
        html,
        type,
        status,
        user,
        ...messageWithoutReservedFields
      } = message;

      messageWithoutReservedFields.attachments[0].asset_url = res.file;

      // Send the message on channel.
      await channel.sendMessage(messageWithoutReservedFields);
    },
    [channel, client.user, recordTime, updateMessage],
  );

  const handleOnStartRecord = useCallback(async () => {
    setRecordingActive(true);

    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)) as any,
      );

      return;
    });
  }, []);

  const handleOnStopRecord = useCallback(async () => {
    setRecordingActive(false);

    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);

    await handleSendVoiceMessage(result);
  }, [handleSendVoiceMessage]);

  const handleResetRecording = useCallback(async () => {
    setRecordingActive(false);

    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const isDisabled =
    !text.trim() && !imageUploads.length && !fileUploads.length;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.containerKeyboardAvoidingView}>
        <View style={{ width: "100%" }}>
          <ImageUploadPreview />
          <FileUploadPreview />
          <View
            style={[
              styles.row,
              styles.inputContainer,
              isKeyboardVisible && Platform.OS === "ios"
                ? // eslint-disable-next-line react-native/no-inline-styles
                  { marginBottom: 40 }
                : null,
            ]}
          >
            {!recordingActive ? (
              <>
                <View
                  style={[styles.center, styles.marginL16, styles.marginR19]}
                >
                  <TouchableOpacity onPress={toggleAttachmentPicker}>
                    <AttachIcon />
                  </TouchableOpacity>
                </View>
                <AutoCompleteInput
                  additionalTextInputProps={{
                    placeholder: "Type Message",
                    style: {
                      flex: 1,
                      alignSelf: "center",
                      color: colorsLight.PRIMARY_TEXT_COLOR,
                      marginBottom: Platform.OS === "ios" ? 4 : 0,
                    },
                  }}
                />
                {isDisabled ? (
                  <View style={[styles.center, styles.marginH12, styles.row]}>
                    <View style={[styles.marginV29, styles.lineDivider]} />
                    <TouchableOpacity onLongPress={handleOnStartRecord}>
                      <MicrophoneIcon />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.center, styles.marginH12, styles.row]}>
                    <View style={[styles.marginV29, styles.lineDivider]} />
                    <TouchableOpacity onPress={() => sendMessage()}>
                      <SendIcon />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View
                style={[
                  styles.row,
                  styles.containerRecording,
                  styles.flex1,
                  styles.paddingH16,
                  styles.paddingV10,
                  styles.centerV,
                  { backgroundColor: colorsLight.PRIMARY_TEXT_COLOR },
                ]}
              >
                <View style={styles.rowCenterV}>
                  <TouchableOpacity onPress={handleResetRecording}>
                    <CloseAudioIcon />
                  </TouchableOpacity>
                  <View style={styles.marginL9}>
                    <Text color={colorsLight.WHITE}>
                      {formatTime(recordTime)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleOnStopRecord}>
                  <SendAudioIcon />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerKeyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_04,
  },
  row: { flexDirection: "row" },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  center: { justifyContent: "center", alignItems: "center" },
  marginL16: { marginLeft: 16 },
  marginR19: { marginRight: 19 },
  marginH12: { marginHorizontal: 12 },
  marginV29: { marginVertical: 29 },
  paddingH16: { paddingHorizontal: 16 },
  paddingV10: { paddingVertical: 10 },
  centerV: { alignItems: "center" },
  flex1: { flex: 1 },
  lineDivider: {
    width: 24,
    height: 0,
    transform: [{ rotate: "90deg" }],
    transformOrigin: "0% 0%",
    borderWidth: 1,
    borderColor: colorsLight.GRAY_04,
    borderStyle: "solid",
  },
  containerRecording: {
    borderRadius: 100,
    justifyContent: "space-between",
  },
});
