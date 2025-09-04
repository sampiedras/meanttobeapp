import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { E_ChatStackRoutes } from "@/chat";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { setVisible } from "@/core/slices/alertPremiumSlice";

type ViewModelContextType = {
  searchText: string;
  filters: any;
  isSubscriptionActive: boolean;
  navigateToChannel: (id: string | undefined) => void;
  handleShowModalPremium: () => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { isSubscriptionActive, userProfile } = useAuthProvider();

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<any>({
    members: {
      $in: [userProfile?.userId],
    },
  });

  const navigateToChannel = useCallback(
    (id: string | undefined) => {
      navigate(E_ChatStackRoutes.CHAT, {
        channelId: id || "",
      });
    },
    [navigate],
  );

  const handleShowModalPremium = useCallback(() => {
    dispatch(setVisible(true));
  }, [dispatch]);

  useEffect(() => {
    if (searchText) {
      setFilters({
        members: {
          $in: [userProfile?.userId, searchText],
        },
        "member.user.name": {
          $autocomplete: searchText,
        },
      });
    } else {
      setFilters({
        members: {
          $in: [userProfile?.userId, searchText],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <ViewModelContext.Provider
      value={{
        filters,
        searchText,
        isSubscriptionActive,
        setSearchText,
        navigateToChannel,
        handleShowModalPremium,
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
