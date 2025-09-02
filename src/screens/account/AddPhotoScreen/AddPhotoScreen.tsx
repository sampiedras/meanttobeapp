import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';
import {useActionsAddPhotos} from './useActions';
import {addPhotoScreenCopies} from '@/utils/copies';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {ContainerSafeArea, GradientButton} from '@/components';
import FastImage from 'react-native-fast-image';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {IconSelectImageTwo} from '@/assets/svg';

export const AddPhotoScreen = (
  props: RootStackScreenProps<RootStackRoutes.ADD_PHOTO>,
) => {
  const {
    imagesSelected,
    handleSaveInfo,
    onButtonPress,
    deleteImageById,
    loading,
  } = useActionsAddPhotos(props);

  const {Popover} = renderers;

  return (
    <ContainerSafeArea style={styles.container}>
      <View flex-1 centerH paddingH-16>
        <Text variant="h6" style={styles.title}>
          {addPhotoScreenCopies.title}
        </Text>
        <View width="70%">
          <Text variant="caption" style={styles.text}>
            {addPhotoScreenCopies.subtitle}
          </Text>
        </View>

        <View row centerV spread marginT-16 width="100%">
          {imagesSelected.image1 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image1?.base64
                        ? `data:image/png;base64,${imagesSelected.image1?.base64}`
                        : imagesSelected.image1.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image1.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image1');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image1.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image1.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image1?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image1.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image1')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
          {imagesSelected.image2 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image2?.base64
                        ? `data:image/png;base64,${imagesSelected.image2?.base64}`
                        : imagesSelected.image2.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image2.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image2');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image2.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image2.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image2?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image2.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image2')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
          {imagesSelected.image3 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image3?.base64
                        ? `data:image/png;base64,${imagesSelected.image3?.base64}`
                        : imagesSelected.image3.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image3.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image3');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image3.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image3.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image3?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image3.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image3')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
        </View>
        <View row centerV spread marginT-16 width="100%">
          {imagesSelected.image4 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image4.base64
                        ? `data:image/png;base64,${imagesSelected.image4.base64}`
                        : imagesSelected.image4.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image4.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image4');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image4.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image4.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image4?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image4.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image4')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
          {imagesSelected.image5 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image5?.base64
                        ? `data:image/png;base64,${imagesSelected.image5?.base64}`
                        : imagesSelected.image5.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image5.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image5');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image5.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image5.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image5?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image5.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image5')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
          {imagesSelected.image6 ? (
            <Menu
              renderer={Popover}
              rendererProps={{preferredPlacement: 'top'}}>
              <MenuTrigger>
                <View style={styles.boxImage}>
                  <FastImage
                    source={{
                      uri: imagesSelected.image6?.base64
                        ? `data:image/png;base64,${imagesSelected.image6?.base64}`
                        : imagesSelected.image6.uri,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                <View row style={styles.containerMenu}>
                  <MenuOption
                    disabled={imagesSelected.image6.isMain ? true : false}
                    onSelect={() => {
                      onButtonPress('image6');
                    }}
                    text="Change"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image6.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.BLACK,
                      },
                    }}
                  />
                  <MenuOption
                    disabled={imagesSelected.image6.isMain ? true : false}
                    onSelect={() => {
                      const id = imagesSelected.image6?.idRemote || 0;
                      deleteImageById(id);
                    }}
                    text="Delete"
                    customStyles={{
                      optionText: {
                        color: imagesSelected.image6.isMain
                          ? colorsLight.SECONDARY_TEXT_COLOR
                          : colorsLight.ERROR_COLOR,
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity onPress={() => onButtonPress('image6')}>
              <IconSelectImageTwo />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View marginH-16 marginB-20>
        <GradientButton
          loading={loading}
          label="Save changes"
          onPress={handleSaveInfo}
          height={54}
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  text: {
    marginVertical: 24,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  boxImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 16,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  menuOptionsStyles: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  containerMenu: {
    justifyContent: 'space-between',
  },
});
