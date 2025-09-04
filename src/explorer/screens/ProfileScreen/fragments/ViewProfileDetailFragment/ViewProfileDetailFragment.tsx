import React from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { EditIcon, LoveIcon, QuestionCircleIcon } from "@/core/assets/svg";
import { GradientBanner } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { E_UserStackRoutes } from "@/user";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewProfileDetailFragment = () => {
  const { navigate } = useNavigation();
  const { userProfile } = useAuthProvider();
  const { dataDrives, dataQuestions, totalPercentageProfile } =
    useViewModelProvider();

  return (
    <View marginT-24 style={styles.content}>
      <View row style={styles.container}>
        <Text style={styles.title}>My story</Text>
        <TouchableOpacity onPress={() => navigate(E_UserStackRoutes.STORY)}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <View marginT-16>
        <Text style={styles.text}>{userProfile?.descriptionStory}</Text>
      </View>
      <View center marginT-24>
        {totalPercentageProfile < 100 ? (
          <GradientBanner
            title={`${totalPercentageProfile}% complete`}
            text="Enter to finish completing your profile"
            labelButton="Complete"
            onPress={() => navigate(E_UserStackRoutes.COMPLETE_PROFILE)}
            width={92}
          />
        ) : (
          ""
        )}
      </View>
      <View marginT-24 paddingT-8 paddingB-8 row style={styles.container}>
        <View row>
          <LoveIcon />
          <Text style={styles.titlePrincipal}>Drives you</Text>
        </View>
        <TouchableOpacity onPress={() => navigate(E_UserStackRoutes.DRIVES)}>
          <Text style={styles.buttonAdd}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxItem}>
        {dataDrives.map((i) =>
          i.drives.map((id, index) => (
            <TouchableOpacity
              key={index}
              disabled
              style={[
                styles.item,
                {
                  backgroundColor: colorsLight.GRAY_02,
                  borderColor: colorsLight.GRAY_02,
                },
              ]}
            >
              <Text variant="body1" style={styles.itemText}>
                {id.name}
              </Text>
            </TouchableOpacity>
          )),
        )}
      </View>
      <View marginT-24 paddingT-8 paddingB-8 row style={styles.container}>
        <View row>
          <QuestionCircleIcon color={colorsLight.SECONDARY_TEXT_COLOR} />
          <Text style={styles.titlePrincipal}>Deep questions</Text>
        </View>
        <TouchableOpacity onPress={() => navigate(E_UserStackRoutes.QUESTIONS)}>
          <Text style={styles.buttonAdd}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View>
        {userProfile?.verse && (
          <View marginV-8>
            <Text style={styles.itemsQuestion}>
              My favorite Bible verse is....
            </Text>
            <View style={styles.itemsQuestionContainer}>
              <Text style={styles.itemsAnswer}>
                {userProfile?.verse ? userProfile?.verse?.split("&")[1] : ""}
              </Text>
            </View>
          </View>
        )}
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={dataQuestions}
          renderItem={({ item }) => (
            <View marginV-8>
              <Text style={styles.itemsQuestion}>{item?.question}</Text>
              <View style={styles.itemsQuestionContainer}>
                <Text style={styles.itemsAnswer}>{item.answer}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.sk}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: Platform.OS === "ios" ? 80 : 100,
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: "Satoshi-Black",
  },
  text: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
  },
  titlePrincipal: {
    marginLeft: 16,
    fontFamily: "Satoshi-Medium",
  },
  buttonAdd: {
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  boxItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  itemText: {
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
  },
  itemsQuestion: {
    textAlign: "left",
    fontFamily: "Satoshi-Medium",
    marginBottom: 10,
  },
  itemsQuestionContainer: {
    backgroundColor: colorsLight.GRAY_02,
    padding: 16,
    borderRadius: 20,
  },
  itemsAnswer: {
    textAlign: "left",
    fontFamily: "Satoshi-Light",
  },
});
