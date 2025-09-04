import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/core/components";

export interface ButtonNavigationItem {
  id: number;
  title: string;
  route: any;
  color: string;
}

export interface IListButtonEntity {
  id: number;
  title: string;
  route: string;
  color: string;
}

type RenderButtonFragmentType = {
  item: ButtonNavigationItem;
};

export const RenderButtonFragment = ({ item }: RenderButtonFragmentType) => {
  const { navigate } = useNavigation();
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
