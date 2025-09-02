import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {Modal, View} from 'react-native-ui-lib';
import {ILoadingSlice} from '@/slices/loadingSlice';
import {Text} from '@react-native-material/core';
// import {useAppSelector} from '@/hooks/useRedux';
// import {RootState} from '@/libraries/redux';
// import {QueryStatus} from '@reduxjs/toolkit/dist/query';

export const Loading = () => {
  const {loading, text} = useSelector(
    ({loading}: {loading: ILoadingSlice}) => loading,
  );

  // const {userApi} = useAppSelector((state: RootState) => state);

  // const isLoadingUserMutations = Object.values(userApi.mutations).some(
  //   mutation => mutation?.status === QueryStatus.pending,
  // );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={loading}
      onRequestClose={() => null}>
      <View flex-1 center backgroundColor="rgba(0, 0, 0, 0.5)">
        <ActivityIndicator color="white" size={48} />
        <Text variant="body1" color="white">
          {text}
        </Text>
      </View>
    </Modal>
  );
};
