import React from "react";
import { Dimensions, SectionList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { CheckCircleIcon } from "@/core/assets/svg";
import {
  AppContainerSafeArea,
  AppGradientButton,
  AppSpacer,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

const screenWidth = Dimensions.get("window").width;

export const DrivesContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.DRIVES>) => {
    const {
      isLoading,
      sections,
      selectedCount,
      isFetchingDrives,
      isFetchingTypeDrive,
      handleSelect,
      handleUpdateDrives,
    } = useViewModelProvider();

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
        dataInRows.push(
          section.data.slice(i, i + Math.floor(screenWidth / 110)),
        );
      }
      return { ...section, data: dataInRows };
    });

    return (
      <AppContainerSafeArea>
        <View style={styles.container}>
          <Text variant="h6" style={styles.title}>
            What drives you?
          </Text>
          <View row centerH marginV-16>
            <Text variant="caption" style={styles.text}>
              Select the interests that drive you.
            </Text>
          </View>
          {isFetchingDrives || isFetchingTypeDrive ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={styles.containerSkeleton}
              animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
            >
              <Skeleton colorMode="light" width="90%" height={200} />
              <AppSpacer />
              <Skeleton colorMode="light" width="90%" height={200} />
            </MotiView>
          ) : (
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={processedData}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              keyExtractor={(_item, index) => `${index}`}
              style={styles.list}
              stickySectionHeadersEnabled={false}
            />
          )}
          <View row centerH marginB-16 centerV>
            <CheckCircleIcon />
            <Text variant="caption" style={styles.text}>
              You have selected{" "}
              <Text variant="caption" style={styles.textCount}>
                {selectedCount}/9 interests.
              </Text>
            </Text>
          </View>
          <AppGradientButton
            loading={isLoading}
            disabled={selectedCount < 3}
            label="Save changes"
            height={54}
            style={styles.button}
            onPress={handleUpdateDrives}
          />
        </View>
      </AppContainerSafeArea>
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
  textCount: {
    fontFamily: "Satoshi-Black",
  },
  button: {
    marginBottom: 18,
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
});

export const DrivesScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.DRIVES>,
) => (
  <ViewModelProvider>
    <DrivesContent {...props} />
  </ViewModelProvider>
);
