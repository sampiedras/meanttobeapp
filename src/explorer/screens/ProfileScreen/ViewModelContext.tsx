import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";
import Toast from "react-native-toast-message";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/core/hooks/useRedux";
import { selectFilters, setFilters } from "@/core/slices/filtersSlice";
import { setLoading, setLoadingText } from "@/core/slices/loadingSlice";
import {
  DriveType,
  UserDriveByUserType,
} from "@/user/data/remote/entities/driveEntity";
import { UserQuestionByUserType } from "@/user/data/remote/entities/questionEntity";
import { SearchingEntityResponse } from "@/user/data/remote/entities/searchingEntity";
import {
  useGetAllSearchingsQuery,
  useGetDriveByUserIdQuery,
  useGetQuestionByUserIdQuery,
  useUpdateUserFiltersMutation,
  useUpdateUserImagesMutation,
} from "@/user/data/remote/userApi";

Geocoder.init("AIzaSyDt48-kSk3lEg_E4Ly3xdChnhrcH0WgtLE"); // use a valid API key

type ViewModelContextType = {
  selectedPage: "profile" | "pricing";
  dataDrives: UserDriveByUserType[];
  dataQuestions: UserQuestionByUserType[];
  totalPercentageProfile: number;
  modalFilters: boolean;
  distance: number;
  isNearMe: boolean;
  searching: string;
  filterAge: [number, number];
  ageCheckBox: boolean;
  distanceCheckBox: boolean;
  scrollEnabled: boolean;
  refreshing: boolean;
  locationAddress: string;
  dataSearching: SearchingEntityResponse[];
  setSelectedPage: React.Dispatch<React.SetStateAction<"profile" | "pricing">>;
  handleUpdateAvatar: (index: number) => Promise<void>;
  handleDeleteImage: (index: number) => Promise<void>;
  setModalFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setIsNearMe: React.Dispatch<React.SetStateAction<boolean>>;
  setSearching: React.Dispatch<React.SetStateAction<string>>;
  setFilterAge: React.Dispatch<React.SetStateAction<[number, number]>>;
  setAgeCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  setDistanceCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  enableScroll: () => void;
  disableScroll: () => void;
  handleToggleAgeCheckBox: () => void;
  handleSetNerMe: () => void;
  handleToggleDistanceCheckBox: () => void;
  handleToggleModalFilters: () => void;
  handleUpdateFilters: () => Promise<void>;
  handleRefresh: () => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();
  const filters = useAppSelector(selectFilters);

  const { data: dataSearching = [], refetch } = useGetAllSearchingsQuery();
  const [handleUpdate] = useUpdateUserFiltersMutation();
  const { data: dataDrives = [], refetch: refetchDrive } =
    useGetDriveByUserIdQuery(userProfile?.userId || "");
  const { data: dataQuestions = [], refetch: refetchQuestion } =
    useGetQuestionByUserIdQuery(userProfile?.userId || "");
  const [handleUpdateImagesApi] = useUpdateUserImagesMutation();

  const [selectedPage, setSelectedPage] = useState<"profile" | "pricing">(
    "profile",
  );
  const [totalPercentageProfile, setTotalPercentageProfile] = useState(50);
  const [modalFilters, setModalFilters] = useState(false);
  const [distance, setDistance] = useState<number>(
    parseInt(filters.distance, 10),
  );
  const [isNearMe, setIsNearMe] = useState<boolean>(
    filters.searchRange === "LOCALLY",
  );
  const [searching, setSearching] = useState<string>(filters.searching);
  const [filterAge, setFilterAge] = useState<[number, number]>([
    parseInt(filters.minAge, 10),
    parseInt(filters.maxAge, 10),
  ]);
  const [ageCheckBox, setAgeCheckBox] = useState<boolean>(false);
  const [distanceCheckBox, setDistanceCheckBox] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationAddress, setLocationAddress] = useState("");

  const enableScroll = useCallback(() => {
    setScrollEnabled(true);
  }, []);

  const disableScroll = useCallback(() => {
    setScrollEnabled(false);
  }, []);

  const handleUpdateAvatar = useCallback(
    async (index: number) => {
      if (userProfile?.mediaUrls) {
        const updatedMediaUrls = [...userProfile.mediaUrls];
        const [newAvatar] = updatedMediaUrls.splice(index, 1);
        updatedMediaUrls.unshift(newAvatar);

        try {
          await dispatch(setLoadingText("Uploading images..."));
          await dispatch(setLoading(true));
          await handleUpdateImagesApi({
            avatar: newAvatar,
            mediaUrls: updatedMediaUrls,
          });
          await handleUserUpdateInfo();
          Toast.show({
            type: "success",
            text1: "Images updated successfully",
            visibilityTime: 2000,
          });
          await dispatch(setLoading(false));
          await dispatch(setLoadingText(""));
        } catch (error) {
          await dispatch(setLoading(false));
          await dispatch(setLoadingText(""));
          Toast.show({
            type: "error",
            text1: "Error updating images",
            visibilityTime: 2000,
          });
        }
      }
    },
    [
      dispatch,
      handleUpdateImagesApi,
      handleUserUpdateInfo,
      userProfile?.mediaUrls,
    ],
  );

  const handleDeleteImage = useCallback(
    async (index: number) => {
      if (userProfile?.mediaUrls) {
        const updatedMediaUrls = [...userProfile.mediaUrls];
        updatedMediaUrls.splice(index, 1);

        let newAvatar = userProfile.avatar;
        if (index === 0 && updatedMediaUrls.length > 0) {
          newAvatar = updatedMediaUrls[0];
        }

        try {
          await dispatch(setLoadingText("Deleting image..."));
          await dispatch(setLoading(true));
          await handleUpdateImagesApi({
            avatar: newAvatar,
            mediaUrls: updatedMediaUrls,
          });
          await handleUserUpdateInfo();
          Toast.show({
            type: "success",
            text1: "Delete successfully",
            visibilityTime: 2000,
          });
          await dispatch(setLoading(false));
          await dispatch(setLoadingText(""));
        } catch (error) {
          await dispatch(setLoading(false));
          await dispatch(setLoadingText(""));
          Toast.show({
            type: "error",
            text1: "Error deleting images",
            visibilityTime: 2000,
          });
        }
      }
    },
    [
      dispatch,
      handleUpdateImagesApi,
      handleUserUpdateInfo,
      userProfile?.avatar,
      userProfile?.mediaUrls,
    ],
  );

  const handleToggleAgeCheckBox = useCallback(() => {
    setAgeCheckBox(!ageCheckBox);
  }, [ageCheckBox]);

  const handleSetNerMe = useCallback(() => {
    setIsNearMe(!isNearMe);
  }, [isNearMe]);

  const handleToggleDistanceCheckBox = useCallback(() => {
    setDistanceCheckBox(!distanceCheckBox);
  }, [distanceCheckBox]);

  const handleToggleModalFilters = useCallback(() => {
    setModalFilters(!modalFilters);
  }, [modalFilters]);

  const handleUpdateFilters = useCallback(async () => {
    try {
      await dispatch(setLoadingText("Updating filters..."));
      await dispatch(setLoading(true));
      dispatch(
        setFilters({
          searching,
          gender: filters.gender,
          minAge: filterAge[0].toString(),
          maxAge: filterAge[1].toString(),
          distance: distance.toString(),
          latitude: isNearMe ? userProfile?.location?.latitude?.toString() : "",
          longitude: isNearMe
            ? userProfile?.location?.longitude?.toString()
            : "",
          searchRange: isNearMe ? "LOCALLY" : "GLOBALLY",
        }),
      );
      await handleUpdate({
        searching,
        searchingId: dataSearching.find((i) => i.name === searching)?.id || "",
        searchRange: isNearMe ? "LOCALLY" : "GLOBALLY",
      });
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      setModalFilters(false);
      Toast.show({
        type: "success",
        text1: "Filters updated successfully",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: "Error to update filters",
        visibilityTime: 2000,
      });
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
    }
  }, [
    dataSearching,
    dispatch,
    distance,
    filterAge,
    filters.gender,
    handleUpdate,
    isNearMe,
    searching,
    userProfile?.location?.latitude,
    userProfile?.location?.longitude,
  ]);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
      await refetchDrive();
      await refetchQuestion();
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  }, [refetch, refetchDrive, refetchQuestion]);

  useEffect(() => {
    (async () => {
      let dataDrivesFilter: DriveType[] = [];

      for await (const item of dataDrives) {
        for await (const drive of item.drives) {
          dataDrivesFilter.push({ ...drive, title: item.name });
        }
      }
      let total: number = 10;

      if (userProfile?.mediaUrls.length === 2) {
        total += 10;
      }

      if (userProfile?.mediaUrls.length === 3) {
        total += 20;
      }

      if (userProfile?.mediaUrls.length === 4) {
        total += 30;
      }

      if (userProfile?.mediaUrls.length === 5) {
        total += 40;
      }

      if (userProfile?.mediaUrls.length === 6) {
        total += 50;
      }

      if (userProfile?.church) {
        total += 5;
      }

      if (userProfile?.descriptionStory) {
        total += 5;
      }

      if (dataDrivesFilter.length >= 9) {
        total += 10;
      }

      if (userProfile?.verse) {
        total += 10;
      }

      if (dataQuestions.length > 1) {
        total += 10;
      }

      setTotalPercentageProfile(total);
    })();
  }, [userProfile, dataDrives, dataQuestions]);

  useFocusEffect(
    useCallback(() => {
      setFilterAge([
        parseInt(filters.minAge, 10),
        parseInt(filters.maxAge, 10),
      ]);
      setIsNearMe(filters.searchRange === "LOCALLY");
      setSearching(filters.searching);
      setDistance(parseInt(filters.distance, 10));
    }, [
      filters.distance,
      filters.maxAge,
      filters.minAge,
      filters.searchRange,
      filters.searching,
    ]),
  );

  useEffect(() => {
    if (
      userProfile &&
      userProfile?.location?.latitude &&
      userProfile?.location?.longitude
    ) {
      Geocoder.from(
        userProfile?.location?.latitude,
        userProfile?.location?.longitude,
      )
        .then(async (json) => {
          setLocationAddress(json.results[0].formatted_address);
        })
        .catch((error) =>
          console.log(
            "🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒",
            error,
          ),
        );
    }
  }, [userProfile]);

  return (
    <ViewModelContext.Provider
      value={{
        refreshing,
        modalFilters,
        distance,
        isNearMe,
        searching,
        filterAge,
        ageCheckBox,
        distanceCheckBox,
        dataDrives,
        selectedPage,
        dataQuestions,
        totalPercentageProfile,
        scrollEnabled,
        dataSearching,
        locationAddress,
        enableScroll,
        disableScroll,
        setSearching,
        setFilterAge,
        setAgeCheckBox,
        setDistanceCheckBox,
        setModalFilters,
        setDistance,
        setIsNearMe,
        setSelectedPage,
        handleUpdateAvatar,
        handleDeleteImage,
        handleToggleAgeCheckBox,
        handleSetNerMe,
        handleRefresh,
        handleToggleDistanceCheckBox,
        handleToggleModalFilters,
        handleUpdateFilters,
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
