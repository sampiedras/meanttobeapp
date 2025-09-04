import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { IconSelectImage, IconSelectImageTwo } from "@/core/assets/svg";
import { AppContainerSafeArea, AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user";
import { ButtonDeleteFragment } from "./fragments/ButtonDeleteFragment";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const AddPhotoContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.ADD_PHOTO>) => {
    const {
      userProfile,
      imagesSelected,
      onButtonPress,
      deleteImage,
      handleSaveImage,
    } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <ScrollView style={styles.container}>
          <View flex-1 centerH>
            <Text variant="h6" style={styles.title}>
              Add you first photo
            </Text>
            <View width="70%">
              <Text variant="caption" style={styles.text}>
                The first impression always gives a boom! upload your best photo
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => onButtonPress("image1")}
            >
              {userProfile?.avatar || imagesSelected.image1 ? (
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image1?.base64
                        ? `data:image/png;base64,${imagesSelected.image1?.base64}`
                        : userProfile?.avatar,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.imagePreview}
                  >
                    {userProfile?.avatar && imagesSelected.image1 && (
                      <ButtonDeleteFragment
                        onPress={() => deleteImage("image1")}
                        isMain
                      />
                    )}
                  </FastImage>
                </View>
              ) : (
                <IconSelectImage />
              )}
            </TouchableOpacity>

            {(userProfile?.avatar ||
              imagesSelected.image1 ||
              imagesSelected.image2 ||
              imagesSelected.image3) && (
              <View row centerV spread marginT-4 width="100%">
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => onButtonPress("image1")}
                >
                  {userProfile?.avatar || imagesSelected.image1 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: imagesSelected.image1?.base64
                            ? `data:image/png;base64,${imagesSelected.image1?.base64}`
                            : userProfile?.avatar,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        {userProfile?.avatar && imagesSelected.image1 && (
                          <ButtonDeleteFragment
                            onPress={() => deleteImage("image1")}
                            isMain={false}
                          />
                        )}
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
                  {(userProfile?.mediaUrls && userProfile.mediaUrls[1]) ||
                  imagesSelected.image2 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: imagesSelected.image2?.base64
                            ? `data:image/png;base64,${imagesSelected.image2?.base64}`
                            : userProfile?.mediaUrls[1],
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        {imagesSelected.image2 && (
                          <ButtonDeleteFragment
                            isMain={false}
                            onPress={() => deleteImage("image2")}
                          />
                        )}
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
                  {(userProfile?.mediaUrls && userProfile.mediaUrls[2]) ||
                  imagesSelected.image3 ? (
                    <View style={styles.boxImageSecondary}>
                      <FastImage
                        source={{
                          uri: imagesSelected.image3?.base64
                            ? `data:image/png;base64,${imagesSelected.image3?.base64}`
                            : userProfile?.mediaUrls[2],
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.imagePreviewSecondary}
                      >
                        {imagesSelected.image3 && (
                          <ButtonDeleteFragment
                            isMain={false}
                            onPress={() => deleteImage("image3")}
                          />
                        )}
                      </FastImage>
                    </View>
                  ) : (
                    <IconSelectImageTwo />
                  )}
                </TouchableOpacity>
              </View>
            )}

            <>
              {(userProfile?.mediaUrls[2] ||
                imagesSelected.image1 ||
                imagesSelected.image2 ||
                imagesSelected.image3 ||
                imagesSelected.image4 ||
                imagesSelected.image5 ||
                imagesSelected.image6) && (
                <View row centerV spread marginT-16 width="100%">
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => onButtonPress("image4")}
                  >
                    {(userProfile?.mediaUrls && userProfile.mediaUrls[3]) ||
                    imagesSelected.image4 ? (
                      <View style={styles.boxImageSecondary}>
                        <FastImage
                          source={{
                            uri: imagesSelected.image4?.base64
                              ? `data:image/png;base64,${imagesSelected.image4?.base64}`
                              : userProfile?.mediaUrls[3],
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.imagePreviewSecondary}
                        >
                          {imagesSelected.image4 && (
                            <ButtonDeleteFragment
                              isMain={false}
                              onPress={() => deleteImage("image4")}
                            />
                          )}
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
                    {(userProfile?.mediaUrls && userProfile.mediaUrls[4]) ||
                    imagesSelected.image5 ? (
                      <View style={styles.boxImageSecondary}>
                        <FastImage
                          source={{
                            uri: imagesSelected.image5?.base64
                              ? `data:image/png;base64,${imagesSelected.image5?.base64}`
                              : userProfile?.mediaUrls[4],
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.imagePreviewSecondary}
                        >
                          {imagesSelected.image5 && (
                            <ButtonDeleteFragment
                              isMain={false}
                              onPress={() => deleteImage("image5")}
                            />
                          )}
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
                    {(userProfile?.mediaUrls && userProfile.mediaUrls[5]) ||
                    imagesSelected.image6 ? (
                      <View style={styles.boxImageSecondary}>
                        <FastImage
                          source={{
                            uri: imagesSelected.image6?.base64
                              ? `data:image/png;base64,${imagesSelected.image6?.base64}`
                              : userProfile?.mediaUrls[5],
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.imagePreviewSecondary}
                        >
                          {imagesSelected.image6 && (
                            <ButtonDeleteFragment
                              isMain={false}
                              onPress={() => deleteImage("image6")}
                            />
                          )}
                        </FastImage>
                      </View>
                    ) : (
                      <IconSelectImageTwo />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </>
          </View>
        </ScrollView>
        <View marginV-20 marginH-16>
          <AppGradientButton
            // loading={loading}
            label="Save changes"
            onPress={handleSaveImage}
            height={54}
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
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
});

export const AddPhotoScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.ADD_PHOTO>,
) => (
  <ViewModelProvider>
    <AddPhotoContent {...props} />
  </ViewModelProvider>
);
