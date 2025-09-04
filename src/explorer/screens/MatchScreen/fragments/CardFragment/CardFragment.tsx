import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { View } from "react-native-ui-lib";
import { CardItemHandle, TinderCard } from "rn-tinder-card";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { LocationIcon } from "@/explorer/assets/svg";
import { calculateAge } from "@/explorer/utils/calculateAge";
import { calculateDistance } from "@/explorer/utils/calculateDistance";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";
import { useViewModelProvider } from "../../ViewModelContext";
import { OverlayLeft } from "./OverlayLeft";
import { OverlayRight } from "./OverlayRight";

interface CardFragmentProps {
  item: UserMatchType;
  index: number;
}

export const CardFragment = forwardRef(
  ({ item, index }: CardFragmentProps, ref) => {
    const { userProfile } = useAuthProvider();
    const tinderCardsRef = useRef<(CardItemHandle | null)[]>([]);
    const {
      setModalVisible,
      setIndexUserSelected,
      setUserSelected,
      handleDeleteCard,
      handleCreateMatch,
      handleCreateDisLike,
    } = useViewModelProvider();

    const age = calculateAge(item.dateOfBirth);

    const distanceOfUsers = calculateDistance(
      userProfile?.location.latitude || 0,
      userProfile?.location.longitude || 0,
      item.location.latitude || 0,
      item.location.longitude || 0,
    );

    const swipeRight = useCallback((i: number) => {
      tinderCardsRef.current?.[i]?.swipeRight();
    }, []);

    const swipeLeft = useCallback((i: number) => {
      tinderCardsRef.current?.[i]?.swipeLeft();
    }, []);

    useImperativeHandle(ref, () => ({
      swipeRight,
      swipeLeft,
    }));

    return (
      <View style={styles.cardContainer} pointerEvents="box-none">
        <TinderCard
          ref={(el) => (tinderCardsRef.current[index] = el)}
          disableTopSwipe
          disableBottomSwipe
          onSwipedRight={() => {
            console.log("onSwipedRight");
            handleDeleteCard(item?.userId || "");
            handleCreateMatch(item);
          }}
          onSwipedLeft={() => {
            console.log("onSwipedLeft");
            handleDeleteCard(item?.userId || "");
            handleCreateDisLike(item?.userId || "");
          }}
          cardWidth={Dimensions.get("window").width / 1.1}
          cardHeight={Dimensions.get("screen").height}
          OverlayLabelRight={OverlayRight}
          OverlayLabelLeft={OverlayLeft}
          cardStyle={styles.card}
        >
          <Pressable
            onPress={() => {
              setIndexUserSelected(index);
              setUserSelected(item);
              setModalVisible(true);
            }}
            style={[
              styles.containerCard,
              // eslint-disable-next-line react-native/no-inline-styles
              { marginBottom: Platform.OS === "android" ? 120 : 120 },
            ]}
          >
            <FastImage
              source={{
                uri: item?.avatar?.toString() || "",
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
            />
            <LinearGradient
              style={styles.shadowOverlay}
              colors={["rgba(0, 0, 0, 0.8)", "transparent"]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.6 }}
            />
            <View style={styles.textContainer}>
              <Text variant="h6" style={styles.textName}>
                {item.name && item.dateOfBirth
                  ? `${item?.name}, ${age}`
                  : "Don't have info yet "}
              </Text>
              <View row centerV marginT-8>
                <LocationIcon />
                <Text variant="h6" style={styles.textDistance}>
                  {distanceOfUsers !== 0
                    ? distanceOfUsers < 1
                      ? "Distance (- 1 km)"
                      : `Distance (${distanceOfUsers.toFixed(2)} km)`
                    : "No distance"}
                </Text>
              </View>
            </View>
            <View style={styles.textTopContainer}>
              <View style={styles.contentTextTop}>
                <Text variant="h6" style={styles.textCategory}>
                  {item?.searching || "No searching "}
                </Text>
              </View>
            </View>

            {/* <View paddingH-16 paddingB-20>
              <Text style={styles.tite}>My story</Text>
              <Text style={styles.textStory}>
                {item?.descriptionStory || "Don't have a story yet"}
              </Text>
              <Text style={styles.tite}>Basics</Text>
              <BasicSectionFragment item={item} />
              <Text style={styles.tite}>Interests</Text>
              <InterestSectionFragment item={item} />
            </View>

            <MediaSectionFragment item={item} /> */}

            {/* <View marginV-20 row style={styles.containerButtons}>
              <TouchableOpacity onPress={() => swipeLeft(index)}>
                <BtnDiscardIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => swipeRight(index)}>
                <BtnYesIcon />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
            // onPress={() => handleBlockUser(item.id, index)}
            >
              <Text style={styles.blockText}>Block and report this person</Text>
            </TouchableOpacity> */}
          </Pressable>
        </TinderCard>
      </View>
    );
  },
);

CardFragment.displayName = "ChildComponent";

const styles = StyleSheet.create({
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  card: {
    borderRadius: 30,
    flex: 1,
  },
  image: {
    // height: 500,
    borderRadius: 30,
    marginBottom: 10,
    flex: 1,
    height: undefined,
    width: undefined,
  },
  shadowOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    borderRadius: 30,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  textTopContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 10,
    paddingHorizontal: 16,
  },
  textName: {
    color: colorsLight.WHITE,
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "900",
    fontFamily: "Satoshi-Medium",
  },
  containerCard: {
    flex: 1,
    backgroundColor: "#DDE8E3",
    borderRadius: 30,
  },
  textCategory: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Satoshi-Medium",
    lineHeight: 18.2,
  },
  contentTextTop: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    width: undefined,
    backgroundColor: "#203936",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textDistance: {
    color: colorsLight.WHITE,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontFamily: "Satoshi-Medium",
    lineHeight: 18.2,
  },
});
