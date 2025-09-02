import {useAuthProvider} from '@/context/AuthContext';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {GET_STREAM_API_KEY} from '@/utils/config';
import {
  differenceInHours,
  format,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

export const useActions = ({
  route: {
    params: {channelId},
  },
  navigation,
}: RootStackScreenProps<RootStackRoutes.CONTACT_PROFILE>) => {
  const {user} = useAuthProvider();
  const [userOwn, setUserOwn] = useState<any>(null);
  const [formatDate, setFormatDate] = useState('');

  function findOtherMember(members: any, currentUserId: string) {
    for (let userId in members) {
      if (members.hasOwnProperty(userId) && userId !== currentUserId) {
        return members[userId];
      }
    }
    return null;
  }

  useEffect(() => {
    const fetchUserOwn = async () => {
      const channel: any = client.channel('messaging', channelId);

      let userOwn = findOtherMember(
        channel?.state?.members,
        user?.id.toString() || '',
      );

      setUserOwn(userOwn);
    };

    fetchUserOwn();
  }, [channelId, user?.id]);

  useEffect(() => {
    if (userOwn?.user?.last_active) {
      const date = parseISO(userOwn?.user?.last_active);

      if (isToday(date)) {
        const hoursDiff = differenceInHours(new Date(), date);
        if (hoursDiff < 24) {
          const desiredFormat = 'h:mm a';
          const formatTime = format(date, desiredFormat);
          setFormatDate(`Today, ${formatTime}`);
          return;
        }
      }

      if (isYesterday(date)) {
        const desiredFormat = 'h:mm a';
        const formatTime = format(date, desiredFormat);
        setFormatDate(`Yesterday, ${formatTime}`);
        return;
      }

      const desiredFormat = 'MMM dd yyyy, h:mm a';
      const formattedDate = format(date, desiredFormat);
      setFormatDate(formattedDate);
    }
  }, [userOwn]);

  return {user, userOwn, formatDate, navigation};
};
