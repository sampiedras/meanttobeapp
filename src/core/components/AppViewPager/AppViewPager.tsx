import React from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import PagerView from "react-native-pager-view";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

interface AppViewPagerProps {
  customRef: React.RefObject<PagerView>;
  navigationPanel?: any;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const AppViewPager = React.memo(
  ({
    customRef,
    navigationPanel = {},
    scrollEnabled = true,
    style,
    children,
  }: AppViewPagerProps) => {
    return (
      <AnimatedPager
        {...navigationPanel}
        ref={customRef}
        style={[styles.pagerView, style]}
        scrollEnabled={scrollEnabled}
        initialPage={0}
      >
        {children}
      </AnimatedPager>
    );
  },
);

AppViewPager.displayName = "AppViewPager";

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export { AppViewPager };
