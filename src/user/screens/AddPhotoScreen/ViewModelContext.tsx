import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import to from "await-to-js";
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch } from "@/core/hooks/useRedux";
import { useUploadImage } from "@/core/hooks/useUploadImage";
import { setLoading, setLoadingText } from "@/core/slices/loadingSlice";
import { UserProfileType } from "@/core/types/AuthContextType";
import { UpdateUserImagesBodyType } from "@/user/data/remote/entities/userEntity";
import { useUpdateUserImagesMutation } from "@/user/data/remote/userApi";

export interface IImages {
  image1: Asset | null;
  image2: Asset | null;
  image3: Asset | null;
  image4: Asset | null;
  image5: Asset | null;
  image6: Asset | null;
}

type ViewModelContextType = {
  imagesSelected: IImages;
  addMorePhotos: boolean;
  userProfile: UserProfileType | null;
  imageSelect: Asset | null;
  deleteImage: (key: string) => Promise<void>;
  onButtonPress: (key: string) => Promise<void>;
  setAddMorePhotos: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveImage: () => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { goBack } = useNavigation();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();
  const dispatch = useAppDispatch();
  const { handleUpload } = useUploadImage();

  const [handleUpdateImagesApi] = useUpdateUserImagesMutation();

  const [addMorePhotos, setAddMorePhotos] = useState(false);
  const [imageSelect, setImageSelect] = useState<Asset | null>(null);
  const [imagesSelected, setImagesSelected] = useState<IImages>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
  });

  const onButtonPress = async (key: string) => {
    try {
      const imageResponse: ImagePickerResponse = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: "photo",
        includeBase64: true,
        includeExtra: true,
      });

      if (
        imageResponse &&
        imageResponse?.assets &&
        imageResponse.assets.length > 0
      ) {
        const selectedImage = imageResponse.assets[0];
        if (selectedImage?.base64) {
          try {
            const image: Asset | null = {
              ...selectedImage,
              base64: selectedImage.base64,
            };

            if (key === "main") {
              setImageSelect(image);
            } else {
              setImagesSelected((prevImages) => ({
                ...prevImages,
                [key]: image,
              }));
            }
          } catch (error) {
            Alert.alert(
              "Compression Error",
              "There was an error compressing the image.",
            );
          }
        } else {
          Alert.alert("Select image", "Please select another image");
        }
      }
    } catch (err) {
      Alert.alert("Select image", "Please select an image");
    }
  };

  const deleteImage = async (key: string) => {
    if (key === "main") {
      setImageSelect(null);
    } else {
      setImagesSelected((prevImages) => ({
        ...prevImages,
        [key]: null,
      }));
    }
  };

  const handleSaveImage = useCallback(async () => {
    try {
      await dispatch(setLoadingText("Uploading images..."));
      await dispatch(setLoading(true));

      const imgUrls: string[] = [];
      let avatarImage = "";

      if (imagesSelected.image1) {
        const resultImage1 = await handleUpload(
          {
            name: uuidv4(),
            type: imagesSelected.image1?.type || "",
            folder: "users",
          },
          imagesSelected.image1?.base64 || "",
        );
        imgUrls.push(resultImage1 || "");
        avatarImage = resultImage1 || "";
      } else {
        avatarImage = userProfile?.avatar || "";
        imgUrls.push(userProfile?.avatar || "");
      }

      if (imagesSelected.image2) {
        const [_error, resultImage2] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image2?.type || "",
              folder: "users",
            },
            imagesSelected.image2?.base64 || "",
          ),
        );
        if (resultImage2) {
          imgUrls.push(resultImage2);
        }
      } else {
        userProfile?.mediaUrls[1] &&
          imgUrls.push(userProfile?.mediaUrls[1] || "");
      }

      if (imagesSelected.image3) {
        const [_error, resultImage3] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image3?.type || "",
              folder: "users",
            },
            imagesSelected.image3?.base64 || "",
          ),
        );
        if (resultImage3) {
          imgUrls.push(resultImage3);
        }
      } else {
        userProfile?.mediaUrls[2] &&
          imgUrls.push(userProfile?.mediaUrls[2] || "");
      }

      if (imagesSelected.image4) {
        const [_error, resultImage4] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image4?.type || "",
              folder: "users",
            },
            imagesSelected.image4?.base64 || "",
          ),
        );
        if (resultImage4) {
          imgUrls.push(resultImage4);
        }
      } else {
        userProfile?.mediaUrls[3] &&
          imgUrls.push(userProfile?.mediaUrls[3] || "");
      }

      if (imagesSelected.image5) {
        const [_error, resultImage5] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image5?.type || "",
              folder: "users",
            },
            imagesSelected.image5?.base64 || "",
          ),
        );
        if (resultImage5) {
          imgUrls.push(resultImage5);
        }
      } else {
        userProfile?.mediaUrls[4] &&
          imgUrls.push(userProfile?.mediaUrls[4] || "");
      }

      if (imagesSelected.image6) {
        const [_error, resultImage6] = await to(
          handleUpload(
            {
              name: uuidv4(),
              type: imagesSelected.image6?.type || "",
              folder: "users",
            },
            imagesSelected.image6?.base64 || "",
          ),
        );
        if (resultImage6) {
          imgUrls.push(resultImage6);
        }
      } else {
        userProfile?.mediaUrls[5] &&
          imgUrls.push(userProfile?.mediaUrls[5] || "");
      }

      await dispatch(setLoadingText("Sending information..."));

      const body: UpdateUserImagesBodyType = {
        avatar: avatarImage,
        mediaUrls: imgUrls,
      };

      await handleUpdateImagesApi(body);
      await handleUserUpdateInfo();
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      Toast.show({
        type: "success",
        text1: "Images updated successfully",
        visibilityTime: 2000,
      });
      goBack();
    } catch (error) {
      await dispatch(setLoading(false));
      await dispatch(setLoadingText(""));
      Toast.show({
        type: "error",
        text1: "Error updating images",
        visibilityTime: 2000,
      });
    }
  }, [
    dispatch,
    goBack,
    handleUpdateImagesApi,
    handleUpload,
    handleUserUpdateInfo,
    imagesSelected.image1,
    imagesSelected.image2,
    imagesSelected.image3,
    imagesSelected.image4,
    imagesSelected.image5,
    imagesSelected.image6,
    userProfile?.avatar,
    userProfile?.mediaUrls,
  ]);

  return (
    <ViewModelContext.Provider
      value={{
        imageSelect,
        userProfile,
        addMorePhotos,
        imagesSelected,
        onButtonPress,
        deleteImage,
        setAddMorePhotos,
        handleSaveImage,
      }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
