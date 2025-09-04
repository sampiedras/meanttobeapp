import React from "react";
import { Modal, StyleSheet, Text } from "react-native";
import { format } from "date-fns";
import { Product } from "react-native-qonversion";
import { View } from "react-native-ui-lib";
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
      <View flex-1 center backgroundColor="rgba(0, 0, 0, 0.5)">
        <View
          width="80%"
          center
          spread
          backgroundColor="white"
          paddingV-24
          paddingH-24
          style={styles.container}
        >
          <Text style={styles.title}>Premium subscription</Text>
          <View>
            <View row style={styles.containerImages}>
              <PersonOneIcon style={styles.images} width={60} />
              <PersonTwoIcon style={styles.images} width={60} />
              <PersonThreeIcon width={60} />
            </View>
          </View>
          <View style={styles.box} width="100%" marginT-2 marginB-24>
            <Text style={styles.textProduct}>
              {handleGetNameSubscription()}
            </Text>
            <Text style={styles.textPrice}>
              {subscriptions.length
                ? `${productSub?.prettyPrice} ${productSub?.skProduct?.currencyCode}`
                : ""}
            </Text>
            <View row spread centerV>
              <Text style={styles.text}>Status</Text>
              <Text style={styles.textInfo}>Subscribed</Text>
            </View>
            <View row spread centerV>
              <Text style={styles.text}>Expires</Text>
              <Text style={styles.textInfo}>
                {format(userSubscription?.expirationDate || 0, "MMMM d, yyyy")}
              </Text>
            </View>
            <View row spread centerV>
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
