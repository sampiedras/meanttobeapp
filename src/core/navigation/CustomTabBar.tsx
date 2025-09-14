import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectTabBar } from "@/core/slices/tabBarSlice";
import { E_ExplorerStackRoutes } from "@/explorer";
import {
  DotIcon,
  ExploreTabBarIcon,
  LogoHeartIcon,
  MessagesTabBarIcon,
  UserCircleIcon,
} from "../assets/svg";
import { colorsLight } from "../theme";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const { show } = useSelector(selectTabBar);
  const translateY = useSharedValue(show ? 100 : 0);

  translateY.value = withTiming(show ? 100 : 0, {
    duration: 320,
    easing: Easing.out(Easing.ease),
  });

  const getIcon = (key: string) => {
    switch (key) {
      case E_ExplorerStackRoutes.MATCH:
        return <LogoHeartIcon width={24} height={24} />;
      case E_ExplorerStackRoutes.EXPLORER:
        return <ExploreTabBarIcon />;
      case E_ExplorerStackRoutes.MESSAGES:
        return <MessagesTabBarIcon />;
      case E_ExplorerStackRoutes.PROFILE:
        return <UserCircleIcon />;
      default:
        return <UserCircleIcon />;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
            key={index}
          >
            {getIcon(route?.name)}
            {isFocused ? <DotIcon /> : <View style={{ height: 6 }} />}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colorsLight.WHITE,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 32 : 16,
    elevation: 3,
    borderRadius: 34,
    shadowColor: "#00000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: "row",
    height: 68,
    width: "95%",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
