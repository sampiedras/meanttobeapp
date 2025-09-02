import {useEffect, useState} from 'react';
import {
  useDeleteUserMediaMutation,
  useGetUserMediaQuery,
  useUpdateUserMediaMutation,
} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';
import {useUploadImageToS3} from '@/hooks/useUpload';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {v4 as uuidv4} from 'uuid';
import {Alert} from 'react-native';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';

export interface IImages {
  [key: string]: Asset | any | null;
  image1: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
  image2: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
  image3: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
  image4: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
  image5: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
  image6: (Asset & {image: string; idRemote: number; isMain: boolean}) | null;
}

export const useActionsAddPhotos = (
  props: RootStackScreenProps<RootStackRoutes.ADD_PHOTO>,
) => {
  const {navigation} = props;
  const {user, checkUserIsAuth} = useAuthProvider();
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const {handleUpload} = useUploadImageToS3();
  const {data: userMedia, refetch: refetchUserMedia} = useGetUserMediaQuery();
  const [handleUpdateUserMedias] = useUpdateUserMediaMutation();
  const [deleteUserMedia] = useDeleteUserMediaMutation();

  const [loading, setLoading] = useState(false);
  const [imagesSelected, setImagesSelected] = useState<IImages>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
  });
  const [deletedImageIds, setDeletedImageIds] = useState<any>([]);

  useEffect(() => {
    fetchAsyncImages();
  }, [userMedia?.userMedias]);

  async function fetchAsyncImages() {
    if (userMedia?.userMedias && userMedia?.userMedias?.length > 0) {
      userMedia?.userMedias.map(async (img, index) => {
        setImagesSelected(prev => ({
          ...prev,
          [`image${index + 1}`]: {
            idRemote: img.id,
            uri: img.image,
            remote: true,
            image: img.image,
            isMain: img.isMain,
          },
        }));
      });
    }
  }

  const onButtonPress = async (key: string) => {
    try {
      const image: ImagePickerResponse = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra: true,
      });

      if (image && image?.assets && image.assets.length > 0) {
        const selectedImage = image.assets[0];
        if (selectedImage?.base64) {
          const images: Asset | null = {
            ...selectedImage,
            ...imagesSelected[key],
            base64: selectedImage.base64,
          };

          setImagesSelected(prevImages => ({
            ...prevImages,
            [key]: images,
          }));
        } else {
          Alert.alert('Select image', 'Please select another image');
        }
      }
    } catch (err) {
      Alert.alert('Select image', 'Please select an image');
    }
  };

  const deleteImageById = async (idRemote: number) => {
    try {
      if (idRemote) {
        const updatedImages = {...imagesSelected};
        for (let key in updatedImages) {
          if (updatedImages[key]?.idRemote === idRemote) {
            updatedImages[key] = null;
          }
        }
        setImagesSelected(updatedImages);
        setDeletedImageIds([...deletedImageIds, idRemote]);
      } else {
        Alert.alert('Error', 'Imagen no válida');
      }
    } catch (error) {
      showErrorMessage('Error al eliminar la imagen');
    }
  };

  const handleSaveInfo = async () => {
    try {
      setLoading(true);
      if (deletedImageIds) {
        for (const idRemote of deletedImageIds) {
          await deleteUserMedia(idRemote);
        }
      }
      const img1 = imagesSelected.image1?.base64
        ? `${uuidv4()}.${
            imagesSelected.image1?.type
              ? imagesSelected.image1?.type.split('/')[1]
              : ''
          }`
        : null;

      const img2 = imagesSelected.image2?.base64
        ? `${uuidv4()}.${
            imagesSelected.image2.type
              ? imagesSelected.image2.type.split('/')[1]
              : ''
          }`
        : null;

      const img3 = imagesSelected.image3?.base64
        ? `${uuidv4()}.${
            imagesSelected.image3.type
              ? imagesSelected.image3.type.split('/')[1]
              : ''
          }`
        : null;

      const img4 = imagesSelected.image4?.base64
        ? `${uuidv4()}.${
            imagesSelected.image4.type
              ? imagesSelected.image4.type.split('/')[1]
              : ''
          }`
        : null;

      const img5 = imagesSelected.image5?.base64
        ? `${uuidv4()}.${
            imagesSelected.image5.type
              ? imagesSelected.image5.type.split('/')[1]
              : ''
          }`
        : null;

      const img6 = imagesSelected.image6?.base64
        ? `${uuidv4()}.${
            imagesSelected.image6.type
              ? imagesSelected.image6.type.split('/')[1]
              : ''
          }`
        : null;

      const imgUrls: any = [];
      if (img1) {
        if (!imagesSelected?.image1?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img1}`,
            imagesSelected.image1?.type || '',
            imagesSelected.image1?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img1}`,
          );
        } else {
          const img1Update = imagesSelected.image1?.base64
            ? `${uuidv4()}.${
                imagesSelected.image1?.type
                  ? imagesSelected.image1?.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img1Update}`,
            imagesSelected.image1?.type || '',
            imagesSelected.image1?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image1.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img1Update}`,
          });
        }
      }
      if (img2) {
        if (!imagesSelected?.image2?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img2}`,
            imagesSelected.image2?.type || '',
            imagesSelected.image2?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img2}`,
          );
        } else {
          const img2Update = imagesSelected.image2?.base64
            ? `${uuidv4()}.${
                imagesSelected.image2.type
                  ? imagesSelected.image2.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img2Update}`,
            imagesSelected.image2?.type || '',
            imagesSelected.image2?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image2.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img2Update}`,
          });
        }
      }
      if (img3) {
        if (!imagesSelected?.image3?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img3}`,
            imagesSelected.image3?.type || '',
            imagesSelected.image3?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img3}`,
          );
        } else {
          const img3Update = imagesSelected.image3?.base64
            ? `${uuidv4()}.${
                imagesSelected.image3.type
                  ? imagesSelected.image3.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img3Update}`,
            imagesSelected.image3?.type || '',
            imagesSelected.image3?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image3.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img3Update}`,
          });
        }
      }
      if (img4) {
        if (!imagesSelected?.image4?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img4}`,
            imagesSelected.image4?.type || '',
            imagesSelected.image4?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img4}`,
          );
        } else {
          const img4Update = imagesSelected.image4?.base64
            ? `${uuidv4()}.${
                imagesSelected.image4.type
                  ? imagesSelected.image4.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img4Update}`,
            imagesSelected.image4?.type || '',
            imagesSelected.image4?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image4.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img4Update}`,
          });
        }
      }
      if (img5) {
        if (!imagesSelected?.image5?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img5}`,
            imagesSelected.image5?.type || '',
            imagesSelected.image5?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img5}`,
          );
        } else {
          const img5Update = imagesSelected.image5?.base64
            ? `${uuidv4()}.${
                imagesSelected.image5.type
                  ? imagesSelected.image5.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img5Update}`,
            imagesSelected.image5?.type || '',
            imagesSelected.image5?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image5.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img5Update}`,
          });
        }
      }
      if (img6) {
        if (!imagesSelected?.image6?.idRemote) {
          await handleUpload(
            `user/${user?.id}/profile/${img6}`,
            imagesSelected.image6?.type || '',
            imagesSelected.image6?.base64 || '',
            'public',
          );
          imgUrls.push(
            `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img6}`,
          );
        } else {
          const img6Update = imagesSelected.image6?.base64
            ? `${uuidv4()}.${
                imagesSelected.image6.type
                  ? imagesSelected.image6.type.split('/')[1]
                  : ''
              }`
            : null;

          await handleUpload(
            `user/${user?.id}/profile/${img6Update}`,
            imagesSelected.image6?.type || '',
            imagesSelected.image6?.base64 || '',
            'public',
          );

          imgUrls.push({
            id: imagesSelected.image6.idRemote,
            img: `https://cdn.meanttobe.app/public/user/${user?.id}/profile/${img6Update}`,
          });
        }
      }
      await handleUpdateUserMedias(imgUrls);
      showSuccessMessage('Updated images successfully');
      refetchUserMedia();
      setLoading(false);
      checkUserIsAuth();
      navigation.pop();
    } catch (error) {
      showErrorMessage('Error updating images');
    }
  };

  return {
    user,
    imagesSelected,
    handleSaveInfo,
    setImagesSelected,
    onButtonPress,
    deleteImageById,
    loading,
  };
};
