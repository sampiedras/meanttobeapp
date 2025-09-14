/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { format } from "date-fns";
import Qonversion, { Product } from "react-native-qonversion";
import { CheckIcon } from "@/core/assets/svg";
import { AppGradientButton, GradientBanner } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setVisible } from "@/core/slices/alertPremiumSlice";
import { colorsLight } from "@/core/theme";
import { ModalPlan } from "./ModalPlan";

export const ViewPricingFragment = () => {
  const dispatch = useAppDispatch();
  const { isSubscriptionActive, userSubscription } = useAuthProvider();

  const [modalPlan, setModalPlan] = useState(true);
  const [subscriptionsToCompare, setSubscriptionsToCompare] = useState<
    Product[]
  >([]);

  const handleShowModalPremium = useCallback(() => {
    dispatch(setVisible(true));
  }, [dispatch]);

  const fetchProductsItems = useCallback(async () => {
    try {
      const products: Map<string, Product> =
        await Qonversion.getSharedInstance().products();
      if (products?.size > 0) {
        setSubscriptionsToCompare(Array.from(products.values()));
      }
    } catch (e) {
      // TODO: handle error
    }
  }, []);

  useEffect(() => {
    fetchProductsItems();
  }, [fetchProductsItems]);

  return (
    <View style={styles.marginB95}>
      <View style={[styles.center, styles.marginT24]}>
        <GradientBanner
          title="Super Meant!"
          text="Unlock all of our features to be in complete control of your experience."
          labelButton={
            isSubscriptionActive
              ? `Activate until ${format(
                  userSubscription?.expirationDate || 0,
                  "MMMM d, yyyy",
                )}`
              : "Activate Premium"
          }
          width={isSubscriptionActive ? "90%" : 165}
          onPress={handleShowModalPremium}
        />
      </View>
      {isSubscriptionActive ? (
        <View
          style={[
            styles.containerItems,
            styles.marginB24,
            styles.marginT24,
            styles.height236,
          ]}
        >
          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.center,
              styles.row,
            ]}
          >
            <Text style={styles.title}>What you get</Text>
            <View style={styles.row}>
              <Text style={[{ marginRight: 20 }, styles.title]}>Premium</Text>
              <Text style={styles.titleDisabled}>Current</Text>
            </View>
          </View>

          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.row,
              styles.center,
            ]}
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              See who likes you
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>

          <View style={[styles.container, styles.marginB20, styles.row]}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              Unlimited backtracks
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>

          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.row,
              styles.center,
            ]}
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              Unlimited matches
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.containerItems,
            styles.marginB24,
            styles.marginT24,
            styles.height236,
          ]}
        >
          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.center,
              styles.row,
            ]}
          >
            <Text style={styles.title}>What you get</Text>
            <View style={styles.row}>
              <Text style={[{ marginRight: 20 }, styles.titleDisabled]}>
                Premium
              </Text>
              <Text style={styles.title}>Current</Text>
            </View>
          </View>

          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.row,
              styles.center,
            ]}
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              See who likes you
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>

          <View style={[styles.container, styles.marginB20, styles.row]}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              Unlimited backtracks
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>

          <View
            style={[
              styles.container,
              styles.marginB20,
              styles.row,
              styles.center,
            ]}
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textItems}
            >
              Unlimited matches
            </Text>
            <CheckIcon style={styles.iconPremium} />
          </View>
        </View>
      )}
      {userSubscription && userSubscription?.productId === "year" ? (
        <AppGradientButton
          label="Full access"
          style={styles.buttonPremium}
          onPress={handleShowModalPremium}
          height={54}
          disabled
        />
      ) : (
        <AppGradientButton
          label={isSubscriptionActive ? "Update my plan" : "Get premium"}
          style={styles.buttonPremium}
          onPress={handleShowModalPremium}
          height={54}
        />
      )}
      {isSubscriptionActive &&
        modalPlan &&
        userSubscription &&
        subscriptionsToCompare.length > 0 && (
          <ModalPlan
            visible={modalPlan}
            onClose={() => setModalPlan(false)}
            subscriptions={subscriptionsToCompare}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  marginB95: { marginBottom: 95 },
  center: { alignItems: "center", justifyContent: "center" },
  marginT24: { marginTop: 24 },
  containerItems: {
    flexDirection: "column",
    height: "auto",
  },
  marginB24: { marginBottom: 24 },
  height236: { height: 236 },
  marginB20: { marginBottom: 20 },
  row: { flexDirection: "row" },
  textItems: {
    fontSize: 14,
    color: "#1C1C21",
    fontFamily: "Satoshi-Regular",
  },
  title: {
    fontSize: 14,
    color: "#1C1C21",
    fontFamily: "Satoshi-Medium",
  },
  titleDisabled: {
    fontSize: 14,
    color: "#BABBBF",
    fontFamily: "Satoshi-Medium",
  },
  iconPremium: {
    marginRight: 94,
  },
  buttonPremium: {
    marginBottom: 20,
  },
});
