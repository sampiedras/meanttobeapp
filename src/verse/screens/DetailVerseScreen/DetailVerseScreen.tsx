import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { LogoHeartIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_VerseStackRoutes } from "@/verse";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailVerseContent =
  ({}: RootStackScreenProps<E_VerseStackRoutes.DETAIL_VERSE>) => {
    const { data, verseReference, isFetching } = useViewModelProvider();

    return (
      <View style={styles.container}>
        {isFetching ? (
          <MotiView
            transition={{
              type: "timing",
            }}
            style={styles.containerSkeleton}
            animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
          >
            <Skeleton colorMode="light" width="95%" height="90%" />
          </MotiView>
        ) : (
          <>
            <Text style={styles.title}>{verseReference?.reference}</Text>
            <FastImage
              source={{ uri: data?.shareImg || "" }}
              resizeMode="cover"
              style={styles.image}
            >
              <LinearGradient
                style={styles.imageShadow}
                colors={["rgba(31, 31, 35, 0.5)", "#000"]}
              >
                <View
                  style={[
                    styles.rowCenterVAbsT,
                    styles.appNameContainer,
                    styles.marginT32,
                  ]}
                >
                  <LogoHeartIcon />
                  <Text color={colorsLight.WHITE} style={styles.appName}>
                    Meant to be
                  </Text>
                </View>

                <Text color={colorsLight.WHITE} style={styles.verseName}>
                  {data?.name}
                </Text>
                <Text color={colorsLight.GRAY_05} style={styles.verseQuote}>
                  {verseReference?.reference}
                </Text>
              </LinearGradient>
            </FastImage>
          </>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  title: {
    fontSize: 24,
    color: colorsLight.BLACK,
    alignSelf: "center",
    marginVertical: 24,
    fontFamily: "Satoshi-Medium",
  },
  image: {
    width: "100%",
    height: 564,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageShadow: {
    padding: 32,
    width: "100%",
    height: 564,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  rowCenterVAbsT: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  marginT32: { marginTop: 32 },
  appNameContainer: {
    alignSelf: "center",
  },
  appName: {
    fontSize: 16,
    fontFamily: "Satoshi-Black",
    marginLeft: 12,
  },
  verseName: {
    fontSize: 24,
    fontFamily: "Satoshi-Black",
    marginBottom: 24,
  },
  verseQuote: {
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
});

export const DetailVerseScreen = (
  props: RootStackScreenProps<E_VerseStackRoutes.DETAIL_VERSE>,
) => (
  <ViewModelProvider id={props.route.params.id}>
    <DetailVerseContent {...props} />
  </ViewModelProvider>
);
