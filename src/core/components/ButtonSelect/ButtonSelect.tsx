import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-ui-lib";
import { ArrowDownIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { ModalSelect } from "./ModalSelect";

interface IButtonSelect {
  visible: boolean;
  label: string;
  value: string;
  data: any[];
  keyToSearch: string;
  toggleVisible: () => void;
  keyExtractor: (key: string) => string;
  renderItem: (item: any) => JSX.Element;
}

export const ButtonSelect = ({
  visible,
  label,
  value,
  data,
  keyToSearch,
  toggleVisible,
  keyExtractor,
  renderItem,
}: IButtonSelect) => {
  return (
    <TouchableOpacity
      row
      centerV
      spread
      style={styles.buttonSelect}
      onPress={toggleVisible}
    >
      {value ? (
        <Text variant="body1" style={styles.textSelected} numberOfLines={2}>
          {value}
        </Text>
      ) : (
        <Text variant="body1" style={styles.textItemSelect} numberOfLines={2}>
          {label}
        </Text>
      )}
      <ArrowDownIcon />
      {visible && (
        <ModalSelect
          visible={visible}
          data={data}
          keyToSearch={keyToSearch}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          toggleVisible={toggleVisible}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonSelect: {
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    width: "100%",
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
    borderColor: colorsLight.GRAY_02,
  },
  textSelected: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Medium",
  },
  textItemSelect: {
    flex: 1,
    color: colorsLight.GRAY_03,
    fontFamily: "Satoshi-Regular",
  },
});
