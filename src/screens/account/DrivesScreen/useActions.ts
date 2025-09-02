import {useLazyGetAllDriveQuery} from '@/api/drive/driveApi';
import {
  useGetUserDriveSectionQuery,
  useUpdateDriveSectionMutation,
} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

export interface SectionData {
  title: string;
  data: Array<{
    id: number;
    name: string;
    selected: boolean;
    type: string;
  }>;
}

export const useActions = () => {
  const {checkUserIsAuth} = useAuthProvider();
  const navigation = useNavigation();
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {data: dataUserDriveSection, refetch: refetchUserDriveSection} =
    useGetUserDriveSectionQuery();
  const idDriverAnswers =
    dataUserDriveSection?.map(e => e.driveSection.id) || [];

  const [handleUpdateUserDriveSection] = useUpdateDriveSectionMutation();
  const [triggerGetAllDrive] = useLazyGetAllDriveQuery();

  useEffect(() => {
    async function getAsyncData() {
      try {
        const dataDrives = await triggerGetAllDrive().unwrap();
        const updatedSections = dataDrives.map(drive => ({
          title: drive.name,
          data: drive.driveSections.map(e => ({
            id: e.id,
            name: e.name,
            selected: idDriverAnswers.includes(e.id),
            type: drive.name,
          })),
        }));
        setSections(updatedSections);
        const initialSelectedCount = updatedSections.reduce(
          (count, section) =>
            count + section.data.filter(item => item.selected).length,
          0,
        );
        setSelectedCount(initialSelectedCount);
      } catch (error) {
        setSections([]);
      }
    }
    getAsyncData();
  }, [dataUserDriveSection]);

  const handleSelect = (itemId: number, sectionTitle: string) => {
    const updatedSections = sections.map(section => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          data: section.data.map(item => {
            if (item.id === itemId) {
              if (item.selected) {
                setSelectedCount(prevCount => prevCount - 1);
                return {...item, selected: false};
              } else {
                if (selectedCount < 9) {
                  setSelectedCount(prevCount => prevCount + 1);
                  return {...item, selected: true};
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
  };

  const updateDriveSection = async () => {
    try {
      setLoading(true);

      const selectedDriveSectionIds = sections
        .flatMap(section => section.data.filter(item => item.selected))
        .map(item => item.id);

      await handleUpdateUserDriveSection(selectedDriveSectionIds);
      showSuccessMessage('Updated drives successfully');
      refetchUserDriveSection();
      setLoading(false);
      checkUserIsAuth();
      navigation.goBack();
      checkUserIsAuth();
    } catch (error) {
      showErrorMessage('Error updating drives');
    }
  };

  return {
    setSections,
    sections,
    idDriverAnswers,
    updateDriveSection,
    setSelectedCount,
    selectedCount,
    handleSelect,
    loading,
    dataUserDriveSection,
  };
};
