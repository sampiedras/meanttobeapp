import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import _ from '@/@lodash/@lodash';
import {useGetAllQuestionQuery} from '@/api/question/questionApi';
import {IQuestionResponse, QuestionEntity} from '@/api/question/entities/questionEntity';
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from '@/api/bible/entities/bibleEntity';
import {useLazyGetPassagesByOriginQuery} from '@/api/bible/bibleApi';
import {ModalAnswerFragment} from './ModalAnswerFragment';
import {RenderButton} from './RenderButton';
import {ModalSelectQuestion} from './ModalSelectQuestion';

interface IViewQuestionFragment {
  selectedBook: BooksEntity | null;
  selectedChapter: ChapterEntity | null;
  selectedVerse: VerseEntity | null;
  data: IQuestionResponse[];
  setSelectedBook: React.Dispatch<React.SetStateAction<BooksEntity | null>>;
  setSelectedChapter: React.Dispatch<
    React.SetStateAction<ChapterEntity | null>
  >;
  setSelectedVerse: React.Dispatch<React.SetStateAction<VerseEntity | null>>;
  setData: React.Dispatch<React.SetStateAction<IQuestionResponse[]>>;
}

export const ViewQuestionFragment = ({
  selectedBook,
  selectedChapter,
  selectedVerse,
  data,
  setSelectedBook,
  setSelectedChapter,
  setSelectedVerse,
  setData,
}: IViewQuestionFragment) => {
  const [triggerGetPassage, {data: dataPassage}] =
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
      item.id === 1
        ? {
            ...item,
            answer: `${dataPassage.id}&${
              dataPassage?.content?.split(' [')[1].split('] ')[1]
            }`,
          }
        : item,
    );
    setData(newData);
  };

  const handleGetAnswer = async (answer: string) => {
    setModalAnswer(false);
    const newData = data.map((item: IQuestionResponse) =>
      item.id === selectedQuestion?.id ? {...item, answer} : item,
    );
    setData(newData);
  };

  const renderItem = ({item}: {item: IQuestionResponse}) => (
    <RenderButton
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
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          style={styles.list}
        />
      </View>
      <ModalSelectQuestion
        visible={modalSelectQuestion}
        onClose={toggleModalSelectQuestion}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        selectedVerse={selectedVerse}
        setSelectedBook={setSelectedBook}
        setSelectedChapter={setSelectedChapter}
        setSelectedVerse={setSelectedVerse}
        dataPassage={dataPassage}
        handleSavePassage={handleSavePassage}
        triggerGetPassage={triggerGetPassage}
      />

      {modalAnswer && selectedQuestion && (
        <ModalAnswerFragment
          visible={modalAnswer}
          onClose={() => setModalAnswer(!modalAnswer)}
          title={selectedQuestion.question}
          answerUser={selectedQuestion?.answer || ''}
          handleGetAnswer={handleGetAnswer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 12,
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 24,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
