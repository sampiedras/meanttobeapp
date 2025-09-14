import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { Product } from "react-native-qonversion";
import { RadioButtonCheckIcon, RadioButtonIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { getNameSubscription } from "@/core/utils/subscriptionsUtils";
import { Tag } from "../../Tag";

type RenderItemType = {
  item: Product;
  index: number;
  planSelected: Product | null;
  handleSelectPlan: (plan: Product) => void;
};

export const RenderItemFragment = ({
  index,
  item,
  planSelected,
  handleSelectPlan,
}: RenderItemType) => {
  return (
    <View style={styles.center}>
      <TouchableOpacity
        style={[
          {
            borderColor:
              item.qonversionID === planSelected?.qonversionID
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_LIGHT,
          },
          styles.buttonLicense,
        ]}
        onPress={() => handleSelectPlan(item)}
      >
        {index === 0 && (
          <Tag
            title="Most popular"
            backgroundColor={colorsLight.PRIMARY_COLOR}
            colorTitle={colorsLight.WHITE}
            width={96}
            height={28}
            style={styles.tagMostPopular}
            fontSize={12}
          />
        )}
        <View
          style={[
            styles.containerLicenses,
            styles.paddingV12,
            styles.h80,
            styles.w90,
          ]}
        >
          <View style={[styles.row, styles.containerRadioButton]}>
            <Text
              style={styles.textDuration}
              color={colorsLight.SECONDARY_TEXT_COLOR}
            >
              {getNameSubscription(item.qonversionID)}
            </Text>
            {item.qonversionID === planSelected?.qonversionID ? (
              <RadioButtonCheckIcon />
            ) : (
              <RadioButtonIcon />
            )}
          </View>
          <Text style={styles.textPrice} color={colorsLight.PRIMARY_TEXT_COLOR}>
            {item.prettyPrice} {item.currencyCode}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center" },
  w90: { width: "90%" },
  h80: { height: 80 },
  paddingV12: { paddingVertical: 12 },
  // Item
  buttonLicense: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 20,
    flexDirection: "column",
    borderWidth: 2,
    backgroundColor: colorsLight.GRAY_LIGHT,
    alignItems: "center",
  },
  tagMostPopular: {
    position: "absolute",
    top: -12,
    left: 130,
  },
  containerLicenses: {
    alignContent: "center",
    alignSelf: "center",
  },
  containerRadioButton: {
    justifyContent: "space-between",
  },
  textDuration: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
  },
  textPrice: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Satoshi-Black",
  },
});
