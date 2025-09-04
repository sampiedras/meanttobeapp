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
import { CountryItem } from "react-native-country-codes-picker";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { AuthStackRoutes } from "@/auth/routes";
import { useLazyGetCheckUserExistQuery } from "@/user/data/remote/userApi";

export interface IFormLoginEmail {
  phone_number: string;
}

const schema = yup.object({
  phone_number: yup
    .string()
    .required("Please enter a valid phone")
    .test("10", "Phone number is invalid", (val) => val.toString().length >= 10)
    .test(
      "10",
      "Phone number is invalid",
      (val) => val.toString().length <= 10,
    ),
});

type ViewModelContextType = {
  control: Control<IFormLoginEmail, any>;
  isValid: boolean;
  dirtyFields: Partial<
    Readonly<{
      phone_number?: boolean | undefined;
    }>
  >;
  errors: FieldErrors<IFormLoginEmail>;
  loading: boolean;
  countrySelected: CountryItem | null;
  setCountrySelected: React.Dispatch<React.SetStateAction<CountryItem | null>>;
  handleSubmit: UseFormHandleSubmit<IFormLoginEmail, undefined>;
  handleAuthentication: (data: IFormLoginEmail) => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const [triggerGetCheckUserExist] = useLazyGetCheckUserExistQuery();

  const [countrySelected, setCountrySelected] = useState<CountryItem | null>({
    flag: "🇲🇽",
    name: { es: "México" },
    dial_code: "+52",
    code: "MX",
  });
  const [loading, setLoading] = useState(false);

  const { control, formState, handleSubmit } = useForm<IFormLoginEmail>({
    mode: "onChange",
    defaultValues: {
      phone_number: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleSignIn = useCallback(
    async (phone_number: string) => {
      try {
        setLoading(true);
        const { nextStep } = await signIn({
          username: phone_number,
          options: {
            authFlowType: "CUSTOM_WITHOUT_SRP",
          },
        });
        switch (nextStep.signInStep) {
          case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
            navigate(AuthStackRoutes.CONFIRM, {
              destination: phone_number,
              username: phone_number,
              type: "phone",
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
    async (phone_number: string) => {
      try {
        setLoading(true);
        const { nextStep } = await signUp({
          username: phone_number,
          password: Date.now().toString(),
          options: {
            userAttributes: {
              phone_number,
            },
          },
        });
        switch (nextStep.signUpStep) {
          case "DONE":
            handleSignIn(phone_number);
            break;

          default:
            break;
        }
      } catch (error: any) {
        if (error?.name === "UsernameExistsException") {
          handleSignIn(phone_number);
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
    async (data: IFormLoginEmail) => {
      try {
        const phone_number = `${countrySelected?.dial_code}${data.phone_number}`;
        const result = await triggerGetCheckUserExist({
          id: phone_number,
          type: "phone",
        }).unwrap();

        if (result.exists === true) {
          await handleSignIn(phone_number);
        } else if (result.exists === false) {
          await handleSignUp(phone_number);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error, not connection with server",
          visibilityTime: 3000,
        });
      }
    },
    [
      countrySelected?.dial_code,
      handleSignIn,
      handleSignUp,
      triggerGetCheckUserExist,
    ],
  );

  return (
    <ViewModelContext.Provider
      value={{
        control,
        isValid,
        dirtyFields,
        errors,
        loading,
        countrySelected,
        setCountrySelected,
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
