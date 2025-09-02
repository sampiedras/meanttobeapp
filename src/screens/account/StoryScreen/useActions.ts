import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuthProvider} from '@/context/AuthContext';
import {
  useUpdateUserInfoMutation,
  useUpdateUserStoryMutation,
} from '@/api/user/userApi';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useState} from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';

interface IFormStory {
  story: string;
}
const schema = yup.object({
  story: yup.string().required('Please enter your story'),
});

export const useActions = (
  props: RootStackScreenProps<RootStackRoutes.STORY>,
) => {
  const {navigation} = props;
  const {user, checkUserIsAuth} = useAuthProvider();
  const [handleUpdateUserStory] = useUpdateUserStoryMutation();
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const [loading, setLoading] = useState(false);
  const userStory = user && user.person && user?.person?.description_story;
  const {control, formState, getValues} = useForm<IFormStory>({
    mode: 'onChange',
    defaultValues: {
      story: userStory?.toString(),
    },
    resolver: yupResolver(schema),
  });

  const {errors} = formState;

  const upDateStoryUser = async () => {
    try {
      setLoading(true);
      const storyUser = getValues('story');
      await handleUpdateUserStory({
        storyUser: storyUser,
      });
      showSuccessMessage('Updated story successfully');
      navigation.pop();
      checkUserIsAuth();
      setLoading(false);
    } catch (error) {
      showErrorMessage('Error updating user info');
    }
  };

  return {errors, control, getValues, upDateStoryUser, loading};
};
