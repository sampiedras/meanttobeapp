import React, { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import AudioRecorderPlayer, {
  PlayBackType,
} from "react-native-audio-recorder-player";
import { View } from "react-native-ui-lib";
import { useMessageContext } from "stream-chat-react-native";
import {
  PauseVoiceMessageIcon,
  PauseVoiceMessageWhiteIcon,
  PlayVoiceMessageIcon,
  PlayVoiceMessageWhiteIcon,
} from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { SoundWave } from "./SoundWave";

interface VoiceMessageAttachmentProps {
  audio_length: unknown;
  asset_url: string | undefined;
  type: string | undefined;
}

export const CustomVoiceMessageAttachment = ({
  audio_length,
  asset_url,
  type,
}: VoiceMessageAttachmentProps) => {
  const { message, isMyMessage } = useMessageContext();
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentDurationSec, setCurrentDurationSec] = useState(audio_length);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(audio_length);
  const audioRecorderPlayer = useRef<AudioRecorderPlayer>(
    new AudioRecorderPlayer(),
  ).current;

  const onStartPlay = async () => {
    setPaused(false);
    setLoadingAudio(true);
    await audioRecorderPlayer.startPlayer(asset_url);

    setLoadingAudio(false);
    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition < 0) {
        return;
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)) as any,
      );
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)) as any);

      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
      return;
    });
  };

  const onPausePlay = async () => {
    setPaused(true);
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    setPaused(false);
    setCurrentPositionSec(0);
    setPlayTime(0);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  if (type !== "voice-message") {
    return null;
  }

  function formatTime(time?: any): any {
    if (!time || typeof time !== "string") {
      return "0:00";
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

  return (
    <View
      paddingV-9
      paddingL-9
      paddingR-16
      row
      backgroundColor={
        isMyMessage ? colorsLight.PRIMARY_COLOR : colorsLight.GRAY_04
      }
      style={styles.container}
    >
      <View
        backgroundColor={
          isMyMessage ? colorsLight.PRIMARY_COLOR : colorsLight.GRAY_04
        }
        style={styles.audioPlayerContainer}
      >
        {message.status === "sending" || loadingAudio ? (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator
              size="small"
              color={isMyMessage ? colorsLight.WHITE : colorsLight.BLACK}
            />
          </View>
        ) : currentPositionSec > 0 && !paused ? (
          <TouchableOpacity onPress={onPausePlay}>
            {isMyMessage ? (
              <PauseVoiceMessageWhiteIcon />
            ) : (
              <PauseVoiceMessageIcon />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onStartPlay}>
            {isMyMessage ? (
              <PlayVoiceMessageWhiteIcon />
            ) : (
              <PlayVoiceMessageIcon />
            )}
          </TouchableOpacity>
        )}
        <SoundWave
          assetUrl={asset_url as string}
          isMyMessage={isMyMessage}
          currentDurationInSeconds={currentDurationSec as number}
          currentPositionInSeconds={currentPositionSec}
        />
        <View
          backgroundColor={
            isMyMessage ? colorsLight.WHITE : colorsLight.PRIMARY_TEXT_COLOR
          }
          style={styles.progressDetailsContainer}
        >
          {paused ? (
            <Text
              color={
                isMyMessage ? colorsLight.PRIMARY_TEXT_COLOR : colorsLight.WHITE
              }
              style={styles.progressDetailsText}
            >
              {formatTime(duration)}
            </Text>
          ) : currentPositionSec > 0 ? (
            <Text
              color={
                isMyMessage ? colorsLight.PRIMARY_TEXT_COLOR : colorsLight.WHITE
              }
              style={styles.progressDetailsText}
            >
              {formatTime(playTime)}
            </Text>
          ) : (
            <Text
              color={
                isMyMessage ? colorsLight.PRIMARY_TEXT_COLOR : colorsLight.WHITE
              }
              style={styles.progressDetailsText}
            >
              {formatTime(duration)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    padding: 7,
  },
  container: {
    width: 250,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  audioPlayerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressDetailsContainer: {
    flexDirection: "row",
    borderRadius: 100,
    alignItems: "center",
    height: 25,
    width: "auto",
  },
  progressDetailsText: {
    paddingHorizontal: 5,
    fontSize: 10,
    fontFamily: "Satoshi-Bold",
  },
});
