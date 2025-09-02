import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {DeleteIcon} from '@/assets/svg';

interface IButtonDelete {
  onPress: () => void;
  isMain: boolean;
}

export const ButtonDelete = ({onPress, isMain}: IButtonDelete) => {
  return (
    <TouchableOpacity
      style={isMain ? styles.buttonDeleteMain : styles.buttonDeleteImages}
      onPress={onPress}>
      <DeleteIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonDeleteMain: {
    backgroundColor: colorsLight.WHITE,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
    padding: 10,
  },
  buttonDeleteImages: {
    backgroundColor: colorsLight.WHITE,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'center',
    top: 5,
    padding: 10,
    right: 5,
  },
});
