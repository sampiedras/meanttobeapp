import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { selectLoading } from "@/core/slices/loadingSlice";

export const Loading = () => {
  const { loading, text } = useSelector(selectLoading);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      onRequestClose={() => null}
    >
      <View style={styles.container}>
        <ActivityIndicator color="white" size={48} />
        <Text variant="body1" style={styles.text}>
          {text}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    color: "white",
  },
});
