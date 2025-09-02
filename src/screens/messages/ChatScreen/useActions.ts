import {useAuthProvider} from '@/context/AuthContext';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {GET_STREAM_API_KEY} from '@/utils/config';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

export interface ReactionUser {
  id: string;
  role: string;
  created_at: string;
  updated_at: string;
  last_active: string;
  banned: boolean;
  online: boolean;
  name: string;
  image: string;
}

export interface Reaction {
  message_id: string;
  user_id: string;
  user: ReactionUser;
  type: string;
  score: number;
  created_at: string;
  updated_at: string;
  myCustomField: string;
}

export interface ReactionData {
  reactions: Reaction[];
  duration: string;
}

export const useActions = ({
  route: {
    params: {channelId},
  },
  navigation,
}: RootStackScreenProps<RootStackRoutes.CHAT>) => {
  const {user} = useAuthProvider();
  const [loading, setLoading] = useState<boolean>(true);
  const [channel, setChannel] = useState<any | null>(null);
  const [userOwn, setUserOwn] = useState<any>(null);

  function findOtherMember(members: any, currentUserId: string) {
    for (let userId in members) {
      if (members.hasOwnProperty(userId) && userId !== currentUserId) {
        return members[userId];
      }
    }
    return null;
  }

  useEffect(() => {
    handleWatchChannel();
  }, []);

  async function handleWatchChannel() {
    try {
      const connection: any = client.channel('messaging', channelId);
      const state = await connection.watch();

      let userOwn = findOtherMember(
        connection?.state?.members,
        user?.id.toString() || '',
      );

      setUserOwn(userOwn);
      setChannel(connection);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleAddReaction = async (
    messageID: string,
    type: string,
    emoji: string,
  ) => {
    try {
      await channel.sendReaction(
        messageID,
        {
          type,
          myCustomField: emoji,
        },
        {enforce_unique: true},
      );
    } catch (error) {
      // TODO: handle error
    }
  };
  const handleGetReactionsAndOpenModal = async (
    messageID: string,
    ref: React.RefObject<BottomSheetModalMethods>,
  ) => {
    const result: ReactionData = await channel.getReactions(messageID, {
      limit: 10,
    });
    await ref.current?.present();
    return result;
  };

  const handleDeleteMessage = async (messageID: string, type: string) => {
    await channel.deleteReaction(messageID, type);
  };

  return {
    loading,
    userOwn,
    channel,
    navigation,
    channelId,
    handleAddReaction,
    handleGetReactionsAndOpenModal,
    handleDeleteMessage,
  };
};
