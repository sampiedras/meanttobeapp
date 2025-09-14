import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { ArrowDownIcon, CheckSuccessIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { IQuestionResponse } from "@/user/data/remote/entities/questionEntity";

interface IRenderButtonFragment {
  item: IQuestionResponse;
  toggleModalAnswer: (item: IQuestionResponse) => void;
  toggleModalSelectQuestion: () => void;
}

export const RenderButtonFragment = ({
  item,
  toggleModalAnswer,
  toggleModalSelectQuestion,
}: IRenderButtonFragment) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.rowSpreadCenterV]}
      onPress={() =>
        item.question.trim() === "My favorite bible verse is"
          ? toggleModalSelectQuestion()
          : toggleModalAnswer(item)
      }
    >
      <View style={styles.rowCenterV}>
        {item.answer && <CheckSuccessIcon style={styles.checkSuccessIcon} />}
        <Text variant="body1" style={styles.textItem} numberOfLines={2}>
          {item.question}
        </Text>
      </View>
      <ArrowDownIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
    borderColor: colorsLight.GRAY_02,
  },
  rowSpreadCenterV: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  checkSuccessIcon: {
    marginRight: 4,
  },
  textItem: {
    flex: 1,
    fontFamily: "Satoshi-Regular",
    color: "#000000",
  },
});
