import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomSheetBackdropProps as BackdropProps,
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetModalProps,
  BottomSheetView,
  BottomSheetModal as Modal,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colorsLight } from "@/core/theme";

interface Props extends BottomSheetModalProps {
  children: React.ReactNode;
  modalRef: React.RefObject<BottomSheetModalMethods>;
  backgroundColor?: string;
}

export const BottomModal = ({
  children,
  modalRef,
  backgroundColor,
  ...props
}: Props) => {
  const renderBackdrop = useCallback(
    (propsBackdrop: BackdropProps) => (
      <BottomSheetBackdrop
        {...propsBackdrop}
        disappearsOnIndex={-1}
        opacity={0.7}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const renderBackgroundComponent = ({ style }: BottomSheetBackgroundProps) => (
    <View
      style={[
        style,
        styles.modalContainer,
        { backgroundColor: backgroundColor || colorsLight.WHITE },
      ]}
      testID="modal-background"
    />
  );

  return (
    <Modal
      backgroundComponent={renderBackgroundComponent}
      backdropComponent={renderBackdrop}
      ref={modalRef}
      {...props}
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    flex: 1,
  },
});
