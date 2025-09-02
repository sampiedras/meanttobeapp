import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { getCurrentUser, signOut, fetchAuthSession } from "aws-amplify/auth";
import Geolocation from "react-native-geolocation-service";
import Qonversion, {
  Entitlement,
  EntitlementRenewState,
  User,
  UserPropertyKey,
} from "react-native-qonversion";
import { StreamChat } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react-native";
import { UserEntity } from "@/api/user/entities/userEntity";
import {
  useLazyGetTokenGetStreamQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserLocationMutation,
  useUpdateUserTokenFirebaseMutation,
} from "@/api/user/userApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { setAccessToken as setAccessTokenSlice } from "@/slices/userSlice";
import { GET_STREAM_API_KEY } from "@/utils/config";

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

interface IAuthContext {
  client: StreamChat<DefaultStreamChatGenerics>;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserEntity | null;
  userCognito: CognitoUserSession | null;
  userQonversion: User | null;
  accessToken: string;
  sub: string;
  isSubscriptionActive: boolean;
  userSubscription: Entitlement | null;
  setIsLoading(isLoading: boolean): void;
  setIsAuthenticated(isAuthenticated: boolean): void;
  setUser(user: UserEntity): void;
  setUserCognito(user: CognitoUserSession): void;
  setAccessToken(accessToken: string): void;
  checkUserIsAuth(): void;
  handleSendUserLocation(): void;
  handleSendUserTokenFirebase(): void;
  connectUser(): void;
  setUserQonversion: (user: User | null) => void;
}

const AuthContext = createContext<undefined | IAuthContext>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserEntity | null>(null);
  const [userCognito, setUserCognito] = useState<CognitoUserSession | null>(
    null,
  );
  const [userQonversion, setUserQonversion] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [sub, setSub] = useState("");
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [userSubscription, setUserSubscription] = useState<Entitlement | null>(
    null,
  );
  const [triggerGetUserProfile] = useLazyGetUserProfileQuery();
  const [triggerGetTokenGetStream] = useLazyGetTokenGetStreamQuery();
  const [handleUpdateUserTokenFirebase] = useUpdateUserTokenFirebaseMutation();
  const [handleUpdateUserLocation] = useUpdateUserLocationMutation();

  useEffect(() => {
    if (user) {
      connectUser();
      handleAddUserInfoQV();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    checkUserIsAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUserInfoQV = async () => {
    try {
      const userInfo = await Qonversion.getSharedInstance().userInfo();
      setUserQonversion(userInfo);
    } catch (e) {
      // handle error here
    }
  };

  const checkUserIsAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      let userName = "";

      if (session.tokens?.accessToken?.payload) {
        const payload = session.tokens.accessToken.payload;
        if (payload.hasOwnProperty("cognito:groups")) {
          userName = payload.sub;
        } else {
          userName = payload.username || payload.sub;
        }
      }

      if (currentUser && session.tokens) {
        // Create a mock CognitoUserSession for compatibility
        const mockUserSession = {
          getAccessToken: () => ({
            getJwtToken: () => session.tokens?.accessToken?.toString() || "",
            payload: session.tokens?.accessToken?.payload || {}
          })
        } as CognitoUserSession;

        setUserCognito(mockUserSession);
        await dispatch(
          setAccessTokenSlice(session.tokens.accessToken?.toString() || ""),
        );
        await setSub(userName);
        await setIsAuthenticated(true);
        await setAccessToken(session.tokens.accessToken?.toString() || "");

        const resultUser = await triggerGetUserProfile(userName).unwrap();
        const tokenGetStream = await triggerGetTokenGetStream().unwrap();
        setUser({ ...resultUser, tokenGetStream: tokenGetStream.token });
        await Qonversion.getSharedInstance().identify(userName);
        await Qonversion.getSharedInstance().setUserProperty(
          UserPropertyKey.NAME,
          resultUser?.person?.name || "",
        );
        await handleCheckSubscription();
      } else {
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      setIsAuthenticated(false);
      await client.disconnectUser();
      if (error?.data?.message === "Unauthorized") {
        await signOut();
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleCheckSubscription = async () => {
    try {
      const entitlements =
        await Qonversion.getSharedInstance().checkEntitlements();

      const premiumEntitlement = entitlements.get("premium_access");

      if (premiumEntitlement != null) {
        setIsSubscriptionActive(Boolean(premiumEntitlement.isActive));
        if (Boolean(premiumEntitlement.isActive)) {
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
    }
  };

  const handleSendUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        handleUpdateUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handleSendUserTokenFirebase = async () => {
    try {
      if (Platform.OS === "ios") {
        const fcmTokenApns = await messaging().getAPNSToken();
        console.log("$$$$$", fcmTokenApns);
      } else {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          await handleUpdateUserTokenFirebase(fcmToken);
        }
      }
    } catch (error) {
      console.log("Error 🎒🎒🎒🎒🎒🎒🎒🎒🎒", error);
    }
  };

  const connectUser = async () => {
    try {
      await client.connectUser(
        {
          id: user?.id.toString() || "",
          name: user?.person.name,
          image: user?.avatar,
        },
        user?.tokenGetStream,
      );
      if (Platform.OS === "ios") {
        const fcmTokenApns = await messaging().getAPNSToken();
        if (fcmTokenApns) {
          await client.addDevice(
            fcmTokenApns,
            "apn",
            user?.id.toString() || "",
            "Apns",
          );
        }
      } else {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log("fcmToken 🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋", fcmToken);
          await client.addDevice(
            fcmToken,
            "firebase",
            user?.id.toString() || "",
            "firebase_m2b",
          );
        }
      }
    } catch (error) {
      // TODO: Handle error
      console.log("@@@@ERRRRRRROR", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        client,
        isLoading,
        isAuthenticated,
        user,
        userCognito,
        userQonversion,
        accessToken,
        sub,
        isSubscriptionActive,
        userSubscription,
        setIsLoading,
        setIsAuthenticated,
        setUser,
        setUserCognito,
        setUserQonversion,
        setAccessToken,
        checkUserIsAuth,
        handleSendUserLocation,
        handleSendUserTokenFirebase,
        connectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProvider() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth provider");
  }
  return context;
}
