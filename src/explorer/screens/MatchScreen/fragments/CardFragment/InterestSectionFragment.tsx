import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";
import { useGetDriveByUserIdQuery } from "@/user/data/remote/userApi";

interface InterestSectionFragmentProps {
  item: UserMatchType;
}

export const InterestSectionFragment = ({
  item,
}: InterestSectionFragmentProps) => {
  const { data = [] } = useGetDriveByUserIdQuery(item?.userId || "");

  return (
    <View style={styles.container}>
      {data.length ? (
        data.map((i) =>
          i.drives.map((id, index) => (
            <View key={index} style={styles.group}>
              <View
                key={index}
                backgroundColor={colorsLight.GRAY_02}
                style={[
                  styles.item,
                  {
                    borderColor: colorsLight.GRAY_02,
                  },
                ]}
              >
                <Text style={styles.itemText}>{id.name}</Text>
              </View>
            </View>
          )),
        )
      ) : (
        <View center>
          <Text style={styles.textEmpty}>don't have Interests yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  group: {
    flexDirection: "row",
    marginBottom: 8,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    margin: 4,
  },
  itemText: {
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
    fontSize: 13,
    color: "#203936",
  },
  textEmpty: {
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
    fontSize: 20,
    color: "#203936",
  },
});
