import {useAuthProvider} from '@/context/AuthContext';
import {useEffect, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useMessageContext, useMessagesContext} from 'stream-chat-react-native';

export const useActionsCustomMessageContent = () => {
  const {
    message,
    images,
    videos,
    isMyMessage,
    handleQuotedReplyMessage,
    handleDeleteMessage,
  } = useMessageContext();
  const [formattedDate, setFormattedDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {user} = useAuthProvider();

  useEffect(() => {
    if (message.created_at) {
      const dateTime = new Date(message.created_at);

      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();

      const ampm = hours >= 12 ? ' PM' : ' AM';

      const hours12 = hours % 12 || 12;

      const result: any = `${hours12}:${
        minutes < 10 ? '0' : ''
      }${minutes}${ampm}`;

      setFormattedDate(result);
    }
  }, [message.created_at]);

  const voiceMessage = message.attachments?.filter(
    a => a.type === 'voice-message',
  );
  const files: any = message.attachments?.filter(a => a.type === 'file');

  const voiceMessageReply: any = message.quoted_message?.attachments?.filter(
    a => a.type === 'voice-message',
  );
  const filesReply: any = message.quoted_message?.attachments?.filter(
    a => a.type === 'file',
  );
  const imagesReply: any = message.quoted_message?.attachments?.filter(
    a => a.type === 'image',
  );
  const videosReply: any = message.quoted_message?.attachments?.filter(
    a => a.type === 'video',
  );

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      `Delete message`,
      'Are you sure you want to permanently delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await handleDeleteMessage();
          },
          style: 'destructive',
        },
      ],
    );
    hideModal();
  };

  const handleReply = () => {
    handleQuotedReplyMessage();
    hideModal();
  };

  const handleFileClick = (assetUrl: string) => {
    Linking.openURL(assetUrl);
  };

  function formatTime(time?: any): any {
    if (!time || typeof time !== 'string') {
      return '0:00';
    }

    const parts = time.split(':');

    if (parts.length < 2) {
      return '';
    }

    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    if (isNaN(minutes) || isNaN(seconds)) {
      return '';
    }

    if (minutes === 0) {
      return `0:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  return {
    message,
    images,
    videos,
    voiceMessage,
    voiceMessageReply,
    files,
    filesReply,
    imagesReply,
    videosReply,
    isMyMessage,
    isModalVisible,
    formattedDate,
    user,
    formatTime,
    handleFileClick,
    showModal,
    handleDelete,
    handleReply,
    hideModal,
    setModalVisible,
  };
};
