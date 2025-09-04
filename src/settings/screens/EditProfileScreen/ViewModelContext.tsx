import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteUser } from "aws-amplify/auth";
import { format, parseISO } from "date-fns";
import { Control, FieldErrors, useController, useForm } from "react-hook-form";
import { countryCodes, CountryItem } from "react-native-country-codes-picker";
import RNRestart from "react-native-restart";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setLoading, setLoadingText } from "@/core/slices/loadingSlice";
import { UserProfileType } from "@/core/types/AuthContextType";
import { useUserDeletionMutation } from "@/user/data/remote/userApi";

type ViewModelContextType = {
  userProfile?: UserProfileType | null;
  phoneNumberWithoutPrefix?: string | undefined;
  errors: FieldErrors<IFormEditProfile>;
  control: Control<IFormEditProfile, any>;
  formatDateNormal?: string;
  nameField?: string;
  dirtyFields?: Partial<
    Readonly<{
      email?: boolean | undefined;
    }>
  >;
  countryCode?: string;
  countrySelected: CountryItem | null;
  setCountrySelected: React.Dispatch<React.SetStateAction<CountryItem | null>>;
  handleDeleteUserAccount: () => Promise<void>;
};

export interface IFormEditProfile {
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  dateOfBirth: yup.string().required("Birthday is required"),
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("10", "Phone number is invalid", (val) => val.toString().length >= 10)
    .test(
      "10",
      "Phone number is invalid",
      (val) => val.toString().length <= 10,
    ),
});

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { userProfile } = useAuthProvider();

  const [handleUserDeletion] = useUserDeletionMutation();

  const dispatch = useAppDispatch();

  const [formatDateNormal, setFormatDate] = useState("");

  const phoneNumber = userProfile?.phone;
  const phoneNumberWithoutPrefix = userProfile?.phone
    ? userProfile?.phone.substring(3)
    : "";
  const countryCode = phoneNumber ? phoneNumber.substring(0, 3) : "";

  const selectedCountry = countryCodes.find(
    (country) => country.dial_code === `${countryCode}`,
  );

  const [countrySelected, setCountrySelected] = useState<CountryItem | null>(
    selectedCountry || null,
  );

  useEffect(() => {
    if (userProfile?.dateOfBirth) {
      const date = parseISO(userProfile?.dateOfBirth);
      const desiredformat = "MMMM dd yyyy";
      const formatDateFinal = format(date, desiredformat);
      setFormatDate(formatDateFinal);
    }
  }, [userProfile]);

  const { control, formState } = useForm<IFormEditProfile>({
    mode: "onChange",
    defaultValues: {
      name: userProfile?.name,
      dateOfBirth: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const { field: nameField } = useController({
    control,
    defaultValue: "",
    name: "name",
    rules: {
      required: true,
    },
  });

  const handleConfirmDeleteAccount = useCallback(async () => {
    try {
      await dispatch(setLoading(true));
      await dispatch(setLoadingText("Deleting account..."));
      await handleUserDeletion();
      await deleteUser();

      Toast.show({
        type: "success",
        text1: "Your account has been deleted",
        visibilityTime: 2000,
      });
      setTimeout(async () => {
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(""));
        RNRestart.Restart();
      }, 1000);
    } catch (error) {
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      Toast.show({
        type: "error",
        text1: "Could not delete account",
        visibilityTime: 2000,
      });
    }
  }, [dispatch, handleUserDeletion]);

  const handleDeleteUserAccount = useCallback(async () => {
    Alert.alert(
      "Account deletion",
      "Are you sure you want to delete account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, delete",
          onPress: async () => handleConfirmDeleteAccount(),
          style: "destructive",
        },
      ],
    );
  }, [handleConfirmDeleteAccount]);

  return (
    <ViewModelContext.Provider
      value={{
        userProfile,
        phoneNumberWithoutPrefix,
        errors,
        control,
        countryCode,
        nameField: nameField.value,
        formatDateNormal,
        countrySelected,
        setCountrySelected,
        handleDeleteUserAccount,
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
