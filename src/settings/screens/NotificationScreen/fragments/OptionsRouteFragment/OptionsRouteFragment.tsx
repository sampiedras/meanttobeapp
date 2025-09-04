import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { ChevronRightIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { S_SettingsStackRoutes } from "@/settings/routes";

interface option {
  title: string;
}

export const OptionsRouteFragment: React.FC<option> = (props) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(S_SettingsStackRoutes.NEW_MESSAGE_SCREEN, {
          title: props.title,
        })
      }
      style={styles.itemButtonContainer}
    >
      <View height={44} style={styles.itemContainer} row spread>
        <Text style={styles.title} color={colorsLight.PRIMARY_TEXT_COLOR}>
          {props.title}
        </Text>
        <ChevronRightIcon />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemButtonContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
  },
});
