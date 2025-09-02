import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {QuizEntity} from '@/api/quizzes/entities/quizzesEntity';
import FastImage from 'react-native-fast-image';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';

interface Props {
  item: QuizEntity;
  handleDetail: (id: number) => void;
}

export const RenderItemsQuizzes = ({item, handleDetail}: Props) => {
  const [img, setImg] = useState('');

  useEffect(() => {
    setImg(item?.imgQuiz);
  }, [item]);
  return (
    <TouchableOpacity
      onPress={() => handleDetail(item.id)}
      style={styles.container}>
      <FastImage
        source={{uri: img, priority: FastImage.priority.normal}}
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colorsLight.PRIMARY_TEXT_COLOR}
          variant="body1"
          style={styles.title}>
          {item.quiz}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colorsLight.SECONDARY_TEXT_COLOR}
          variant="body2"
          style={styles.description}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    height: 74,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colorsLight.GRAY_LIGHT,
    paddingVertical: 10,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  containerText: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Satoshi-Medium',
    marginBottom: 4,
    maxWidth: 260,
  },
  description: {
    fontFamily: 'Satoshi-Regular',
    maxWidth: 260,
  },
});
