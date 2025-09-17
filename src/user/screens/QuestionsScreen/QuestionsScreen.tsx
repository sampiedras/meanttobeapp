import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import {
  AppContainerSafeArea,
  AppGradientButton,
  AppSpacer,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user";
import { IQuestionResponse } from "@/user/data/remote/entities/questionEntity";
import { ModalAnswerFragment } from "./fragments/ModalAnswerFragment";
import { ModalSelectQuestionFragment } from "./fragments/ModalSelectQuestionFragment";
import { RenderButtonFragment } from "./fragments/RenderButtonFragment";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const QuestionsContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.QUESTIONS>) => {
    const {
      data,
      isLoading,
      isFetching,
      dataPassage,
      selectedQuestion,
      modalAnswer,
      modalSelectQuestion,
      selectedBook,
      selectedChapter,
      selectedVerse,
      setModalAnswer,
      toggleModalAnswer,
      toggleModalSelectQuestion,
      handleGetAnswer,
      handleSavePassage,
      triggerGetPassage,
      handleUpdateQuestion,
    } = useViewModelProvider();

    const renderItem = ({ item }: { item: IQuestionResponse }) => (
      <RenderButtonFragment
        item={item}
        toggleModalAnswer={toggleModalAnswer}
        toggleModalSelectQuestion={toggleModalSelectQuestion}
      />
    );

    return (
      <AppContainerSafeArea edges={["bottom"]}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <Text variant="h6" style={styles.title}>
              Let others know you a little bit more
            </Text>
            {isFetching ? (
              <MotiView
                transition={{
                  type: "timing",
                }}
                style={styles.containerSkeleton}
                animate={{
                  backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
                }}
              >
                <Skeleton colorMode="light" width="90%" height={200} />
                <AppSpacer />
                <Skeleton colorMode="light" width="90%" height={200} />
              </MotiView>
            ) : (
              <FlatList
                data={
                  data && data.length > 0
                    ? data.sort((a, b) => {
                        if (
                          a.question.trim() === "My favorite bible verse is"
                        ) {
                          return -1;
                        } else if (
                          b.question.trim() === "My favorite bible verse is"
                        ) {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
                    : data
                }
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={styles.list}
              />
            )}
            <AppGradientButton
              label="Continue"
              loading={isLoading}
              disabled={!selectedBook && !selectedChapter && !selectedVerse}
              style={styles.button}
              onPress={handleUpdateQuestion}
            />
          </View>
          <ModalSelectQuestionFragment
            visible={modalSelectQuestion}
            onClose={toggleModalSelectQuestion}
            dataPassage={dataPassage}
            handleSavePassage={handleSavePassage}
            triggerGetPassage={triggerGetPassage}
          />

          {modalAnswer && selectedQuestion && (
            <ModalAnswerFragment
              visible={modalAnswer}
              onClose={() => setModalAnswer(!modalAnswer)}
              title={selectedQuestion.question}
              answerUser={selectedQuestion?.answer || ""}
              handleGetAnswer={handleGetAnswer}
            />
          )}
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 12,
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  list: {
    flex: 1,
    width: "100%",
    marginTop: 24,
  },
  button: {
    marginBottom: 20,
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
});

export const QuestionsScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.QUESTIONS>,
) => (
  <ViewModelProvider>
    <QuestionsContent {...props} />
  </ViewModelProvider>
);
