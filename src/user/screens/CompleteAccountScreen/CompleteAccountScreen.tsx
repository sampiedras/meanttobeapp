import React from "react";
import { Animated, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { View } from "react-native-ui-lib";
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
          <View centerH marginB-24 marginT-32>
            <LogoHeartIcon />
          </View>
          <View marginH-16>
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
            <View paddingH-16 flex-1>
              <ViewNameFragment />
            </View>
            <View paddingH-16 flex-1>
              <ViewBirthdayFragment />
            </View>
            <View flex-1>
              <ViewGenderFragment />
            </View>
            <View paddingH-16 flex-1>
              <ViewSearchingFragment />
            </View>
            <View paddingH-16 flex-1>
              <ViewPhotoFragment />
            </View>
            <View flex-1>
              <ViewChurchFragment />
            </View>
            <View flex-1>
              <ViewDriversFragment />
            </View>
            <View flex-1>
              <ViewQuestionFragment />
            </View>
            <View flex-1>
              <ViewStoryFragment />
            </View>
            <View flex-1>
              <ViewLocationFragment />
            </View>
            <View flex-1>
              <ViewPermissionLocationFragment />
            </View>
            <View flex-1>
              <ViewPermissionNotificationFragment />
            </View>
            <View flex-1>
              <ViewPermissionTrackingFragment />
            </View>
          </AnimatedPagerView>
        </ScrollView>
        <View width="100%" paddingH-16>
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
});

export const CompleteAccountScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.COMPLETE_ACCOUNT>,
) => (
  <ViewModelProvider>
    <CompleteAccountContent {...props} />
  </ViewModelProvider>
);
