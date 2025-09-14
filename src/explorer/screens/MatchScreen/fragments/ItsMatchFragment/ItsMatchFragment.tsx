/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from "react";
import {
  ImageStyle,
  Modal,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { View as ViewMoti } from "moti";
import * as Animatable from "react-native-animatable";
import { Easing } from "react-native-reanimated";
import { E_ChatStackRoutes } from "@/chat";
import { AppGradientButton } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setVisible } from "@/core/slices/alertPremiumSlice";
import { colorsLight } from "@/core/theme";
import { CongratulationIcon } from "@/explorer/assets/svg";
import { useViewModelProvider } from "../../ViewModelContext";
import { TutorialMatchFragment } from "../TutorialMatchFragment";

export const ItsMatchFragment = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();
  const { userProfile, isSubscriptionActive, client } = useAuthProvider();
  const { userMatch, showIsMatch, setShowIsMatch } = useViewModelProvider();

  const animations = {
    _slideDown: {
      from: {
        marginTop: 0,
      },
      to: {
        marginTop: 100,
      },
    },
    _rotateViewLeft: {
      from: {
        top: 100,
        transform: [{ rotate: "0deg" }],
        left: 24,
        backgroundColor: "#CFD8CE",
      },
      to: {
        top: 52,
        transform: [{ rotate: "-40deg" }],
        left: width / 3.3,
        backgroundColor: "#B5C1B6",
      },
    },
    _rotateViewRight: {
      from: {
        top: 100,
        transform: [{ rotate: "0deg" }],
        right: 24,
        backgroundColor: "#B5C1B6",
      },
      to: {
        top: 52,
        transform: [{ rotate: "40deg" }],
        right: width / 3.3,
        backgroundColor: "#CFD8CE",
      },
    },
    _rotatePhotoLeft: {
      from: {
        top: 100,
        transform: [{ rotate: "0deg" }],
        left: 40,
      },
      to: {
        top: 64,
        transform: [{ rotate: "-40deg" }],
        left: width / 3,
      },
    },
    _rotatePhotoRight: {
      from: {
        top: 100,
        transform: [{ rotate: "0deg" }],
        right: 80,
      },
      to: {
        top: 64,
        transform: [{ rotate: "40deg" }],
        right: width / 3,
      },
    },
    _fadeInCenter: {
      from: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
      },
      to: {
        width: 300,
        height: 300,
        backgroundColor: "#F1F3F4",
      },
    },
    _fadeInMiddle: {
      from: {
        width: 300,
        height: 300,
        backgroundColor: "transparent",
      },
      to: {
        height: 420,
        width: 420,
        backgroundColor: "#C6CFC7",
      },
    },
    _fadeInExternal: {
      from: {
        width: 420,
        height: 420,
        backgroundColor: "transparent",
      },
      to: {
        height: 530,
        width: 530,
        backgroundColor: "#DBE1E0",
      },
    },
  };

  const [leftViewAnimation, setLeftViewAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >(animations._slideDown);
  const [rightViewAnimation, setRightViewAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();
  const [leftPhotoAnimation, setLeftPhotoAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >(animations._slideDown);
  const [rightPhotoAnimation, setRightPhotoAnimation] = useState<
    Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> | undefined
  >();

  const [showCircle, setShowCircle] = useState<boolean>(false);

  const onFirstAnimationEnd = () => {
    setLeftViewAnimation(animations._rotateViewLeft);
    setRightViewAnimation(animations._rotateViewRight);
    setLeftPhotoAnimation(animations._rotatePhotoLeft);
    setRightPhotoAnimation(animations._rotatePhotoRight);
  };

  const onSecondAnimationEnd = () => {
    setShowCircle(true);
  };

  const onGoToChat = () => {
    if (isSubscriptionActive) {
      navigate(E_ChatStackRoutes.CHAT, {
        channelId: userMatch?.channelId || "",
      });
      setShowIsMatch(false);
    } else {
      setShowIsMatch(false);
      dispatch(setVisible(true));
    }
  };

  const sendPokeMessage = useCallback(async () => {
    if (isSubscriptionActive) {
      const channel = client.channel("messaging", userMatch?.channelId);
      await channel.sendMessage({
        text: "👋",
        type: "regular",
      });
      await channel.sendMessage({
        text: "Hey, it's great to be able to talk",
      });
      navigate(E_ChatStackRoutes.CHAT, {
        channelId: userMatch?.channelId || "",
      });
      setShowIsMatch(false);
    } else {
      setShowIsMatch(false);
      dispatch(setVisible(true));
    }
  }, [
    client,
    dispatch,
    isSubscriptionActive,
    navigate,
    setShowIsMatch,
    userMatch?.channelId,
  ]);

  return (
    <Modal
      visible={showIsMatch}
      animationType="slide"
      transparent={true}
      style={styles.heartContainer}
    >
      <View style={[styles.modalContainer, styles.flex1]}>
        <TutorialMatchFragment />
        <View style={styles.marginT120}>
          {showCircle && (
            <View style={styles.rippleContainer}>
              {[...Array(3).keys()].map((_, index) => {
                return (
                  <ViewMoti
                    key={index}
                    from={{
                      opacity: 0.7,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 0,
                      scale: 4,
                    }}
                    transition={{
                      type: "timing",
                      duration: 2000,
                      easing: Easing.out(Easing.ease),
                      delay: index * 1000,
                      loop: true,
                    }}
                    style={{
                      backgroundColor: "#DBE1E0",
                      width: 120,
                      height: 120,
                      borderRadius: 120,
                      position: "absolute",
                    }}
                  />
                );
              })}
            </View>
          )}
          <TouchableOpacity
            onPressIn={() => {
              sendPokeMessage();
            }}
          >
            <Animatable.View
              style={[
                styles.matchingPhoto,
                { right: 40, top: 30, backgroundColor: "#B5C1B6" },
              ]}
              animation={rightViewAnimation}
              onAnimationEnd={onSecondAnimationEnd}
            />

            <Animatable.View
              animation={leftViewAnimation}
              style={[
                styles.matchingPhoto,
                {
                  left: 40,
                  top: 1,
                  backgroundColor: "#B5C1B6",
                },
              ]}
              onAnimationEnd={onFirstAnimationEnd}
            />

            <Animatable.Image
              animation={rightPhotoAnimation}
              source={{
                uri: userProfile?.avatar || "" || undefined,
              }}
              style={[styles.photo, { right: 52, top: 43 }]}
              onAnimationEnd={onSecondAnimationEnd}
            />
            <Animatable.Image
              animation={leftPhotoAnimation}
              source={{
                uri: userMatch?.userImage || "",
              }}
              style={[styles.photo, { left: 52, top: 13 }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTexts}>
          <CongratulationIcon height={40} width={168} />
          <Text style={styles.textMatch}>
            It's a
            <Text style={[styles.textMatch2, { color: "#4E6B51" }]}>
              {" "}
              Match!
            </Text>
          </Text>
          <Text style={styles.somethingText}>
            This is the start of something new.
          </Text>
          <Text style={styles.startText}>Start a conversation now.</Text>
          <AppGradientButton
            width="90%"
            label="Send a message"
            onPress={onGoToChat}
          />
          <TouchableOpacity onPress={() => setShowIsMatch(false)}>
            <View style={[styles.rowCenter, styles.paddingT24]}>
              <Text style={styles.notNowText}>Not now,</Text>
              <Text style={styles.continueText}>continue searching</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  matchingPhoto: {
    position: "absolute",
    height: 178,
    width: 112,
    borderRadius: 80,
  },
  photo: {
    position: "absolute",
    height: 152,
    width: 86,
    borderRadius: 80,
  },
  modalContainer: {
    position: "relative",
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  flex1: { flex: 1 },
  marginT120: { marginTop: 120 },
  heartContainer: {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paddingT24: { paddingTop: 24 },
  notNowText: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
  },
  startText: {
    color: "#727084",
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
    marginBottom: 30,
  },
  somethingText: {
    color: "#727084",
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
    paddingTop: 20,
  },
  textMatch: {
    color: "#1C1C21",
    fontSize: 32,
    fontFamily: "Satoshi-Black",
    paddingTop: 24,
  },
  textMatch2: {
    fontSize: 32,
    fontFamily: "Satoshi-Black",
    paddingTop: 24,
  },
  containerTexts: {
    position: "absolute",
    top: "55%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    fontFamily: "Satoshi-Regular",
    marginHorizontal: 4,
    color: colorsLight.PRIMARY_TEXT_COLOR,
  },
  rippleContainer: {
    position: "absolute",
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
