import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import {
  DetailArtistScreen,
  DetailSongGenreScreen,
  DetailSongScreen,
  SongsScreen,
} from ".";

export enum E_SongStackRoutes {
  SONGS = "SONGS",
  DETAIL_SONG = "DETAIL_SONG",
  DETAIL_ARTIST = "DETAIL_ARTIST",
  DETAIL_SONG_GENRE = "DETAIL_SONG_GENRE",
}

export const useSongGroupScreens = () => {
  return useMemo(() => {
    const SongGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_SongStackRoutes.DETAIL_SONG}
          component={DetailSongScreen}
          options={({ navigation }) => ({
            title: "Details",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Satoshi-Bold",
              fontSize: 17,
              color: colorsLight.BLACK,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon style={styles.marginIcon} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name={E_SongStackRoutes.SONGS}
          component={SongsScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.rowCenter}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name={E_SongStackRoutes.DETAIL_ARTIST}
          component={DetailArtistScreen}
          options={({ navigation }) => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.rowCenter}
              >
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name={E_SongStackRoutes.DETAIL_SONG_GENRE}
          component={DetailSongGenreScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.rowCenter}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Genres</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    SongGroupScreens.displayName = "SongGroupScreens";
    return SongGroupScreens;
  }, []);
};

const styles = StyleSheet.create({
  marginIcon: {
    marginLeft: 10,
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
});
