import React, {useState} from 'react';
import {useController, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useUpdateUserInfoMutation} from '@/api/user/userApi';
import {IUserUpdateInfo} from '@/api/user/entities/userEntity';
import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';

export interface IFormLoginEmail {
  church: {id?: number; name?: string} | null;
}

const schema = yup.object({
  church: yup
    .object({
      id: yup.number(),
      name: yup.string(),
    })
    .nullable(),
});

export const useActionsChurch = (
  props: RootStackScreenProps<RootStackRoutes.CHURCH>,
) => {
  const {navigation} = props;
  const {checkUserIsAuth, user} = useAuthProvider();
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const [loading, setLoading] = useState(false);

  const [handleUpdateUserInfo] = useUpdateUserInfoMutation();

  const [addChurch, setAddChurch] = useState(true);

  const {control, formState, getValues, setValue, trigger, handleSubmit} =
    useForm<IFormLoginEmail>({
      mode: 'onChange',
      defaultValues: {
        church: user?.church,
      },
      resolver: yupResolver(schema),
    });

  const {isValid, dirtyFields, errors} = formState;

  const {field} = useController({
    control,
    name: 'church',
    rules: {
      required: true,
    },
  });

  const handleSaveInfo = async () => {
    try {
      await setLoading(true);
      const {...res} = getValues();
      const body: IUserUpdateInfo = {
        name: user?.person.name || '',
        date_of_birth: user?.person.date_of_birth || '',
        description_story: user?.person.description_story || '',
        avatar: user?.avatar || '',
        search_range: user?.person.search_range || '',
        searching_id: user?.searching.id,
        church_id: res.church?.id,
        drive_section_ids: [],
        questions: [],
        images: [],
      };

      const result = await handleUpdateUserInfo(body).unwrap();
      if (result) {
        await checkUserIsAuth();
        navigation.pop();
        showSuccessMessage('Updated church successfully');
      } else {
        showErrorMessage('Error updating user info');
      }
      await setLoading(false);
    } catch (error) {
      await setLoading(false);
      showErrorMessage('Error updating user info');
    }
  };

  return {
    control,
    isValid,
    dirtyFields,
    errors,
    addChurch,
    loading,
    getValues,
    setValue,
    trigger,
    handleSaveInfo,
    handleSubmit,
    setAddChurch,
    user,
    field,
  };
};
