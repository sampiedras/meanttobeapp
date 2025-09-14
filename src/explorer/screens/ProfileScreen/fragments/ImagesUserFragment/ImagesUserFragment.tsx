import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
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
    <View style={[styles.row, styles.center, styles.marginT14]}>
      <View style={styles.centerH}>
        <View style={styles.row}>
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
                  <View style={[styles.row, styles.containerMenu]}>
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
            <View style={styles.centerV}>
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
  row: { flexDirection: "row" },
  center: { alignItems: "center", justifyContent: "center" },
  marginT14: { marginTop: 14 },
  centerH: { alignItems: "center" },
  centerV: { alignItems: "center", justifyContent: "center" },
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
