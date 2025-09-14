import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { CheckCircleIcon, EyeIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

export const RenderTextFragment = () => {
  const { activePage, selectedCount } = useViewModelProvider();

  switch (activePage) {
    case 0:
      return (
        <View style={[styles.rowCenterH, styles.marginB16, styles.centerV]}>
          <EyeIcon />
          <Text variant="caption" style={styles.text}>
            You cannot change your name later
          </Text>
        </View>
      );
    case 1:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            Your possible connections only will see your age, not your birth
            date.
          </Text>
        </View>
      );
    case 2:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            You can update this information later on your Account Settings.
          </Text>
        </View>
      );
    case 3:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            You can update this information later on your Account Settings.
          </Text>
        </View>
      );
    case 5:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            You can update this information later on your Account Settings.
          </Text>
        </View>
      );
    case 6:
      return (
        <View style={[styles.rowCenterH, styles.marginB16, styles.centerV]}>
          <CheckCircleIcon />
          <Text variant="caption" style={styles.text}>
            You have selected{" "}
            <Text variant="caption" style={styles.textCount}>
              {selectedCount}/9 interests.
            </Text>
          </Text>
        </View>
      );
    case 8:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            You can update this information later on your profile
          </Text>
        </View>
      );
    case 9:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            You can update this information later on your Account Settings.
          </Text>
        </View>
      );
    case 10:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            We will use your location to show you possible connections near you.
          </Text>
        </View>
      );
    case 11:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            We will keep you inform about your new connections and messages.
          </Text>
        </View>
      );
    case 12:
      return (
        <View style={[styles.rowCenterH, styles.marginB16]}>
          <Text variant="caption" style={styles.text}>
            Please choose ‘Allow Tracking’ to access all of our features.
          </Text>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 8,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  textCount: {
    fontFamily: "Satoshi-Black",
  },
  rowCenterH: { flexDirection: "row", justifyContent: "center" },
  marginB16: { marginBottom: 16 },
  centerV: { alignItems: "center" },
});
