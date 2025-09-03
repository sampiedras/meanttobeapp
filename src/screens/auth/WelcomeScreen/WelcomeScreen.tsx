import React, { useEffect, useMemo, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import {
  fetchAuthSession,
  getCurrentUser,
  signInWithRedirect,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { Image, View } from "react-native-ui-lib";
import { useLazyGetCheckUserExistQuery } from "@/api/user/userApi";
import { images } from "@/assets/image";
import { AppleIcon, EmailIcon, M2bIcon, PhoneIcon } from "@/assets/svg";
import { BottomModal, Button, GradientButton } from "@/components";
import { useAuthProvider } from "@/context/AuthContext";
import { userAlertMessage } from "@/hooks/useAlertMessage";
import { colorsLight } from "@/theme/colorsLight";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";
import { welcomeScreenCopies } from "@/utils/copies";

export const WelcomeScreen = ({
  route,
}: RootStackScreenProps<RootStackRoutes.WELCOME>) => {
  const { navigate } = useNavigation();
  const { checkUserIsAuth, setIsLoading } = useAuthProvider();
  const { showErrorAlert } = userAlertMessage();
  const [triggerGetCheckUserExist] = useLazyGetCheckUserExistQuery();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["30%", "60%"], []);

  useEffect(() => {
    if (route.name !== RootStackRoutes.WELCOME) return;

    console.log('paso aquiiiididid')

    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      console.log('payload @@@@@@@ --->', payload)
      switch (payload.event) {
        case "signInWithRedirect":
        case "signedIn": {
          try {
            const user = await getCurrentUser();
            const session = await fetchAuthSession();
            const sub = session.tokens?.accessToken?.payload?.sub;

            if (!sub) return;

            const { data: check } = await triggerGetCheckUserExist({
              userName: sub,
            });

            console.log('checkcheck', check)

            if (check?.exist === true) {
              await setIsLoading(true);
              await checkUserIsAuth();
              await setIsLoading(false);
            } else {
              showErrorAlert("Your account has been deleted");
            }
          } catch (_) {
            // noop
          }
          break;
        }
        case "signInWithRedirect_failure": {
          // Optional: manejar fallo de federación
          break;
        }
        case "customOAuthState": {
          // payload.data contiene el customState si se envió en signInWithRedirect
          break;
        }
        default:
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleSignInApple = async () => {
    try {
      const result = await signInWithRedirect({ provider: "Apple" });
      console.log("result @@@@@@@ --->", result);
    } catch (error) {
      console.log("error @@@@@@@ --->", error);
      // TODO: Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <M2bIcon style={styles.icon} />
        <Image
          source={images.WELCOME_PEOPLE_ICON}
          style={styles.imageIcon}
          resizeMode="cover"
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
        <GradientButton
          onPress={() => bottomSheetRef?.current?.present()}
          label="Get started"
          width="80%"
          style={styles.button}
        />
      </ScrollView>
      <BottomModal ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Button
            label="Continue with Phone"
            backgroundColor="#F1F3F4"
            textColor="#1C1C21"
            width="80%"
            iconLeft={<PhoneIcon />}
            style={styles.buttonNavigate}
            onPress={() => {
              bottomSheetRef?.current?.close();
              navigate(RootStackRoutes.LOGIN_PHONE);
            }}
          />
          <Button
            label="Continue with Apple"
            backgroundColor={colorsLight.BLACK}
            textColor={colorsLight.WHITE}
            width="80%"
            iconLeft={<AppleIcon />}
            style={styles.buttonNavigate}
            onPress={handleSignInApple}
          />
          <GradientButton
            label="Continue with email"
            fontSize={14}
            width="80%"
            height={44}
            iconLeft={<EmailIcon />}
            style={styles.buttonNavigate}
            onPress={() => {
              bottomSheetRef?.current?.close();
              navigate(RootStackRoutes.LOGIN_EMAIL);
            }}
          />
          <Text
            color={colorsLight.GRAY_03}
            variant="body2"
            style={styles.textContainerTermsPolicy}
          >
            By signing up you will be accepting our{" "}
            <Text
              color={colorsLight.GRAY_03}
              variant="body2"
              style={styles.textTermsPolicy}
            >
              Terms and Conditions
            </Text>
            . Also consult our{" "}
            <Text
              color={colorsLight.GRAY_03}
              style={styles.textTermsPolicy}
              variant="body2"
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </BottomModal>
    </SafeAreaView>
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
  contentContainer: {
    flex: 1,
    paddingTop: 16,
    alignItems: "center",
  },
  buttonNavigate: {
    marginBottom: 24,
  },
  textContainerTermsPolicy: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginVertical: 24,
    width: "80%",
    textAlign: "center",
  },
  textTermsPolicy: {
    textDecorationLine: "underline",
    fontFamily: "Satoshi-Black",
  },
});
