import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsFocused } from "@react-navigation/native";
import { StreamChat } from "stream-chat";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useNotificationProvider } from "@/core/provider/NotificationProvider";
import { GET_STREAM_API_KEY } from "@/core/utils/config";

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

type ViewModelContextType = {
  userOwn: any;
  loading: boolean;
  channel: any | null;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({
  children,
  channelId,
}: {
  children: ReactNode;
  channelId: string;
}) {
  const isFocused = useIsFocused();
  const { setCurrentChannelId } = useNotificationProvider();
  const { userProfile } = useAuthProvider();

  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<any | null>(null);
  const [userOwn, setUserOwn] = useState<any>(null);

  const handleWatchChannel = useCallback(async () => {
    try {
      const connection: any = client.channel("messaging", channelId);
      await connection.watch();

      let userChat = Object.keys(connection?.state?.members).find(
        (key) => key !== userProfile?.userId,
      );

      setUserOwn(connection?.state?.members[userChat || ""]);
      setChannel(connection);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [channelId, userProfile?.userId]);

  useEffect(() => {
    handleWatchChannel();
  }, [handleWatchChannel]);

  useEffect(() => {
    if (isFocused) {
      setCurrentChannelId(channelId);
    } else {
      setCurrentChannelId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  return (
    <ViewModelContext.Provider value={{ userOwn, channel, loading }}>
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
