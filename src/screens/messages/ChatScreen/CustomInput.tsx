import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "@react-native-material/core";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { LocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { StreamChat } from "stream-chat";
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
  MicrophoneIcon,
  SendAudioIcon,
  SendIcon,
} from "@/assets/svg";
import { colorsLight } from "@/theme/colorsLight";
import { GET_STREAM_API_KEY } from "@/utils/config";

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

export const CustomInput = () => {
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
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendVoiceMessage = async (uri: string) => {
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
  };

  const onStartRecord = async () => {
    setRecordingActive(true);

    await AudioRecorderPlayer.startRecorder();
    AudioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(
        AudioRecorderPlayer.mmssss(Math.floor(e.currentPosition)) as any
      );

      return;
    });
  };

  const onStopRecord = async () => {
    setRecordingActive(false);

    const result = await AudioRecorderPlayer.stopRecorder();
    AudioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);

    await sendVoiceMessage(result);
  };

  const resetRecording = async () => {
    setRecordingActive(false);

    await AudioRecorderPlayer.stopRecorder();
    AudioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
  };

  function formatTime(time?: any): any {
    if (!time || typeof time !== "string") {
      return "";
    }

    const parts = time.split(":");

    if (parts.length < 2) {
      return "";
    }

    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    if (isNaN(minutes) || isNaN(seconds)) {
      return "";
    }

    if (minutes === 0) {
      return `0:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }

  const isDisabled =
    !text.trim() && !imageUploads.length && !fileUploads.length;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.containerKeyboardAvoidingView}>
        <View width="100%">
          <ImageUploadPreview />
          <FileUploadPreview />
          <View
            width="100%"
            row
            style={[
              styles.inputContainer,
              isKeyboardVisible && Platform.OS === "ios"
                ? { marginBottom: 40 }
                : null,
            ]}
          >
            {!recordingActive ? (
              <>
                <View center marginL-16 marginR-19>
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
                  <View center marginH-12 row>
                    <View marginV-29 style={styles.lineDivider} />
                    <TouchableOpacity onLongPress={onStartRecord}>
                      <MicrophoneIcon />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View center marginH-12 row>
                    <View marginV-29 style={styles.lineDivider} />
                    <TouchableOpacity onPress={sendMessage}>
                      <SendIcon />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <View
                row
                style={styles.containerRecording}
                backgroundColor={colorsLight.PRIMARY_TEXT_COLOR}
                flex-1
                paddingH-16
                paddingV-10
                centerV
              >
                <View row centerV>
                  <TouchableOpacity onPress={resetRecording}>
                    <LocalSvg asset={require("@/assets/svg/close_audio.svg")} />
                  </TouchableOpacity>
                  <View marginL-9>
                    <Text color={colorsLight.WHITE}>
                      {formatTime(recordTime)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={onStopRecord}>
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
  fullWidth: {
    width: "100%",
  },
  inputContainer: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_04,
  },
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
