/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text } from "react-native";
import { I18n } from "aws-amplify/utils";
import { View } from "react-native-ui-lib";
import { GoogleIcon } from "@/core/assets/svg";
import {
  AppButton,
  AppButtonSizeVariant,
  AppButtonVariant,
  AppContainer,
  AppText,
  AppTextVariant,
} from "@/core/components";
import {
  RootStackRoutes,
  RootStackScreenProps,
} from "@/core/types/StackRoutes";

export const UIKitScreen =
  ({}: RootStackScreenProps<RootStackRoutes.UI_KIT>) => {
    return (
      <AppContainer>
        <View>
          <Text>UI Kit</Text>
          <AppText variant={AppTextVariant.h4}>
            {I18n.get("welcome.title")}
          </AppText>
          <AppButton
            variant={AppButtonVariant.contained}
            size={AppButtonSizeVariant.large}
            label={I18n.get("welcome.btn.google")}
            iconLeft={<GoogleIcon />}
            style={{ marginBottom: 8 }}
          />
          <AppButton
            variant={AppButtonVariant.outlined}
            size={AppButtonSizeVariant.large}
            label={I18n.get("welcome.btn.google")}
            style={{ marginBottom: 8 }}
            iconLeft={<GoogleIcon />}
          />
          <AppButton
            variant={AppButtonVariant.contained}
            size={AppButtonSizeVariant.large}
            label="Log In Contained"
            style={{ marginBottom: 8 }}
          />
          <AppButton
            variant={AppButtonVariant.outlined}
            size={AppButtonSizeVariant.large}
            label="Log In Outlined"
            style={{ marginBottom: 8 }}
          />
          <AppButton
            variant={AppButtonVariant.text}
            size={AppButtonSizeVariant.large}
            label="Log In Text"
            style={{ marginBottom: 8 }}
          />

          <AppButton
            variant={AppButtonVariant.contained}
            size={AppButtonSizeVariant.large}
            label="Log In Contained Disabled"
            style={{ marginBottom: 8 }}
            disabled
          />
          <AppButton
            variant={AppButtonVariant.outlined}
            size={AppButtonSizeVariant.large}
            label="Log In Outlined Disabled"
            disabled
            style={{ marginBottom: 8 }}
          />
          <AppButton
            variant={AppButtonVariant.text}
            size={AppButtonSizeVariant.large}
            label="Log In Text Disabled"
            style={{ marginBottom: 8 }}
            disabled
          />
        </View>
      </AppContainer>
    );
  };
