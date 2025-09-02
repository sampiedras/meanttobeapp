import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {useActionsUserMedia} from './useActionsUserMedia';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {PlusIcon} from '@/assets/svg';

export const ImagesUser = () => {
  const {
    allImages,
    isLoadingImage,
    selectNewImages,
    handleUpdateAvatar,
    deleteImageByIndex,
  } = useActionsUserMedia();
  const [validateSelect, setValidateSelect] = useState<number | null>(null);
  const {Popover} = renderers;

  return (
    <View row center marginT-14>
      <View centerH>
        <View row>
          <FlatList
            data={allImages}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <Menu
                renderer={Popover}
                rendererProps={{preferredPlacement: 'top'}}
                onBackdropPress={() => setValidateSelect(null)}>
                <MenuTrigger onPress={() => setValidateSelect(index)}>
                  <FastImage
                    key={index}
                    source={{
                      uri: item.url,
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
                    <MenuOption
                      disabled={item.isMain ? true : false}
                      onSelect={() => {
                        handleUpdateAvatar(index);
                        setValidateSelect(null);
                      }}
                      text="Set main"
                      customStyles={{
                        optionText: {
                          color: item.isMain
                            ? colorsLight.SECONDARY_TEXT_COLOR
                            : colorsLight.BLACK,
                        },
                      }}
                    />
                    <MenuOption
                      disabled={item.isMain ? true : false}
                      onSelect={() => {
                        deleteImageByIndex(index);
                        setValidateSelect(null);
                      }}
                      text="Delete"
                      customStyles={{
                        optionText: {
                          color: item.isMain
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
          {allImages.length < 6 && (
            <View centerV>
              {isLoadingImage ? (
                <ActivityIndicator color={colorsLight.WHITE} size={34} />
              ) : (
                <TouchableOpacity onPress={selectNewImages}>
                  <PlusIcon />
                </TouchableOpacity>
              )}
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
  text: {
    fontSize: 16,
  },
  menuOptionsStyles: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  containerMenu: {
    justifyContent: 'space-between',
  },
});
