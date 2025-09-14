import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";

interface option {
  title: string;
}

export const OptionSwitchFragment: React.FC<option> = (props) => {
  const [enable, setEnable] = useState(false);
  const handleSetEnable = () => {
    setEnable(!enable);
  };

  return (
    <View style={styles.rowSpreadCenter}>
      <Text style={styles.title}>{props.title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: colorsLight.PRIMARY_COLOR }}
        thumbColor={enable ? colorsLight.WHITE : "#f4f3f4"}
        value={enable}
        onValueChange={handleSetEnable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowSpreadCenter: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
  },
});
