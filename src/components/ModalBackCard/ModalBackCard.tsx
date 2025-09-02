import React from "react";
import { Image, Modal, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { Button, GradientButton } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectAlertPremium, setVisible } from "@/slices/alertPremiumSlice";
import { colorsLight } from "@/theme/colorsLight";

interface Props {
  title?: string;
  handleOpenModalPremium: () => void;
}

export const ModalBackCard = ({ handleOpenModalPremium }: Props) => {
  const { visible } = useAppSelector(selectAlertPremium);
  const dispatch = useAppDispatch();
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Image
            source={require("@/assets/image/personsImage.png")}
            style={{ alignSelf: "center" }}
          />
          <View>
            <Text style={styles.title}>This is a premium feature</Text>
            <Text style={styles.text}>
              Gain access to this and other premium features by purchasing
              premium.
            </Text>
            <GradientButton
              label="Get premium"
              height={54}
              onPress={() => handleOpenModalPremium()}
              style={styles.buttonGetPremium}
            />
            <Button
              label="Not now"
              backgroundColor="#F1F3F4"
              textColor="#1C1C21"
              onPress={() => dispatch(setVisible(false))}
              height={54}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    paddingVertical: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
    color: colorsLight.GRAY_03,
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Satoshi-Black",
    textAlign: "center",
    marginTop: 16,
  },
  imageIcon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  separator: {
    height: 2,
    backgroundColor: colorsLight.GRAY_02,
    marginVertical: 10,
  },
  buttonGetPremium: {
    marginVertical: 20,
  },
});
