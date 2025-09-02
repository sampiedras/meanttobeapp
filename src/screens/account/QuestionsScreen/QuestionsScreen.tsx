import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {ContainerSafeArea, GradientButton} from '@/components';
import {StyleSheet} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {ModalSelectQuestion} from './ModalSelectQuestion';
import {QuestionEntity} from '@/api/question/entities/questionEntity';
import {RenderButton} from './RenderButton';
import {FlatList} from 'react-native';
import {useActionsQuestions} from './useActionsQuestions';
import {ModalAnswerFragment} from './ModalAnswerFragment';

export const QuestionsScreen = (
  props: RootStackScreenProps<RootStackRoutes.QUESTIONS>,
) => {
  const {
    data,
    selectedBook,
    selectedChapter,
    selectedVerse,
    setSelectedBook,
    setSelectedChapter,
    setSelectedVerse,
    toggleModalAnswer,
    modalSelectQuestion,
    dataPassage,
    handleSavePassage,
    triggerGetPassage,
    modalAnswer,
    setModalAnswer,
    selectedQuestion,
    handleGetAnswer,
    toggleModalSelectQuestion,
    updateQuestion,
    loading,
  } = useActionsQuestions(props);

  const renderItem = ({item}: {item: QuestionEntity}) => (
    <RenderButton
      item={item}
      toggleModalAnswer={toggleModalAnswer}
      toggleModalSelectQuestion={toggleModalSelectQuestion}
    />
  );

  return (
    <ContainerSafeArea>
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
        <GradientButton
          label="Save changes"
          height={50}
          style={styles.button}
          onPress={updateQuestion}
          loading={loading}
        />
      </View>
    </ContainerSafeArea>
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
  button: {
    marginBottom: 10,
  },
});
