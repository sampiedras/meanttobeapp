import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Keyboard } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import { useAuthProvider } from "@/core/context/AuthContext";
import useDebounce from "@/core/hooks/useDebounce";
import { ResponseChurchEntity } from "@/user/data/remote/entities/churchEntity";
import {
  useLazyGetAllChurchesQuery,
  useUpdateUserChurchMutation,
} from "@/user/data/remote/userApi";

export interface IFormChurch {
  church: { id?: string; name?: string } | null;
}

const schema = yup.object({
  church: yup
    .object({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
});

type ViewModelContextType = {
  control: Control<IFormChurch, any>;
  isValid: boolean;
  errors: FieldErrors<IFormChurch>;
  loading: boolean;
  dirtyFields: Partial<
    Readonly<{
      church?:
        | boolean
        | {
            id?: boolean | undefined;
            name?: boolean | undefined;
          }
        | undefined;
    }>
  >;
  churches: ResponseChurchEntity[];
  loadingSearch: boolean;
  searchText: string;
  addChurch: boolean;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  handleUpdateChurch: () => void;
  handleSearch: any;
  handleSave: (church: ResponseChurchEntity) => void;
  setAddChurch: React.Dispatch<React.SetStateAction<boolean>>;
  watch: UseFormWatch<IFormChurch>;
  onChangeTextSearch: (text: string) => void;
  handleSheetChanges: (index: number) => void;
  setValue: UseFormSetValue<IFormChurch>;
  trigger: UseFormTrigger<IFormChurch>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { goBack } = useNavigation();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();
  const [triggerGetAllChurches, { data: churches = [] }] =
    useLazyGetAllChurchesQuery();

  const [handleUpdateCurchApi, { isLoading }] = useUpdateUserChurchMutation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["01%", "90%"], []);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [addChurch, setAddChurch] = useState(true);

  const { control, formState, setValue, trigger, watch, getValues } =
    useForm<IFormChurch>({
      mode: "onChange",
      defaultValues: {
        church: userProfile?.church
          ? { id: "1", name: userProfile?.church }
          : null,
      },
      resolver: yupResolver(schema),
    });

  const { isValid, errors, dirtyFields } = formState;

  const handleSearch = useDebounce(async (text: string) => {
    Keyboard.dismiss();
    try {
      await triggerGetAllChurches(text);
    } catch (error) {
      Alert.alert("Error", "Not found");
    }
    setLoadingSearch(false);
  }, 1000);

  const onChangeTextSearch = (text: string) => {
    setLoadingSearch(true);
    setSearchText(text);
    handleSearch(text);
  };

  const handleSave = (church: ResponseChurchEntity) => {
    bottomSheetRef?.current?.snapToIndex(0);
    setValue("church", church, { shouldDirty: true });
    trigger("church");
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, []);

  const handleUpdateChurch = useCallback(async () => {
    try {
      await handleUpdateCurchApi({
        church: addChurch ? getValues("church.name") || "" : "",
      });
      await handleUserUpdateInfo();
      Toast.show({
        type: "success",
        text1: "Church updated successfully",
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
  }, [
    addChurch,
    getValues,
    goBack,
    handleUpdateCurchApi,
    handleUserUpdateInfo,
  ]);

  useEffect(() => {
    (async function () {
      await triggerGetAllChurches(searchText);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewModelContext.Provider
      value={{
        churches,
        control,
        isValid,
        errors,
        loading: isLoading,
        dirtyFields,
        loadingSearch,
        searchText,
        addChurch,
        bottomSheetRef,
        snapPoints,
        handleSearch,
        watch,
        setValue,
        trigger,
        setAddChurch,
        handleUpdateChurch,
        handleSave,
        onChangeTextSearch,
        handleSheetChanges,
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
