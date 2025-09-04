import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import Geolocation from "@react-native-community/geolocation";
import * as Sentry from "@sentry/react-native";
import to from "await-to-js";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { Asset } from "react-native-image-picker";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useAuthProvider } from "@/core/context/AuthContext";
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from "@/core/data/remote/entities/bibleEntity";
import { useNavigationPanel } from "@/core/hooks/useNavigationPanel";
import { usePermissions } from "@/core/hooks/usePermissions";
import { useAppDispatch, useAppSelector } from "@/core/hooks/useRedux";
import { useUploadImage } from "@/core/hooks/useUploadImage";
import {
  selectLoading,
  setLoading,
  setLoadingText,
} from "@/core/slices/loadingSlice";
import { setPermissionLocationLocal } from "@/core/slices/userSlice";
import { CreatePage } from "@/core/utils/navigationPanel.util";
import {
  IQuestionResponse,
  UserQuestion,
} from "@/user/data/remote/entities/questionEntity";
import {
  UserBodyType,
  UserDriveType,
} from "@/user/data/remote/entities/userEntity";
import {
  useCreateUserMutation,
  useFindAllQuestionsQuery,
  useUpdateUserPermissionsMutation,
} from "@/user/data/remote/userApi";

export interface IFormLoginEmail {
  name: string;
  birthday: string;
  gender: string;
  searching: { id?: string; name?: string } | null;
  church: { id?: string; name?: string } | null;
  story: string;
  location: string;
}

export interface IImages {
  image1: Asset | null;
  image2: Asset | null;
  image3: Asset | null;
  image4: Asset | null;
  image5: Asset | null;
  image6: Asset | null;
}

