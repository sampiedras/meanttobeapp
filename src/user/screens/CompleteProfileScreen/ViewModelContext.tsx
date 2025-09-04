import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthProvider } from "@/core/context/AuthContext";
import { UserProfileType } from "@/core/types/AuthContextType";
import {
  DriveType,
  UserDriveByUserType,
} from "@/user/data/remote/entities/driveEntity";
import {
  useGetDriveByUserIdQuery,
  useGetQuestionByUserIdQuery,
} from "@/user/data/remote/userApi";

type ViewModelContextType = {
  totalPercentageProfile: number;
  dataDrives: UserDriveByUserType[];
  userProfile: UserProfileType | null;
  counts: {
    numberUserDrives: number;
    numberDeepQuestionsSelected: number;
  };
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { userProfile } = useAuthProvider();

  const { data: dataDrives = [] } = useGetDriveByUserIdQuery(
    userProfile?.userId || "",
  );
  const { data: dataQuestions = [] } = useGetQuestionByUserIdQuery(
    userProfile?.userId || "",
  );

  const [counts, setCounts] = useState({
    numberUserDrives: 0,
    numberDeepQuestionsSelected: 0,
  });
  const [totalPercentageProfile, setTotalPercentageProfile] = useState(50);

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
      setCounts({
        numberUserDrives: dataDrivesFilter.length,
        numberDeepQuestionsSelected: dataQuestions.length,
      });
      setTotalPercentageProfile(total);
    })();
  }, [userProfile, dataDrives, dataQuestions]);

  return (
    <ViewModelContext.Provider
      value={{ counts, userProfile, totalPercentageProfile, dataDrives }}
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
