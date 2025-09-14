import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { E_ChatStackRoutes } from "@/chat";
import { useAuthProvider } from "@/core/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/core/hooks/useRedux";
import { selectMatch, setChannelId, setShow } from "@/core/slices/matchSlice";
import { colorsLight } from "@/core/theme";
import { AppGradientButton } from "../AppGradientButton";
import { AppText, AppTextVariant } from "../AppText";
import { Button } from "../Button";

export const AppModalMatch = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const { show, channelId } = useAppSelector(selectMatch);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { client } = useAuthProvider();

  const [newUserMatch, setNewUserMatch] = useState<any>(null);

  const snapPoints = useMemo(() => ["25%", "60%"], []);

  const handleGoToChat = useCallback(() => {
    navigate(E_ChatStackRoutes.CHAT, {
      channelId: channelId || "",
    });
    dispatch(setShow(false));
    dispatch(setChannelId(""));
    bottomSheetModalRef.current?.forceClose();
  }, [channelId, dispatch, navigate]);

  const handleCloseModal = useCallback(() => {
    dispatch(setShow(false));
    dispatch(setChannelId(""));
    bottomSheetModalRef.current?.forceClose();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (bottomSheetModalRef?.current && show && channelId) {
        bottomSheetModalRef.current?.present();
        const result = await client.queryChannels({ id: channelId });
        setNewUserMatch(result[0].data?.created_by);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, channelId]);

  const renderBackdrop = useCallback(
    (propsBackdrop: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...propsBackdrop}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        // eslint-disable-next-line react/no-children-prop
        children={
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
          />
        }
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={[styles.boxImage, styles.boxImageLayout]}>
          <FastImage
            source={{
              uri: newUserMatch?.image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <AppText
          variant={AppTextVariant.h6}
          color={colorsLight.PRIMARY_TEXT_COLOR}
        >
          {newUserMatch?.name}
        </AppText>
        <AppText
          variant={AppTextVariant.body1}
          color={colorsLight.PRIMARY_TEXT_COLOR}
          ellipsizeMode="tail"
          numberOfLines={3}
          style={styles.descriptionText}
        >
          You've matched with {newUserMatch?.name}
        </AppText>
        <Button
          label="Nah... I'am good"
          backgroundColor="#F1F3F4"
          textColor="#1C1C21"
          width="100%"
          height={60}
          style={styles.buttonNavigate}
          onPress={handleCloseModal}
        />
        <AppGradientButton
          label="Yes, let's go!"
          onPress={handleGoToChat}
          height={54}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  boxImage: {
    borderRadius: 80,
  },
  boxImageLayout: {
    width: 80,
    height: 80,
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 80,
  },
  buttonNavigate: {
    marginVertical: 24,
  },
  descriptionText: {
    marginTop: 16,
  },
});