export interface SectionData {
  gsiPk1Drive?: string;
  title: string;
  data: {
    id: string;
    name: string;
    selected: boolean;
    type: string;
  }[];
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  birthday: yup.string().required("Birthday is required"),
  gender: yup.string().required("Please select some option"),
  searching: yup
    .object({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
  church: yup
    .object({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
  story: yup
    .string()
    .max(750, "Max. 750 characters")
    .required("Please enter your story"),
  location: yup.string().required("Please select some option"),
});

type ViewModelContextType = {
  control: Control<IFormLoginEmail, any>;
  isValid: boolean;
  errors: FieldErrors<IFormLoginEmail>;
  ref: React.RefObject<PagerView>;
  navigationPanel: any;
  pages: CreatePage[];
  activePage: number;
  progress: {
    position: number;
    offset: number;
  };
  selectedCount: number;
  loading: boolean;
  imageSelect: Asset | null;
  imagesSelected: IImages;
  addChurch: boolean;
  sections: SectionData[];
  selectedBook: BooksEntity | null;
  selectedChapter: ChapterEntity | null;
  selectedVerse: VerseEntity | null;
  data: IQuestionResponse[];
  setPage: (page: number) => void;
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: UseFormHandleSubmit<IFormLoginEmail, undefined>;
  handleContinue: () => void;
  handlePermissionLocation: () => Promise<void>;
  getValues: UseFormGetValues<IFormLoginEmail>;
  watch: UseFormWatch<IFormLoginEmail>;
  setValue: UseFormSetValue<IFormLoginEmail>;
  setImageSelect: React.Dispatch<React.SetStateAction<Asset | null>>;
  setImagesSelected: React.Dispatch<React.SetStateAction<IImages>>;
  trigger: UseFormTrigger<IFormLoginEmail>;
  setAddChurch: React.Dispatch<React.SetStateAction<boolean>>;
  setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<BooksEntity | null>>;
  setSelectedChapter: React.Dispatch<
    React.SetStateAction<ChapterEntity | null>
  >;
  setSelectedVerse: React.Dispatch<React.SetStateAction<VerseEntity | null>>;
  setData: React.Dispatch<React.SetStateAction<IQuestionResponse[]>>;
  handlePermissionNotification: () => Promise<void>;
  handleRequestTrackingPermission: () => Promise<void>;
  handleSaveInfo: () => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { user, handleCompleteProfile } = useAuthProvider();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectLoading);
  const { handleUpload } = useUploadImage();

  const {
    handleRequestPermissionLocation,
    handleRequestPermissionNotification,
    handleRequestTrackingPermission,
  } = usePermissions();
  const { data: questionData } = useFindAllQuestionsQuery();
  const [handleCreateUserInfo] = useCreateUserMutation();
  const [handleUpdateUserPermissions] = useUpdateUserPermissionsMutation();

  const { ref, ...navigationPanel } = useNavigationPanel(12);
  const { pages, progress, setPage, activePage } = navigationPanel;

  const [data, setData] = useState<IQuestionResponse[]>([]);
  const [imageSelect, setImageSelect] = useState<Asset | null>(null);
  const [imagesSelected, setImagesSelected] = useState<IImages>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
  });
  const [addChurch, setAddChurch] = useState(true);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedBook, setSelectedBook] = useState<BooksEntity | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterEntity | null>(
    null,
  );
  const [selectedVerse, setSelectedVerse] = useState<VerseEntity | null>(null);
  const [_permissionLocation, setPermissionLocation] = useState<boolean>(false);
  const [_permissionNotification, setPermissionNotification] =
    useState<boolean>(false);
  const [sections, setSections] = useState<SectionData[]>([]);

  const {
    control,
    formState,
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit,
  } = useForm<IFormLoginEmail>({
    mode: "onChange",
    defaultValues: {
      name: "",
      birthday: "",
      gender: "",
      searching: null,
      church: null,
      story: "",
      location: "near_me",
    },
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  const handleContinue = useCallback(() => {
    setPage(activePage + 1);
  }, [activePage, setPage]);

  const handlePermissionLocation = useCallback(async () => {
    const resultPermission = await handleRequestPermissionLocation();
    setPermissionLocation(resultPermission);
    await dispatch(setPermissionLocationLocal(true));
    if (resultPermission) {
      setPage(activePage + 1);
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            await handleUpdateUserPermissions({
              location: { latitude, longitude },
            }).unwrap();
          } catch (errorResponse) {
            Toast.show({
              type: "error",
              text1: "Error to update location",
              visibilityTime: 3000,
            });
          }
        },
        (Error: any) => {
          console.log(
            "Error -> handlePermissionLocation",
            Error.code,
            Error.message,
          );
          Sentry.captureException(Error);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, [
    activePage,
    dispatch,
    handleRequestPermissionLocation,
    handleUpdateUserPermissions,
    setPage,
  ]);

  const handlePermissionNotification = useCallback(async () => {
    const permissionStatusNotifications =
      await handleRequestPermissionNotification();
    setPermissionNotification(permissionStatusNotifications);
    if (Platform.OS === "ios") {
      setPage(activePage + 1);
    } else {
      handleCompleteProfile();
    }
  }, [
    activePage,
    handleCompleteProfile,
    handleRequestPermissionNotification,
    setPage,
  ]);

  const handleTrackingPermission = useCallback(async () => {
    try {
      await handleRequestTrackingPermission();
    } catch (error) {
      console.log("Not Permission Tracking");
    }
    handleCompleteProfile();
  }, [handleCompleteProfile, handleRequestTrackingPermission]);

  const handleSaveInfo = async () => {
    try {
      await dispatch(setLoadingText("Uploading images..."));
      await dispatch(setLoading(true));

      const imgUrls: string[] = [];

      const resultImage1 = await handleUpload(
        {
          name: uuidv4(),
          type: imagesSelected.image1?.type || "",
          folder: "users",
        },
        imagesSelected.image1?.base64 || "",
      );

      if (imagesSelected.image2) {
        const [_error, resultImage2] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image2?.type || "",
              folder: "users",
            },
            imagesSelected.image2?.base64 || "",
          ),
        );
        if (resultImage2) {
          imgUrls.push(resultImage2);
        }
      }

      if (imagesSelected.image3) {
        const [_error, resultImage3] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image3?.type || "",
              folder: "users",
            },
            imagesSelected.image3?.base64 || "",
          ),
        );
        if (resultImage3) {
          imgUrls.push(resultImage3);
        }
      }

      if (imagesSelected.image4) {
        const [_error, resultImage4] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image4?.type || "",
              folder: "users",
            },
            imagesSelected.image4?.base64 || "",
          ),
        );
        if (resultImage4) {
          imgUrls.push(resultImage4);
        }
      }

      if (imagesSelected.image5) {
        const [_error, resultImage5] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image5?.type || "",
              folder: "users",
            },
            imagesSelected.image5?.base64 || "",
          ),
        );
        if (resultImage5) {
          imgUrls.push(resultImage5);
        }
      }

      if (imagesSelected.image6) {
        const [_error, resultImage6] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image6?.type || "",
              folder: "users",
            },
            imagesSelected.image6?.base64 || "",
          ),
        );
        if (resultImage6) {
          imgUrls.push(resultImage6);
        }
      }

      await dispatch(setLoadingText("Sending information..."));

      const { name, birthday, gender, story, location, searching, church } =
        getValues();

      const userDrive = sections
        .filter((section) => section.data.some((drive) => drive.selected))
        .map((item) => ({
          typeDrive: {
            name: item.title,
            typeDriveId: item.gsiPk1Drive || "",
          },
          drives: item.data
            .filter((drive) => drive.selected)
            .map((drive) => ({
              name: drive.name,
              driveId: drive.id,
            })),
        })) as unknown as UserDriveType;

      const userQuestion: UserQuestion[] = data
        .filter(
          (question) =>
            question.answer &&
            question.question !== "My favorite bible verse is",
        )
        .map((e) => ({
          questionId: e.sk.split("#")[1],
          question: e.question,
          answer: e.answer || "",
        }));

      const verse = data
        .find((question) => question?.question === "My favorite bible verse is")
        ?.answer?.toString();

      const body: UserBodyType = {
        name,
        descriptionStory: story,
        dateOfBirth: birthday,
        avatar: resultImage1 || "",
        typeAccount: user?.email
          ? "email"
          : user?.phone_number
            ? "phone"
            : "apple",
        searchingId: searching?.id || "",
        searching: searching?.name || "",
        churchId: church?.id,
        church: church?.name,
        countryId: 0,
        country: "",
        state: "",
        city: "",
        address: "",
        location: {
          latitude: 0,
          longitude: 0,
        },
        email: user?.email || "",
        phone: user?.phone_number || "",
        searchRange: location,
        distance: 40,
        mediaUrls: resultImage1 ? [resultImage1, ...imgUrls] : imgUrls,
        verse: verse || "",
        userDrive,
        userQuestion,
        gender,
      };

      await handleCreateUserInfo(body).unwrap();
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      setPage(activePage + 1);
    } catch (error) {
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      Toast.show({
        type: "error",
        text1: "Error creating user",
        visibilityTime: 3000,
      });
    }
  };

  useEffect(() => {
    if (questionData && questionData?.length > 0) {
      setData(questionData.map((item) => ({ ...item, answer: "" })));
    }
  }, [questionData]);

  return (
    <ViewModelContext.Provider
      value={{
        ref,
        data,
        pages,
        errors,
        control,
        loading,
        isValid,
        sections,
        progress,
        addChurch,
        activePage,
        imageSelect,
        selectedBook,
        selectedCount,
        selectedVerse,
        imagesSelected,
        selectedChapter,
        navigationPanel,
        watch,
        trigger,
        setPage,
        setData,
        setValue,
        getValues,
        setSections,
        handleSubmit,
        setAddChurch,
        setImageSelect,
        handleContinue,
        handleSaveInfo,
        setSelectedBook,
        setSelectedCount,
        setSelectedVerse,
        setImagesSelected,
        setSelectedChapter,
        handlePermissionLocation,
        handlePermissionNotification,
        handleRequestTrackingPermission: handleTrackingPermission,
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
