import {
  useDeleteUserMediaMutation,
  useGetUserMediaQuery,
  useUpdateAvatarUserMutation,
  useUpdateUserMediaMutation,
} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {useUploadImageToS3} from '@/hooks/useUpload';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import * as ImagePicker from 'react-native-image-picker';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useNavigation} from '@react-navigation/native';

const urlCloudFront = 'https://cdn.meanttobe.app/public';

/**
 * Hook to handle user media screen actions.
 */
export const useActionsUserMedia = () => {
  const {user, checkUserIsAuth} = useAuthProvider();
  const {data: dataUserMedia, refetch: refetchUserMedia} =
    useGetUserMediaQuery();
  const [updateUserMedia] = useUpdateUserMediaMutation();
  const [allImages, setAllImages] = useState<any[]>([]);
  const [updateAvatar] = useUpdateAvatarUserMutation();
  const [deleteUserMedia] = useDeleteUserMediaMutation();
  const [avatar, setAvatar] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const {showSuccessMessage, showErrorMessage} = userAlertMessage();
  const {handleUpload} = useUploadImageToS3();
  const navigation = useNavigation();
  /**
   * Fetches image URLs from the user's media data and updates the state.
   * @function
   * @async
   */
  const fetchImageUrls = async () => {
    const imageUrls = [];
    const imageHashes: {id: number; image: string}[] = [];
    for (const media of dataUserMedia?.userMedias || []) {
      const imageUrl = media.image;

      imageUrls.push({
        url: imageUrl,
        id: media.id,
        isMain: media.isMain,
      });
      imageHashes.push(media);
    }
    setAllImages(imageUrls);
  };

  /**
   * Effect to check user authentication status and refetch user media data on mount.
   * @effect
   */
  useEffect(() => {
    checkUserIsAuth();
    refetchUserMedia();
  }, []);

  /**
   * Effect to refetch user media data and fetch image URLs when the screen gains focus.
   * @effect
   */
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      refetchUserMedia();
      fetchImageUrls();
    });

    return focusListener;
  }, [navigation, refetchUserMedia, checkUserIsAuth]);

  /**
   * Effect to fetch image URLs on initial load and when user media data changes.
   * @effect
   */
  useEffect(() => {
    fetchImageUrls();
  }, [dataUserMedia?.userMedias, user?.userMedias]);

  /**
   * Effect to fetch and set the user's avatar URL.
   * @effect
   */
  useEffect(() => {
    async function fetchAsyncData() {
      const signedURL = dataUserMedia?.avatar || '';
      setAvatar(signedURL);
    }
    fetchAsyncData();
  }, [dataUserMedia, user?.avatar, user]);

  /**
   * Handles the update of the user's avatar based on the selected image index.
   * @param {number} index - The index of the selected image in the 'allImages' array.
   */
  const handleUpdateAvatar = async (index: number) => {
    const selectedImage = allImages[index];
    const {id, url} = selectedImage;

    if (selectedImage) {
      try {
        await updateAvatar({avatar: url, idUserMedia: id});
        showSuccessMessage('Updated avatar successfully');
        refetchUserMedia();
      } catch (error) {
        showErrorMessage('An error occurred while updating the avatar');
      }
    } else {
      showErrorMessage('An error occurred while updating the avatar');
      Alert.alert('Error', 'The image to update the avatar could not be found');
    }
  };

  /**
   * Opens the image gallery, allows the user to select images, compresses and uploads them to S3,
   * and updates the user's media data.
   */

  const selectNewImages = async () => {
    try {
      setIsLoadingImage(true);

      const options: ImagePicker.ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: true,
      };

      ImagePicker.launchImageLibrary(options, async response => {
        if (
          !response?.didCancel &&
          !response?.errorMessage &&
          response?.assets
        ) {
          const imageAsset = response.assets[0];
          if (imageAsset?.base64) {
            const imageType = imageAsset.type || '';
            try {
              const fileName = `user/${user?.id}/profile/${uuidv4()}.${
                imageType.split('/')[1]
              }`;

              await handleUpload(
                fileName,
                imageType,
                imageAsset.base64,
                'public',
              );

              const urlToSaveInDataBase = `${urlCloudFront}/${fileName}`;

              await updateUserMedia([urlToSaveInDataBase]);

              showSuccessMessage('Updated images successfully');
              refetchUserMedia();
              checkUserIsAuth();
              setAllImages(prevImages => [...prevImages, imageAsset.uri]);
            } catch (error) {
              showErrorMessage('The image could not be uploaded to S3');
            } finally {
              setIsLoadingImage(false);
            }
          } else {
            Alert.alert('Select image', 'Please select another image');
            setIsLoadingImage(false);
          }
        } else {
          Alert.alert('Image selection canceled or there was an error');
          setIsLoadingImage(false);
        }
      });
    } catch (error) {
      Alert.alert('Select image', 'Please select an image');
      setIsLoadingImage(false);
    }
  };

  /**
   * Deletes an image based on its index in the 'allImages' array.
   * @param {number} index - The index of the image to be deleted.
   */
  const deleteImageByIndex = async (index: number) => {
    try {
      const userMedias = dataUserMedia?.userMedias;

      if (index >= 0 && index < allImages.length) {
        const imageToDelete = userMedias?.[index];
        const imageIdToDelete = imageToDelete?.id;

        const matchingMedia = userMedias?.find(
          media => media.id === imageIdToDelete,
        );

        const idToDelete = matchingMedia?.id || 0;

        await deleteUserMedia(idToDelete);
        showSuccessMessage('Delete image successfully');
        refetchUserMedia();
        checkUserIsAuth();
      } else {
        Alert.alert('Error', 'Invalid image index');
      }
    } catch (error) {
      showErrorMessage('can not delete image');
    }
  };

  return {
    allImages,
    avatar,
    isLoadingImage,
    selectNewImages,
    handleUpdateAvatar,
    deleteImageByIndex,
    refetchUserMedia,
  };
};
