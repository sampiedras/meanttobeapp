import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
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
    <View width="100%">
      <View row marginB-16>
        <View row flex-1>
          <UserIcon />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item.searching || "Don't have"}
          </Text>
        </View>

        <View row flex-1>
          <LocationTwoIcon />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
            {item?.address || "Don't have"}
          </Text>
        </View>
      </View>

      <View row>
        <View row flex-1>
          <ChurchIcon />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {item.church || "Don't have"}
          </Text>
        </View>

        <View row flex-1>
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
