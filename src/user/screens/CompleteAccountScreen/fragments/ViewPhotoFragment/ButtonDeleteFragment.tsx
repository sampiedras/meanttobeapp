import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DeleteIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface IButtonDeleteFragment {
  onPress: () => void;
  isMain: boolean;
}

export const ButtonDeleteFragment = ({
  onPress,
  isMain,
}: IButtonDeleteFragment) => {
  return (
    <TouchableOpacity
      style={isMain ? styles.buttonDeleteMain : styles.buttonDeleteImages}
      onPress={onPress}
    >
      <DeleteIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonDeleteMain: {
    backgroundColor: colorsLight.WHITE,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    bottom: 5,
    padding: 10,
  },
  buttonDeleteImages: {
    backgroundColor: colorsLight.WHITE,
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    top: 5,
    padding: 10,
    right: 5,
  },
});
