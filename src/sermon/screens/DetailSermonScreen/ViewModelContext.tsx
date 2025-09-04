import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { SermonType } from "@/sermon/data/remote/entities/sermonEntity";
import { useGetSermonByIdQuery } from "@/sermon/data/remote/sermonApi";

type ViewModelContextType = {
  playing: boolean;
  isFetching: boolean;
  videoId: string | null;
  imageUrl: string | undefined;
  data: SermonType | undefined;
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
  const { data, isFetching } = useGetSermonByIdQuery(id);

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

  const getYouTubeThumbnailUrl = (videoId: string | null) => {
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  };

  const youTubeUrl = data?.urlYouTube;
  const videoId = getYouTubeVideoId(youTubeUrl ? youTubeUrl : "");
  const imageUrl = getYouTubeThumbnailUrl(videoId);

  return (
    <ViewModelContext.Provider
      value={{
        data,
        videoId,
        playing,
        imageUrl,
        isFetching,
        handlePress,
        onStateChange,
      }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
