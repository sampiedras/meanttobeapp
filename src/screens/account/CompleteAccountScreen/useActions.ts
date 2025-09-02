import {useNavigationPanel} from '@/hooks/useNavigationPanel';
import {useAppDispatch, useAppSelector} from '@/hooks/useRedux';
import {selectLoading, setLoading, setLoadingText} from '@/slices/loadingSlice';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from '@/api/bible/entities/bibleEntity';
import {
  useFindAllQuestionsQuery,
  useGetAllQuestionQuery,
} from '@/api/question/questionApi';
import {IQuestionResponse} from '@/api/question/entities/questionEntity';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useUpdateUserInfoMutation} from '@/api/user/userApi';
import {
  IUserUpdate,
  UserDrive,
  UserQuestion,
} from '@/api/user/entities/userEntity';
import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useUploadImageToS3} from '@/hooks/useUpload';
import {Asset} from 'react-native-image-picker';
import {v4 as uuidv4} from 'uuid';
import {
  selectUser,
  setPermissionAppTrackingTransparencyLocal,
  setPermissionLocationLocal,
  setPermissionNotificationLocal,
} from '@/slices/userSlice';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

export interface IFormLoginEmail {
  name: string;
  birthday: string;
  gender: string;
  searching: {id?: string; name?: string} | null;
  church: {id?: string; name?: string} | null;
  story: string;
  location: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  birthday: yup.string().required('Birthday is required'),
  gender: yup.string().required('Please select some option'),
  searching: yup
    .object({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
  church: yup
    .object({
      id: yup.string(),
      name: yup.string(),
    })
    .nullable(),
  story: yup
    .string()
    .max(750, 'Max. 750 characters')
    .required('Please enter your story'),
  location: yup.string().required('Please select some option'),
});

export interface SectionData {
  typeDriveId?: string;
  title: string;
  data: Array<{
    id: string;
    name: string;
    selected: boolean;
    type: string;
  }>;
}

export interface IImages {
  image1: Asset | null;
  image2: Asset | null;
  image3: Asset | null;
  image4: Asset | null;
  image5: Asset | null;
  image6: Asset | null;
}

export const useActionsCompleteAccount =
  ({}: RootStackScreenProps<RootStackRoutes.COMPLETE_ACCOUNT>) => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(selectLoading);
    const {permissionLocationLocal, permissionNotificationLocal} =
      useAppSelector(selectUser);
    const {ref, ...navigationPanel} = useNavigationPanel(12);
    const {pages, progress, setPage, activePage} = navigationPanel;
    const {checkUserIsAuth, user} = useAuthProvider();
    const {showErrorMessage} = userAlertMessage();
    const {handleUpload} = useUploadImageToS3();

    const {data: dataQuestion = []} = useGetAllQuestionQuery();
    const {data: questionData} = useFindAllQuestionsQuery();

    const [handleUpdateUserInfo] = useUpdateUserInfoMutation();

