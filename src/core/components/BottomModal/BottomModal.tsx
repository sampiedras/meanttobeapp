import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop as Backdrop,
  BottomSheetBackdropProps as BackdropProps,
  BottomSheetModalProps,
  BottomSheetModal as Modal,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colorsLight } from "@/core/theme";

interface Props extends BottomSheetModalProps {
  children: JSX.Element;
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
      <Backdrop
        {...propsBackdrop}
        disappearsOnIndex={-1}
        opacity={0.7}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const renderBackgroundComponent = () => (
    <View
      style={[
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
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
