import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { signInWithRedirect } from "aws-amplify/auth";

type ViewModelContextType = {
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  handleSignInApple: () => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSignInApple = useCallback(async () => {
    signInWithRedirect({ provider: "Apple" });
  }, []);

  return (
    <ViewModelContext.Provider
      value={{
        snapPoints,
        bottomSheetRef,
        handleSignInApple,
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
