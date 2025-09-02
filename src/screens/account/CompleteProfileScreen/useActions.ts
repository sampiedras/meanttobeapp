import {useAuthProvider} from '@/context/AuthContext';
import {
  RootStackParamList,
  RootStackRoutes,
  RootStackScreenProps,
} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';

export const useActions = () => {
  const {user} = useAuthProvider();
  const [profilePercentage, setProfilePercentage] = useState(0);
  useEffect(() => {
    if (user) {
      const numberUserMedias =
        (user?.userMedias && user?.userMedias?.length) || 0;
      const numberUserDrives =
        (user?.userDriveSection && user?.userDriveSection?.length) || 0;
      const numberUserQuestions =
        (user?.userQuestion && user?.userQuestion?.length) || 0;
      const numberUserChurch = user && user.church ? 1 : 0;

      const maxPointsMedias = 6;
      const maxPointsDeepQuestions = 5;
      const maxPointsDrivesYou = 9;
      const maxPointsChurch = 1;

      const maxPointsMediasPercentage = 50;
      const maxPointsDeepQuestionsPercentage = 25;
      const maxPointsDrivesYouPercentage = 20;
      const maxPointsChurchPercentage = 5;

      const percentageMedias = Math.min(
        (numberUserMedias / maxPointsMedias) * maxPointsMediasPercentage,
        maxPointsMediasPercentage,
      );

      const percentageDeepQuestions = Math.min(
        (numberUserQuestions / maxPointsDeepQuestions) *
          maxPointsDeepQuestionsPercentage,
        maxPointsDeepQuestionsPercentage,
      );

      const percentageDrives = Math.min(
        (numberUserDrives / maxPointsDrivesYou) * maxPointsDrivesYouPercentage,
        maxPointsDrivesYouPercentage,
      );

      const percentageCurch = Math.min(
        (numberUserChurch / maxPointsChurch) * maxPointsChurchPercentage,
        maxPointsChurchPercentage,
      );

      const totalPercentage =
        percentageMedias +
        percentageDeepQuestions +
        percentageDrives +
        percentageCurch;

      setProfilePercentage(totalPercentage);
    }
  }, [
    user,
    user?.userDriveSection,
    user?.userMedias,
    user?.userQuestion,
    user?.church,
  ]);

  const totalPercentageProfile = Math.round(profilePercentage);
  const numberOfImagesSelected = user?.userMedias && user.userMedias.length;
  const numberDrivesSelected =
    user?.userDriveSection && user.userDriveSection.length;
  const numberDeepQuestionsSelected =
    user?.userQuestion && user.userQuestion?.length;
  const numberChurchSelected = user && user.church ? 1 : 0;

  return {
    user,
    numberOfImagesSelected,
    totalPercentageProfile,
    numberDrivesSelected,
    numberDeepQuestionsSelected,
    numberChurchSelected,
  };
};
