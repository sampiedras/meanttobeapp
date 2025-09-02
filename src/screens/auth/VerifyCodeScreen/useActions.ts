import { useState } from "react";
import { Alert } from "react-native";
import { confirmSignIn, signIn } from "aws-amplify/auth";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useAuthProvider } from "@/context/AuthContext";
import { userAlertMessage } from "@/hooks/useAlertMessage";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";

export const CELL_COUNT = 6;

export const useActionsVerifyCode = ({
  route,
  navigation: { goBack },
}: RootStackScreenProps<RootStackRoutes.VERIFY_CODE>) => {
  const { checkUserIsAuth, setIsLoading } = useAuthProvider();
  const { showErrorAlert, showErrorMessage, showSuccessMessage } =
    userAlertMessage();

  const [resultSignIn, setResultSignIn] = useState(route.params.resultSignIn);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propsCel, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSendCustomChallengeAnswer = async () => {
    try {
      setLoading(true);
      await confirmSignIn({ challengeResponse: value });
      await setIsLoading(true);
      await checkUserIsAuth();
      await setIsLoading(false);
    } catch (error: any) {
      await setIsLoading(false);
      switch (error?.name) {
        case "NotAuthorizedException":
          setValue("");
          if (error?.message === "Invalid session for the user.") {
            Alert.alert(
              "Invalid session for the user.",
              "Please send code again to continue",
              [
                {
                  text: "Cancel",
                  onPress: () => goBack(),
                  style: "cancel",
                },
                { text: "OK", onPress: () => handleResendCode() },
              ],
            );
          } else if (error?.message === "Incorrect username or password.") {
            showErrorAlert(
              "The verification code you entered does not match the code we sent. Please check the code and try again.",
            );
          }
          break;

        case "UserNotFoundException":
          showErrorAlert(
            "The username you entered does not exist. Please check your username and try again.",
          );
          break;
        case "TooManyRequestsException":
          showErrorAlert(
            "You have made too many requests. Please wait a few minutes and try again.",
          );
          break;
        case "LimitExceededException":
          showErrorAlert(
            "You have exceeded the operation limit. Please wait and try again later.",
          );
          break;

        default:
          showErrorMessage("connection error");
          break;
      }
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    try {
      const resultSignInResent = await signIn({
        username: resultSignIn?.username,
      });
      setResultSignIn(resultSignInResent);
      showSuccessMessage("Code sent");
    } catch (error: any) {
      switch (error?.name) {
        case "NotAuthorizedException":
          showErrorAlert(
            "Your account does not have the necessary permissions to perform this action. Please contact support.",
          );
          break;

        case "UserNotFoundException":
          showErrorAlert(
            "The username you entered does not exist. Please check your username and try again.",
          );
          break;
        case "CodeMismatchException":
          showErrorAlert(
            "The verification code you entered does not match the code we sent. Please check the code and try again.",
          );
          break;
        case "TooManyRequestsException":
          showErrorAlert(
            "You have made too many requests. Please wait a few minutes and try again.",
          );
          break;
        case "LimitExceededException":
          showErrorAlert(
            "You have exceeded the operation limit. Please wait and try again later.",
          );
          break;

        default:
          showErrorMessage("connection error");
          break;
      }
    }
  };

  return {
    ref,
    propsCel,
    loading,
    value,
    setValue,
    getCellOnLayoutHandler,
    handleSendCustomChallengeAnswer,
    handleResendCode,
  };
};
