import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Text } from "@react-native-material/core";
import {
  RadioButtonCheckIcon,
  RadioButtonIcon,
  SearchIconV1,
} from "@/core/assets/svg";
import { AppContainerSafeArea, AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user";
import {
  ChurchEntity,
  ResponseChurchEntity,
} from "@/user/data/remote/entities/churchEntity";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const ChurchContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.CHURCH>) => {
    const {
      loading,
      churches,
      loadingSearch,
      searchText,
      addChurch,
      bottomSheetRef,
      snapPoints,
      setAddChurch,
      handleSave,
      watch,
      setValue,
      trigger,
      onChangeTextSearch,
      handleSheetChanges,
      handleUpdateChurch,
    } = useViewModelProvider();

    const churchName = watch("church.name");

    const renderItem = ({ item }: { item: ChurchEntity }) => (
      <TouchableOpacity style={styles.item} onPress={() => handleSave(item)}>
        <Text style={styles.textItem}>{item.name}</Text>
      </TouchableOpacity>
    );

    const renderBackdrop = useCallback(
      (propsBottom: any) => (
        <BottomSheetBackdrop
          {...propsBottom}
          disappearsOnIndex={0}
          appearsOnIndex={2}
          opacity={1}
        />
      ),
      [],
    );

    return (
      <AppContainerSafeArea style={styles.container} edges={["bottom"]}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <Text variant="h6" style={styles.title}>
              Do you belong to a church?
            </Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                {
                  borderColor: addChurch
                    ? colorsLight.PRIMARY_COLOR
                    : colorsLight.GRAY_02,
                },
                styles.centerV,
              ]}
              onPress={() => setAddChurch(true)}
            >
              <View style={styles.rowCenterVSpread}>
                <Text variant="body1" style={styles.textRadio}>
                  Yes
                </Text>
                {addChurch ? <RadioButtonCheckIcon /> : <RadioButtonIcon />}
              </View>
              <TouchableOpacity
                style={[styles.buttonFind, styles.marginT16]}
                disabled={!addChurch}
                onPress={() => bottomSheetRef?.current?.snapToIndex(1)}
              >
                <Text style={styles.textFind} variant="body2">
                  {churchName || "Find you church"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                {
                  borderColor: !addChurch
                    ? colorsLight.PRIMARY_COLOR
                    : colorsLight.GRAY_02,
                },
                styles.rowCenterV,
              ]}
              onPress={() => {
                setAddChurch(false);
                setValue("church", null, { shouldDirty: true });
                trigger("church");
              }}
            >
              <Text variant="body1" style={styles.textRadio}>
                No
              </Text>
              {!addChurch ? <RadioButtonCheckIcon /> : <RadioButtonIcon />}
            </TouchableOpacity>
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={0}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
          >
            <View style={[styles.boxTextInput, styles.rowCenterVSpread]}>
              <SearchIconV1 width={18} height={18} />
              <BottomSheetTextInput
                value={searchText}
                onChangeText={onChangeTextSearch}
                style={styles.textInput}
                placeholder="Search church"
                placeholderTextColor={colorsLight.GRAY_03}
              />
              {loadingSearch && <ActivityIndicator color="black" size={24} />}
            </View>
            <BottomSheetFlatList
              data={churches || []}
              keyExtractor={(item: ResponseChurchEntity) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
          </BottomSheet>
          <View style={[styles.marginH16, styles.marginB10]}>
            <AppGradientButton
              label="Continue"
              loading={loading}
              style={styles.button}
              onPress={handleUpdateChurch}
            />
          </View>
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  radioButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  textRadio: {
    fontFamily: "Satoshi-Black",
  },
  buttonFind: {
    width: "100%",
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 16,
  },
  textFind: {
    fontFamily: "Satoshi-Regular",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boxTextInput: {
    backgroundColor: colorsLight.GRAY_LIGHT,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colorsLight.GRAY_02,
    paddingVertical: 16,
  },
  textItem: {
    fontFamily: "Satoshi-Regular",
  },
  button: {
    marginBottom: 20,
  },
  centerV: { alignItems: "center" },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  rowCenterVSpread: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  marginT16: { marginTop: 16 },
  marginH16: { marginHorizontal: 16 },
  marginB10: { marginBottom: 10 },
});

export const ChurchScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.CHURCH>,
) => (
  <ViewModelProvider>
    <ChurchContent {...props} />
  </ViewModelProvider>
);
