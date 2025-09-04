import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuthProvider } from "@/core/context/AuthContext";
import {
  DriveType,
  UserDriveByUserType,
} from "@/user/data/remote/entities/driveEntity";
import { UserDriveType } from "@/user/data/remote/entities/userEntity";
import {
  useFindAllTypeDriveQuery,
  useGetDriveByUserIdQuery,
  useLazyFindAllDriveQuery,
  useUpdateUserDrivesMutation,
} from "@/user/data/remote/userApi";
import { SectionData } from "../CompleteAccountScreen/ViewModelContext";

interface Drive {
  id: string;
  name: string;
}

type ViewModelContextType = {
  isLoading: boolean;
  selectedCount: number;
  sections: SectionData[];
  dataDrives: UserDriveByUserType[];
  isFetchingTypeDrive: boolean;
  isFetchingDrives: boolean;
  handleUpdateDrives: () => Promise<void>;
  handleSelect: (itemId: string, sectionTitle: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { goBack } = useNavigation();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();

  const { data: dataTypeDrives = [], isFetching: isFetchingTypeDrive } =
    useFindAllTypeDriveQuery();
  const [triggerFindAllDrives, { isFetching: isFetchingDrives }] =
    useLazyFindAllDriveQuery();
  const {
    data: dataDrives = [],
    refetch,
    isSuccess,
  } = useGetDriveByUserIdQuery(userProfile?.userId || "");
  const [handleUpdateDrivesApi, { isLoading }] = useUpdateUserDrivesMutation();

  const [sections, setSections] = useState<SectionData[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelect = useCallback(
    (itemId: string, sectionTitle: string) => {
      const updatedSections = sections.map((section) => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            data: section.data.map((item) => {
              if (item.id === itemId) {
                if (item.selected) {
                  setSelectedCount((prevCount) => prevCount - 1);
                  return { ...item, selected: false };
                } else {
                  if (selectedCount < 9) {
                    setSelectedCount((prevCount) => prevCount + 1);
                    return { ...item, selected: true };
                  }
                }
              }
              return item;
            }),
          };
        }
        return section;
      });
      setSections(updatedSections);
    },
    [sections, selectedCount],
  );

  const handleGetAllData = useCallback(async () => {
    let result: SectionData[] = [];

    try {
      let dataDrivesFilter: DriveType[] = [];

      for await (const item of dataDrives) {
        for await (const drive of item.drives) {
          dataDrivesFilter.push({ ...drive, title: item.name });
        }
      }

      setSelectedCount(dataDrivesFilter.length);

      for await (const item of dataTypeDrives) {
        const resultDrives = await triggerFindAllDrives(item.id).unwrap();
        result.push({
          title: item.name,
          gsiPk1Drive: item.id,
          data: resultDrives.map((drive: Drive) => {
            return {
              id: drive.id,
              name: drive.name,
              selected: dataDrivesFilter.find((i) => i.driveId === drive.id)
                ?.driveId
                ? true
                : false,
              type: item.name,
            };
          }),
        });
      }
    } catch (error) {
      setSections([]);
    }

    setSections(result);
  }, [dataDrives, dataTypeDrives, triggerFindAllDrives]);

  const handleUpdateDrives = useCallback(async () => {
    const userDrive = sections
      .filter((section) => section.data.some((drive) => drive.selected))
      .map((item) => ({
        typeDrive: {
          name: item.title,
          typeDriveId: item.gsiPk1Drive || "",
        },
        drives: item.data
          .filter((drive) => drive.selected)
          .map((drive) => ({
            name: drive.name,
            driveId: drive.id,
          })),
      })) as unknown as UserDriveType[];
    try {
      await handleUpdateDrivesApi({
        userDrive,
        userTypeDriveToDeleteIds: dataDrives.map((typeDrive) => typeDrive.sk),
      });
      await handleUserUpdateInfo();
      await refetch();
      Toast.show({
        type: "success",
        text1: "Drives updated successfully",
        visibilityTime: 2000,
      });
      goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error updating drives",
        visibilityTime: 2000,
      });
    }
  }, [
    dataDrives,
    goBack,
    handleUpdateDrivesApi,
    handleUserUpdateInfo,
    refetch,
    sections,
  ]);

  useEffect(() => {
    if (dataTypeDrives.length > 0 && isSuccess) {
      handleGetAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTypeDrives, isSuccess]);

  return (
    <ViewModelContext.Provider
      value={{
        sections,
        isLoading,
        dataDrives,
        selectedCount,
        isFetchingDrives,
        isFetchingTypeDrive,
        handleSelect,
        handleUpdateDrives,
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
