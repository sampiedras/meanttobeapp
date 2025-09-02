import {
  EPreferenceLocation,
  MatchUserEntity,
} from '@/api/match/entities/matchEntity';
import {useLazyGetAllMatchQuery} from '@/api/match/matchApi';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useAppDispatch, useAppSelector} from '@/hooks/useRedux';
import {selectFilters} from '@/slices/filtersSlice';
import {useAuthProvider} from '@/context/AuthContext';
import Qonversion from 'react-native-qonversion/build/Qonversion';
import {Product} from 'react-native-qonversion';
import {setHiddenItsMatch} from '@/slices/itsMatchSlice';
import {setVisible} from '@/slices/alertPremiumSlice';

/**
 * Custom hook to handle actions related to matches.
 * @returns Object containing states and functions needed to manage match actions.
 */
export const useActionsMatch = () => {
  const dispatch = useAppDispatch();
  const dataFilters = useAppSelector(selectFilters);
  const {isSubscriptionActive, user} = useAuthProvider();
  const isFocused = useIsFocused();
  const [triggerMatchProfiles] = useLazyGetAllMatchQuery();

  const [filter, setFilter] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const [pageMatch, setPageMatch] = useState(1);
  const [data, setData] = useState<MatchUserEntity[] | undefined>([]);
  const [deletedCard, setDeletedCard] = useState<MatchUserEntity | null>(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [haveNotificationPermission, setHaveNotificationPermission] =
    useState(false);
  const [haveLocationPermission, setHaveLocationPermission] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Map<string, Product>>(
    new Map<string, Product>(),
  );
  const [modalPremium, setModalPremium] = useState(false);

  const handleNextPageMatch = () => setPageMatch(prevPage => prevPage + 1);

  const toggleModalFilters = () => {
    setFilter(prevFilter => !prevFilter);
  };

  const deleteCard = (id: number) => {
    if (!data) return;

    const deletedIndex = data.findIndex(card => card.id === id);

    if (deletedIndex !== -1) {
      const deletedCard = data[deletedIndex];

      setDeletedCard(deletedCard);
      setLastDeletedIndex(deletedIndex);

      setData(prevData => {
        const newData = prevData ? [...prevData] : [];
        newData.splice(deletedIndex, 1);
        return newData;
      });

      if (data.length === 1) {
        setLoadingMoreData(true);
      }
    }
  };

  const undoDeleteCard = () => {
    if (isSubscriptionActive) {
      if (deletedCard && lastDeletedIndex !== null) {
        setData(prevData => {
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
  };

  const checkPermissions = async () => {
    await handleCheckPermissionLocation();
    await handleCheckPermissionNotification();
  };

  const handleCheckPermissionLocation = async () => {
    const locationPermission =
      Platform.OS === 'android'
        ? await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        : await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    setHaveLocationPermission(
      locationPermission === RESULTS.GRANTED ||
        locationPermission === RESULTS.LIMITED ||
        locationPermission === RESULTS.UNAVAILABLE,
    );
  };

  const handleCheckPermissionNotification = async () => {
    const notificationPermission =
      Platform.OS === 'android'
        ? await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        : (await messaging().hasPermission()) ===
            messaging.AuthorizationStatus.AUTHORIZED ||
          (await messaging().hasPermission()) ===
            messaging.AuthorizationStatus.PROVISIONAL;

    setHaveNotificationPermission(notificationPermission === RESULTS.GRANTED);
  };

  const fetchData = async () => {
    const {data: dataMatch} = await triggerMatchProfiles({
      page: pageMatch,
      searchingsId: dataFilters.searchingId || '0',
      latitude: user?.location?.coordinates[0].toString() || '0',
      longitude: user?.location?.coordinates[1].toString() || '0',
      addTwoYears: dataFilters.ageChecked ? 'true' : 'false',
      rangeAge: dataFilters.filterAge.toString(),
      searchRange: dataFilters.isNearMe
        ? EPreferenceLocation.NEAR_ME
        : EPreferenceLocation.GLOBALLY,
    });
    if (dataMatch && dataMatch.items) {
      setIsLoading(false);
      setLoadingMoreData(false);
      setData(dataMatch.items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageMatch, dataFilters.searchingId, dataFilters.isNearMe]);

  useEffect(() => {
    const verifyData = async () => {
      if (data && data.length === 0 && !isLoading) {
        handleNextPageMatch();
        setLoadingMoreData(true);
      }
    };

    verifyData();
  }, [data?.length]);

  useEffect(() => {
    setPageMatch(1);
  }, []);

  useEffect(() => {
    setPageMatch(1);
    setIsLoading(true);
  }, [dataFilters.searchingId, dataFilters.isNearMe]);

  useEffect(() => {
    checkPermissions();
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      checkPermissions();
    }, []),
  );

  const handleOpenModalPremium = () => {
    dispatch(setVisible(false));
    dispatch(setHiddenItsMatch(false));
    setModalPremium(true);
  };

  useEffect(() => {
    fetchProductsItems();
  }, []);

  const fetchProductsItems = async () => {
    try {
      const products: Map<string, Product> =
        await Qonversion.getSharedInstance().products();
      if (products?.size > 0) {
        const productsArray = Array.from(products.values());
        productsArray.sort(
          (a, b) =>
            parseFloat(a?.price?.toString() || '0') -
            parseFloat(b.price?.toString() || '0'),
        );
        setSubscriptions(
          new Map(
            productsArray.map(product => [product.qonversionID, product]),
          ),
        );
      }
    } catch (e) {
      // TODO: handle error
    }
  };

  return {
    data,
    subscriptions,
    filter,
    modalPremium,
    isLoading,
    haveNotificationPermission,
    haveLocationPermission,
    loadingMoreData,
    toggleModalFilters,
    setModalPremium,
    deleteCard,
    undoDeleteCard,
    handleNextPageMatch,
    handleOpenModalPremium,
  };
};
