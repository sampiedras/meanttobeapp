import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { View } from "react-native-ui-lib";
import { ChevronDownIcon } from "@/assets/svg";
import { colorsLight } from "@/theme/colorsLight";

interface Props {
  label: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  initialState?: string | any;
  countrySelected: CountryItem | null;
  setCountrySelected: React.Dispatch<React.SetStateAction<CountryItem | null>>;
}

export const SelectPickerCountry = ({
  label,
  style,
  disabled,
  initialState,
  countrySelected,
  setCountrySelected,
}: Props) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState([
    countrySelected?.flag +
      " " +
      countrySelected?.name.es +
      " " +
      "(" +
      countrySelected?.dial_code +
      ")",
  ]);

  return (
    <View width="100%" style={[styles.container, style]}>
      <View style={styles.containerLabel}>
        <Text style={styles.title}>{label}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.button}
        disabled={disabled}
      >
        <Text
          style={[
            styles.titleCountry,
            {
              color: disabled
                ? colorsLight.SECONDARY_TEXT_COLOR
                : colorsLight.PRIMARY_TEXT_COLOR,
            },
          ]}
        >
          {countryCode}
        </Text>
        <ChevronDownIcon />
      </TouchableOpacity>
      <CountryPicker
        onBackdropPress={() => setShow(false)}
        style={{
          modal: {
            height: 400,
          },
          dialCode: {
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          countryName: {
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          countryButtonStyles: {
            borderRadius: 10,
          },
          textInput: {
            height: 50,
            borderRadius: 10,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
        }}
        lang="en"
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode([
            item.flag + " " + item.name.es + " " + "(" + item.dial_code + ") ",
          ]);
          setShow(false);
          setCountrySelected(item);
        }}
        initialState={initialState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    borderRadius: 20,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLabel: {
    width: "100%",
    height: 21,
    marginLeft: 26,
  },
  title: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    width: "32%",
    height: 16,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
  button: {
    width: "90%",
    height: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  titleCountry: {
    fontSize: 16,
    justifyContent: "space-between",
    marginLeft: -4,
    fontFamily: "Satoshi-Black",
  },
});
