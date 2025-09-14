import React, { useCallback, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { TabsHomeScreenProps } from "@/core/types/StackRoutes";
import { E_ExplorerStackRoutes } from "@/explorer/routes";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";
import {
  IsEmptyMatchFragment,
  ItsMatchFragment,
  ModalFiltersFragment,
  RenderHeaderButton,
  TutorialFragment,
} from "./fragments";
import { RenderCardFragment } from "./fragments";
import { ModalCardInformation } from "./fragments/CardFragment/ModalCardInformation";
import { OverlayLeft } from "./fragments/CardFragment/OverlayLeft";
import { OverlayRight } from "./fragments/CardFragment/OverlayRight";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const MatchContent =
  ({}: TabsHomeScreenProps<E_ExplorerStackRoutes.MATCH>) => {
    const {
      users,
      isFetching,
      showTutorial,
      showIsMatch,
      modalVisible,
      userSelected,
      handleDeleteCard,
      handleCreateMatch,
      handleCreateDisLike,
      handleRefetchData,
      setModalVisible,
    } = useViewModelProvider();
    const ref = useRef<SwiperCardRefType>();

    const renderCard = useCallback((item: UserMatchType) => {
      return <RenderCardFragment item={item} />;
    }, []);

    const handleSwipeLeft = useCallback(() => {
      ref.current?.swipeLeft();
      setModalVisible(false);
    }, [setModalVisible]);

    const handleSwipeRight = useCallback(() => {
      ref.current?.swipeRight();
      setModalVisible(false);
    }, [setModalVisible]);

    return (
      <AppContainerSafeArea>
        <RenderHeaderButton />
        {isFetching ? (
          <View
            style={[
              styles.containerLoading,
              styles.bgWhite,
              styles.fullWidthHeight,
              styles.flex1,
            ]}
          >
            <ActivityIndicator color={colorsLight.PRIMARY_COLOR} size={35} />
            <Text style={styles.textLoading}>Loading more profiles</Text>
          </View>
        ) : users.length === 0 ? (
          <IsEmptyMatchFragment />
        ) : (
          <View style={styles.flex1}>
            <Swiper
              ref={ref}
              cardStyle={styles.cardStyle}
              data={users}
              renderCard={renderCard}
              onSwipeRight={(cardIndex) => {
                console.log("onSwipeLeft", cardIndex);
                handleDeleteCard(users[cardIndex]?.userId || "");
                handleCreateMatch(users[cardIndex]);
              }}
              onSwipeLeft={(cardIndex) => {
                console.log("onSwipeRight", cardIndex);
                handleDeleteCard(users[cardIndex]?.userId || "");
                handleCreateDisLike(users[cardIndex]?.userId || "");
              }}
              OverlayLabelRight={OverlayRight}
              OverlayLabelLeft={OverlayLeft}
              onIndexChange={(index) => {
                console.log("Current Active index", index);
                handleRefetchData(index);
              }}
            />
          </View>
        )}

        {modalVisible && userSelected && (
          <ModalCardInformation
            handleSwipeLeft={handleSwipeLeft}
            handleSwipeRight={handleSwipeRight}
          />
        )}
        <ModalFiltersFragment />
        {showTutorial && <TutorialFragment />}
        {showIsMatch && <ItsMatchFragment />}
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  containerLoading: {
    justifyContent: "center",
    alignItems: "center",
  },
  bgWhite: {
    backgroundColor: colorsLight.WHITE,
  },
  fullWidthHeight: {
    width: "100%",
    height: "100%",
  },
  flex1: {
    flex: 1,
  },
  textLoading: {
    fontSize: 16,
    color: colorsLight.BLACK,
    fontFamily: "Satoshi-Medium",
  },
  cardStyle: {
    width: "95%",
    height: "75%",
    borderRadius: 15,
    marginVertical: 20,
    alignSelf: "center",
  },
});

export const MatchScreen = (
  props: TabsHomeScreenProps<E_ExplorerStackRoutes.MATCH>,
) => (
  <ViewModelProvider>
    <MatchContent {...props} />
  </ViewModelProvider>
);
