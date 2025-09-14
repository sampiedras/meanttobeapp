import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { Product } from "react-native-qonversion";
import {
  PersonOneIcon,
  PersonThreeIcon,
  PersonTwoIcon,
} from "@/core/assets/svg";
import { AppGradientButton } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";

interface IModalPlan {
  visible: boolean;
  onClose?: () => void;
  subscriptions: Product[];
}

export const ModalPlan = ({ visible, subscriptions, onClose }: IModalPlan) => {
  const { userSubscription } = useAuthProvider();

  const handleGetNameSubscription = () => {
    switch (userSubscription?.productId) {
      case "weekly":
        return "1 weekly";
      case "month":
        return "1 month";
      case "3_month":
        return "3 months";
      case "year":
        return "12 months";

      default:
        return "";
    }
  };

  const productSub = subscriptions
    ? subscriptions?.find(
        (product) => product?.qonversionID === userSubscription?.productId,
      )
    : null;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.flex1, styles.center, styles.backdrop]}>
        <View
          style={[
            styles.container,
            styles.width80,
            styles.center,
            styles.spread,
            styles.paddingV24,
            styles.paddingH24,
            { backgroundColor: "white" },
          ]}
        >
          <Text style={styles.title}>Premium subscription</Text>
          <View>
            <View style={[styles.row, styles.containerImages]}>
              <PersonOneIcon style={styles.images} width={60} />
              <PersonTwoIcon style={styles.images} width={60} />
              <PersonThreeIcon width={60} />
            </View>
          </View>
          <View
            style={[
              styles.box,
              styles.fullWidth,
              styles.marginT2,
              styles.marginB24,
            ]}
          >
            <Text style={styles.textProduct}>
              {handleGetNameSubscription()}
            </Text>
            <Text style={styles.textPrice}>
              {subscriptions.length
                ? `${productSub?.prettyPrice} ${productSub?.skProduct?.currencyCode}`
                : ""}
            </Text>
            <View style={[styles.row, styles.spread, styles.centerV]}>
              <Text style={styles.text}>Status</Text>
              <Text style={styles.textInfo}>Subscribed</Text>
            </View>
            <View style={[styles.row, styles.spread, styles.centerV]}>
              <Text style={styles.text}>Expires</Text>
              <Text style={styles.textInfo}>
                {format(userSubscription?.expirationDate || 0, "MMMM d, yyyy")}
              </Text>
            </View>
            <View style={[styles.row, styles.spread, styles.centerV]}>
              <Text style={styles.text}>Pay plan</Text>
              <Text style={styles.textInfo}>{handleGetNameSubscription()}</Text>
            </View>
          </View>
          <AppGradientButton label="Done" onPress={onClose} height={54} />
          <Text style={styles.textFooter}>
            Learn how to manage your Apple subscriptions
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  flex1: { flex: 1 },
  center: { alignItems: "center", justifyContent: "center" },
  backdrop: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  width80: { width: "80%" },
  spread: { justifyContent: "space-between" },
  paddingV24: { paddingVertical: 24 },
  paddingH24: { paddingHorizontal: 24 },
  row: { flexDirection: "row" },
  fullWidth: { width: "100%" },
  marginT2: { marginTop: 2 },
  marginB24: { marginBottom: 24 },
  centerV: { alignItems: "center" },
  containerImages: {
    marginVertical: 24,
  },
  images: {
    marginRight: 16,
  },
  box: {
    borderWidth: 1,
    borderColor: "#6D9493",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Satoshi-Bold",
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },
  textProduct: {
    fontFamily: "Satoshi-Medium",
    color: colorsLight.GRAY_03,
    fontSize: 14,
    marginBottom: 12,
  },
  textPrice: {
    fontFamily: "Satoshi-Bold",
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontSize: 18,
    marginBottom: 12,
  },
  text: {
    fontFamily: "Satoshi-Medium",
    color: colorsLight.GRAY_03,
    fontSize: 14,
    marginBottom: 8,
  },
  textInfo: {
    fontFamily: "Satoshi-Bold",
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontSize: 14,
    marginBottom: 8,
  },
  textFooter: {
    fontFamily: "Satoshi-Medium",
    color: colorsLight.GRAY_03,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
});
