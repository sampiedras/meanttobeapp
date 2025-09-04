import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { signIn, signUp } from "aws-amplify/auth";
import { I18n } from "aws-amplify/utils";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { AuthStackRoutes } from "@/auth/routes";
import { useLazyGetCheckUserExistQuery } from "@/user/data/remote/userApi";

export interface IFormLoginEmail {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a valid email"),
});

type ViewModelContextType = {
  control: Control<IFormLoginEmail, any>;
  isValid: boolean;
  dirtyFields: Partial<
    Readonly<{
      email?: boolean | undefined;
    }>
  >;
  errors: FieldErrors<IFormLoginEmail>;
  loading: boolean;
  handleSubmit: UseFormHandleSubmit<IFormLoginEmail, undefined>;
  handleAuthentication: (data: IFormLoginEmail) => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const [triggerGetCheckUserExist] = useLazyGetCheckUserExistQuery();

  const [loading, setLoading] = useState(false);

  const { control, formState, handleSubmit } = useForm<IFormLoginEmail>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleSignIn = useCallback(
    async (email: string) => {
      try {
        setLoading(true);
        const { nextStep } = await signIn({
          username: email,
          options: {
            authFlowType: "CUSTOM_WITHOUT_SRP",
          },
        });
        switch (nextStep.signInStep) {
          case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
            navigate(AuthStackRoutes.CONFIRM, {
              destination: email,
              username: email,
              type: "email",
            });
            break;

          default:
            break;
        }
      } catch (error: any) {
        switch (error?.name) {
          case "UserNotFoundException":
            Toast.show({
              type: "error",
              text1:
                "The username you entered does not exist. Please check your username and try again.",
              visibilityTime: 3000,
            });
            break;
          case "TooManyRequestsException":
            Toast.show({
              type: "error",
              text1:
                "You have made too many requests. Please wait a few minutes and try again.",
              visibilityTime: 3000,
            });
            break;
          case "LimitExceededException":
            Toast.show({
              type: "error",
              text1:
                "You have exceeded the operation limit. Please wait and try again later.",
              visibilityTime: 3000,
            });
            break;

          default:
            Toast.show({
              type: "error",
              text1: "connection error",
              visibilityTime: 3000,
            });
            break;
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const handleSignUp = useCallback(
    async (email: string) => {
      try {
        setLoading(true);
        const { nextStep } = await signUp({
          username: email,
          password: Date.now().toString(),
          options: {
            userAttributes: {
              email,
            },
          },
        });
        switch (nextStep.signUpStep) {
          case "DONE":
            handleSignIn(email);
            break;

          default:
            break;
        }
      } catch (error: any) {
        if (error?.name === "UsernameExistsException") {
          handleSignIn(email);
        } else {
          Toast.show({
            type: "error",
            text1: I18n.get("signIn.label.error"),
            visibilityTime: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [handleSignIn],
  );

  const handleAuthentication = useCallback(
    async ({ email }: IFormLoginEmail) => {
      try {
        const result = await triggerGetCheckUserExist({
          id: email,
          type: "email",
        }).unwrap();

        if (result.exists === true) {
          await handleSignIn(email);
        } else if (result.exists === false) {
          await handleSignUp(email);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error, not connection with server",
          visibilityTime: 3000,
        });
      }
    },
    [handleSignIn, handleSignUp, triggerGetCheckUserExist],
  );

  return (
    <ViewModelContext.Provider
      value={{
        control,
        isValid,
        dirtyFields,
        errors,
        loading,
        handleSubmit,
        handleAuthentication,
      }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
