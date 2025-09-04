import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { View } from "react-native-ui-lib";
import { WELCOME_PEOPLE } from "@/auth/assets/images";
import { PhoneIcon } from "@/auth/assets/svg";
import { AuthStackRoutes } from "@/auth/routes";
import { AppContainer, AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { welcomeScreenCopies } from "@/core/utils/copies";
import { BottomModalOptions } from "./fragments/BottomModalOptions/BottomModalOptions";
import { useViewModelProvider, ViewModelProvider } from "./viewModelContext";

export const WelcomeContent =
  ({}: RootStackScreenProps<AuthStackRoutes.WELCOME>) => {
    const { bottomSheetRef } = useViewModelProvider();

    return (
      <AppContainer style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerScroll}>
          <PhoneIcon style={styles.icon} />
          <FastImage
            style={styles.imageIcon}
            resizeMode="cover"
            source={WELCOME_PEOPLE}
          />
          <View style={styles.containerText}>
            <Text variant="h4" style={styles.title}>
              {welcomeScreenCopies.title}
            </Text>
            <Text variant="h4" style={styles.subtitle}>
              {welcomeScreenCopies.subtitle}
            </Text>

            <Text variant="body1" style={styles.text}>
              {welcomeScreenCopies.text}
            </Text>
          </View>
          <AppGradientButton
            onPress={() => bottomSheetRef?.current?.present()}
            label="Get started"
            width="90%"
            height={48}
            style={styles.button}
          />
        </ScrollView>
        <BottomModalOptions />
      </AppContainer>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  containerScroll: {
    paddingTop: 32,
  },
  icon: {
    marginLeft: 16,
  },
  imageIcon: {
    width: "100%",
    height: 430,
  },
  containerText: {
    paddingLeft: 16,
  },
  title: {
    marginTop: -16,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Black",
  },
  subtitle: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.PRIMARY_TEXT_COLOR,
  },
  text: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginVertical: 24,
  },
  button: {
    alignSelf: "center",
    marginTop: 16,
  },
});

export const WelcomeScreen = (
  props: RootStackScreenProps<AuthStackRoutes.WELCOME>,
) => (
  <ViewModelProvider>
    <WelcomeContent {...props} />
  </ViewModelProvider>
);
