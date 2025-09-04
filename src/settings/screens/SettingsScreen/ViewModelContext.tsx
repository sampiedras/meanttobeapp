import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { Linking } from "react-native";

type ViewModelContextType = {
  urlTermsOfService: string;
  urlPrivacyPolicy: string;
  handleGoToDetailUrl: (urls: string) => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const urlTermsOfService =
    "https://nissys.notion.site/Meant-to-Be-Terms-of-Use-478c0a7df3c943b4819fd7bd4d5aef29";
  const urlPrivacyPolicy =
    "https://nissys.notion.site/Meant-to-Be-Privacy-Policy-43d6cc64a38f4d59b9e95062aefc07b6";

  const handleGoToDetailUrl = useCallback(async (urls: string) => {
    Linking.openURL(urls);
  }, []);

  return (
    <ViewModelContext.Provider
      value={{
        urlTermsOfService,
        urlPrivacyPolicy,
        handleGoToDetailUrl,
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
