import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { ITypeVerseResponse } from "@/verse/data/remote/entities/verseEntity";
import { useFindAllTypeVerseQuery } from "@/verse/data/remote/verseApi";
import { E_VerseStackRoutes } from "@/verse/routes";

type ViewModelContextType = {
  data: ITypeVerseResponse[] | undefined;
  isFetching: boolean;
  searchText: string;
  handleSearch: (text: string) => void;
  handleRefresh: () => void;
  handleNavigate: (itemId: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const [searchText, setSearchText] = useState("");

  const { data, isFetching, refetch } = useFindAllTypeVerseQuery(searchText);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleNavigate = useCallback(
    (itemId: string) => {
      navigate(E_VerseStackRoutes.VERSES_LIST, {
        id: itemId,
      });
    },
    [navigate],
  );

  return (
    <ViewModelContext.Provider
      value={{
        data,
        isFetching,
        searchText,
        handleSearch,
        handleRefresh,
        handleNavigate,
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
