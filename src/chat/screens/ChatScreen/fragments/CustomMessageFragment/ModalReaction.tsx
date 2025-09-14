import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { Reaction } from "stream-chat-react-native";
import { BottomModal } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";

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
  const { user } = useAuthProvider();

  return (
    <BottomModal
      modalRef={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      enablePanDownToClose={true}
    >
      <View style={styles.flex1Padding16}>
        {reactions && reactions.length > 0 ? (
          <>
            {reactions.map((e: any, index) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteMessage(e.message_id, e.type);
                  deleteReactionByIndex(index, e.user_id);
                }}
                key={e.user_id}
                style={[styles.btn, styles.marginV8, styles.rowCenterV]}
              >
                <View
                  style={[
                    styles.flex1,
                    styles.center,
                    styles.row,
                    styles.containerBtn,
                  ]}
                >
                  <View style={styles.rowCenter}>
                    <View style={styles.size56}>
                      <FastImage
                        source={{ uri: e.user.image }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.marginL12}>
                      {String(e.user_id) === String(user?.id) ? (
                        <>
                          <Text
                            color={colorsLight.PRIMARY_TEXT_COLOR}
                            style={styles.textUser}
                          >
                            You
                          </Text>
                          <Text
                            color={colorsLight.SECONDARY_TEXT_COLOR}
                            style={styles.textDelete}
                          >
                            Tap to delete.
                          </Text>
                        </>
                      ) : (
                        <Text
                          color={colorsLight.PRIMARY_TEXT_COLOR}
                          style={styles.textUser}
                        >
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
          <View style={styles.flexCenter}>
            <Text
              color={colorsLight.SECONDARY_TEXT_COLOR}
              style={styles.textEmpty}
            >
              No reactions
            </Text>
          </View>
        )}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  flex1Padding16: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  center: { justifyContent: "center", alignItems: "center" },
  flex1: { flex: 1 },
  marginV8: { marginVertical: 8 },
  size56: { width: 56, height: 56 },
  marginL12: { marginLeft: 12 },
  containerBtn: {
    justifyContent: "space-between",
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
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  textUser: {
    fontSize: 18,
    fontFamily: "Satoshi-Medium",
  },
  textDelete: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    marginTop: 4,
  },
  textReaction: {
    fontSize: 20,
  },
});
