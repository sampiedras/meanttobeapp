import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useUpdateUserStoryMutation } from "@/user/data/remote/userApi";

export interface IFormStory {
  story: string;
}

const schema = yup.object({
  story: yup.string().required("Please enter your story"),
});

type ViewModelContextType = {
  control: Control<IFormStory, any>;
  isValid: boolean;
  errors: FieldErrors<IFormStory>;
  loading: boolean;
  dirtyFields: Partial<
    Readonly<{
      story?: boolean | undefined;
    }>
  >;
  handleSubmit: UseFormHandleSubmit<IFormStory, undefined>;
  handleUpdateStory: ({ story }: IFormStory) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { goBack } = useNavigation();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();

  const [handleUpdateStoryApi, { isLoading }] = useUpdateUserStoryMutation();

  const { control, formState, handleSubmit } = useForm<IFormStory>({
    mode: "onChange",
    defaultValues: {
      story: userProfile?.descriptionStory,
    },
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;

  const handleUpdateStory = useCallback(
    async ({ story }: IFormStory) => {
      try {
        await handleUpdateStoryApi({ story });
        await handleUserUpdateInfo();
        Toast.show({
          type: "success",
          text1: "Story updated successfully",
          visibilityTime: 2000,
        });
        goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error updating story",
          visibilityTime: 2000,
        });
      }
    },
    [goBack, handleUpdateStoryApi, handleUserUpdateInfo],
  );

  return (
    <ViewModelContext.Provider
      value={{
        control,
        isValid,
        errors,
        loading: isLoading,
        dirtyFields,
        handleSubmit,
        handleUpdateStory,
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
