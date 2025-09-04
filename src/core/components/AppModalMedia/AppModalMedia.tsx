import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { I18n } from "aws-amplify/utils";
import { View } from "react-native-ui-lib";
import { colorsDark, colorsLight } from "@/core/theme";
import {
  AppButton,
  AppButtonSizeVariant,
  AppButtonVariant,
} from "../AppButton";
import { AppText, AppTextVariant } from "../AppText";
import { BottomModal } from "../BottomModal";

type AppModalMediaType = {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: (string | number)[];
  handleSelectMedia: () => Promise<void>;
  handleSelectCamera: () => Promise<void>;
};

export const AppModalMedia = ({
  bottomSheetRef,
  snapPoints,
  handleSelectMedia,
  handleSelectCamera,
}: AppModalMediaType) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <BottomModal
      modalRef={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      backgroundColor={
        isDarkMode
          ? colorsDark.BACKGROUND_SCREEN_COLOR
          : colorsLight.BACKGROUND_SCREEN_COLOR
      }
    >
      <View
        flex-1
        paddingT-16
        centerH
        backgroundColor={
          isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR
        }
      >
        <AppText variant={AppTextVariant.h6} style={styles.text}>
          {I18n.get("app.modal.media.title")}
        </AppText>
        <AppButton
          variant={AppButtonVariant.outlined}
          size={AppButtonSizeVariant.large}
          label={I18n.get("app.modal.media.btn.gallery")}
          width="80%"
          style={styles.button}
          onPress={handleSelectMedia}
        />
        <AppButton
          variant={AppButtonVariant.outlined}
          size={AppButtonSizeVariant.large}
          label={I18n.get("app.modal.media.btn.camera")}
          width="80%"
          style={styles.button}
          onPress={handleSelectCamera}
        />
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});
