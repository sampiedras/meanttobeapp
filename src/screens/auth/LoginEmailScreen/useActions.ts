import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import to from "await-to-js";
import { signIn, signUp } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useLazyGetByUserNameQuery,
  useLazyGetCheckUserExistQuery,
} from "@/api/user/userApi";
import { userAlertMessage } from "@/hooks/useAlertMessage";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";

export interface IFormLoginEmail {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter a valid email"),
});

export const useActionsLoginEmail = ({
  navigation: { navigate },
}: RootStackScreenProps<RootStackRoutes.LOGIN_EMAIL>) => {
  const { showErrorAlert, showErrorMessage } = userAlertMessage();
  const [triggerGetCheckUserExist] = useLazyGetCheckUserExistQuery();
  const [triggerGetUserByUserName] = useLazyGetByUserNameQuery();

  const [loading, setLoading] = useState(false);

  const { control, formState, handleSubmit } = useForm<IFormLoginEmail>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleAuthentication = async ({ email }: IFormLoginEmail) => {
    try {
      const { data } = await triggerGetCheckUserExist({
        userName: email,
      });
      console.log("data 🐶🐶🐶🐶🐶🐶", data);
      if (data?.exist === false) {
        setLoading(true);
        const [err, result] = await to(
          signUp({
            username: email,
            password: Date.now().toString(),
            options: {
              userAttributes: { email },
            },
          }),
        );

        console.log("result 🐶🐶🐶🐶🐶🐶", result);

        if (result) {
          const resultSignIn = await signIn({ username: email });
          navigate(RootStackRoutes.VERIFY_CODE, {
            username: email,
            resultSignIn: resultSignIn,
            lastScreen: RootStackRoutes.LOGIN_EMAIL,
          });
          setLoading(false);
          return;
        } else {
          setLoading(false);
          showErrorAlert(`Error ${err.message}`);
        }
      } else {
        setLoading(false);
        const resultSignIn = await signIn({ username: email });
        navigate(RootStackRoutes.VERIFY_CODE, {
          username: email,
          resultSignIn: resultSignIn,
          lastScreen: RootStackRoutes.LOGIN_EMAIL,
        });
      }
    } catch (error: any) {
      console.log("error @@@@@@@", error);
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
    handleSubmit,
    handleAuthentication,
  };
};
