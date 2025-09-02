import React, { forwardRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { colorsLight } from "@/theme/colorsLight";

interface Props extends BottomSheetModalProps {
  children: React.ReactNode;
}

export const BottomModal = forwardRef<BottomSheetModal, Props>(
  ({ children, ...props }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          opacity={0.7}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        backgroundComponent={() => <View style={styles.modalContainer} />}
        backdropComponent={renderBackdrop}
        handleComponent={() => (
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        )}
        ref={ref}
        {...props}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

BottomModal.displayName = "BottomModal";

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colorsLight.WHITE,
  },
  handleContainer: {
    backgroundColor: colorsLight.WHITE,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: colorsLight.GRAY_02,
    marginTop: 9,
  },
});
