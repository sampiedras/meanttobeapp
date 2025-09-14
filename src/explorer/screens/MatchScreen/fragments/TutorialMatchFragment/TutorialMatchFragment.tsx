import React, { useEffect, useState } from "react";
import {
  Image,
  ImageStyle,
  Modal,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "@react-native-community/blur";
import { Text } from "@react-native-material/core";
import * as Animatable from "react-native-animatable";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setShowTabBar } from "@/core/slices/tabBarSlice";
import { HEAR_V2_IMAGE } from "@/explorer/assets/images";
import { ClickLeftIcon } from "@/explorer/assets/svg";

type Animations = {
  [key: string]:
    | string
    | Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>
    | undefined;
};

export const TutorialMatchFragment = () => {
  const dispatch = useAppDispatch();

  const [showTutorial, setShowTutorial] = useState(false);

  const [tutorial, setTutorial] = useState<number>(1);
  const [tutorialInfo, setTutorialInfo] = useState<{
    icon: any;
    texts: string[];
    tabMessage?: string;
    animation: string;
    style: StyleProp<ViewStyle>;
  } | null>(null);

  const animations: Animations = {
    fadeInDown: "fadeInDown",
    swipeLeft: {
      from: {
        transform: [{ rotate: "0deg" }],
      },
      to: {
        transform: [{ rotate: "-10deg" }],
      },
    },
  };

  useEffect(() => {
    switch (tutorial) {
      case 1:
        dispatch(setShowTabBar(true));
        setTutorialInfo({
          icon: <ClickLeftIcon />,
          texts: ["Click the heart to send him/her a touch to notice you."],
          tabMessage: "Tap to continue",
          animation: "swipeLeft",
          style: {
            alignItems: "center",
          },
        });
        break;
      default:
        dispatch(setShowTabBar(false));
        setShowTutorial(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial]);
  useEffect(() => {
    (async () => {
      const isTutorialMatch = await AsyncStorage.getItem(
        "TUTORIAL_MATCH_TUTORIAL_HEART",
      );
      if (isTutorialMatch) {
        setShowTutorial(false);
      } else {
        setShowTutorial(true);
      }
    })();
  }, []);

  return (
    <Modal visible={showTutorial} transparent>
      <View style={styles.container}>
        <BlurView
          style={styles.container}
          blurType="regular"
          reducedTransparencyFallbackColor="#AEB7B4"
        />
        {!!tutorialInfo && (
          <Animatable.View style={styles.content}>
            <Image source={HEAR_V2_IMAGE} width={100} />
            <TouchableOpacity
              onPress={() => {
                setTutorial(tutorial + 1);
                AsyncStorage.setItem("TUTORIAL_MATCH_TUTORIAL_HEART", "true");
              }}
              style={[styles.tutorialTouchable, tutorialInfo.style]}
            >
              <Animatable.View
                animation={animations[tutorialInfo.animation]}
                duration={2000}
                iterationCount={"infinite"}
              >
                <TouchableOpacity>{tutorialInfo.icon}</TouchableOpacity>
              </Animatable.View>
              {tutorialInfo.texts.map((text, index) => (
                <Text key={index} style={styles.text}>
                  {text}
                </Text>
              ))}
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#AEB7B4",
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#AEB7B4",
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FEFEFF",
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    marginTop: 30,
  },
  tutorialTouchable: {
    flex: 1,
  },
});
