import {Button} from '@/components';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

export interface ButtonNavigationItem {
  id: number;
  title: string;
  route: any;
  color: string;
}

interface Props {
  item: ButtonNavigationItem;
}

export const RenderButtons = ({item}: Props) => {
  const {navigate} = useNavigation();
  return (
    <Button
      label={item.title}
      backgroundColor={item.color}
      borderRadius={8}
      width={101}
      onPress={() => navigate(item.route)}
      style={styles.btn}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 14,
    marginVertical: 28,
  },
});
