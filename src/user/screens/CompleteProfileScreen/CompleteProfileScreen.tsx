import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { HeartGreenIcon, ImageIcon, UserCircleIcon } from "@/core/assets/svg";
import { AppContainerSafeArea, Tag } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { completeProfileScreenCopies } from "@/core/utils/copies";
import { LocationIcon } from "@/explorer/assets/svg";
import { E_UserStackRoutes } from "@/user";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

const spacing = 16;

export const CompleteProfileContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.COMPLETE_PROFILE>) => {
    const { navigate } = useNavigation();

    const { totalPercentageProfile, counts, userProfile } =
      useViewModelProvider();

    return (
      <AppContainerSafeArea edges={["bottom"]}>
        <View style={[styles.rowCenter, styles.paddingH10, styles.marginT8]}>
          <View style={[styles.flex, styles.centerH]}>
            <Text style={styles.textHeader}>
              {totalPercentageProfile < 100
                ? `${totalPercentageProfile}% complete`
                : "Complete"}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={[styles.centerH, styles.marginT40]}>
            <Text style={styles.title}>
              {completeProfileScreenCopies.title}
            </Text>
            <Text style={styles.subtitle}>
              {completeProfileScreenCopies.subtitle}
            </Text>
          </View>
          <View style={[styles.marginT40, styles.container]}>
            <View style={styles.column}>
              <TouchableOpacity
                onPress={() => navigate(E_UserStackRoutes.DRIVES)}
                style={styles.itemContainer}
              >
                <View style={styles.containerItems}>
                  <Tag
                    backgroundColor={colorsLight.WHITE}
                    width={40}
                    height={40}
                    iconCenter={<HeartGreenIcon width={24} height={24} />}
                  />
                  <Text style={styles.titleItem}>
                    {completeProfileScreenCopies.titleDrives}
                  </Text>
                  <Text style={styles.subtitleItem}>
                    {counts.numberUserDrives >= 9
                      ? "complete"
                      : `${counts.numberUserDrives} of 9 added`}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate(E_UserStackRoutes.QUESTIONS)}
                style={styles.itemContainer}
              >
                <View style={styles.containerItems}>
                  <Tag
                    backgroundColor={colorsLight.WHITE}
                    width={40}
                    height={40}
                    iconCenter={<UserCircleIcon width={24} height={24} />}
                  />
                  <Text style={styles.titleItem}>
                    {completeProfileScreenCopies.titleDeepQuestions}
                  </Text>
                  <Text style={styles.subtitleItem}>
                    {counts.numberDeepQuestionsSelected >= 3
                      ? "complete"
                      : `${counts.numberDeepQuestionsSelected} of 3 added`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity
                onPress={() => navigate(E_UserStackRoutes.ADD_PHOTO)}
                style={styles.itemContainer}
              >
                <View style={styles.containerItems}>
                  <Tag
                    backgroundColor={colorsLight.WHITE}
                    width={40}
                    height={40}
                    iconCenter={<ImageIcon width={24} height={24} />}
                  />
                  <Text style={styles.titleItem}>
                    {completeProfileScreenCopies.titlePhotos}
                  </Text>
                  <Text style={styles.subtitleItem}>
                    {userProfile?.mediaUrls && userProfile.mediaUrls.length >= 6
                      ? "complete"
                      : `${userProfile?.mediaUrls?.length || 0} of 6 added`}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigate(E_UserStackRoutes.CHURCH)}
                style={styles.itemContainer}
              >
                <View style={styles.containerItems}>
                  <Tag
                    backgroundColor={colorsLight.WHITE}
                    width={40}
                    height={40}
                    iconCenter={<LocationIcon width={24} height={24} />}
                  />
                  <Text style={styles.titleItem}>
                    {completeProfileScreenCopies.titleChurch}
                  </Text>
                  <Text style={styles.subtitleItem}>
                    {userProfile?.church ? "complete" : `${0} of 1 added`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paddingH10: { paddingHorizontal: 10 },
  marginT8: { marginTop: 8 },
  title: {
    fontSize: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: "center",
    fontFamily: "Satoshi-Black",
  },
  subtitle: {
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: "center",
    marginTop: 20,
    width: "90%",
    fontFamily: "Satoshi-Medium",
  },
  marginT40: { marginTop: 40 },
  containerItems: {
    flexDirection: "column",
    backgroundColor: colorsLight.GRAY_LIGHT,
    width: "100%",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  titleItem: {
    marginTop: 18,
    fontFamily: "Satoshi-Black",
  },
  subtitleItem: {
    marginTop: 6,
    fontFamily: "Satoshi-Regular",
  },
  textHeader: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: "center",
  },
  centerH: { alignItems: "center" },
  flex: { flex: 1 },
  itemContainer: {
    flex: 1,
    margin: spacing / 2,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export const CompleteProfileScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.COMPLETE_PROFILE>,
) => (
  <ViewModelProvider>
    <CompleteProfileContent {...props} />
  </ViewModelProvider>
);
