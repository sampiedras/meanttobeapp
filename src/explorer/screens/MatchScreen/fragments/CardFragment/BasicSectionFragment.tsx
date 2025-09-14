import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import {
  ChurchIcon,
  InternetIcon,
  LocationTwoIcon,
  UserIcon,
} from "@/explorer/assets/svg";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";

interface BasicSectionFragmentProps {
  item: UserMatchType;
}

export const BasicSectionFragment = ({ item }: BasicSectionFragmentProps) => {
  return (
    <View style={styles.fullWidth}>
      <View style={[styles.row, styles.marginB16]}>
        <View style={[styles.row, styles.flex1]}>
          <UserIcon />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item.searching || "Don't have"}
          </Text>
        </View>

        <View style={[styles.row, styles.flex1]}>
          <LocationTwoIcon />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
            {item?.address || "Don't have"}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.row, styles.flex1]}>
          <ChurchIcon />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item.church || "Don't have"}
          </Text>
        </View>

        <View style={[styles.row, styles.flex1]}>
          <InternetIcon />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
            {item.searchRange === "LOCALLY" ? "Near me" : "Globally"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  row: { flexDirection: "row", alignItems: "center" },
  flex1: { flex: 1 },
  marginB16: { marginBottom: 16 },
  text: {
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    marginLeft: 8,
    lineHeight: 18.2,
    color: "#203936",
  },
});
