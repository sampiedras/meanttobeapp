import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TabsHomeRoutes, TabsHomeScreenProps} from '@/types/tabRoutes';
import {colorsLight} from '@/theme/colorsLight';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {
  ContainerSafeArea,
  GradientButton,
  ModalPremium,
  SearchBar,
} from '@/components';
import {LocalSvg} from 'react-native-svg';
import {
  ChannelList,
  ChannelPreviewMessenger,
} from 'stream-chat-react-native';
import FastImage from 'react-native-fast-image';
import {useActions} from './useActions';
import {useAuthProvider} from '@/context/AuthContext';

export const MessagesScreen = (
  props: TabsHomeScreenProps<TabsHomeRoutes.MESSAGES>,
) => {
  const {isSubscriptionActive} = useAuthProvider();
  const {
    user,
    filters,
    searchText,
    subscriptions,
    modalPremium,
    setModalPremium,
    setSearchText,
    navigateToChannel,
  } = useActions(props);

  function findOtherMember(members: any, currentUserId: string) {
    for (let userId in members) {
      if (members.hasOwnProperty(userId) && userId !== currentUserId) {
        return members[userId];
      }
    }
    return null;
  }

  const customPreviewTitle = ({channel}: {channel: any}) => {
    let userOwn = findOtherMember(
      channel?.state?.members,
      user?.id.toString() || '',
    );

    return (
      <Text
        variant="body1"
        style={styles.textName}
        color={colorsLight.PRIMARY_TEXT_COLOR}>
        {userOwn?.user?.name}
      </Text>
    );
  };

  const customPreviewAvatar = ({channel}: {channel: any}) => {
    let userOwn = findOtherMember(
      channel?.state?.members,
      user?.id.toString() || '',
    );

    return (
      <FastImage style={styles.avatar} source={{uri: userOwn?.user?.image}} />
    );
  };

  const listEmptyComponent = () => (
    <View flex-1 paddingT-32 center>
      <LocalSvg asset={require('@/assets/svg/nothing_message.svg')} />
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.titleNothingHere}
        variant="h6">
        Nothing here!
      </Text>
      <Text
        color={colorsLight.SECONDARY_TEXT_COLOR}
        style={styles.subtitleNothingHere}
        variant="body2">
        Once you match with someone you’ll be able to start a conversation.
      </Text>
    </View>
  );

  const CustomListItem = (props: any) => {
    return (
      <ChannelPreviewMessenger
        PreviewTitle={customPreviewTitle}
        PreviewAvatar={customPreviewAvatar}
        {...props}
      />
    );
  };

  return (
    <ContainerSafeArea>
      {isSubscriptionActive ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View paddingH-16>
            <Text
              style={styles.titlePrincipal}
              variant="h5"
              color={colorsLight.PRIMARY_TEXT_COLOR}>
              Messages
            </Text>
            <SearchBar
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.containerSearchBar}
            />
          </View>
          <View
            backgroundColor={colorsLight.GRAY_LIST_CHAT}
            style={styles.listContainer}>
            <View center>
              <View
                height={6}
                width={50}
                marginT-14
                marginB-19
                backgroundColor={colorsLight.GRAY_04}
                style={styles.bottomSheet}
              />
            </View>

            <ChannelList<DefaultStreamChatGenerics>
              filters={filters}
              EmptyStateIndicator={listEmptyComponent}
              Preview={CustomListItem}
              onSelect={channel => navigateToChannel(channel.id)}
            />
          </View>
        </ScrollView>
      ) : (
        <View flex-1 centerV paddingH-16>
          <Image
            source={require('@/assets/image/personsImage.png')}
            style={{alignSelf: 'center'}}
          />
          <View>
            <Text style={styles.title}>This is a premium feature</Text>
            <Text style={styles.text}>
              Gain access to this and other premium features by purchasing
              premium.
            </Text>
            <GradientButton
              width={'100%'}
              label="Get premium"
              style={styles.buttonPremium}
              onPress={() => setModalPremium(true)}
              height={54}
            />
          </View>
        </View>
      )}
      {subscriptions.size > 0 && (
          <ModalPremium
            visible={modalPremium}
            title="Premium"
            data={Array.from(subscriptions.values())}
            onClose={() => setModalPremium(false)}
          />
          )}
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 96,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  titlePrincipal: {
    fontFamily: 'Satoshi-Black',
    marginBottom: 24,
    marginTop: 32,
  },
  containerSearchBar: {
    marginBottom: 32,
  },
  listContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheet: {
    borderRadius: 100,
  },
  divider: {
    alignSelf: 'center',
    borderRadius: 20,
  },
  titleNothingHere: {
    marginTop: 32,
    fontFamily: 'Satoshi-Bold',
  },
  subtitleNothingHere: {
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'Satoshi-Regular',
  },
  textName: {
    fontFamily: 'Satoshi-Bold',
    marginBottom: 2,
  },
  textTime: {
    marginBottom: 2,
    fontFamily: 'Satoshi-Medium',
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 100,
    marginRight: 20,
  },
  buttonPremium: {
    marginBottom: 20,
  },
  textPremium: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
    color: colorsLight.GRAY_03,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Satoshi-Black',
    textAlign: 'center',
    marginTop: 16,
  },
});
