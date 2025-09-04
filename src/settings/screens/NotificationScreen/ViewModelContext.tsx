import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setLoading, setLoadingText } from "@/core/slices/loadingSlice";
import { useUpdateUserNotificationMutation } from "@/user/data/remote/userApi";

type ViewModelContextType = {
  enableNotifications: boolean;
  handleEnableNotifications: () => void;
  handleUpdateNotificationStatus: (enabled: boolean) => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { userProfile } = useAuthProvider();

  const dispatch = useAppDispatch();
  const { handleUserUpdateInfo } = useAuthProvider();

  const [handleUpdateNotification] = useUpdateUserNotificationMutation();

  const [enableNotifications, setEnableNotifications] = useState(
    !!userProfile?.notification,
  );

  const handleUpdateNotificationStatus = useCallback(
    async (enabled: boolean) => {
      try {
        await dispatch(setLoadingText("Updating notifications..."));
        await dispatch(setLoading(true));
        await handleUpdateNotification({ notification: enabled });
        await handleUserUpdateInfo();
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(""));
        Toast.show({
          type: "success",
          text1: "Notification updated successfully",
          visibilityTime: 2000,
        });
      } catch (error) {
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(""));
        Toast.show({
          type: "error",
          text1: "Error updating Notification",
          visibilityTime: 2000,
        });
      }
    },
    [dispatch, handleUpdateNotification, handleUserUpdateInfo],
  );

  const handleEnableNotifications = () => {
    setEnableNotifications(!enableNotifications);
    handleUpdateNotificationStatus(!enableNotifications);
  };

  return (
    <ViewModelContext.Provider
      value={{
        enableNotifications,
        handleEnableNotifications,
        handleUpdateNotificationStatus,
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
