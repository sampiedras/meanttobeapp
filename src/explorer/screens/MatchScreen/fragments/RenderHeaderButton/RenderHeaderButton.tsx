import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { CircleButton } from "@/core/components";
import { FilterIcon, ReloadIcon } from "@/explorer/assets/svg";
import { useViewModelProvider } from "../../ViewModelContext";

export const RenderHeaderButton = () => {
  const { deletedCard, handleToggleModalFilters, handleUndoDeleteCard } =
    useViewModelProvider();

  return (
    <View style={styles.containerHeader}>
      {deletedCard ? (
        <CircleButton
          onPress={handleUndoDeleteCard}
          backgroundColor="white"
          width={40}
          height={40}
          icon={<ReloadIcon />}
        />
      ) : (
        <View width={40} height={40} />
      )}
      <Text style={styles.textHeader}>Start Matching </Text>
      <CircleButton
        onPress={handleToggleModalFilters}
        backgroundColor="white"
        width={40}
        height={40}
        icon={<FilterIcon />}
      />
      {/* <ModalBackCard handleOpenModalPremium={handleOpenModalPremium} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  textHeader: {
    color: "black",
    fontSize: 20,
    fontFamily: "Satoshi-Medium",
  },
});
