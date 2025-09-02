import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import {Text} from '@react-native-material/core';
import {IUserQuestionEntity} from '@/api/user/entities/userEntity';
import {PigeonIcon} from '@/assets/svg';

interface Props {
  userImages: any[];
  dataQuestions: IUserQuestionEntity[];
}

export const MediaSection = ({userImages, dataQuestions}: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const newData = dataQuestions?.map(item => {
      if (item.answer?.includes('&')) {
        const [verseReference, verse] = item.answer.split('&');
        return {
          ...item,
          answer: `${verse}\n${verseReference}`,
        };
      } else {
        return item;
      }
    });
    newData.sort((a, b) => (a.question?.id || 0) - (b.question?.id || 0));
    setQuestions(newData);
  }, [dataQuestions]);

  const [mediaData, setMediaData] = useState<any[]>([]);

  useEffect(() => {
    const combinedData = [];
    let i = 0;
    let j = 0;

    while (i < userImages.length || j < questions.length) {
      if (i < userImages.length && userImages[i]?.url) {
        combinedData.push({
          type: 'image',
          data: userImages[i],
        });
        i++;
      }
      if (j < questions.length && questions[j]) {
        combinedData.push({
          type: 'question',
          data: questions[j],
          isFirstQuestion: j === 0,
        });
        j++;
      }
    }

    setMediaData(combinedData);
  }, [userImages, questions]);

  return (
    <>
      {mediaData.map((item, index) => (
        <View key={index}>
          {item.type === 'image' && item.data.url ? (
            <FastImage
              source={{
                uri: item.data.url,
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
            />
          ) : null}
          {item.type === 'question' && item.data ? (
            <View>
              {item.isFirstQuestion ? (
                <View
                  backgroundColor="#4E6B51"
                  marginB-20
                  padding-18
                  style={styles.containerFirstQuestion}>
                  <Text style={styles.textQuestionOne}>
                    {item.data?.question?.question}
                  </Text>
                  <View style={styles.itemsQuestionContainer}>
                    <Text style={styles.textAnswerOne}>
                      {item.data?.answer}
                    </Text>
                  </View>
                  <View style={styles.pigeonIcon}>
                    <PigeonIcon />
                  </View>
                </View>
              ) : (
                <View marginV-20 paddingH-18>
                  <Text style={styles.titleQuestion}>
                    {item.data?.question?.question}
                  </Text>
                  <View style={styles.itemsQuestionContainer}>
                    <Text style={styles.textAnswer}>{item.data?.answer}</Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View height={20} />
          )}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 500,
    borderRadius: 30,
  },
  titleQuestion: {
    fontFamily: 'Satoshi-Regular',
    marginBottom: 10,
    color: '#607270',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.8,
  },
  textAnswer: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.8,
    fontFamily: 'Satoshi-Regular',
    color: '#393842',
  },
  itemsQuestionContainer: {},
  textAnswerOne: {
    color: '#E9ECE9',
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'normal',
    lineHeight: 28.8,
    fontFamily: 'Satoshi-Regular',
  },
  textQuestionOne: {
    color: '#B5C1B6',
    fontSize: 14,
    marginBottom: 20,
  },
  pigeonIcon: {
    alignSelf: 'flex-end',
  },
  containerFirstQuestion: {
    borderRadius: 30,
    justifyContent: 'center',
  },
});
