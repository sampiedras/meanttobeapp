import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useAppDispatch} from '@/hooks/useRedux';
import {setLoading, setLoadingText} from '@/slices/loadingSlice';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import {Linking} from 'react-native';
import Qonversion from 'react-native-qonversion';

export const useActions =
  ({}: RootStackScreenProps<RootStackRoutes.SETTINGS>) => {
    const {checkUserIsAuth, setIsLoading} = useAuthProvider();
    const {showErrorMessage, showSuccessMessage} = userAlertMessage();
    const dispatch = useAppDispatch();
    const urlTermsOfService =
      'https://nissys.notion.site/Meant-to-Be-Terms-of-Use-478c0a7df3c943b4819fd7bd4d5aef29';

    const urlPrivacyPolicy =
      'https://nissys.notion.site/Meant-to-Be-Privacy-Policy-43d6cc64a38f4d59b9e95062aefc07b6';

    const handleLogout = async () => {
      try {
        await dispatch(setLoading(true));
        await dispatch(setLoadingText('Closing session...'));
        await setIsLoading(true);
        await Auth.signOut({global: true});
        await checkUserIsAuth();
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(''));
        showSuccessMessage('You have been logged out');
        await AsyncStorage.removeItem('TUTORIAL_MATCH');
        await setIsLoading(false);
        Qonversion.getSharedInstance().logout();
      } catch (error: any) {
        await setIsLoading(false);
        await dispatch(setLoading(false));
        await dispatch(setLoadingText(''));
        showErrorMessage('Could not sign out');
      }
    };

    const handleGoToDetailUrl = async (newsUrl: string) => {
      Linking.openURL(newsUrl);
    };
    return {
      urlTermsOfService,
      urlPrivacyPolicy,
      handleLogout,
      handleGoToDetailUrl,
    };
  };
