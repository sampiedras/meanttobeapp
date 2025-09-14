import React from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  VirtualizedList,
} from "react-native";
import { Text } from "@react-native-material/core";
import { Product } from "react-native-qonversion";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CloseDisabledIcon,
  LineDashedIcon,
  M2bTapBarIcon,
  PersonOneIcon,
  PersonThreeIcon,
  PersonTwoIcon,
} from "@/core/assets/svg";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppSelector } from "@/core/hooks/useRedux";
import { selectAlertPremium } from "@/core/slices/alertPremiumSlice";
import { colorsLight } from "@/core/theme";
import { getNameSubscription } from "@/core/utils/subscriptionsUtils";
import { AppGradientButton } from "../AppGradientButton";
import { CircleButton } from "../CircleButton";
import { RenderItemFragment } from "./RenderItemFragment";
import { useActions } from "./useActions";

export const AppModalPremium = () => {
  const { visible } = useAppSelector(selectAlertPremium);
  const { isSubscriptionActive } = useAuthProvider();
  const {
    loading,
    planSelected,
    subscriptions,
    handleOnClose,
    handleSelectPlan,
    handleMakePurchase,
    handleUpdatePurchase,
  } = useActions();

  const getItem = (data: Product[], index: number) => {
    return data[index];
  };

  const getItemCount = (data: Product[]) => {
    return data.length;
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerModal}>
          <View style={styles.containerHeader}>
            <CircleButton
              style={styles.closeButton}
              onPress={handleOnClose}
              backgroundColor={colorsLight.FILL_COLOR_LIGHT}
              height={30}
              width={30}
              icon={<CloseDisabledIcon />}
            />
            <View style={styles.titleModalContainer}>
              <Text color={colorsLight.BLACK} style={styles.titleModal}>
                Premium
              </Text>
            </View>
            <View style={styles.separator} />
          </View>
          <VirtualizedList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View>
                  <LineDashedIcon />
                  <View style={[styles.containerImages, styles.row]}>
                    <PersonOneIcon style={styles.images} />
                    <PersonTwoIcon style={styles.images} />
                    <PersonThreeIcon />
                  </View>
                </View>
                <View style={styles.marginB20}>
                  <View style={styles.center}>
                    <Text
                      style={styles.title}
                      color={colorsLight.PRIMARY_TEXT_COLOR}
                    >
                      See who likes you
                    </Text>
                    <M2bTapBarIcon />
                    <Text
                      color={colorsLight.NEUTRAL_50}
                      style={styles.subtitle}
                    >
                      Going premium will give you unlimitted access to see who
                      likes you, message people you've matched with, and
                      backtrack to the previous profiles.
                    </Text>
                  </View>
                  <Text style={styles.textSelect} color={colorsLight.BLACK}>
                    Select a duration:
                  </Text>
                </View>
              </>
            }
            data={subscriptions}
            renderItem={({ item, index }: { item: Product; index: number }) => (
              <RenderItemFragment
                key={index}
                index={index}
                item={item}
                planSelected={planSelected}
                handleSelectPlan={handleSelectPlan}
              />
            )}
            getItemCount={() => getItemCount(subscriptions)}
            getItem={(data, index) => getItem(data, index)}
            keyExtractor={(item, index) => `key-${index}`}
            ListFooterComponent={
              planSelected && (
                <AppGradientButton
                  style={styles.button}
                  label={`Get ${getNameSubscription(
                    planSelected?.qonversionID || "",
                  )} for ${planSelected?.prettyPrice || ""}`}
                  height={54}
                  onPress={
                    isSubscriptionActive && Platform.OS === "android"
                      ? handleUpdatePurchase
                      : handleMakePurchase
                  }
                  loading={loading}
                />
              )
            }
            style={styles.list}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  containerModal: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: colorsLight.WHITE,
    paddingHorizontal: 14,
    flex: 1,
  },
  containerHeader: {
    position: "relative",
    marginTop: 16,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    left: 0,
    bottom: 4,
  },
  titleModalContainer: {
    alignItems: "center",
  },
  titleModal: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    marginTop: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colorsLight.FILL_COLOR_MEDIUM,
    width: "100%",
    marginTop: 24,
  },
  containerImages: {
    position: "absolute",
    right: 46,
    bottom: 40,
  },
  images: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "Satoshi-Black",
  },
  subtitle: {
    fontSize: 16,
    width: "90%",
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Satoshi-Regular",
  },
  button: {
    marginTop: 20,
    marginBottom: 24,
  },
  textSelect: {
    fontSize: 16,
    marginTop: 22,
    fontFamily: "Satoshi-Black",
    lineHeight: 20.8,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  marginB20: {
    marginBottom: 20,
  },
});
