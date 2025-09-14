import React from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogoHeartIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user/routes";
import {
  ProgressBarFragment,
  RenderButtonFragment,
  RenderTextFragment,
  ViewBirthdayFragment,
  ViewChurchFragment,
  ViewDriversFragment,
  ViewGenderFragment,
  ViewLocationFragment,
  ViewNameFragment,
  ViewPermissionLocationFragment,
  ViewPermissionNotificationFragment,
  ViewPermissionTrackingFragment,
  ViewPhotoFragment,
  ViewQuestionFragment,
  ViewSearchingFragment,
  ViewStoryFragment,
} from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const CompleteAccountContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.COMPLETE_ACCOUNT>) => {
    const { ref, pages, progress, navigationPanel } = useViewModelProvider();

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.flex}>
          <View style={[styles.centerH, styles.marginB24, styles.marginT32]}>
            <LogoHeartIcon />
          </View>
          <View style={styles.marginH16}>
            <ProgressBarFragment
              numberOfPages={pages.length}
              progress={progress}
            />
          </View>
          <AnimatedPagerView
            {...navigationPanel}
            ref={ref}
            style={styles.containerPager}
            scrollEnabled={true}
            initialPage={0}
          >
            <View style={[styles.paddingH16, styles.flex1]}>
              <ViewNameFragment />
            </View>
            <View style={[styles.paddingH16, styles.flex1]}>
              <ViewBirthdayFragment />
            </View>
            <View style={styles.flex1}>
              <ViewGenderFragment />
            </View>
            <View style={[styles.paddingH16, styles.flex1]}>
              <ViewSearchingFragment />
            </View>
            <View style={[styles.paddingH16, styles.flex1]}>
              <ViewPhotoFragment />
            </View>
            <View style={styles.flex1}>
              <ViewChurchFragment />
            </View>
            <View style={styles.flex1}>
              <ViewDriversFragment />
            </View>
            <View style={styles.flex1}>
              <ViewQuestionFragment />
            </View>
            <View style={styles.flex1}>
              <ViewStoryFragment />
            </View>
            <View style={styles.flex1}>
              <ViewLocationFragment />
            </View>
            <View style={styles.flex1}>
              <ViewPermissionLocationFragment />
            </View>
            <View style={styles.flex1}>
              <ViewPermissionNotificationFragment />
            </View>
            <View style={styles.flex1}>
              <ViewPermissionTrackingFragment />
            </View>
          </AnimatedPagerView>
        </ScrollView>
        <View style={[styles.fullWidth, styles.paddingH16]}>
          <RenderTextFragment />
          <RenderButtonFragment />
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  containerPager: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingTop: 16,
  },
  centerH: { alignItems: "center" },
  marginB24: { marginBottom: 24 },
  marginT32: { marginTop: 32 },
  marginH16: { marginHorizontal: 16 },
  paddingH16: { paddingHorizontal: 16 },
  flex1: { flex: 1 },
  fullWidth: { width: "100%" },
});

export const CompleteAccountScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.COMPLETE_ACCOUNT>,
) => (
  <ViewModelProvider>
    <CompleteAccountContent {...props} />
  </ViewModelProvider>
);
