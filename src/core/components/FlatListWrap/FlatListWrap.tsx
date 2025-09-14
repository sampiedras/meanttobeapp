import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { colorsLight } from "@/core/theme";

const numColumns = 2;
const padding = 0;
const spacing = 16;

interface Props {
  dataItem: ArrayLike<any> | null | any;
  imageProperty: string;
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  ListEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  isLoading?: boolean | null | undefined;
  onPressNavigation?: ((item: string) => void) | undefined;
  refreshing?: (() => void) | null | undefined;
  onEndReached?:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  onEndReachedThreshold?: number | null | undefined;
}

export const FlatListWrap = ({
  dataItem,
  imageProperty,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  isLoading,
  onPressNavigation,
  refreshing,
  onEndReached,
  onEndReachedThreshold,
}: Props) => {
  const [image, setImage] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (dataItem) {
        const dataArray = Array.from(dataItem);
        const imageUrls: string[] = await Promise.all(
          dataArray.map(async (item: any) => {
            const signedURL = await item[imageProperty];
            return signedURL;
          }),
        );
        setImage(imageUrls);
      }
    };

    fetchImageUrls();
  }, [dataItem, imageProperty]);

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => onPressNavigation && onPressNavigation(item.id)}
        style={styles.itemContainer}
      >
        <View style={[styles.item, styles.flex1]}>
          <View style={[styles.imageContainer, styles.flex1]}>
            <FastImage
              style={styles.image}
              source={{
                uri: image[index] || "",
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <LinearGradient
              style={styles.shadowOverlay}
              colors={["rgba(0, 0, 0, 0.6)", "transparent"]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.6 }}
            />
          </View>
          <View
            style={[styles.textContainer, styles.paddingV4, styles.paddingH8]}
          >
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, styles.flex1]}>
      <FlatList
        refreshing={isLoading}
        onRefresh={refreshing}
        data={dataItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding,
  },
  flex1: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    margin: spacing / 2,
  },
  item: {
    height: 155,
    borderRadius: 24,
    position: "relative",
  },
  imageContainer: {
    borderRadius: 24,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  shadowOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  paddingV4: {
    paddingVertical: 4,
  },
  paddingH8: {
    paddingHorizontal: 8,
  },
  text: {
    color: colorsLight.WHITE,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Satoshi-Bold",
  },
});
