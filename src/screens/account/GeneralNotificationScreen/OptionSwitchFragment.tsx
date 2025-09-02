import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import {Switch, View} from 'react-native-ui-lib';

interface option {
  title: string;
}

export const OptionSwitchFragment: React.FC<option> = props => {
  const [enable, setEnable] = useState(false);
  const handleSetEnable = () => {
    setEnable(!enable);
  };

  return (
    <View height={44} row spread centerV marginB-16>
      <Text style={styles.title}>{props.title}</Text>
      <Switch
        onColor={colorsLight.PRIMARY_COLOR}
        value={enable}
        onValueChange={handleSetEnable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
})
