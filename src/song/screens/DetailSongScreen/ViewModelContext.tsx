import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform, Share, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { SongType } from "@/song/data/remote/entities/songEntity";
import { useGetSongByIdQuery } from "@/song/data/remote/songApi";

type ViewModelContextType = {
  isFetching: boolean;
  playing: boolean;
  videoId: string | null;
  data: SongType | undefined;
  handlePress: () => void;
  onStateChange: (state: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { setOptions } = useNavigation();
  const { data, isFetching } = useGetSongByIdQuery(id);

  const [playing, setPlaying] = useState(false);

  const handlePress = useCallback(() => {
    setPlaying(true);
  }, []);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );

    return videoIdMatch ? videoIdMatch[1] : null;
  };

  useEffect(() => {
    if (data) {
      setOptions({
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              Share.share({
                title: data.name,
                url: data.songUrl,
                message: `${
                  Platform.OS === "ios" ? data.name : `${data.songUrl}`
                }\n\n${
                  Platform.OS === "ios"
                    ? "https://apps.apple.com/co/app/meant-to-be/id6463029847"
                    : "https://play.google.com/store/apps/details?id=com.meanttobe&pli=1"
                }`,
              });
            }}
          >
            <Text color={colorsLight.PRIMARY_COLOR} style={styles.text}>
              Share
            </Text>
          </TouchableOpacity>
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const youTubeUrl = data?.songUrl || "";
  const videoId = getYouTubeVideoId(youTubeUrl);

  return (
    <ViewModelContext.Provider
      value={{ data, videoId, playing, isFetching, handlePress, onStateChange }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
    marginRight: Platform.OS === "ios" ? 18 : 16,
  },
});

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
