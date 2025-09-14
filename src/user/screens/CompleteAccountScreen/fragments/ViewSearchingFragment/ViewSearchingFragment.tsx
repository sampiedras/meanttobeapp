import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import _ from "lodash";
import { colorsLight } from "@/core/theme";
import { SearchingEntityResponse } from "@/user/data/remote/entities/searchingEntity";
import { useGetAllSearchingsQuery } from "@/user/data/remote/userApi";
import { useViewModelProvider } from "../../ViewModelContext";
import { RenderItemFragment } from "./RenderItemFragment";

export const ViewSearchingFragment = () => {
  const { setValue } = useViewModelProvider();
  const { data: dataSearchingsTwo } = useGetAllSearchingsQuery();
  const [dataSearch, setDataSearch] = useState<SearchingEntityResponse[]>([]);

  const handleSelect = (item: SearchingEntityResponse) => () => {
    setValue("searching", item, { shouldDirty: true });
    setDataSearch(
      dataSearch.map((e: SearchingEntityResponse) =>
        e.id === item.id ? { ...e, selected: true } : { ...e, selected: false },
      ),
    );
  };

  useEffect(() => {
    if (dataSearchingsTwo && dataSearchingsTwo?.length > 0) {
      const sortedData = _.orderBy(dataSearchingsTwo, ["id"], ["desc"]);
      setDataSearch(
        sortedData.map((e: SearchingEntityResponse) => ({
          ...e,
          selected: false,
        })),
      );
    }
  }, [dataSearchingsTwo]);

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        Tell us, what are you looking for?
      </Text>

      <FlatList
        data={dataSearch}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: SearchingEntityResponse }) => (
          <RenderItemFragment item={item} handleSelect={handleSelect} />
        )}
        style={styles.list}
        ListFooterComponent={
          <View style={[styles.marginT33, styles.center]}>
            {dataSearch &&
            dataSearch.some((item) => item.selected && item.name === "Love") ? (
              <Text variant="h6" style={styles.helperText}>
                This will only show you people of the opposite gender.
              </Text>
            ) : dataSearch &&
              dataSearch.some(
                (item) => item.selected && item.name === "Friendship",
              ) ? (
              <Text variant="h6" style={styles.helperText}>
                This will show you both men and women that fit your criteria.
              </Text>
            ) : dataSearch &&
              dataSearch.some(
                (item) => item.selected && item.name === "I don't know yet",
              ) ? (
              <Text variant="h6" style={styles.helperText}>
                This will show you both men and women that fit your criteria.
              </Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
  },
  center: { alignItems: "center", justifyContent: "center" },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  list: {
    flex: 1,
    width: "100%",
    marginTop: 24,
  },
  helperText: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
    maxWidth: 300,
    textAlign: "center",
  },
  marginT33: { marginTop: 33 },
});
