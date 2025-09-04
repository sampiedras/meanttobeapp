import React, { useCallback, useEffect } from "react";
import { Dimensions, SectionList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import {
  useFindAllTypeDriveQuery,
  useLazyFindAllDriveQuery,
} from "@/user/data/remote/userApi";
import { SectionData, useViewModelProvider } from "../../ViewModelContext";

interface Drive {
  id: string;
  name: string;
}

const screenWidth = Dimensions.get("window").width;

export const ViewDriversFragment = () => {
  const { sections, selectedCount, setSections, setSelectedCount } =
    useViewModelProvider();

  const { data: dataTypeDrives = [] } = useFindAllTypeDriveQuery();
  const [triggerFindAllDrives] = useLazyFindAllDriveQuery();

  const handleSelect = (itemId: string, sectionTitle: string) => {
    const updatedSections = sections.map((section) => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          data: section.data.map((item) => {
            if (item.id === itemId) {
              if (item.selected) {
                setSelectedCount((prevCount) => prevCount - 1);
                return { ...item, selected: false };
              } else {
                if (selectedCount < 9) {
                  setSelectedCount((prevCount) => prevCount + 1);
                  return { ...item, selected: true };
                }
              }
            }
            return item;
          }),
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleGetAllData = useCallback(async () => {
    let result: SectionData[] = [];

    try {
      for await (const item of dataTypeDrives) {
        const resultDrives = await triggerFindAllDrives(item.id).unwrap();
        result.push({
          title: item.name,
          gsiPk1Drive: item.id,
          data: resultDrives.map((drive: Drive) => ({
            id: drive.id,
            name: drive.name,
            selected: false,
            type: item.name,
          })),
        });
      }
    } catch (error) {
      setSections([]);
    }

    setSections(result);
  }, [dataTypeDrives, setSections, triggerFindAllDrives]);

  useEffect(() => {
    if (dataTypeDrives.length > 0) {
      handleGetAllData();
    }
  }, [dataTypeDrives, handleGetAllData]);

  const renderItem = ({
    item,
    section,
  }: {
    item: { id: string; name: string; selected: boolean }[];
    section: { title: string };
  }) => (
    <View style={styles.boxItem}>
      {item.map((cell) => (
        <TouchableOpacity
          key={cell.id}
          backgroundColor={
            cell.selected ? colorsLight.PRIMARY_COLOR : colorsLight.WHITE
          }
          style={[
            styles.item,
            {
              borderColor: cell.selected
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
            },
          ]}
          onPress={() => handleSelect(cell.id, section.title)}
        >
          <Text
            variant="body1"
            color={cell.selected ? colorsLight.WHITE : colorsLight.BLACK}
            style={styles.itemText}
          >
            {cell.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <Text variant="body1" style={styles.titleSection}>
      {title}
    </Text>
  );

  const processedData = sections.map((section) => {
    const dataInRows = [];
    for (
      let i = 0;
      i < section.data.length;
      i += Math.floor(screenWidth / 110)
    ) {
      dataInRows.push(section.data.slice(i, i + Math.floor(screenWidth / 110)));
    }
    return { ...section, data: dataInRows };
  });

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        What drives you?
      </Text>
      <View row centerH marginV-16>
        <Text variant="caption" style={styles.text}>
          Select the interests that drive you.
        </Text>
      </View>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={processedData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(_item, index) => `${index}`}
        style={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  text: {
    marginLeft: 8,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  titleSection: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginVertical: 8,
    fontFamily: "Satoshi-Black",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  itemText: {
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  boxItem: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
