import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { EyeIcon } from "@/core/assets/svg";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { LocationIcon } from "@/explorer/assets/svg";
import { calculateAge } from "@/explorer/utils/calculateAge";
import { calculateDistance } from "@/explorer/utils/calculateDistance";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";
import { useViewModelProvider } from "../../ViewModelContext";

export const RenderCardFragment = ({ item }: { item: UserMatchType }) => {
  const { userProfile } = useAuthProvider();

  const { setUserSelected, setModalVisible } = useViewModelProvider();

  const age = calculateAge(item.dateOfBirth);

  const distanceOfUsers = calculateDistance(
    userProfile?.location.latitude || 0,
    userProfile?.location.longitude || 0,
    item.location.latitude || 0,
    item.location.longitude || 0,
  );

  return (
    <Pressable
      onPress={() => {
        setUserSelected(item);
        setModalVisible(true);
      }}
      style={styles.containerCard}
    >
      <FastImage
        source={{
          uri: item?.avatar?.toString() || "",
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
      />
      <LinearGradient
        style={styles.shadowOverlay}
        colors={["rgba(0, 0, 0, 0.8)", "transparent"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.6 }}
      />
      <View style={styles.textContainer}>
        <Text variant="h6" style={styles.textName}>
          {item.name && item.dateOfBirth
            ? `${item?.name}, ${age}`
            : "Don't have info yet "}
        </Text>
        <View style={[styles.rowCenterV, styles.marginT8]}>
          <LocationIcon />
          <Text variant="h6" style={styles.textDistance}>
            {distanceOfUsers !== 0
              ? distanceOfUsers < 1
                ? "Distance (- 1 km)"
                : `Distance (${distanceOfUsers.toFixed(2)} km)`
              : "No distance"}
          </Text>
        </View>
      </View>
      <View style={[styles.textTopContainer, styles.rowSpread]}>
        <View style={styles.contentTextTop}>
          <Text variant="h6" style={styles.textCategory}>
            {item?.searching || "No searching "}
          </Text>
        </View>
        <View style={styles.contentTextTop}>
          <EyeIcon color="white" />
          {/* <Text variant="h6" style={styles.textCategory}>
            See profile
          </Text> */}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    // height: 500,
    borderRadius: 30,
    marginBottom: 10,
    flex: 1,
    height: undefined,
    width: undefined,
  },
  shadowOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    borderRadius: 30,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  textTopContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 10,
    paddingHorizontal: 16,
  },
  containerCard: {
    flex: 1,
    backgroundColor: "#DDE8E3",
    borderRadius: 30,
  },
  textCategory: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Satoshi-Medium",
    lineHeight: 18.2,
  },
  contentTextTop: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    width: undefined,
    backgroundColor: "#203936",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textDistance: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Satoshi-Medium",
    lineHeight: 18.2,
  },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  rowSpread: { flexDirection: "row", justifyContent: "space-between" },
  marginT8: { marginTop: 8 },
  textName: {
    color: colorsLight.WHITE,
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "900",
    fontFamily: "Satoshi-Medium",
  },
});
