import {useGetUserQuestionProfileQuery} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {API_KEY_GEOCODER_MAP} from '@/utils/config';
import {useEffect, useState} from 'react';
import Geocode from 'react-native-geocoding';

/**
 * Hook to handle user profile screen actions.
 */
export const useActionsUser = () => {
  const {user, checkUserIsAuth} = useAuthProvider();

  const [selectedPage, setSelectedPage] = useState<'profile' | 'pricing'>(
    'profile',
  );
  const [visible, setVisible] = useState(false);
  const [profilePercentage, setProfilePercentage] = useState(0);
  const {data: userQuestion} = useGetUserQuestionProfileQuery();
  const [dataQuestions, setDataQuestions] = useState<any[]>([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddressOne = async () => {
      const longitude = user?.location?.coordinates[1] ?? 0;
      const latitude = user?.location?.coordinates[0] ?? 0;
      Geocode.init(`${API_KEY_GEOCODER_MAP}`);
      try {
        const response = await Geocode.from({latitude, longitude});
        let city = '';
        let state = '';
        response?.results[0]?.address_components &&
          response?.results[0]?.address_components?.forEach(component => {
            if (component?.types?.includes('locality')) {
              city = component?.long_name;
            } else if (
              component?.types.includes('administrative_area_level_1')
            ) {
              state = component?.long_name;
            }
          });

        const address = `${city}, ${state}`;
        setAddress(address);
      } catch (error) {}
    };

    fetchAddressOne();
  }, [user?.location?.coordinates]);

  useEffect(() => {
    if (userQuestion && userQuestion.length > 0) {
      const newData = userQuestion?.map(item => {
        if (item.answer?.includes('&')) {
          const [verseReference, verse] = item.answer.split('&');
          return {
            ...item,
            answer: `${verse}\n${verseReference}`,
          };
        } else {
          return item;
        }
      });
      newData.sort((a, b) => (a.question?.id || 0) - (b.question?.id || 0));
      setDataQuestions(newData);
    }
  }, [userQuestion]);

  // Calculate the user's age if the birthDate is available
  let PersonAge;
  if (user?.person?.date_of_birth) {
    const birthDate = new Date(user.person.date_of_birth);
    const now = new Date();
    PersonAge = now.getFullYear() - birthDate.getFullYear();
  }

  const toggleModalFIlters = () => {
    setVisible(!visible);
  };

  /**
   * Effect to calculate the profile completion percentage based on various user data.
   */
  useEffect(() => {
    if (user) {
      const numberUserMedias =
        (user?.userMedias && user?.userMedias?.length) || 0;
      const numberUserDrives =
        (user?.userDriveSection && user?.userDriveSection?.length) || 0;
      const numberUserQuestions =
        (user?.userQuestion && user?.userQuestion?.length) || 0;
      const numberUserChurch = user && user.church ? 1 : 0;

      // Define maximum points for each category
      const maxPointsMedias = 6;
      const maxPointsDeepQuestions = 5;
      const maxPointsDrivesYou = 9;
      const maxPointsChurch = 1;

      // Define maximum points percentage for each category
      const maxPointsMediasPercentage = 50;
      const maxPointsDeepQuestionsPercentage = 25;
      const maxPointsDrivesYouPercentage = 20;
      const maxPointsChurchPercentage = 5;

      // Limit the number of points in each category to its maximum
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

  // Round the profile completion percentage to a whole number
  const totalPercentageProfile = Math.round(profilePercentage);

  return {
    address,
    PersonAge,
    selectedPage,
    visible,
    user,
    dataQuestions,
    totalPercentageProfile,
    setSelectedPage,
    toggleModalFIlters,
    checkUserIsAuth,
  };
};
