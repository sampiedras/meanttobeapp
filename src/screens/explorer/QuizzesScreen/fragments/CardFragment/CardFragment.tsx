import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';
import {LocalSvg} from 'react-native-svg';
import {colorsLight} from '@/theme/colorsLight';
import {QuizEntity} from '@/api/quizzes/entities/quizzesEntity';
import {useActionsCard} from './useActionsCard';

interface props {
  item: QuizEntity;
  index: number;
  quantity: number;
  removeItem: () => void;
  handleGoQuiz: (quiz: string, quizQuestionId: string) => void;
}

export const CardFragment = ({
  item,
  index,
  removeItem,
  quantity,
  handleGoQuiz,
}: props) => {
  const {like, pan, rotate, panResponder, handleToggleLike} = useActionsCard(
    item.id || '',
    item.isLike || false,
    removeItem,
  );

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          zIndex: quantity - index,
        },
      ]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{translateX: pan.current.x}, {rotate: rotate}],
          width: '100%',
          marginTop: index * 40,
        }}>
        <View
          padding-16
          backgroundColor={colorsLight.WHITE}
          height={'90%'}
          style={styles.item}>
          <TouchableOpacity onPress={handleToggleLike} style={styles.heart}>
            <LocalSvg
              width={28}
              height={28}
              asset={
                like
                  ? require('@/assets/svg/heart_active.svg')
                  : require('@/assets/svg/heart_gray.svg')
              }
            />
          </TouchableOpacity>

          <View height={193} marginT-16>
            <FastImage
              source={{
                uri: item.img,
              }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>

          <Text style={styles.questionText}>{item.name}</Text>
          <Text style={styles.infoText} numberOfLines={3}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleGoQuiz(item.name, item.id)}>
            <LocalSvg
              width={20}
              height={20}
              asset={require('@/assets/svg/arrow_right_white.svg')}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colorsLight.GRAY_BR,
    justifyContent: 'space-evenly',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    alignSelf: 'flex-end',
  },
  image: {
    flex: 1,
    borderRadius: 24,
  },
  questionText: {
    width: '80%',
    marginVertical: 16,
    fontSize: 20,
    fontFamily: 'Satoshi-Black',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: colorsLight.GRAY_03,
  },
  button: {
    marginVertical: 32,
    marginRight: 4,
    backgroundColor: colorsLight.PRIMARY_COLOR,
    borderRadius: 100,
    padding: 12,
    alignSelf: 'flex-end',
  },
});
