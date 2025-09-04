import React from "react";
import { ActivityIndicator } from "react-native";
import { Text } from "@react-native-material/core";
import { Modal, View } from "react-native-ui-lib";
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
      <View flex-1 center backgroundColor="rgba(0, 0, 0, 0.5)">
        <ActivityIndicator color="white" size={48} />
        <Text variant="body1" color="white">
          {text}
        </Text>
      </View>
    </Modal>
  );
};
