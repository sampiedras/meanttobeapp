import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
} from "react-native-image-picker";
import { IconSelectImage, IconSelectImageTwo } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";
import { ButtonDeleteFragment } from "./ButtonDeleteFragment";

export const ViewPhotoFragment = () => {
  const { imagesSelected, setImageSelect, setImagesSelected } =
    useViewModelProvider();

  const [addMorePhotos, setAddMorePhotos] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 2MB, por ejemplo
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 1024;
  const QUALITY = 0.7;

  const onButtonPress = async (key: string) => {
    try {
      const imageResponse: ImagePickerResponse = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: "photo",
        includeBase64: true,
        includeExtra: true,
        maxWidth: MAX_WIDTH,
        maxHeight: MAX_HEIGHT,
        quality: QUALITY,
      });

      if (
        imageResponse &&
        imageResponse?.assets &&
        imageResponse.assets.length > 0
      ) {
        const selectedImage = imageResponse.assets[0];

        if (selectedImage?.fileSize && selectedImage.fileSize > MAX_FILE_SIZE) {
          Alert.alert(
            "Imagen demasiado grande",
            `La imagen seleccionada excede los ${
              MAX_FILE_SIZE / (1024 * 1024)
            } MB. Por favor selecciona otra.`,
          );
          return;
        }

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flex1CenterH}>
        <Text variant="h6" style={styles.title}>
          Add you first photo
        </Text>
        <View style={styles.w70}>
          <Text variant="caption" style={styles.text}>
            The first impression always gives a boom! upload your best photo
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onButtonPress("image1")}
        >
          {imagesSelected.image1 ? (
            <View style={styles.boxImage}>
              <FastImage
                source={{
                  uri: `data:image/png;base64,${imagesSelected.image1?.base64}`,
                  priority: FastImage.priority.normal,
                }}
                style={styles.imagePreview}
              >
                <ButtonDeleteFragment
                  onPress={() => deleteImage("image1")}
                  isMain
                />
              </FastImage>
            </View>
          ) : (
            <IconSelectImage />
          )}
        </TouchableOpacity>

        {(imagesSelected.image1 ||
          imagesSelected.image2 ||
          imagesSelected.image3) && (
          <View style={[styles.rowCenterVSpread, styles.marginT4, styles.w100]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onButtonPress("image1")}
            >
              {imagesSelected.image1 ? (
                <View style={styles.boxImageSecondary}>
                  <FastImage
                    source={{
                      uri: `data:image/png;base64,${imagesSelected.image1?.base64}`,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.imagePreviewSecondary}
                  >
                    <ButtonDeleteFragment
                      onPress={() => deleteImage("image1")}
                      isMain={false}
                    />
                  </FastImage>
                </View>
              ) : (
                <IconSelectImageTwo />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onButtonPress("image2")}
            >
              {imagesSelected.image2 ? (
                <View style={styles.boxImageSecondary}>
                  <FastImage
                    source={{
                      uri: `data:image/png;base64,${imagesSelected.image2?.base64}`,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.imagePreviewSecondary}
                  >
                    <ButtonDeleteFragment
                      isMain={false}
                      onPress={() => deleteImage("image2")}
                    />
                  </FastImage>
                </View>
              ) : (
                <IconSelectImageTwo />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onButtonPress("image3")}
            >
              {imagesSelected.image3 ? (
                <View style={styles.boxImageSecondary}>
                  <FastImage
                    source={{
                      uri: `data:image/png;base64,${imagesSelected.image3?.base64}`,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.imagePreviewSecondary}
                  >
                    <ButtonDeleteFragment
                      isMain={false}
                      onPress={() => deleteImage("image3")}
                    />
                  </FastImage>
                </View>
              ) : (
                <IconSelectImageTwo />
              )}
            </TouchableOpacity>
          </View>
        )}

        {imagesSelected.image1 && !addMorePhotos && (
          <TouchableOpacity
            style={styles.buttonMore}
            onPress={() => setAddMorePhotos(true)}
          >
            <Text
              variant="body1"
              color={colorsLight.GRAY_03}
              style={styles.textMore}
            >
              Add more photos
            </Text>
          </TouchableOpacity>
        )}

        {addMorePhotos && (
          <>
            {(imagesSelected.image1 ||
              imagesSelected.image2 ||
              imagesSelected.image3 ||
              imagesSelected.image4 ||
              imagesSelected.image5 ||
              imagesSelected.image6) && (
              <View
                style={[styles.rowCenterVSpread, styles.marginT16, styles.w100]}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => onButtonPress("image4")}
                >
                  {imagesSelected.image4 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: `data:image/png;base64,${imagesSelected.image4?.base64}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        <ButtonDeleteFragment
                          isMain={false}
                          onPress={() => deleteImage("image4")}
                        />
                      </FastImage>
                    </View>
                  ) : (
                    <IconSelectImageTwo />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => onButtonPress("image5")}
                >
                  {imagesSelected.image5 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: `data:image/png;base64,${imagesSelected.image5?.base64}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        <ButtonDeleteFragment
                          isMain={false}
                          onPress={() => deleteImage("image5")}
                        />
                      </FastImage>
                    </View>
                  ) : (
                    <IconSelectImageTwo />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => onButtonPress("image6")}
                >
                  {imagesSelected.image6 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: `data:image/png;base64,${imagesSelected.image6?.base64}`,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        <ButtonDeleteFragment
                          isMain={false}
                          onPress={() => deleteImage("image6")}
                        />
                      </FastImage>
                    </View>
                  ) : (
                    <IconSelectImageTwo />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  flex1CenterH: { flex: 1, alignItems: "center" },
  w70: { width: "70%" },
  rowCenterVSpread: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  marginT4: { marginTop: 4 },
  w100: { width: "100%" },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  text: {
    marginVertical: 24,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  btn: {
    marginTop: 8,
  },
  boxImage: {
    width: 173,
    height: 173,
    borderRadius: 100,
  },
  boxImageSecondary: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  imagePreview: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 100,
  },
  imagePreviewSecondary: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 16,
  },
  buttonMore: {
    marginTop: 20,
  },
  marginT16: { marginTop: 16 },
  textMore: {
    textDecorationLine: "underline",
    fontFamily: "Satoshi-Medium",
  },
});
