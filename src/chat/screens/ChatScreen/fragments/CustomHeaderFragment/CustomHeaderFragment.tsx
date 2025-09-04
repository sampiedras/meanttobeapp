import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

type CustomHeaderFragment = {
  name?: string | undefined;
  avatar?: string | undefined;
};

export const CustomHeaderFragment = ({
  name,
  avatar,
}: CustomHeaderFragment) => {
  const { goBack } = useNavigation();
  return (
    <View
      row
      center
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
      paddingH-16
      height={60}
      style={styles.container}
    >
      <View row center>
        <TouchableOpacity style={styles.btnArrowBack} onPress={goBack}>
          <ArrowBackIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAvatar}
          // onPress={handleGoToDetail} TODO: go to detail
        >
          <FastImage source={{ uri: avatar }} style={styles.avatar} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.textName}
          >
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eaeaea",
  },
  btnArrowBack: {
    marginRight: 19,
  },
  btnAvatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: colorsLight.PRIMARY_COLOR,
    marginRight: 16,
  },
  textName: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    maxWidth: 170,
  },
});