    const [imageSelect, setImageSelect] = useState<Asset | null>(null);
    const [imagesSelected, setImagesSelected] = useState<IImages>({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
    });
    const [addChurch, setAddChurch] = useState(true);
    const [sections, setSections] = useState<SectionData[]>([]);
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedBook, setSelectedBook] = useState<BooksEntity | null>(null);
    const [selectedChapter, setSelectedChapter] =
      useState<ChapterEntity | null>(null);
    const [selectedVerse, setSelectedVerse] = useState<VerseEntity | null>(
      null,
    );
    const [data, setData] = useState<IQuestionResponse[]>([]);
    const [permissionLocation, setPermissionLocation] =
      useState<boolean>(false);
    const [permissionNotification, setPermissionNotification] =
      useState<boolean>(false);

    useEffect(() => {
      async function checkPermissionsLocation() {
        if (Platform.OS === 'android') {
          const resultPermissionLocation = await check(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          const permissionStatusLocation =
            resultPermissionLocation === RESULTS.GRANTED ||
            resultPermissionLocation === RESULTS.LIMITED ||
            resultPermissionLocation === RESULTS.UNAVAILABLE;
          setPermissionLocation(permissionStatusLocation);
          if (permissionLocationLocal) {
            setPage(activePage + 1);
          }
        } else {
          const resultPermissionLocation = await check(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          const permissionStatusLocation =
            resultPermissionLocation === RESULTS.GRANTED ||
            resultPermissionLocation === RESULTS.LIMITED ||
            resultPermissionLocation === RESULTS.UNAVAILABLE;
          setPermissionLocation(permissionStatusLocation);
          if (permissionLocationLocal) {
            setPage(activePage + 1);
          }
        }
      }

      async function checkPermissionsNotification() {
        if (Platform.OS === 'android') {
          const resultPermissionNotification = await check(
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          );
          const permissionStatusNotifications =
            resultPermissionNotification === RESULTS.GRANTED ||
            resultPermissionNotification === RESULTS.LIMITED ||
            resultPermissionNotification === RESULTS.UNAVAILABLE;
          setPermissionNotification(permissionStatusNotifications);
          if (permissionNotificationLocal) {
            setPage(activePage + 1);
          }
        } else {
          const resultPermissionNotification =
            await messaging().hasPermission();
          const permissionStatusNotifications =
            resultPermissionNotification ===
              messaging.AuthorizationStatus.AUTHORIZED ||
            resultPermissionNotification ===
              messaging.AuthorizationStatus.PROVISIONAL;
          setPermissionNotification(permissionStatusNotifications);
          if (permissionNotificationLocal) {
            setPage(activePage + 1);
          }
        }
      }
      async function checkPermissionsTracking() {
        if (Platform.OS === 'ios') {
          dispatch(setPermissionAppTrackingTransparencyLocal(true));
          setPage(activePage + 1);
        } else {
          setPage(activePage + 1);
        }
      }
      if (activePage === 10) {
        checkPermissionsLocation();
      }
      if (activePage === 11) {
        checkPermissionsNotification();
      }
      if (activePage === 12) {
        checkPermissionsTracking();
      }
    }, [activePage]);

    useEffect(() => {
      if (questionData && questionData?.length > 0) {
        setData(questionData.map(item => ({...item, answer: ''})));
      }
    }, [questionData]);

    useEffect(() => {
      setImageSelect(imagesSelected.image1 || null);
    }, [imagesSelected]);

    const {control, formState, getValues, setValue, trigger, handleSubmit} =
      useForm<IFormLoginEmail>({
        mode: 'onChange',
        defaultValues: {
          name: '',
          birthday: '',
          gender: '',
          searching: null,
          church: null,
          story: '',
          location: 'near_me',
        },
        resolver: yupResolver(schema),
      });

    const {isValid, dirtyFields, errors} = formState;

    const handleContinue = () => setPage(activePage + 1);

    const handleSaveInfo = async () => {
      try {
        await dispatch(setLoadingText('Uploading images...'));
        await dispatch(setLoading(true));

        const imgAvatar = `${uuidv4()}.${
          imageSelect?.type ? imageSelect?.type.split('/')[1] : ''
        }`;
        await handleUpload(
          `user/${user?.id}/profile/${imgAvatar}`,
          imageSelect?.type || '',
          imageSelect?.base64 || '',
          'public',
        );

        const avatar = `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${imgAvatar}`;

        // const img2 = imagesSelected.image2
        //   ? `${uuidv4()}.${
        //       imagesSelected.image2.type
        //         ? imagesSelected.image2.type.split('/')[1]
        //         : ''
        //     }`
        //   : null;

        // const img3 = imagesSelected.image3
        //   ? `${uuidv4()}.${
        //       imagesSelected.image3.type
        //         ? imagesSelected.image3.type.split('/')[1]
        //         : ''
        //     }`
        //   : null;

        // const img4 = imagesSelected.image4
        //   ? `${uuidv4()}.${
        //       imagesSelected.image4.type
        //         ? imagesSelected.image4.type.split('/')[1]
        //         : ''
        //     }`
        //   : null;

        // const img5 = imagesSelected.image5
        //   ? `${uuidv4()}.${
        //       imagesSelected.image5.type
        //         ? imagesSelected.image5.type.split('/')[1]
        //         : ''
        //     }`
        //   : null;

        // const img6 = imagesSelected.image6
        //   ? `${uuidv4()}.${
        //       imagesSelected.image6.type
        //         ? imagesSelected.image6.type.split('/')[1]
        //         : ''
        //     }`
        //   : null;

        const imgUrls: string[] = [];

        // if (imgAvatar) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${imgAvatar}`,
        //     imageSelect?.type || '',
        //     imageSelect?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(avatar);
        // }
        // if (img2) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${img2}`,
        //     imagesSelected.image2?.type || '',
        //     imagesSelected.image2?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(
        //     `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img2}`,
        //   );
        // }
        // if (img3) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${img3}`,
        //     imagesSelected.image3?.type || '',
        //     imagesSelected.image3?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(
        //     `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img3}`,
        //   );
        // }
        // if (img4) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${img4}`,
        //     imagesSelected.image4?.type || '',
        //     imagesSelected.image4?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(
        //     `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img4}`,
        //   );
        // }
        // if (img5) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${img5}`,
        //     imagesSelected.image5?.type || '',
        //     imagesSelected.image5?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(
        //     `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img5}`,
        //   );
        // }
        // if (img6) {
        //   await handleUpload(
        //     `user/${user?.id}/profile/${img6}`,
        //     imagesSelected.image6?.type || '',
        //     imagesSelected.image6?.base64 || '',
        //     'public',
        //   );
        //   imgUrls.push(
        //     `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img6}`,
        //   );
        // }

        await dispatch(setLoadingText('Sending information...'));

        const {name, birthday, gender, story, location, searching, church} =
          getValues();

        const userDrive = sections
          .filter(section => section.data.some(drive => drive.selected))
          .map(item => ({
            typeDrive: {
              name: item.title,
              typeDriveId: item.typeDriveId || '',
            },
            drives: item.data
              .filter(drive => drive.selected)
              .map(drive => ({
                name: drive.name,
                driveId: drive.id,
              })),
          })) as unknown as UserDrive;

        const userQuestion: UserQuestion[] = data
          .filter(question => question.answer)
          .map(e => ({
            questionId: e.sk.split('#')[1],
            question: e.question,
            answer: e.answer || '',
          }));
        const verse = data
          .find(question => question?.id === 1)
          ?.answer?.toString();

        const body: IUserUpdate = {
          name,
          dateOfBirth: birthday,
          gender,
          descriptionStory: story,
          avatar,
          searchRange: location,
          searchingId: searching?.id || '',
          churchId: church?.id || '',
          church: church?.name || '',
          userDrive: userDrive,
          mediaUrls: imgUrls,
          role: 'USER',
          typeAccount: '',
          searching: searching?.name || '',
          countryId: 0,
          country: '',
          state: '',
          city: '',
          address: '',
          distance: 0,
          verse: verse || '',
          userQuestion,
        };

        console.log('data@@@@@@', data);

        console.log('body@@@@@@@@', JSON.stringify(body));

        // const result = await handleUpdateUserInfo(body).unwrap();
        // if (result) {
        //   await checkUserIsAuth();
        // } else {
        //   showErrorMessage('Error updating user info');
        // }
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(''));
      } catch (error) {
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(''));
        showErrorMessage('Error updating user info');
      }
    };

    const handleRequestPermissionLocation = async () => {
      if (Platform.OS === 'android') {
        const resultRequestPermissionLocation = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const permissionStatusLocation =
          resultRequestPermissionLocation === RESULTS.GRANTED ||
          resultRequestPermissionLocation === RESULTS.LIMITED ||
          resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
        setPermissionLocation(permissionStatusLocation);
        await dispatch(setPermissionLocationLocal(true));
        if (permissionLocationLocal) {
          setPage(activePage + 1);
        }
      } else {
        const resultRequestPermissionLocation = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        const permissionStatusLocation =
          resultRequestPermissionLocation === RESULTS.GRANTED ||
          resultRequestPermissionLocation === RESULTS.LIMITED ||
          resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
        await dispatch(setPermissionLocationLocal(true));
        setPermissionLocation(permissionStatusLocation);
        if (permissionLocationLocal) {
          setPage(activePage + 1);
        }
      }
    };

    const handleRequestPermissionNotification = async () => {
      if (Platform.OS === 'android') {
        const resultRequestPermissionNotifications = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        const permissionStatusNotifications =
          resultRequestPermissionNotifications === RESULTS.GRANTED ||
          resultRequestPermissionNotifications === RESULTS.LIMITED ||
          resultRequestPermissionNotifications === RESULTS.UNAVAILABLE;
        await dispatch(setPermissionNotificationLocal(true));
        setPermissionNotification(permissionStatusNotifications);
      } else {
        const authStatus = await messaging().requestPermission();
        const permissionStatusNotifications =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        await dispatch(setPermissionNotificationLocal(true));
        setPermissionNotification(permissionStatusNotifications);
      }
    };
    const handleRequestTrackingPermission = async () => {
      try {
        await requestTrackingPermission();
        await dispatch(setPermissionAppTrackingTransparencyLocal(true));
      } catch (error) {
        // TODO: Handle error
      }
    };

    return {
      ref,
      navigationPanel,
      pages,
      activePage,
      progress,
      loading,
      control,
      isValid,
      dirtyFields,
      errors,
      imageSelect,
      imagesSelected,
      addChurch,
      sections,
      selectedCount,
      selectedBook,
      selectedChapter,
      selectedVerse,
      data,
      permissionLocation,
      permissionNotification,
      getValues,
      setValue,
      trigger,
      handleContinue,
      handleSaveInfo,
      handleSubmit,
      setImageSelect,
      setImagesSelected,
      setAddChurch,
      setSections,
      setSelectedCount,
      setSelectedBook,
      setSelectedChapter,
      setSelectedVerse,
      setData,
      handleRequestPermissionLocation,
      handleRequestPermissionNotification,
      handleRequestTrackingPermission,
    };
  };
