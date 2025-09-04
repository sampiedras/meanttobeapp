import { useCallback, useState } from "react";
import { confirmSignIn, signIn } from "aws-amplify/auth";
import { I18n } from "aws-amplify/utils";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { useAuthProvider } from "@/core/context/AuthContext";

export const CELL_COUNT = 6;

interface IUseActions {
  username: string;
}

export const useConfirmViewModel = ({ username }: IUseActions) => {
  const { currentSession } = useAuthProvider();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSignInConfirmation = useCallback(async () => {
    try {
      setLoading(true);
      const { nextStep } = await confirmSignIn({
        challengeResponse: value,
      });
      if (nextStep.signInStep === "DONE") {
        await currentSession();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: I18n.get("confirm.error"),
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  }, [currentSession, value]);

  const handleResendVerificationCode = useCallback(async () => {
    try {
      const { nextStep } = await signIn({
        username,
        options: {
          authFlowType: "CUSTOM_WITHOUT_SRP",
        },
      });
      switch (nextStep.signInStep) {
        case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
          Toast.show({
            type: "success",
            text1: I18n.get("signIn.resent.code"),
            visibilityTime: 2000,
          });
          break;

        case "DONE":
          await currentSession();
          break;

        default:
          break;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error to resend code",
        visibilityTime: 2000,
      });
    }
  }, [currentSession, username]);

  return {
    value,
    setValue,
    ref,
    props,
    loading,
    getCellOnLayoutHandler,
    handleSignInConfirmation,
    handleResendVerificationCode,
  };
};
