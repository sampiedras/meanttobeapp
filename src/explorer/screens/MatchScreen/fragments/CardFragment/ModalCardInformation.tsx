import React from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import {
  BtnDiscardIcon,
  BtnYesIcon,
  CloseDisableIcon,
  LocationIcon,
} from "@/explorer/assets/svg";
import { calculateAge } from "@/explorer/utils/calculateAge";
import { calculateDistance } from "@/explorer/utils/calculateDistance";
import { useViewModelProvider } from "../../ViewModelContext";
import { BasicSectionFragment } from "./BasicSectionFragment";
import { InterestSectionFragment } from "./InterestSectionFragment";
import { MediaSectionFragment } from "./MediaSectionFragment";

interface ModalFiltersFragmentProps {
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
}

export const ModalCardInformation = ({
  handleSwipeLeft,
  handleSwipeRight,
}: ModalFiltersFragmentProps) => {
  const { userProfile } = useAuthProvider();

  const {
    setModalVisible,
    modalVisible,
    userSelected: item,
  } = useViewModelProvider();

  const age = calculateAge(item?.dateOfBirth || "");

  const distanceOfUsers = calculateDistance(
    userProfile?.location.latitude || 0,
    userProfile?.location.longitude || 0,
    item?.location.latitude || 0,
    item?.location.longitude || 0,
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.container}>
        <View flex-1>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
            scrollEventThrottle={32}
          >
            <View style={styles.containerCard}>
              <View marginB-12 height={500}>
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
                    {item?.name && item.dateOfBirth
                      ? `${item?.name}, ${age}`
                      : "Don't have info yet "}
                  </Text>
                  <View row centerV marginT-8>
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
                <View style={styles.textTopContainer} row spread>
                  <View style={styles.contentTextTop}>
                    <Text variant="h6" style={styles.textCategory}>
                      {item?.searching || "No searching "}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.contentTextTop}
                    onPress={() => setModalVisible(false)}
                  >
                    <CloseDisableIcon color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <View paddingH-16 paddingB-20>
                <Text style={styles.tite}>My story</Text>
                <Text style={styles.textStory}>
                  {item?.descriptionStory || "Don't have a story yet"}
                </Text>
                <Text style={styles.tite}>Basics</Text>
                {item && <BasicSectionFragment item={item} />}
                <Text style={styles.tite}>Interests</Text>
                {item && <InterestSectionFragment item={item} />}
              </View>

              {item && <MediaSectionFragment item={item} />}

              <TouchableOpacity
                // onPress={() => handleBlockUser(item.id, index)}
                marginB-100
              >
                <Text style={styles.blockText}>
                  Block and report this person
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View marginV-20 row style={styles.containerButtons}>
            <TouchableOpacity onPress={handleSwipeLeft}>
              <BtnDiscardIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSwipeRight}>
              <BtnYesIcon />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 500,
    borderRadius: 30,
    marginBottom: 10,
  },
  scroll: {
    backgroundColor: "white",
    borderRadius: 30,
  },
  textStory: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "Satoshi-Black",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#203936",
  },
  tite: {
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 18.2,
    fontFamily: "Satoshi-Regular",
    marginVertical: 10,
    color: "#607270",
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
  textName: {
    color: colorsLight.WHITE,
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "900",
    fontFamily: "Satoshi-Medium",
  },
  containerCard: {
    backgroundColor: "#DDE8E3",
    borderRadius: 30,
  },
  blockText: {
    marginVertical: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    fontFamily: "Satoshi-Regular",
    color: "#4E6B51",
  },
  containerButtons: {
    justifyContent: "space-between",
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 9999,
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
});
