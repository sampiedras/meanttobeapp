import React from "react";
import { StyleSheet } from "react-native";
import { AppGradientButton } from "@/core/components";
import { useViewModelProvider } from "../../ViewModelContext";

export const RenderButtonFragment = () => {
  const {
    loading,
    addChurch,
    activePage,
    selectedCount,
    imagesSelected,
    watch,
    handleContinue,
    handleSaveInfo,
    handlePermissionLocation,
    handlePermissionNotification,
    handleRequestTrackingPermission,
  } = useViewModelProvider();

  const name = watch("name");
  const birthday = watch("birthday");
  const gender = watch("gender");
  const searching = watch("searching");
  const story = watch("story");
  const location = watch("location");
  const church = watch("church");

  switch (activePage) {
    case 0:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!name}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 1:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!birthday}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 2:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!gender}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 3:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!searching}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 4:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!imagesSelected.image1}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 5:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={addChurch && !church}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 6:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={selectedCount < 3}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 7:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 8:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!story}
          style={styles.button}
          onPress={handleContinue}
        />
      );
    case 9:
      return (
        <AppGradientButton
          label="Continue"
          loading={loading}
          disabled={!location}
          style={styles.button}
          onPress={handleSaveInfo}
        />
      );
    case 10:
      return (
        <AppGradientButton
          label="Enable location"
          loading={loading}
          style={styles.button}
          onPress={handlePermissionLocation}
        />
      );
    case 11:
      return (
        <AppGradientButton
          label="Enable notification"
          loading={loading}
          style={styles.button}
          onPress={handlePermissionNotification}
        />
      );
    case 12:
      return (
        <AppGradientButton
          label="Allow Tracking"
          loading={loading}
          style={styles.button}
          onPress={handleRequestTrackingPermission}
        />
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
});
