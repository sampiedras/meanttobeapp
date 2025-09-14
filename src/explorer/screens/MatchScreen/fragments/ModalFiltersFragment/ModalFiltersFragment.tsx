import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RangeSlider, Slider } from "@react-native-assets/slider";
import CheckBox from "@react-native-community/checkbox";
import { Text } from "@react-native-material/core";
import { AppContainerSafeArea, CircleButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { CloseDisableIcon } from "@/explorer/assets/svg";
import { useViewModelProvider } from "../../ViewModelContext";
import { CheckBoxFragment } from "../CheckBoxFragment";

export const ModalFiltersFragment = () => {
  const {
    filterAge,
    distance,
    isNearMe,
    searching,
    ageCheckBox,
    modalFilters,
    dataSearching,
    scrollEnabled,
    distanceCheckBox,
    setDistance,
    setSearching,
    setFilterAge,
    enableScroll,
    disableScroll,
    handleSetNerMe,
    handleUpdateFilters,
    handleToggleAgeCheckBox,
    handleToggleModalFilters,
    handleToggleDistanceCheckBox,
  } = useViewModelProvider();

  return (
    <Modal animationType="slide" transparent={false} visible={modalFilters}>
      <AppContainerSafeArea>
        <View style={styles.headerRow}>
          <CircleButton
            onPress={handleToggleModalFilters}
            backgroundColor="#74748014"
            height={30}
            width={30}
            icon={<CloseDisableIcon />}
          />
          <Text color={colorsLight.BLACK} style={styles.title}>
            Filters
          </Text>
          <TouchableOpacity onPress={handleUpdateFilters}>
            <Text
              style={styles.textButtonDone}
              color={colorsLight.PRIMARY_COLOR}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topSeparator} />
        <ScrollView
          scrollEnabled={scrollEnabled}
          style={styles.scrollContainer}
        >
          <View style={styles.flex1PaddingH16}>
            <Text color={colorsLight.GRAY_03} style={styles.textAge}>
              Age
            </Text>
          </View>
          <View
            style={[styles.containerItems, styles.marginT8, styles.padding16]}
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.itemAge}
            >{`Between ${filterAge[0]} and ${filterAge[1]}`}</Text>
            <RangeSlider
              style={{ paddingHorizontal: 8 }}
              range={filterAge}
              minimumValue={18}
              maximumValue={80}
              step={1}
              minimumRange={4}
              outboundColor={colorsLight.UNFILLED_COLOR}
              inboundColor={colorsLight.PRIMARY_COLOR}
              thumbTintColor={colorsLight.PRIMARY_COLOR}
              trackHeight={4}
              thumbSize={20}
              onValueChange={setFilterAge}
              onSlidingStart={disableScroll}
              onSlidingComplete={enableScroll}
              CustomThumb={() => (
                <View style={styles.thumbOuter}>
                  <View style={styles.thumbInner} />
                </View>
              )}
            />
            <View style={[styles.rowCenterV, { justifyContent: "flex-start" }]}>
              <CheckBox
                disabled={false}
                value={ageCheckBox}
                style={styles.checkbox}
                boxType="square"
                tintColors={{
                  true: colorsLight.PRIMARY_COLOR,
                  false: colorsLight.PRIMARY_COLOR,
                }}
                tintColor={colorsLight.PRIMARY_COLOR}
                onFillColor={colorsLight.PRIMARY_COLOR}
                onTintColor={colorsLight.PRIMARY_COLOR}
                onCheckColor={colorsLight.WHITE}
                onValueChange={handleToggleAgeCheckBox}
              />
              <Text
                color={colorsLight.PRIMARY_TEXT_COLOR}
                style={styles.textSliderCheckbox}
              >
                See people 2 years either side if I run out
              </Text>
            </View>
          </View>

          <Text
            color={colorsLight.SECONDARY_TEXT_COLOR}
            style={[styles.titleItem, styles.paddingH16]}
          >
            Distance
          </Text>
          <View
            style={[styles.containerItems, styles.padding16, styles.marginT8]}
          >
            <CheckBoxFragment
              label="Locally"
              value={isNearMe}
              onChange={handleSetNerMe}
            />

            <CheckBoxFragment
              label="Globally"
              value={!isNearMe}
              onChange={handleSetNerMe}
            />

            <View style={[styles.separator, styles.marginV16]} />
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.titleSlideDistance}
            >{`Up to ${distance} kilometers away`}</Text>
            <Slider
              style={{ paddingHorizontal: 8 }}
              value={distance}
              step={1}
              thumbTintColor={colorsLight.PRIMARY_COLOR}
              maximumTrackTintColor={colorsLight.UNFILLED_COLOR}
              minimumTrackTintColor={colorsLight.PRIMARY_COLOR}
              onValueChange={(value) => {
                setDistance(value);
              }}
              maximumValue={50}
              minimumValue={5}
              trackHeight={4}
              thumbSize={36}
              onSlidingStart={disableScroll}
              onSlidingComplete={enableScroll}
              CustomThumb={() => (
                <View style={styles.thumbOuter}>
                  <View style={styles.thumbInner} />
                </View>
              )}
            />
            <View style={styles.rowCenterV}>
              <CheckBox
                disabled={false}
                value={distanceCheckBox}
                style={styles.checkbox}
                boxType="square"
                tintColors={{
                  true: colorsLight.PRIMARY_COLOR,
                  false: colorsLight.PRIMARY_COLOR,
                }}
                tintColor={colorsLight.PRIMARY_COLOR}
                onFillColor={colorsLight.PRIMARY_COLOR}
                onTintColor={colorsLight.PRIMARY_COLOR}
                onCheckColor={colorsLight.WHITE}
                onValueChange={handleToggleDistanceCheckBox}
              />
              <Text
                color={colorsLight.PRIMARY_TEXT_COLOR}
                style={styles.textSliderCheckbox}
              >
                See people slightly further away if I run out
              </Text>
            </View>
          </View>

          <Text
            color={colorsLight.SECONDARY_TEXT_COLOR}
            style={[styles.titleItem, styles.paddingH16]}
          >
            What are you looking for?
          </Text>
          <View
            style={[styles.containerItems, styles.padding16, styles.marginT8]}
          >
            {dataSearching.map((item, index) => (
              <CheckBoxFragment
                key={index}
                label={item.name}
                value={searching === item.name}
                onChange={() => setSearching(item.name)}
              />
            ))}
          </View>
        </ScrollView>
      </AppContainerSafeArea>
    </Modal>
  );
};

const styles = StyleSheet.create({
  thumbOuter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  paddingH16: { paddingHorizontal: 16 },
  title: {
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
  textButtonDone: {
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
  },
  textAge: {
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
  },
  containerItems: {
    display: "flex",
    gap: 12,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
    borderRadius: 16,
    justifyContent: "center",
  },
  itemAge: {
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
  },
  textSliderCheckbox: {
    fontSize: 12,
    marginLeft: 16,
    fontFamily: "Satoshi-Regular",
  },
  titleItem: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: "Satoshi-Medium",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginLeft: -6,
  },
  separator: {
    borderColor: colorsLight.GRAY_02,
    borderTopWidth: 1,
  },
  topSeparator: {
    height: 2,
    width: "100%",
    marginBottom: 8,
    backgroundColor: colorsLight.GRAY_02,
  },
  titleSlideDistance: {
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
  },
  scrollContainer: {
    marginHorizontal: 8,
  },
  flex1PaddingH16: { flex: 1, paddingHorizontal: 16 },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  marginT8: { marginTop: 8 },
  padding16: { padding: 16 },
  marginV16: { marginVertical: 16 },
});
