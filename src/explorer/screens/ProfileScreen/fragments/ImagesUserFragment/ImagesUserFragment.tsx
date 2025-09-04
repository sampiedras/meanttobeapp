import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { PlusIcon } from "@/core/assets/svg";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { E_UserStackRoutes } from "@/user";
import { useViewModelProvider } from "../../ViewModelContext";

export const ImagesUserFragment = () => {
  const { navigate } = useNavigation();
  const { userProfile } = useAuthProvider();

  const { handleUpdateAvatar, handleDeleteImage } = useViewModelProvider();

  const [validateSelect, setValidateSelect] = useState<number | null>(null);

  const { Popover } = renderers;

  return (
    <View row center marginT-14>
      <View centerH>
        <View row>
          <FlatList
            data={userProfile?.mediaUrls}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <Menu
                renderer={Popover}
                rendererProps={{ preferredPlacement: "top" }}
                onBackdropPress={() => setValidateSelect(null)}
              >
                <MenuTrigger onPress={() => setValidateSelect(index)}>
                  <FastImage
                    key={index}
                    source={{
                      uri: item,
                      priority: FastImage.priority.normal,
                    }}
                    style={[
                      {
                        borderColor:
                          validateSelect === index
                            ? colorsLight.PRIMARY_COLOR
                            : colorsLight.WHITE,
                      },
                      styles.image,
                    ]}
                  />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                  <View row style={styles.containerMenu}>
                    {index > 0 && (
                      <MenuOption
                        disabled={item === userProfile?.avatar}
                        onSelect={() => {
                          handleUpdateAvatar(index);
                          setValidateSelect(null);
                        }}
                        text="Set main"
                        customStyles={{
                          optionText: {
                            color:
                              item === userProfile?.avatar
                                ? colorsLight.SECONDARY_TEXT_COLOR
                                : colorsLight.BLACK,
                          },
                        }}
                      />
                    )}
                    <MenuOption
                      disabled={item === userProfile?.avatar}
                      onSelect={() => {
                        handleDeleteImage(index);
                        setValidateSelect(null);
                      }}
                      text="Delete"
                      customStyles={{
                        optionText: {
                          color:
                            item === userProfile?.avatar
                              ? colorsLight.SECONDARY_TEXT_COLOR
                              : colorsLight.ERROR_COLOR,
                        },
                      }}
                    />
                  </View>
                </MenuOptions>
              </Menu>
            )}
            horizontal
          />
          {userProfile?.mediaUrls && userProfile?.mediaUrls?.length < 6 && (
            <View centerV>
              <TouchableOpacity
                onPress={() => navigate(E_UserStackRoutes.ADD_PHOTO)}
              >
                <PlusIcon />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    backgroundColor: colorsLight.GRAY_03,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 3,
  },
  menuOptionsStyles: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  containerMenu: {
    justifyContent: "space-between",
  },
});
