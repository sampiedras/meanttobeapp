import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import Toast from "react-native-toast-message";
import { E_ChatStackRoutes } from "@/chat";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/core/hooks/useRedux";
import { setVisible } from "@/core/slices/alertPremiumSlice";
import { selectFilters, setFilters } from "@/core/slices/filtersSlice";
import { setChannelId, setShow } from "@/core/slices/matchSlice";
import { SearchingEntityResponse } from "@/user/data/remote/entities/searchingEntity";
import {
  UserMatchResponseType,
  UserMatchType,
} from "@/user/data/remote/entities/userEntity";
import {
  useCreateUserDisLikeMutation,
  useCreateUserLikeMutation,
  useGetAllSearchingsQuery,
  useLazyGetAllUserByGeoLocationQuery,
  useUpdateUserFiltersMutation,
  useUpdateUserPermissionsMutation,
} from "@/user/data/remote/userApi";

type ViewModelContextType = {
  users: UserMatchType[];
  modalFilters: boolean;
  scrollEnabled: boolean;
  filterAge: [number, number];
  ageCheckBox: boolean;
  distanceCheckBox: boolean;
  distance: number;
  isNearMe: boolean;
  searching: string;
  isFetching: boolean;
  showIsMatch: boolean;
  showTutorial: boolean;
  userMatch: UserMatchResponseType | null;
  dataSearching: SearchingEntityResponse[];
  deletedCard: UserMatchType | null;
  userSelected: UserMatchType | null;
  modalVisible: boolean;
  indexUserSelected: number | null;
  enableScroll: () => void;
  disableScroll: () => void;
  handleSetNerMe: () => void;
  handleUpdateFilters: () => void;
  handleUndoDeleteCard: () => void;
  handleToggleAgeCheckBox: () => void;
  handleToggleModalFilters: () => void;
  handleToggleDistanceCheckBox: () => void;
  handleDeleteCard: (userId: string) => void;
  handleCheckTutorialStatus: () => Promise<void>;
  handleCreateMatch: (userMatchSelected: UserMatchType) => Promise<void>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setSearching: React.Dispatch<React.SetStateAction<string>>;
  setShowIsMatch: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateDisLike: (disLikeUserId: string) => Promise<void>;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterAge: React.Dispatch<React.SetStateAction<[number, number]>>;
  setModalVisible: (open: boolean) => void;
  setUserSelected: (user: UserMatchType) => void;
  setIndexUserSelected: (index: number | null) => void;
  handleRefetchData: (index: number) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const { getItem, removeItem } = useAsyncStorage("PUSH_NOTIFICATION_MESSAGE");
  const { getItem: getItemMatch, removeItem: removeItemMatch } =
    useAsyncStorage("PUSH_NOTIFICATION_MATCH");

  const { userProfile, isSubscriptionActive } = useAuthProvider();

  const [triggerGetAllUserByLocation, { data: dataUsers, isFetching }] =
    useLazyGetAllUserByGeoLocationQuery();
  const [handleUpdateUserPermissions] = useUpdateUserPermissionsMutation();
  const { data: dataSearching = [] } = useGetAllSearchingsQuery();
  const [handleUpdate] = useUpdateUserFiltersMutation();
  const [handleCreateUserLike] = useCreateUserLikeMutation();
  const [handleCreateUserDisLike] = useCreateUserDisLikeMutation();

  const [users, setUsers] = useState<UserMatchType[]>([]);
  const [modalFilters, setModalFilters] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const [filterAge, setFilterAge] = useState<[number, number]>([
    parseInt(filters.minAge, 10),
    parseInt(filters.maxAge, 10),
  ]);
  const [ageCheckBox, setAgeCheckBox] = useState<boolean>(false);
  const [distanceCheckBox, setDistanceCheckBox] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(
    parseInt(filters.distance, 10),
  );
  const [isNearMe, setIsNearMe] = useState<boolean>(
    filters.searchRange === "LOCALLY",
  );
  const [searching, setSearching] = useState<string>(filters.searching);
  const [userSelected, setUserSelected] = useState<UserMatchType | null>(null);
  const [deletedCard, setDeletedCard] = useState<UserMatchType | null>(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showIsMatch, setShowIsMatch] = useState(false);
  const [userMatch, setUserMatch] = useState<UserMatchResponseType | null>(
    null,
  );
  const [userLocation, setUserLocation] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: userProfile?.location?.latitude.toString() || "",
    longitude: userProfile?.location.longitude.toString() || "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [indexUserSelected, setIndexUserSelected] = useState<number | null>(
    null,
  );

  const handleToggleModalFilters = useCallback(() => {
    setModalFilters(!modalFilters);
  }, [modalFilters]);

  const handleUpdateFilters = useCallback(async () => {
    try {
      dispatch(
        setFilters({
          searching,
          gender: filters.gender,
          minAge: filterAge[0].toString(),
          maxAge: filterAge[1].toString(),
          distance: distance.toString(),
          latitude: isNearMe ? userLocation?.latitude : "",
          longitude: isNearMe ? userLocation?.longitude : "",
          searchRange: isNearMe ? "LOCALLY" : "GLOBALLY",
        }),
      );
      setModalFilters(false);
      await handleUpdate({
        searching,
        searchingId: dataSearching.find((i) => i.name === searching)?.id || "",
        searchRange: isNearMe ? "LOCALLY" : "GLOBALLY",
      });
    } catch (error) {
      Toast.show({
        text1: "Error",
        text2: "Error to update filters",
      });
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
    userLocation?.latitude,
    userLocation?.longitude,
  ]);

  const enableScroll = useCallback(() => {
    setScrollEnabled(true);
  }, []);

  const disableScroll = useCallback(() => {
    setScrollEnabled(false);
  }, []);

  const handleToggleAgeCheckBox = useCallback(() => {
    setAgeCheckBox(!ageCheckBox);
  }, [ageCheckBox]);

  const handleSetNerMe = useCallback(() => {
    setIsNearMe(!isNearMe);
  }, [isNearMe]);

  const handleToggleDistanceCheckBox = useCallback(() => {
    setDistanceCheckBox(!distanceCheckBox);
  }, [distanceCheckBox]);

  const handleCreateMatch = useCallback(
    async (userMatchSelected: UserMatchType) => {
      try {
        const resultMatch = await handleCreateUserLike({
          avatarUser: userProfile?.avatar || "",
          nameUser: userProfile?.name || "",
          likeUserId: userMatchSelected.userId || "",
          avatarLikeUser: userMatchSelected?.avatar || "",
          nameLikeUser: userMatchSelected.name || "",
          tokenGetStream: userProfile?.tokenGetStream || "",
        }).unwrap();
        if (resultMatch.userMatch && resultMatch.channelId) {
          setShowIsMatch(true);
          setUserMatch({
            ...resultMatch,
            userImage: userMatchSelected?.avatar,
          });
        }
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: "Error to create a Match",
        });
      }
    },
    [
      handleCreateUserLike,
      userProfile?.avatar,
      userProfile?.name,
      userProfile?.tokenGetStream,
    ],
  );

  const handleCreateDisLike = useCallback(
    async (disLikeUserId: string) => {
      try {
        await handleCreateUserDisLike({
          disLikeUserId,
        });
      } catch (error) {
        Toast.show({
          text1: "Error",
          text2: "Error to create a Match",
        });
      }
    },
    [handleCreateUserDisLike],
  );

  const handleDeleteCard = useCallback(
    (userId: string) => {
      if (!users) {
        return;
      }

      const deletedIndex = users.findIndex((user) => user.userId === userId);

      if (deletedIndex !== -1) {
        const deletedCardUser = users[deletedIndex];

        setDeletedCard(deletedCardUser);
        setLastDeletedIndex(deletedIndex);

        /* if (newData.length === 0) {
          if (dataUsers?.nextToken) {
            triggerGetAllUserByLocation({
              ...filters,
              nextToken: dataUsers?.nextToken || '',
            });
          }
        } */
      }
    },
    [users],
  );

  const handleRefetchData = useCallback(
    (index: number) => {
      if (!dataUsers) {
        return;
      }

      if (dataUsers && dataUsers?.data?.length === index) {
        if (dataUsers?.nextToken) {
          triggerGetAllUserByLocation({
            ...filters,
            nextToken: dataUsers?.nextToken || "",
          });
        } else {
          setUsers([]);
        }
      }
    },
    [dataUsers, filters, triggerGetAllUserByLocation],
  );

  const handleUndoDeleteCard = useCallback(() => {
    if (isSubscriptionActive) {
      if (deletedCard && lastDeletedIndex !== null) {
        setUsers((prevData) => {
          const newData = [...(prevData || [])];
          newData.splice(lastDeletedIndex, 0, deletedCard);
          return newData;
        });

        setDeletedCard(null);
        setLastDeletedIndex(null);
      }
    } else {
      dispatch(setVisible(true));
    }
  }, [deletedCard, dispatch, isSubscriptionActive, lastDeletedIndex]);

  const handleCheckTutorialStatus = useCallback(async () => {
    const tutorialShown = await AsyncStorage.getItem("TUTORIAL_MATCH");

    if (!tutorialShown) {
      setShowTutorial(true);
      await AsyncStorage.setItem("TUTORIAL_MATCH", "true");
    } else {
      setShowTutorial(false);
    }
  }, []);

  const refetchDataWithToken = useCallback(
    async (token: string) => {
      try {
        const data = await triggerGetAllUserByLocation({
          ...filters,
          nextToken: token || "",
        });
        if (data.data?.data?.length === 0 && data.data?.nextToken) {
          refetchDataWithToken(data.data?.nextToken);
        }
      } catch (error) {
        console.log("Error fetching", error);
      }
    },
    [filters, triggerGetAllUserByLocation],
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setUserLocation({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUsers]);

  useEffect(() => {
    if (dataUsers?.data && dataUsers.data.length > 0) {
      setUsers(dataUsers?.data);
    } else {
      setUsers([]);
    }
  }, [dataUsers]);

  useEffect(() => {
    handleCheckTutorialStatus();
    (async () => {
      const channelId = await getItem();
      const channelIdMatch = await getItemMatch();

      if (channelId) {
        console.log(
          "🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡",
          channelId,
        );
        removeItem();
        navigate(E_ChatStackRoutes.CHAT, { channelId: channelId || "" });
      }

      if (channelIdMatch) {
        removeItemMatch();
        dispatch(setChannelId(channelIdMatch));
        dispatch(setShow(true));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      // AsyncStorage.removeItem('TUTORIAL_MATCH_TUTORIAL_HEART');
      setFilterAge([
        parseInt(filters.minAge, 10),
        parseInt(filters.maxAge, 10),
      ]);
      setIsNearMe(filters.searchRange === "LOCALLY");
      setSearching(filters.searching);
      setDistance(parseInt(filters.distance, 10));
      async function getData() {
        try {
          const data = await triggerGetAllUserByLocation(filters);

          if (data.data?.data?.length === 0 && data.data?.nextToken) {
            refetchDataWithToken(data.data?.nextToken);
          }
        } catch (error) {
          Toast.show({
            text1: "Error",
            text2: "Error to get Profiles",
          });
        }
      }
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      filters.distance,
      filters.maxAge,
      filters.minAge,
      filters.searchRange,
      filters.searching,
    ]),
  );

  return (
    <ViewModelContext.Provider
      value={{
        users,
        distance,
        isNearMe,
        filterAge,
        userMatch,
        searching,
        isFetching,
        deletedCard,
        showIsMatch,
        ageCheckBox,
        showTutorial,
        modalFilters,
        scrollEnabled,
        dataSearching,
        distanceCheckBox,
        userSelected,
        modalVisible,
        indexUserSelected,
        setModalVisible,
        setUserSelected,
        setIndexUserSelected,
        handleRefetchData,
        setDistance,
        setSearching,
        setFilterAge,
        enableScroll,
        disableScroll,
        handleSetNerMe,
        setShowIsMatch,
        setShowTutorial,
        handleDeleteCard,
        handleCreateMatch,
        handleUpdateFilters,
        handleCreateDisLike,
        handleUndoDeleteCard,
        handleToggleAgeCheckBox,
        handleToggleModalFilters,
        handleCheckTutorialStatus,
        handleToggleDistanceCheckBox,
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
