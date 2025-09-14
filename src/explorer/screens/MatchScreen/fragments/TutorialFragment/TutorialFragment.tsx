import React, { useEffect, useState } from "react";
import {
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
import { BlurView } from "@react-native-community/blur";
import { Text } from "@react-native-material/core";
import * as Animatable from "react-native-animatable";
import { CircleButton } from "@/core/components";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setShowTabBar } from "@/core/slices/tabBarSlice";
import {
  ClickLeftIcon,
  ClickRightIcon,
  FilterIcon,
  HandLeftIcon,
  HandRightIcon,
  HandTopIcon,
  ReloadIcon,
} from "@/explorer/assets/svg";
import { useViewModelProvider } from "../../ViewModelContext";

type Animations = {
  [key: string]:
    | string
    | Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>
    | undefined;
};

export const TutorialFragment = () => {
  const dispatch = useAppDispatch();
  const { showTutorial, setShowTutorial } = useViewModelProvider();

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
        transform: [{ rotate: "-35deg" }],
      },
    },
    swipeRight: {
      from: {
        transform: [{ rotate: "0deg" }],
      },
      to: {
        transform: [{ rotate: "35deg" }],
      },
    },
    touchLeftTop: {
      from: {
        marginRight: 0,
        marginTop: 70,
        marginBottom: 0,
        transform: [{ rotate: "0deg" }],
      },
      to: {
        marginRight: 20,
        marginTop: 40,
        marginBottom: 30,
        transform: [{ rotate: "-10deg" }],
      },
    },
    touchRightTop: {
      from: {
        marginLeft: 0,
        marginTop: 70,
        marginBottom: 0,
        transform: [{ rotate: "0deg" }],
      },
      to: {
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 30,
        transform: [{ rotate: "10deg" }],
      },
    },
  };

  useEffect(() => {
    switch (tutorial) {
      case 1:
        dispatch(setShowTabBar(true));
        setTutorialInfo({
          icon: <HandTopIcon />,
          texts: ["Scroll down to know more about this person."],
          tabMessage: "Tap to continue",
          animation: "fadeInDown",
          style: {
            justifyContent: "center",
            alignItems: "center",
          },
        });
        break;
      case 2:
        setTutorialInfo({
          icon: <HandRightIcon />,
          texts: ["Swipe right if you like the person."],
          tabMessage: "Tap to continue",
          animation: "swipeRight",
          style: {
            justifyContent: "center",
            alignItems: "center",
          },
        });
        break;
      case 3:
        setTutorialInfo({
          icon: <HandLeftIcon />,
          texts: ["Swipe left to go to the next person."],
          tabMessage: "Tap to continue",
          animation: "swipeLeft",
          style: {
            justifyContent: "center",
            alignItems: "center",
          },
        });
        break;
      case 4:
        setTutorialInfo({
          icon: <ClickLeftIcon />,
          texts: [
            "Did you swipe in the wrong direction? Don't worry you can go back by tapping here.",
          ],
          tabMessage: "Tap to continue",
          animation: "touchLeftTop",
          style: {
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
        });
        break;
      case 5:
        setTutorialInfo({
          icon: <ClickRightIcon />,
          texts: ["Tap here to adjust your search filters."],
          tabMessage: "Tap to continue",
          animation: "touchRightTop",
          style: {
            justifyContent: "flex-start",
            alignItems: "flex-end",
          },
        });
        break;
      default:
        dispatch(setShowTabBar(false));
        setShowTutorial(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorial]);

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
            <TouchableOpacity
              onPress={() => setTutorial(tutorial + 1)}
              style={[styles.tutorialTouchable, tutorialInfo.style]}
            >
              {tutorial > 3 && (
                <View style={styles.topButtonsContainer}>
                  {tutorial === 4 && (
                    <View>
                      <CircleButton
                        backgroundColor="#E9ECE9"
                        width={44}
                        height={44}
                        icon={<ReloadIcon />}
                      />
                    </View>
                  )}
                  <View style={styles.flex1} />
                  {tutorial === 5 && (
                    <CircleButton
                      backgroundColor="#E9ECE9"
                      width={44}
                      height={44}
                      icon={<FilterIcon />}
                    />
                  )}
                </View>
              )}
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
              {tutorialInfo.tabMessage && (
                <Text style={styles.tapContinueText}>
                  {tutorialInfo.tabMessage}
                </Text>
              )}
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
  topButtonsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row",
  },
  flex1: { flex: 1 },
  text: {
    color: "#FEFEFF",
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    marginTop: 30,
  },
  tutorialTouchable: {
    flex: 1,
  },
  tapContinueText: {
    color: "#FEFEFF",
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
    marginTop: 80,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
