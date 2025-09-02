import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {ContainerSafeArea} from '@/components';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {Channel, MessageInput, MessageList} from 'stream-chat-react-native';
import {Text} from '@react-native-material/core';
import {CustomMessageContent} from './CustomMessageContent';
import {CustomInput} from './CustomInput';
import {CustomHeader} from './CustomHeader';
import {useActions} from './useActions';

export const ChatScreen = (
  props: RootStackScreenProps<RootStackRoutes.CHAT>,
) => {
  const {
    loading,
    userOwn,
    channel,
    navigation,
    channelId,
    handleAddReaction,
    handleDeleteMessage,
    handleGetReactionsAndOpenModal,
  } = useActions(props);

  const CustomDateHeader = ({dateString}: {dateString: string}) => {
    return (
      <View
        marginT-8
        paddingH-16
        paddingV-5
        backgroundColor={colorsLight.PRIMARY_COLOR}
        center
        style={styles.containerDateHeader}>
        <Text style={styles.textDateHeader} color={colorsLight.WHITE}>
          {dateString}
        </Text>
      </View>
    );
  };

  return (
    <ContainerSafeArea>
      <CustomHeader
        name={userOwn?.user?.name}
        avatar={userOwn?.user?.image}
        handleGoBack={() => navigation.pop()}
        handleGoToDetail={() =>
          navigation.navigate(RootStackRoutes.CONTACT_PROFILE, {
            channelId,
          })
        }
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            color={colorsLight.PRIMARY_COLOR}
            size="large"
          />
        ) : channel ? (
          <Channel
            messageActions={({deleteMessage, quotedReply, isMyMessage}) =>
              isMyMessage ? [deleteMessage, quotedReply] : [quotedReply]
            }
            channel={channel}
            DateHeader={CustomDateHeader}
            MessageContent={() => (
              <CustomMessageContent
                handleAddReaction={handleAddReaction}
                handleDeleteMessage={handleDeleteMessage}
                handleGetReactionsAndOpenModal={handleGetReactionsAndOpenModal}
              />
            )}
            Input={CustomInput}
            MessageAvatar={() => null}
            disableTypingIndicator
            MessageStatus={() => null}
            keyboardVerticalOffset={80}>
            <MessageList />
            <MessageInput />
          </Channel>
        ) : (
          <View center marginT-20>
            <Text
              variant="body1"
              color={colorsLight.SECONDARY_TEXT_COLOR}
              style={styles.textNotFound}>
              No channel found
            </Text>
          </View>
        )}
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 6,
    flex: 1,
  },
  containerHeader: {
    justifyContent: 'space-between',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginHorizontal: 16,
  },
  textName: {
    fontFamily: 'Satoshi-Bold',
  },
  iconCall: {
    marginRight: 24,
  },
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  fullWidth: {
    width: '100%',
  },
  inputContainer: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_04,
  },
  lineDivider: {
    width: 24,
    height: 0,
    transform: [{rotate: '90deg'}],
    transformOrigin: '0% 0%',
    borderWidth: 1,
    borderColor: colorsLight.GRAY_04,
    borderStyle: 'solid',
  },
  containerDateHeader: {
    borderRadius: 100,
  },
  textDateHeader: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
  },
  loading: {
    marginTop: 20,
  },
  textNotFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
