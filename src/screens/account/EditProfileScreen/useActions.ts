import {useEffect, useState} from 'react';
import {useAuthProvider} from '@/context/AuthContext';
import {useController, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {CountryItem, countryCodes} from 'react-native-country-codes-picker';
import {format, parseISO} from 'date-fns';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useAppDispatch} from '@/hooks/useRedux';
import {Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import {setLoading, setLoadingText} from '@/slices/loadingSlice';
import {useDeleteUserAccountMutation} from '@/api/user/userApi';

export interface IFormEditProfile {
  name: string;
  birthday: string;
  email: string;
  phone_number: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  birthday: yup.string().required('Birthday is required'),
  email: yup
    .string()
    .email('You must enter a valid email')
    .required('Email is required'),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .test('10', 'Phone number is invalid', val => val.toString().length >= 10)
    .test('10', 'Phone number is invalid', val => val.toString().length <= 10),
});

export const useActionsEditProfile = ({
  navigation,
}: RootStackScreenProps<RootStackRoutes.EDIT_PROFILE>) => {
  const {user, userCognito, checkUserIsAuth, setIsLoading} = useAuthProvider();
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const dispatch = useAppDispatch();
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  const [formatDate, setFormatDate] = useState('');

  const apple = userCognito?.getIdToken().payload?.identities;
  const email = userCognito?.getIdToken().payload?.email;
  const phoneNumber = userCognito?.getIdToken().payload?.phone_number;
  const phoneNumberWithoutPrefix = phoneNumber ? phoneNumber.substring(3) : '';
  const countryCode = phoneNumber ? phoneNumber.substring(0, 3) : '';

  const selectedCountry = countryCodes.find(
    country => country.dial_code === `${countryCode}`,
  );

  const [countrySelected, setCountrySelected] = useState<CountryItem | null>(
    selectedCountry || null,
  );

  useEffect(() => {
    user?.avatar;
  }, [user]);

  useEffect(() => {
    if (user?.person?.date_of_birth) {
      const date = parseISO(user?.person?.date_of_birth);
      const desiredformat = 'MMMM dd yyyy';
      const formatDate = format(date, desiredformat);
      setFormatDate(formatDate);
    }
  }, [user]);

  useEffect(() => {
    checkUserIsAuth();
  }, []);

  const {control, formState} = useForm<IFormEditProfile>({
    mode: 'onChange',
    defaultValues: {
      name: user?.person.name,
      birthday: '',
      email: '',
      phone_number: '',
    },
    resolver: yupResolver(schema),
  });

  const {errors} = formState;

  const {field: nameField} = useController({
    control,
    defaultValue: '',
    name: 'name',
    rules: {
      required: true,
    },
  });

  const handleLogout = async () => {
    try {
      await dispatch(setLoading(true));
      await dispatch(setLoadingText('Deleting account...'));
      await setIsLoading(true);
      await Auth.signOut({global: true});
      await checkUserIsAuth();
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(''));
      showSuccessMessage('Your account has been deleted');
      await setIsLoading(false);
    } catch (error) {
      await setIsLoading(false);
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(''));
      showErrorMessage('Could not delete account');
    }
  };

  const handleDeleteUserAccount = async () => {
    Alert.alert(
      'Account deletion',
      'Are you sure you want to delete account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          onPress: async () => {
            try {
              await deleteUserAccount();
              await handleLogout();
            } catch (error) {
              // TODO: Handle error
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    control,
    errors,
    nameField,
    navigation,
    formatDate,
    countrySelected,
    email,
    phoneNumber,
    phoneNumberWithoutPrefix,
    countryCode,
    apple,
    user,
    setCountrySelected,
    handleDeleteUserAccount,
  };
};
