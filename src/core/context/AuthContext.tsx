import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import {
  fetchAuthSession,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  signOut,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Qonversion, {
  Entitlement,
  EntitlementRenewState,
  User,
  UserPropertyKey,
} from "react-native-qonversion";
import Toast from "react-native-toast-message";
import { StreamChat } from "stream-chat";
import {
  useLazyGetUserProfileQuery,
  useUpdateUserTokenFirebaseMutation,
} from "@/user/data/remote/userApi";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { selectFilters, setFilters } from "../slices/filtersSlice";
import { AuthContextType, UserProfileType } from "../types/AuthContextType";
import { GET_STREAM_API_KEY } from "../utils/config";

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [triggerGetProfile] = useLazyGetUserProfileQuery();
  const [handleUpdateUserToken] = useUpdateUserTokenFirebaseMutation();

  const [isLoading, setIsLoading] = useState(true);
  const [isUserComplete, setIsUserComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<FetchUserAttributesOutput | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [userQonversion, setUserQonversion] = useState<User | null>(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [userSubscription, setUserSubscription] = useState<Entitlement | null>(
    null,
  );

  async function currentSession() {
    try {
      setIsLoading(true);
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      if (accessToken && idToken) {
        setIsAuthenticated(true);
        const userAttributes = await fetchUserAttributes();
        setUser(userAttributes);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      await client.disconnectUser();
      setIsAuthenticated(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }
  const handleUserUpdateInfo = useCallback(async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      const profile = await triggerGetProfile(
        userAttributes?.sub || "",
      ).unwrap();
      setUserProfile(profile);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error to get user profile",
        visibilityTime: 2000,
      });
    }
  }, [triggerGetProfile]);

  const handleAddUserInfoQV = useCallback(async () => {
    try {
      const userInfo = await Qonversion.getSharedInstance().userInfo();
      setUserQonversion(userInfo);
    } catch (e) {
      // handle error here
      console.log("ERRRRRRRRRRRRRRR", e);
    }
  }, []);

  const handleCheckSubscription = useCallback(async () => {
    try {
      const entitlements =
        await Qonversion.getSharedInstance().checkEntitlements();

      const premiumEntitlement = entitlements.get("premium_access");

      if (premiumEntitlement != null) {
        setIsSubscriptionActive(Boolean(premiumEntitlement.isActive));
        if (premiumEntitlement.isActive) {
          setUserSubscription(premiumEntitlement);
        }
        switch (premiumEntitlement.renewState) {
          case EntitlementRenewState.NON_RENEWABLE:
            // NON_RENEWABLE is the state of consumable/non-consumable IAPs that could unlock lifetime access
            break;
          case EntitlementRenewState.WILL_RENEW:
            // WILL_RENEW is the state of an auto-renewable subscription
            break;
          case EntitlementRenewState.CANCELED:
            // The user has turned off auto-renewal for the subscription, but the subscription has not expired yet.
            // Prompt the user to resubscribe with a special offer.
            break;
          case EntitlementRenewState.BILLING_ISSUE:
            // Grace period: entitlement is active, but there was some billing issue.
            // Prompt the user to update the payment method.
            break;
          case EntitlementRenewState.UNKNOWN:
            // We were unable to determine subscription renew state
            break;
        }
      }
    } catch (e) {
      // TODO: handle error here
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", e);
    }
  }, []);

  const connectUser = useCallback(async () => {
    try {
      await client.connectUser(
        {
          id: userProfile?.userId || "",
          name: userProfile?.name,
          image: userProfile?.avatar,
          push_notifications: {
            disabled: userProfile?.notification ? false : true,
          },
        },
        userProfile?.tokenGetStream,
      );

      if (Platform.OS === "ios") {
        await messaging().registerDeviceForRemoteMessages();
        const fcmTokenApns = await messaging().getAPNSToken();
        if (fcmTokenApns) {
          await client.addDevice(
            fcmTokenApns,
            "apn",
            userProfile?.userId || "",
            "Apns",
          );
          const fcmToken = await messaging().getToken();
          await handleUpdateUserToken({ tokenFirebase: fcmToken });
        }
      } else {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          await client.addDevice(
            fcmToken,
            "firebase",
            userProfile?.userId || "",
            "firebase_m2b",
          );
          await handleUpdateUserToken({ tokenFirebase: fcmToken });
        }
      }
    } catch (error) {
      // TODO: Handle error
      console.log("@@@@ERRRRRRROR11111111111111111111111", error);
    }
  }, [
    handleUpdateUserToken,
    userProfile?.avatar,
    userProfile?.name,
    userProfile?.notification,
    userProfile?.tokenGetStream,
    userProfile?.userId,
  ]);

  const handleCompleteProfile = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const userAttributes = await fetchUserAttributes();
        const profile = await triggerGetProfile(
          userAttributes?.sub || "",
        ).unwrap();
        setUserProfile(profile);
        setIsUserComplete(true);

        if (filters.isConfig) {
          dispatch(
            setFilters({
              ...filters,
              searching: profile.searching,
              gender: profile.gender,
              latitude:
                profile.searchRange === "LOCALLY"
                  ? profile.location.latitude.toString()
                  : "",
              longitude:
                profile.searchRange === "LOCALLY"
                  ? profile.location.longitude.toString()
                  : "",
              searchRange: profile.searchRange,
            }),
          );
        } else {
          dispatch(
            setFilters({
              searching: profile.searching,
              gender: profile.gender,
              minAge: "18",
              maxAge: "82",
              latitude:
                profile.searchRange === "LOCALLY"
                  ? profile.location.latitude.toString()
                  : "",
              longitude:
                profile.searchRange === "LOCALLY"
                  ? profile.location.latitude.toString()
                  : "",
              distance: "5",
              searchRange: profile.searchRange,
              isConfig: true,
            }),
          );
        }
        await Qonversion.getSharedInstance().identify(profile.userId);
        await Qonversion.getSharedInstance().setUserProperty(
          UserPropertyKey.NAME,
          profile.name || "",
        );
        await handleCheckSubscription();
      } catch (error: any) {
        if (error.status === 404 && error.data?.data === null) {
          setIsUserComplete(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated, triggerGetProfile]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await client.disconnectUser();
      await Qonversion.getSharedInstance().logout();
      setIsAuthenticated(false);
      setUser(null);
      setUserProfile(null);
      setUserQonversion(null);
      setIsSubscriptionActive(false);
      setUserSubscription(null);
      setIsUserComplete(false);
      dispatch(setFilters({}));
      await currentSession();
    } catch (error) {
      console.error("Error logging out", error);
      Toast.show({
        type: "error",
        text1: "Error to log out",
        visibilityTime: 2000,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    currentSession();
  }, []);

  useEffect(() => {
    (async () => {
      if (userProfile) {
        await connectUser();
        await handleAddUserInfoQV();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          currentSession();
          break;
        case "signInWithRedirect_failure":
          Toast.show({
            type: "error",
            text1: "An error has occurred during the OAuth flow.",
            visibilityTime: 3000,
          });
          break;
        case "customOAuthState":
          break;
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    handleCompleteProfile();
  }, [handleCompleteProfile, isAuthenticated, triggerGetProfile]);

  return (
    <AuthContext.Provider
      value={{
        client,
        user,
        isLoading,
        userProfile,
        userQonversion,
        isUserComplete,
        isAuthenticated,
        userSubscription,
        isSubscriptionActive,
        setIsLoading,
        handleLogout,
        currentSession,
        handleUserUpdateInfo,
        handleCompleteProfile,
        handleCheckSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth Provider");
  }
  return context;
}
