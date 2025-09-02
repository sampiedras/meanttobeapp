import React from 'react';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BottomModal} from '@/components';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {useAuthProvider} from '@/context/AuthContext';
import {Reaction} from './useActions';
import {Text} from '@react-native-material/core';
import {StyleSheet} from 'react-native';

interface ModalReactionProps {
  reactions: Reaction[];
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
  deleteReactionByIndex: (id: number, userId: string) => void;
  handleDeleteMessage: (messageID: string, type: string) => Promise<void>;
}

export const ModalReaction = ({
  reactions,
  snapPoints,
  bottomSheetRef,
  deleteReactionByIndex,
  handleDeleteMessage,
}: ModalReactionProps) => {
  const {user} = useAuthProvider();
  return (
    <BottomModal
      modalRef={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose={true}>
      <View flex-1 paddingH-16 paddingV-16>
        {reactions && reactions.length > 0 ? (
          <>
            {reactions.map((e, index) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteMessage(e.message_id, e.type);
                  deleteReactionByIndex(index, e.user_id);
                }}
                marginV-8
                key={e.user_id}
                centerV
                style={styles.btn}
                row>
                <View flex-1 center row style={styles.containerBtn}>
                  <View row center>
                    <View width={56} height={56}>
                      <FastImage
                        source={{uri: e.user.image}}
                        style={styles.image}
                      />
                    </View>
                    <View marginL-12>
                      {String(e.user_id) === String(user?.id) ? (
                        <>
                          <Text
                            color={colorsLight.PRIMARY_TEXT_COLOR}
                            style={styles.textUser}>
                            You
                          </Text>
                          <Text
                            color={colorsLight.SECONDARY_TEXT_COLOR}
                            style={styles.textDelete}>
                            Tap to delete.
                          </Text>
                        </>
                      ) : (
                        <Text
                          color={colorsLight.PRIMARY_TEXT_COLOR}
                          style={styles.textUser}>
                          {e.user.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <Text style={styles.textReaction}>{e.myCustomField}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View flex center>
            <Text color={colorsLight.SECONDARY_TEXT_COLOR} style={styles.textEmpty}>No reactions</Text>
          </View>
        )}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  containerBtn: {
    justifyContent: 'space-between',
  },
  btn: {
    gap: 10,
    borderBottomWidth: 2,
    borderBottomColor: colorsLight.GRAY_02,
    paddingBottom: 8,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 30,
  },
  textEmpty: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
  },
  textUser: {
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
  },
  textDelete: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    marginTop: 4,
  },
  textReaction: {
    fontSize: 20,
  },
});
