import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { EmptyMatchIcon } from "@/explorer/assets/svg";
import { useViewModelProvider } from "../../ViewModelContext";

export const IsEmptyMatchFragment = () => {
  const { handleToggleModalFilters } = useViewModelProvider();
  return (
    <View style={styles.container}>
      <EmptyMatchIcon />
      <Text style={styles.title}>That’s all we’ve got for now</Text>
      <Text style={styles.subTitle}>
        Update your filters to find more people.
      </Text>
      <AppGradientButton
        onPress={handleToggleModalFilters}
        label="Update filters"
        height={54}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: colorsLight.BLACK,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Satoshi-Black",
  },
  subTitle: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 16,
    fontFamily: "Satoshi-Black",
    marginBottom: 47,
  },
});
