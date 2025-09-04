import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { useLazyGetPassagesByOriginQuery } from "@/core/data/remote/bibleApi";
import { colorsLight } from "@/core/theme";
import { IQuestionResponse } from "@/user/data/remote/entities/questionEntity";
import { useViewModelProvider } from "../../ViewModelContext";
import { ModalAnswerFragment } from "./ModalAnswerFragment";
import { ModalSelectQuestionFragment } from "./ModalSelectQuestionFragment";
import { RenderButtonFragment } from "./RenderButtonFragment";

export const ViewQuestionFragment = () => {
  const { data, setData } = useViewModelProvider();

  const [triggerGetPassage, { data: dataPassage }] =
    useLazyGetPassagesByOriginQuery();

  const [selectedQuestion, setSelectedQuestion] =
    useState<IQuestionResponse | null>(null);

  const [modalAnswer, setModalAnswer] = useState<boolean>(false);
  const [modalSelectQuestion, setModalSelectQuestion] =
    useState<boolean>(false);

  const toggleModalAnswer = (item: IQuestionResponse) => {
    setModalAnswer(!modalAnswer);
    setSelectedQuestion(item);
  };

  const toggleModalSelectQuestion = () => {
    setModalSelectQuestion(!modalSelectQuestion);
  };

  const handleSavePassage = async () => {
    setModalSelectQuestion(false);
    const newData = data.map((item: IQuestionResponse) =>
      item.question.trim() === "My favorite bible verse is"
        ? {
            ...item,
            answer: `${dataPassage.id}&${
              dataPassage?.content?.split(" [")[1].split("] ")[1]
            }`,
          }
        : item,
    );
    setData(newData);
  };

  const handleGetAnswer = async (answer: string) => {
    setModalAnswer(false);
    const newData = data.map((item: IQuestionResponse) =>
      item.id === selectedQuestion?.id ? { ...item, answer } : item,
    );
    setData(newData);
  };

  const renderItem = ({ item }: { item: IQuestionResponse }) => (
    <RenderButtonFragment
      item={item}
      toggleModalAnswer={toggleModalAnswer}
      toggleModalSelectQuestion={toggleModalSelectQuestion}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text variant="h6" style={styles.title}>
          Let others know you a little bit more
        </Text>
        <FlatList
          data={
            data && data.length > 0
              ? data.sort((a, b) => {
                  if (a.question.trim() === "My favorite bible verse is") {
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
});
