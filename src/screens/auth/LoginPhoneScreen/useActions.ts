import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import to from "await-to-js";
import { signIn, signUp } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import { CountryItem } from "react-native-country-codes-picker";
import * as yup from "yup";
import {
  useLazyGetByUserNameQuery,
  useLazyGetCheckUserExistQuery,
} from "@/api/user/userApi";
import { userAlertMessage } from "@/hooks/useAlertMessage";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";

export interface IFormLoginPhone {
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

export const useActionsLoginPhone = ({
  navigation: { navigate },
}: RootStackScreenProps<RootStackRoutes.LOGIN_PHONE>) => {
  const { showErrorAlert, showErrorMessage } = userAlertMessage();
  const [triggerGetCheckUserExist] = useLazyGetCheckUserExistQuery();
  const [triggerGetUserByUserName] = useLazyGetByUserNameQuery();

  const [loading, setLoading] = useState(false);
  const [countrySelected, setCountrySelected] = useState<CountryItem | null>({
    flag: "🇲🇽",
    name: { es: "México" },
    dial_code: "+52",
    code: "MX",
  });

  const { control, formState, handleSubmit } = useForm<IFormLoginPhone>({
    mode: "onChange",
    defaultValues: {
      phone_number: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleAuthentication = async (data: IFormLoginPhone) => {
    console.log("entro aqui@@@@@");
    const phone_number = `${countrySelected?.dial_code}${data.phone_number}`;
    try {
      const { data } = await triggerGetUserByUserName({
        userName: phone_number,
      });
      console.log("data @@@@@@@", data?.data);
      if (data?.data.user_exist === true) {
        setLoading(true);
        const [err, result] = await to(
          signUp({
            username: phone_number,
            password: Date.now().toString(),
            options: {
              userAttributes: {
                phone_number,
              },
            },
          }),
        );

        if (result) {
          const resultSignIn = await signIn({ username: phone_number });
          navigate(RootStackRoutes.VERIFY_CODE, {
            username: phone_number,
            resultSignIn: resultSignIn,
            lastScreen: RootStackRoutes.LOGIN_PHONE,
          });
          setLoading(false);
          return;
        }
        switch (err?.name) {
          case "UsernameExistsException":
            const resultSignIn = await signIn({ username: phone_number });
            navigate(RootStackRoutes.VERIFY_CODE, {
              username: phone_number,
              resultSignIn: resultSignIn,
              lastScreen: RootStackRoutes.LOGIN_PHONE,
            });
            break;

          case "InvalidParameterException":
            showErrorAlert(
              "The provided information is not valid. Please check your input and try again.",
            );
            break;

          case "NotAuthorizedException":
            showErrorAlert(
              "Your account does not have the necessary permissions to perform this action. Please contact support.",
            );
            break;

          default:
            showErrorAlert(`Error ${err.message}`);
            break;
        }
        setLoading(false);
      } else {
        showErrorAlert("Your account has been deleted");
      }
    } catch (error: any) {
      switch (error?.name) {
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
      setLoading(false);
    }
  };

  return {
    control,
    isValid,
    dirtyFields,
    errors,
    loading,
    countrySelected,
    setCountrySelected,
    handleSubmit,
    handleAuthentication,
  };
};
