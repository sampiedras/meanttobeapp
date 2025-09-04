import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import { ConfirmScreen, LoginEmailScreen, WelcomeScreen } from "./screens";
import { LoginPhoneScreen } from "./screens/LoginPhoneScreen";

export enum AuthStackRoutes {
  WELCOME = "WELCOME",
  CONFIRM = "CONFIRM",
  LOGIN_EMAIL = "LOGIN_EMAIL",
  LOGIN_PHONE = "LOGIN_PHONE",
}

export const useAuthGroupScreens = () => {
  const renderAuthGroupScreens = () => (
    <Stack.Group>
      <Stack.Screen
        name={AuthStackRoutes.WELCOME}
        component={WelcomeScreen}
        options={() => ({
          headerShown: false,
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "red",
          },
        })}
      />
      <Stack.Screen
        name={AuthStackRoutes.LOGIN_EMAIL}
        component={LoginEmailScreen}
        options={({ navigation }) => ({
          title: "Login or sign up",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeftContainerStyle: {
            paddingLeft: 8,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={AuthStackRoutes.LOGIN_PHONE}
        component={LoginPhoneScreen}
        options={({ navigation }) => ({
          title: "Login or sign up",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeftContainerStyle: {
            paddingLeft: 8,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={AuthStackRoutes.CONFIRM}
        component={ConfirmScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "white",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Group>
  );

  return {
    renderAuthGroupScreens,
  };
};
